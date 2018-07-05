/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-06
 */

/**
 * 网络基类
 */

let Utils = require( "Utils" );
let DefNet = require( "DefNet" );
let ConfNet = require( "ConfNet" );
let Hash = require( "Hash" );
let ConfEvent = require( "ConfEvent" );
let DefLog = require( "DefLog" );
let Log = require( "Log" );

let NetBase = cc.Class({

    /**
     * 构造
     */
    ctor() {
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

        this.addListenerResponse();

    },

    /**
     * 销毁视图
     */
    destroy() {

    },

    /**
     * 添加网络响应监听
     */
    addListenerResponse() {
        // 注册心跳
        G.NetManager.addProto( ConfNet.PING, this.S2CPing.bind( this ) );
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
            // TODO 弹出重连确认按钮
            G.ViewManager.openTips( G.I18N.get( 13 ) );
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
     * 获取网络对象
     * @returns {object}
     */
    getWSObject() {
        return this.m_objWS;
    },

    /**
     * 转换为对象
     * @param cmd {number|string} 消息ID
     * @param data {*} 数据
     * @returns {object}
     */
    convert( cmd, data ) {
        let object = {};
        object.cmd = cmd.toString();
        object.data = data;
        return object;
    },

    /**
     * 发送通信数据
     * @param cmd {number} 协议ID
     * @param data {object} 协议数据
     * @returns {void}
     */
    send( cmd, data ) {
        if( !this.isOpen() ) {
            G.ViewManager.openTips( G.I18N.get( 6 ) );
            return ;
        }

        if( !this.isPingCmd( cmd ) ) {
            G.ViewManager.openLoading();
            this.m_hashSendData.set( cmd, data );
        }

        this.m_objWS.send( JSON.stringify( this.convert( cmd, data ) ) );
        Log.print( Utils.format( DefLog[9], cmd ) );
        Log.print( data );
        // 启动发送定时器
        if( !this.isPingCmd( cmd ) ) {
            this.startSendTimer();
        }
    },

    /**
     * 发送心跳
     */
    C2SPing() {
        // TODO 发送心跳
        let cmd =  ConfNet.PING;
        let data = {};
        data.haijun = "haijun";
        this.send( cmd, data );
    },

    /**
     * 接收心跳
     */
    S2CPing( data ) {
        Log.print( data );
    },

    /**
     * 是否心跳ID
     */
    isPingCmd( cmd ) {
        return cmd === this.m_nPingCmd;
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
            clearInterval( this.m_nSendTimerId );
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
            this.C2SPing();
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

module.exports = NetBase;