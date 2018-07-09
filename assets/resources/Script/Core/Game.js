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
        G.EventManager.unEvent( this, ConfEvent.WEBSOCKET_OPEN );
        G.NetManager.unProto( this, ConfNet.LOGIN );
    },

    /**
     * 初始化游戏需要的模块
     */
    init() {
        this.register();
        // 初始化资源
        this.initRes();
        // 进入游戏
        this.intoGame();
    },

    /**
     * 注册
     */
    register() {
        G.EventManager.addEvent( this, ConfEvent.WEBSOCKET_OPEN );
        G.NetManager.addProto( this, ConfNet.LOGIN );

    },

    /**
     * 初始化资源
     */
    initRes() {

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
     * 网络连接成功
     */
    onOpen() {
        let cmd =  ConfNet.LOGIN;
        let data = {};
        data.token = G.StoreManager.get( ConfStore.Token );
        data.type = G.StoreManager.get( ConfStore.LoginMode );
        G.NetManager.send( cmd, data );
    },

    /**
     * 登录 回调
     */
    onLogin( data ) {

    },

    /**
     * 事件 回调
     * @param msg {object} 消息数据
     */
    onEvent( msg ) {
        switch( msg.id ) {
            case ConfEvent.WEBSOCKET_OPEN:
                this.onOpen();
                break;
        }
    },

    /**
     * 网络 回调
     * @param msg
     */
    onNet( msg ) {
        switch( msg.cmd ) {
            case ConfNet.LOGIN:
                G.EventManager.sendEvent( ConfEvent.LOGIN_SUCCEED, msg.data );
                break;
        }
    },
});

module.exports = Game;