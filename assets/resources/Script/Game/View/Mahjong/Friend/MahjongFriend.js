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
let ConfNet = require( "ConfNet" );
let Log = require( "Log" );

cc.Class({
    extends: UIBase,

    properties: {
        nodeSystemFunction: { default: null, type: cc.Node, tooltip: "系统信息" },
        nodePlayer: { default: null, type: cc.Node, tooltip: "玩家集合" },
        labelRoomId: { default: null, type: cc.Label, tooltip: "房间号" },
        nodeMenuItemMask: { default: null, type: cc.Node, tooltip: "菜单项遮罩节点" },
        buttonReady: { default: null, type: cc.Button, tooltip: "准备" },
    },

    // LIFE-CYCLE CALLBACKS:

    start () {
        this.m_objScriptSystemFunction.setTime();
        this.initNetState();
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
        G.EventManager.unEvent( this, ConfEvent.EVENT_BROADCAST_EXIT );
        G.EventManager.unEvent( this, ConfEvent.EVENT_DISBAND_SUCCEED );
        G.EventManager.unEvent( this, ConfEvent.EVENT_DISBAND_FAILED );
        G.EventManager.unEvent( this, ConfEvent.EVENT_BROADCAST_DISBAND );

        // 清理游戏数据
        G.DataManager.clearData( ConfData.DeskData );
        G.DataManager.clearData( ConfData.PlayerData );
        G.DataManager.clearData( ConfData.RoomData );

        this.m_objScriptSystemFunction = null;
        this.m_objPlayerController = null;
        this.m_objRoomData = null;
        this.m_bMenuSW = null;
    },

    /**
     * 初始化数据
     */
    initData() {
        // 系统功能脚本
        this.m_objScriptSystemFunction = this.nodeSystemFunction.getComponent( "SystemFunction" );
        // 玩家控制器
        this.m_objPlayerController = new PlayerController( G.DataManager.getData( ConfData.PlayerData ), this.nodePlayer.getComponent( "PlayerView" ) );
        // 房间数据
        this.m_objRoomData = G.DataManager.getData( ConfData.RoomData );
        // 菜单项开关
        this.m_bMenuSW = false;
        // 网络状态
        this.m_strNetState = null;
    },

    /**
     * 初始化网络状态
     */
    initNetState() {
        if( cc.sys.platform === cc.sys.WECHAT_GAME ) {
            wx.getNetworkType( {
                success( res ) {
                    this.m_objScriptSystemFunction.setNetState( res.networkType );
                    this.m_strNetState = res.networkType;
                },
                fail() {
                    Log.warn( G.I18N.get( 37 ) );
                },
            } )
        }
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
        G.EventManager.addEvent( this, ConfEvent.EVENT_BROADCAST_EXIT );
        G.EventManager.addEvent( this, ConfEvent.EVENT_DISBAND_SUCCEED );
        G.EventManager.addEvent( this, ConfEvent.EVENT_DISBAND_FAILED );
        G.EventManager.addEvent( this, ConfEvent.EVENT_BROADCAST_DISBAND );
    },

    /**
     * 是否自己座位号
     * @param seat {number} 服务器座位号
     * @return {boolean}
     */
    isSelfSeat( seat ) {
        return G.DataManager.getData( ConfData.PlayerData ).getSelfSeat() === seat;
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
     * 帮助 按钮回调
     */
    onHelp() {
        G.ViewManager.openTips( G.I18N.get( 27 ) );
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
     * 托管 按钮回调
     */
    onEntrust() {
        G.ViewManager.openTips( G.I18N.get( 27 ) );
    },

    /**
     * 设置  按钮回调
     */
    onSetting() {
        G.ViewManager.openTips( G.I18N.get( 27 ) );
    },

    /**
     * 消息 按钮回调
     */
    onMessage() {
        G.ViewManager.openTips( G.I18N.get( 27 ) );
    },

    /**
     * 提示 按钮回调
     */
    onHint() {
        G.ViewManager.openTips( G.I18N.get( 27 ) );
    },

    /**
     * 准备 按钮回调
     */
    onReady() {
        let message = Protocol.getC2S( Protocol.BroadcastReady );
        G.NetManager.send( message.cmd, message.data );
    },

    /**
     * 网络改变 事件
     * @param data {string} 网络类型
     */
    onEventNetChange( data ) {
        this.m_objScriptSystemFunction.setNetState( data );
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
        // 等待服务器发送 广播 退出房间 消息
        // 在这个回调方法内处理退出房间 动作
        //
        // onEventBroadcastExit
    },

    /**
     * 退出房间 失败
     * @param data
     */
    onEventExitFailed( data ) {
        G.ViewManager.openTips( ConfCode.WebSocket[data.code.toString()] );
    },

    /**
     * 退出房间 广播
     * @param data
     */
    onEventBroadcastExit( data ) {
        if( this.isSelfSeat( data.seat ) ) {
            G.ViewManager.replaceScene( ConfView.Scene.Lobby );
        } else {
            this.m_objPlayerController.exit( G.Game.transSeat( data.seat ) );
        }
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
     * 解散房间 广播
     * @param data
     */
    onEventBroadcastDisband( data ) {

    },

    /**
     * 准备 成功
     * @param data
     */
    onEventReadySucceed( data ) {
        // 等待服务器发送 广播 准备 消息
        // 在这个回调方法内处理准备 动作
        //
        // onEventBroadcastReady
    },

    /**
     * 准备 失败
     * @param data
     */
    onEventReadyFailed( data ) {
        G.ViewManager.openTips( ConfCode.WebSocket[data.code.toString()] );
    },

    /**
     * 准备 广播
     * @param data
     */
    onEventBroadcastReady( data ) {
        if( this.isSelfSeat( data.seat ) ) {
            this.buttonReady.node.active = false;
        }
        this.m_objPlayerController.ready( G.Game.transSeat( data.seat ), true );
    },

    /**
     * 事件 回调
     * @param event
     */
    onEvent( event ) {
        switch( event.id ) {
            case ConfEvent.EVENT_NET_CHANGE:
                this.onEventNetChange( event.data );
                break;
            case ConfEvent.EVENT_NOTICE_JOIN:
                this.onEventNoticeJoin( event.data );
                break;
            case ConfEvent.EVENT_EXIT_SUCCEED:
                this.onEventExitSucceed( event.data );
                break;
            case ConfEvent.EVENT_EXIT_FAILED:
                this.onEventExitFailed( event.data );
                break;
            case ConfEvent.EVENT_BROADCAST_EXIT:
                this.onEventBroadcastExit( event.data );
                break;
            case ConfEvent.EVENT_DISBAND_SUCCEED:
                this.onEventDisbandSucceed( event.data );
                break;
            case ConfEvent.EVENT_DISBAND_FAILED:
                this.onEventDisbandFailed( event.data );
                break;
            case ConfEvent.EVENT_BROADCAST_DISBAND:
                this.onEventBroadcastDisband( event.data );
                break;
            case ConfEvent.EVENT_READY_SUCCEED:
                this.onEventReadySucceed( event.data );
                break;
            case ConfEvent.EVENT_READY_FAILED:
                this.onEventReadyFailed( event.data );
                break;
            case ConfEvent.EVENT_BROADCAST_READY:
                this.onEventBroadcastReady( event.data );
                break;
        }
    },

    // update (dt) {},
});
