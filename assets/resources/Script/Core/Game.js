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
let Protocol = require( "Protocol" );
let ConfData = require( "ConfData" );

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
        G.NetManager.unProto( this, Protocol.Login.cmd );
        // 释放 创建 网络
        G.NetManager.unProto( this, Protocol.Create.cmd );
        // 释放 加入 网络
        G.NetManager.unProto( this, Protocol.Join.cmd );
        // 释放 通知加入房间
        G.NetManager.unProto( this, Protocol.NoticeJoin.cmd );
        // 释放 退出房间 网络
        G.NetManager.unProto( this, Protocol.Exit.cmd );
        // 释放 通知退出房间
        G.NetManager.unProto( this, Protocol.NoticeExit.cmd );
        // 释放 解散房间
        G.NetManager.unProto( this, Protocol.Disband.cmd );
        // 释放 通知解散房间
        G.NetManager.unProto( this, Protocol.NoticeDisband.cmd );

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
        // 未完成 房间ID
        this.m_strUndoneRoomId = null;
    },

    /**
     * 注册
     */
    register() {
        // 添加 登录 网络
        G.NetManager.addProto( this, Protocol.Login.cmd );
        // 添加 创建 网络
        G.NetManager.addProto( this, Protocol.Create.cmd );
        // 添加 加入 网络
        G.NetManager.addProto( this, Protocol.Join.cmd );
        // 添加 通知加入房间
        G.NetManager.addProto( this, Protocol.NoticeJoin.cmd );
        // 添加 退出房间 网络
        G.NetManager.addProto( this, Protocol.Exit.cmd );
        // 添加 通知退出房间
        G.NetManager.addProto( this, Protocol.NoticeExit.cmd );
        // 添加 解散房间
        G.NetManager.addProto( this, Protocol.Disband.cmd );
        // 添加 通知解散房间
        G.NetManager.addProto( this, Protocol.NoticeDisband.cmd );
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
     * 设置未完成的房间ID
     * @param id {string} 房间ID
     */
    setUndoneRoomId( id ) {
        this.m_strUndoneRoomId = id;
    },

    /**
     * 获取未完成的房间ID
     * @return {string}
     */
    getUndoneRoomId() {
        return this.m_strUndoneRoomId;
    },

    /**
     * 登录 网络回调
     * @param data {object} 登录数据
     */
    onNetLogin( data ) {
        if( data.code >= 0 ) {
            Utils.isNull( data.userInfo ) || G.DataManager.getData( ConfData.UserData ).setUserInfo( data.userInfo );
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
            Utils.isNull( data.roomInfo ) || G.DataManager.getData( ConfData.RoomData ).setRoomInfo( data.roomInfo );
            Utils.isNull( data.deskInfo ) || G.DataManager.getData( ConfData.DeskData ).setDeskInfo( data.deskInfo );
            Utils.isNull( data.playerInfo ) || G.DataManager.getData( ConfData.PlayerData ).setPlayerInfo( data.playerInfo );
            G.EventManager.sendEvent( ConfEvent.EVENT_JOIN_SUCCEED, data );
        } else {
            G.EventManager.sendEvent( ConfEvent.EVENT_JOIN_FAILED, data );
        }
    },

    /**
     * 通知加入 网络回调
     * @param data {object} 通知加入数据
     */
    onNetNoticeJoin( data ) {
        G.EventManager.sendEvent( ConfEvent.EVENT_NOTICE_JOIN, data );
    },

    /**
     * 退出 网络回调
     * @param data {object} 退出数据
     */
    onNetExit( data ) {
        if( data.code >= 0 ) {
            G.EventManager.sendEvent( ConfEvent.EVENT_EXIT_SUCCEED, data );
        } else {
            G.EventManager.sendEvent( ConfEvent.EVENT_EXIT_FAILED, data );
        }
    },

    /**
     * 通知退出 网络回调
     * @param data {object} 通知退出数据
     */
    onNetNoticeExit( data ) {
        G.EventManager.sendEvent( ConfEvent.EVENT_NOTICE_EXIT, data );
    },

    /**
     * 解散 网络回调
     * @param data {object} 解散数据
     */
    onNetDisband( data ) {
        if( data.code >= 0 ) {
            G.EventManager.sendEvent( ConfEvent.EVENT_DISBAND_SUCCEED, data );
        } else {
            G.EventManager.sendEvent( ConfEvent.EVENT_DISBAND_FAILED, data );
        }
    },

    /**
     * 通知解散 网络回调
     * @param data {object} 通知解散数据
     */
    onNetNoticeDisband( data ) {
        G.EventManager.sendEvent( ConfEvent.EVENT_NOTICE_DISBAND, data );
    },

    /**
     * 网络 回调
     * @param msg
     */
    onNet( msg ) {
        switch( msg.cmd ) {
            case Protocol.Login.cmd:
                this.onNetLogin( msg.data );
                break;
            case Protocol.Create.cmd:
                this.onNetCreate( msg.data );
                break;
            case Protocol.Join.cmd:
                this.onNetJoin( msg.data );
                break;
            case Protocol.NoticeJoin.cmd:
                this.onNetNoticeJoin( msg.data );
                break;
            case Protocol.Exit.cmd:
                this.onNetExit( msg.data );
                break;
            case Protocol.NoticeExit.cmd:
                this.onNetNoticeExit( msg.data );
                break;
            case Protocol.Disband.cmd:
                this.onNetDisband( msg.data );
                break;
            case Protocol.NoticeDisband.cmd:
                this.onNetNoticeDisband( msg.data );
                break;

        }
    },
});

module.exports = Game;