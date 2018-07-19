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
let ConfNet = require( "ConfNet" );
let Protocol = require( "Protocol" );

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
        // 释放 登录 网络
        G.NetManager.unProto( this, ConfNet.NET_LOGIN );
        // 释放 创建 网络
        G.NetManager.unProto( this, ConfNet.NET_CREATE );
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
        // 未完成 房间ID
        this.m_strUndoneRoomId = null;
    },

    /**
     * 注册
     */
    register() {
        // 添加 登录 网络
        G.NetManager.addProto( this, ConfNet.NET_LOGIN );
        // 添加 创建 网络
        G.NetManager.addProto( this, ConfNet.NET_CREATE );
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
     * 设置未完成的游戏ID
     * @param id {number} 游戏ID
     */
    setUndoneGameId( id ) {
        this.m_nUndoneGameId = id;
    },

    /**
     * 设置未完成的游戏ID
     * @param id {number} 模式ID
     */
    setUndoneModeId( id ) {
        this.m_nUndoneModeId = id;
    },

    /**
     * 设置未完成的房间ID
     * @param id {string} 房间ID
     */
    setUndoneRoomId( id ) {
        this.m_nUndoneRoomId = id;
    },

    /**
     * 获取未完成的游戏ID
     * @return {number}
     */
    getUndoneModeId() {
        return this.m_nUndoneGameId;
    },

    /**
     * 获取未完成的模式ID
     * @return {number}
     */
    getUndoneModeId() {
        return this.m_nUndoneModeId;
    },

    /**
     * 获取未完成的房间ID
     * @return {string}
     */
    getUndoneRoomId() {
        return this.m_nUndoneRoomId;
    },

    /**
     * 登录 网络回调
     * @param data {object} 登录数据
     */
    onNetLogin( data ) {
        if( data.code >= 0 ) {
            Utils.isNull( data.userInfo ) || G.DataManager.getData( "DataUser" ).setUserInfo( data.userInfo );
            Utils.isNull( data.gameInfo ) || G.DataManager.getData( "DataUser" ).setGameInfo( data.gameInfo );
            G.EventManager.sendEvent( ConfEvent.EVENT_LOGIN_SUCCEED, data );
        } else {
            G.EventManager.sendEvent( ConfEvent.EVENT_LOGIN_FAILED, data );
        }
    },

    /**
     * 创建 网络回调
     * @param data {object} 创建数据
     */
    onNetCreate( data ) {
        if( data.code >= 0 ) {
            G.EventManager.sendEvent( ConfEvent.EVENT_CREATE_SUCCEED, data );
        } else {
            G.EventManager.sendEvent( ConfEvent.EVENT_CREATE_FAILED, data );
        }
    },

    /**
     * 加入 网络回调
     * @param data {object} 加入数据
     */
    onNetJoin( data ) {
        if( data.code >= 0 ) {
            G.EventManager.sendEvent( ConfEvent.EVENT_JOIN_SUCCEED, data );
        } else {
            G.EventManager.sendEvent( ConfEvent.EVENT_JOIN_FAILED, data );
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
            case ConfNet.NET_CREATE:
                this.onNetCreate( msg.data );
                break;
            case ConfNet.NET_JOIN:
                this.onNetJoin( msg.data );
                break;
        }
    },
});

module.exports = Game;