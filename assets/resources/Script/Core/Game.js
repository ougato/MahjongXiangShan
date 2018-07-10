/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 游戏
 */

let Utils = require( "Utils" );
let Config = require( "Config" )
let ConfEvent = require( "ConfEvent" );
let ConfStore = require( "ConfStore" );
let ConfNet = require( "ConfNet" );
let ConfView = require( "ConfView" );
let Log = require( "Log" );
let DefLog = require( "DefLog" );
let ConfGame = require( "ConfGame" );

// 实例化对象
let instance = null;

let Game = cc.Class({

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
                instance = new Game();
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

    },

    /**
     * 销毁
     */
    destroy() {
        // 释放 连接成功 事件
        G.EventManager.unEvent( this, ConfEvent.EVENT_CONNECT_SUCCEED );
        // 释放 登录 网络
        G.NetManager.unProto( this, ConfNet.NET_LOGIN );
        // 释放 加入 网络
        G.NetManager.unProto( this, ConfNet.NET_JOIN );
    },

    /**
     * 初始化游戏需要的模块
     */
    init() {
        // 初始化数据
        this.initData();
        // 注册
        this.register();
        // 进入游戏
        this.intoGame();
    },

    /**
     * 初始化数据
     */
    initData() {
        // 未完成 游戏ID
        this.m_nUndoneGameId = null;
        // 未完成 模式ID
        this.m_nUndoneModeId = null;
    },

    /**
     * 注册
     */
    register() {
        // 添加 连接成功 事件
        G.EventManager.addEvent( this, ConfEvent.EVENT_CONNECT_SUCCEED );
        // 添加 登录 网络
        G.NetManager.addProto( this, ConfNet.NET_LOGIN );
        // 添加 加入 网络
        G.NetManager.addProto( this, ConfNet.NET_JOIN );
    },

    /**
     * 进入游戏
     */
    intoGame() {
        G.ViewManager.replaceScene( Config.defaultScene, null, function( view ) {
            let script = view.getNode().getComponent( view.getName() );
            script.checkToken();
            script.addDownloadEvent();
        } );
    },

    /**
     * 连接成功 事件
     */
    onEventConnectSucceed() {
        let data = {};
        data.token = G.StoreManager.get( ConfStore.Token );
        data.type = G.StoreManager.get( ConfStore.LoginMode );
        G.NetManager.send( ConfNet.NET_LOGIN, data );
    },

    /**
     * 登录 回调
     * @return {*}
     */
    onNetLogin( data ) {
        if( data.code < 0 ) {
            G.ViewManager.openTips( Utils.format( G.I18N.get( 28 ), data.code ) );
            return ;
        }

        // TODO: 保存用户数据 data.userInfo 到 数据管理器 DataManager
        if( Utils.isNull( data.gameInfo ) ) {
            G.ViewManager.replaceScene( ConfView.Scene.Lobby, data.userInfo );
        } else {
            this.m_nUndoneGameId = data.gameInfo.gameId;
            this.m_nUndoneModeId = data.gameInfo.modeId;
            G.NetManager.send( ConfNet.NET_JOIN, data.gameInfo.roomId );
        }
    },

    /**
     * 加入 回调
     * @return {*}
     */
    onNetJoin( data ) {
        if( data.code < 0 ) {
            Log.warn( Utils.format( G.I18N.get( 29 ), data.code ) );
            G.ViewManager.replaceScene( ConfView.Scene.Lobby );
            return ;
        }

        // TODO: 保存房间数据 data.roomInfo 到 数据管理器 DataManager
        switch( this.m_nUndoneModeId ) {
            case ConfGame.ModeId.Friend:

                break;
            case ConfGame.ModeId.Match:

                break;
            default:
                Log.error( DefLog[15] );
                break;
        }
    },

    /**
     * 事件 回调
     * @param msg {object} 消息数据
     */
    onEvent( msg ) {
        switch( msg.id ) {
            case ConfEvent.EVENT_CONNECT_SUCCEED:
                this.onEventConnectSucceed();
                break;
        }
    },

    /**
     * 网络 回调
     * @param msg
     */
    onNet( msg ) {
        switch( msg.cmd ) {
            case ConfNet.NET_LOGIN:
                this.onNetLogin( msg.data );
                break;
            case ConfNet.NET_JOIN:
                this.onNetJoin( msg.data );
                break;
        }
    },
});

module.exports = Game;