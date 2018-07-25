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
        labelRoomId: { default: null, type: cc.Label, tooltip: "房间号" },
        nodeMenuItemMask: { default: null, type: cc.Node, tooltip: "菜单项遮罩节点" },
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
        // 房间数据
        this.m_objRoomData = G.DataManager.getData( ConfData.RoomData );
        // 菜单项开关
        this.m_bMenuSW = false;
    },

    /**
     * 初始化视图
     */
    initView() {
        this.labelRoomId.string = G.I18N.get( 35 ) + this.m_objRoomData.getRoomId();
        this.nodeMenuItemMask.active = false;
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
     * 退出
     */
    exitRoom() {
        let message = Protocol.getC2S( Protocol.Exit );
        G.NetManager.send( message.cmd, message.data );
    },

    /**
     * 解散房间
     */
    disbandRoom() {
        let message = Protocol.getC2S( Protocol.Disband );
        message.data.isAgree = true;
        G.NetManager.send( message.cmd, message.data );
    },

    /**
     * 隐藏菜单项
     */
    hideMenuItem() {
        this.nodeMenuItemMask.active = false;
    },

    /**
     * 显示菜单项
     */
    showMenuItem() {
        this.nodeMenuItemMask.active = true;
    },

    /**
     * 返回 按钮回调
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
            callback = this.disbandRoom;
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
     * 菜单 按钮回调
     */
    onMenu() {
        if( this.m_bMenuSW ) {
            this.hideMenuItem();
        } else {
            this.showMenuItem();
        }
        this.m_bMenuSW = !this.m_bMenuSW;
    },

    /**
     * 加入房间 通知
     * @param data
     */
    onEventNoticeJoin( data ) {
        this.m_objPlayerController.join( G.Game.transSeat( data.seat ), data );
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
    onEventBroadcastExit( data ) {
        this.m_objPlayerController.exit( G.Game.transSeat( data.seat ) );
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
    onEventBroadcastDisband( data ) {

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
                this.onEventBroadcastExit( msg.data );
                break;
            case ConfEvent.EVENT_DISBAND_SUCCEED:
                this.onEventDisbandSucceed( msg.data );
                break;
            case ConfEvent.EVENT_DISBAND_FAILED:
                this.onEventDisbandFailed( msg.data );
                break;
            case ConfEvent.EVENT_NOTICE_DISBAND:
                this.onEventBroadcastDisband( msg.data );
                break;
        }
    },

    // update (dt) {},
});
