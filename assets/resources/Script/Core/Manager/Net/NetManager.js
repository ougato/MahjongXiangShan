/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-05
 */

/**
 * 网络管理器
 */

let Utils = require( "Utils" );
let List = require( "List" );
let DefNet = require( "DefNet" );
let ConfNet = require( "ConfNet" );
let Hash = require( "Hash" );
let ConfEvent = require( "ConfEvent" );
let DefLog = require( "DefLog" );
let Log = require( "Log" );

// 实例化对象
let instance = null;

let NetManager = cc.Class({

    /**
     * 静态
     */
    statics: {
        /**
         * 获取实例
         * @returns {Function}
         */
        getInstance() {
            if( Utils.isNull( instance ) ) {
                instance = new NetManager();
            }
            return instance;
        },

        /**
         * 销毁实例
         */
        destroy() {
            if( !Utils.isNull( instance ) ) {
                instance.destroy();
            }
        },

    },

    /**
     * 构造
     */
    ctor() {
        //  存储消息结构 网络列表
        this.m_mapNetList = new Map();
        // 网络对象
        this.m_objWS = null;
        // 重连次数
        this.m_nReconectCount = 0;
        // 发送队列
        this.m_hashSendData = new Hash();
        // 发送超时定时器
        this.m_nSendTimerId = 0;
        // 心跳超时定时器
        this.m_nPingTimerId = 0;
        // 心跳消息ID
        this.m_nPingCmd = 0;
        // 是否重连
        this.m_bIsReconnect = false;

    },

    /**
     * 销毁
     */
    destroy() {
        this.m_mapNetList.clear();
        this.m_mapNetList = null;
    },

    /**
     * 连接
     * @param url {string} 网络链接
     * @param protocol {string|*} 协议类型
     * @returns {void}
     */
    connect( url, protocol ) {
        if( this.isOpen() ) {
            G.ViewManager.openTips( G.I18N.get( 10 ) );
            return ;
        }

        let text = "";
        if( this.m_bIsReconnect ) {
            text = G.I18N.get( 12 );
        } else {
            text = G.I18N.get( 11 );
        }
        G.ViewManager.openLoading( text );

        if( !( Utils.isString( protocol ) && protocol.length > 0 ) ) {
            protocol = undefined;
        }

        this.m_objWS = new WebSocket( url, protocol );
        this.m_objWS.onopen = this.onOpen.bind( this );
        this.m_objWS.onmessage = this.onMessage.bind( this );
        this.m_objWS.onerror = this.onError.bind( this );
        this.m_objWS.onclose = this.onClose.bind( this );
    },

    /**
     * 重连
     */
    reconnect() {
        this.m_bIsReconnect = true;
        if( this.m_nReconectCount < DefNet.RECONNECT_COUNT ) {
            this.connect( this.m_objWS.url, this.m_objWS.protocol );
            ++this.m_nReconectCount;
        } else {
            G.ViewManager.closeLoading();
            let ids = {};
            ids[DefView.DialogBoxIDs.IDRETRY] = function() {
                this.connect( this.m_objWS.url, this.m_objWS.protocol );
            }.bind( this );
            G.ViewManager.openDialogBox( G.I18N.get( 24 ), ids );
        }

    },

    /**
     * 是否连上
     */
    isOpen() {
        return ( ( !Utils.isNull( this.m_objWS ) ) && ( this.m_objWS.readyState === WebSocket.OPEN ) );
    },

    /**
     * 连接成功 回调
     */
    onOpen() {
        G.ViewManager.closeLoading();
        this.startPingTimer();
        this.m_nReconectCount = 0;
        G.EventManager.sendEvent( ConfEvent.WEBSOCKET_OPEN );
    },

    /**
     * 消息数据 回调
     * @param json {string} json字符串
     */
    onMessage( json ) {
        let jsonData = json.data;
        if( Utils.isJson( jsonData ) ) {
            jsonData = JSON.parse( jsonData );
        }

        let cmd = jsonData.cmd;
        let data = jsonData.data;

        // 消息队列移除 并 关闭菊花
        if( !this.isPingCmd( cmd ) ) {
            this.m_hashSendData.clear();
            this.stopSendTimer();
            G.ViewManager.closeLoading();
        }

        // 回调 消息接收函数
        let callback = G.NetManager.getCallback( cmd );
        if( !Utils.isNull( callback ) ) {
            callback( data );
        }
        Log.print( Utils.format( DefLog[10], cmd ) );
        Log.print( data );
        Log.print( json );
    },

    /**
     * 网络错误 回调
     */
    onError() {
        G.ViewManager.closeLoading();
        G.ViewManager.openTips( G.I18N.get( 9 ) );
    },

    /**
     * 网络关闭 回调
     */
    onClose() {
        this.stopPingTimer();
        this.reconnect();
    },

    /**
     * 发送通信数据
     * @param cmd {number|string} 协议ID
     * @param data {*} [协议数据]
     * @returns {void}
     */
    send( cmd, data ) {
        if( !this.isOpen() ) {
            G.ViewManager.openTips( G.I18N.get( 6 ) );
            return ;
        }

        if( Utils.isNumber( cmd ) || Utils.isString( cmd ) ) {
            cmd.toString();
        } else {
            Log.error( DefLog[13] );
            return ;
        }
        if( Utils.isNull( data ) ) {
            data = null;
        }
        let msg = {};
        msg.cmd = cmd;
        msg.data = data;

        if( !this.isPingCmd( cmd ) ) {
            G.ViewManager.openLoading();
            this.m_hashSendData.set( cmd, data );
        }

        this.m_objWS.send( JSON.stringify( cmd, data ) );

        // 启动发送定时器
        if( !this.isPingCmd( cmd ) ) {
            this.startSendTimer();
        }

        Log.print( Utils.format( DefLog[9] ) );
        Log.print( cmd );
        Log.print( data );
    },


    /**
     * 设置注册网络回调函数
     * @param cmd 协议消息ID
     * @param callback 接收回调函数
     */
    addProto( script, cmd ) {
        this.m_mapS2CFunc.set( cmd, callback );
    },


    /**
     * 开始 消息发送定时器
     */
    startSendTimer() {
        if( !Utils.isNull( this.m_nSendTimerId ) ) {
            this.stopSendTimer();
        }
        this.m_nSendTimerId = setTimeout( function() {
            this.m_objWS.close();
            this.stopSendTimer();
        }.bind( this ), DefNet.MESSAGE_TIMEOUT * 1000 );
    },

    /**
     * 停止 消息发送定时器
     */
    stopSendTimer() {
        if( !Utils.isNull( this.m_nSendTimerId ) ) {
            clearTimeout( this.m_nSendTimerId );
            this.m_nSendTimerId = null;
        }
    },

    /**
     * 开始心跳
     */
    startPingTimer() {
        if( !Utils.isNull( this.m_nPingTimerId ) ) {
            this.stopPingTimer();
        }
        this.m_nPingTimerId = setInterval( function() {
            this.send( ConfNet.PING );
        }.bind( this ), DefNet.PING_GAP * 1000 );
    },

    /**
     * 关闭心跳
     */
    stopPingTimer() {
        if( !Utils.isNull( this.m_nPingTimerId ) ) {
            clearInterval( this.m_nPingTimerId );
            this.m_nPingTimerId = null;
        }
    },


});

module.exports = NetManager;