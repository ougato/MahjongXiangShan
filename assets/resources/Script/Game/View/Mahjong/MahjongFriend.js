/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-07
 */

/**
 * 麻将 朋友场
 */

let UIBase = require( "UIBase" );
let ConfGame = require( "ConfGame" );
let DefView = require( "DefView" );
let Protocol = require( "Protocol" );
let ConfEvent = require( "ConfEvent" );
let ConfView = require( "ConfView" );
let ConfData = require( "ConfData" );
let ConfCode = require( "ConfCode" );
let PlayerController = require( "PlayerController" );

cc.Class({
    extends: UIBase,

    properties: {
        nodeSystemInfo: { default: null, type: cc.Node, tooltip: "系统信息" },
        nodePlayer: { default: null, type: cc.Node, tooltip: "玩家集合" },
    },

    // LIFE-CYCLE CALLBACKS:

    start () {

    },

    /**
     * 加载
     */
    onLoad() {
        this.initData();
        this.initView();
        this.register();
    },

    /**
     * 销毁
     */
    onDestroy() {
        G.EventManager.unEvent( this, ConfEvent.EVENT_NOTICE_JOIN );
        G.EventManager.unEvent( this, ConfEvent.EVENT_EXIT_SUCCEED );
        G.EventManager.unEvent( this, ConfEvent.EVENT_EXIT_FAILED );
        G.EventManager.unEvent( this, ConfEvent.EVENT_NOTICE_EXIT );
        G.EventManager.unEvent( this, ConfEvent.EVENT_DISBAND_SUCCEED );
        G.EventManager.unEvent( this, ConfEvent.EVENT_DISBAND_FAILED );
        G.EventManager.unEvent( this, ConfEvent.EVENT_NOTICE_DISBAND );

        // 清理游戏数据
        G.DataManager.clearData( ConfData.DeskData );
        G.DataManager.clearData( ConfData.PlayerData );
        G.DataManager.clearData( ConfData.RoomData );

        // 释放控制器
        this.m_objPlayerController.destroy();
    },

    /**
     * 初始化数据
     */
    initData() {
        // 玩家控制器
        this.m_objPlayerController = new PlayerController( G.DataManager.getData( ConfData.PlayerData ), this.nodePlayer.getComponent( "PlayerView" ) );
    },

    /**
     * 初始化视图
     */
    initView() {

    },

    /**
     * 注册
     */
    register() {
        G.EventManager.addEvent( this, ConfEvent.EVENT_NOTICE_JOIN );
        G.EventManager.addEvent( this, ConfEvent.EVENT_EXIT_SUCCEED );
        G.EventManager.addEvent( this, ConfEvent.EVENT_EXIT_FAILED );
        G.EventManager.addEvent( this, ConfEvent.EVENT_NOTICE_EXIT );
        G.EventManager.addEvent( this, ConfEvent.EVENT_DISBAND_SUCCEED );
        G.EventManager.addEvent( this, ConfEvent.EVENT_DISBAND_FAILED );
        G.EventManager.addEvent( this, ConfEvent.EVENT_NOTICE_DISBAND );
    },

    /**
     * 转换 服务器座位号 到 客户端座位号
     * @param serverSeat {number} 服务器座位号
     * @return {number} 客户端座位号
     */
    transSeat( serverSeat ) {
        let clientSeat = serverSeat;

        return clientSeat;
    },

    /**
     * 退出
     */
    exitRoom() {
        let message = Protocol.getC2S( Protocol.Exit );
        G.NetManager.send( message.cmd, message.data );
    },

    /**
     * 解散房间
     */
    disbankRoom() {
        let message = Protocol.getC2S( Protocol.Disband );
        message.data.isAgree = true;
        G.NetManager.send( message.cmd, message.data );
    },

    /**
     * 返回
     */
    onGoBack() {
        let dataRoom = G.DataManager.getData( ConfData.RoomData );
        let state = dataRoom.getState();

        let text = "";
        let callback = null;
        if( state === ConfGame.RoomState.NotStarted || state === ConfGame.RoomState.TotalClosing ) {
            text = G.I18N.get( 32 );
            callback = this.exitRoom;
        } else if( state === ConfGame.RoomState.Playing || state === ConfGame.RoomState.Closing ) {
            text = G.I18N.get( 33 );
            callback = this.disbankRoom;
        }

        let ids = {};
        ids[DefView.DialogBoxIDs.IDCANCEL] = function() {
            G.ViewManager.closeDialogBox();
        };
        ids[DefView.DialogBoxIDs.IDOK] = function() {
            callback();
            G.ViewManager.closeDialogBox();
        };

        G.ViewManager.openDialogBox( text, ids );
    },

    /**
     * 加入房间 通知
     * @param data
     */
    onEventNoticeJoin( data ) {
        this.m_objPlayerController.join( this.transSeat( data.seat ), data );
    },

    /**
     * 退出房间 成功
     * @param data
     */
    onEventExitSucceed( data ) {
        G.ViewManager.replaceScene( ConfView.Scene.Lobby );
    },

    /**
     * 退出房间 失败
     * @param data
     */
    onEventExitFailed( data ) {
        G.ViewManager.openTips( ConfCode.WebSocket[data.code.toString()] );
    },

    /**
     * 退出房间 通知
     * @param data
     */
    onEventNoticeExit( data ) {
        this.m_objPlayerController.exit( this.transSeat( data.seat ) );
    },

    /**
     * 解散房间 成功
     * @param data
     */
    onEventDisbandSucceed( data ) {

    },

    /**
     * 解散房间 失败
     * @param data
     */
    onEventDisbandFailed( data ) {

    },

    /**
     * 解散房间 通知
     * @param data
     */
    onEventNoticeDisband( data ) {

    },

    /**
     * 事件 回调
     * @param msg
     */
    onEvent( msg ) {
        switch( msg.id ) {
            case ConfEvent.EVENT_NOTICE_JOIN:
                this.onEventNoticeJoin( msg.data );
                break;
            case ConfEvent.EVENT_EXIT_SUCCEED:
                this.onEventExitSucceed( msg.data );
                break;
            case ConfEvent.EVENT_EXIT_FAILED:
                this.onEventExitFailed( msg.data );
                break;
            case ConfEvent.EVENT_NOTICE_EXIT:
                this.onEventNoticeExit( msg.data );
                break;
            case ConfEvent.EVENT_DISBAND_SUCCEED:
                this.onEventDisbandSucceed( msg.data );
                break;
            case ConfEvent.EVENT_DISBAND_FAILED:
                this.onEventDisbandFailed( msg.data );
                break;
            case ConfEvent.EVENT_NOTICE_DISBAND:
                this.onEventNoticeDisband( msg.data );
                break;
        }

    },

    // update (dt) {},
});
