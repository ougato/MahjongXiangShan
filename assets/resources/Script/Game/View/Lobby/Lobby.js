/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 大厅场景
 */

let UIBase = require( "UIBase" );
let ConfView = require( "ConfView" );
let Log = require( "Log" );
let Utils = require( "Utils" );
let ConfData = require( "ConfData" );
let ConfEvent = require( "ConfEvent" );
let DefView = require( "DefView" );
let Protocol = require( "Protocol" );
let ConfGame = require( "ConfGame" );
let ConfCode = require( "ConfCode" );

cc.Class({
    extends: UIBase,

    properties: {
        spriteAvatar: { default: null, type: cc.Sprite, tooltip: "头像" },
        labelName: { default: null, type: cc.Label, tooltip: "名字" },
        labelGold: { default: null, type: cc.Label, tooltip: "金币" },
        labelJewel: { default: null, type: cc.Label, tooltip: "钻石" },
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
        G.EventManager.unEvent( this, ConfEvent.EVENT_CREATE_SUCCEED );
        G.EventManager.unEvent( this, ConfEvent.EVENT_JOIN_SUCCEED );
        G.EventManager.unEvent( this, ConfEvent.EVENT_JOIN_FAILED );
        G.EventManager.unEvent( this, ConfEvent.EVENT_PUSH_JOIN );
    },

    /**
     * 初始化数据
     */
    initData() {
        // 用户数据对象
        this.m_objUserData = G.DataManager.getData( ConfData.UserData );
    },

    /**
     * 初始化视图
     */
    initView() {
        let name = this.m_objUserData.getName();
        let gold = this.m_objUserData.getGold();
        let diamond = this.m_objUserData.getDiamond();

        this.labelName.string = name;
        this.labelGold.string = gold;
        this.labelJewel.string = diamond;

    },

    /**
     * 注册
     */
    register() {
        G.EventManager.addEvent( this, ConfEvent.EVENT_CREATE_SUCCEED );
        G.EventManager.addEvent( this, ConfEvent.EVENT_JOIN_SUCCEED );
        G.EventManager.addEvent( this, ConfEvent.EVENT_JOIN_FAILED );
        G.EventManager.addEvent( this, ConfEvent.EVENT_PUSH_JOIN );
    },

    /**
     * 刷新数据
     * @param data {object} 用户数据
     * @return {*}
     */
    refresh( data ) {
        if( !Utils.isNull( data ) ) {
            if( data.code < 0 ) {
                Log.error( Utils.format( DefLog[14], data.code ) );
                return ;
            }

            this.labelName.string = Utils.isNull( data.name ) ? "?" : data.name;
            this.labelGold.string = Utils.isNull( data.gold ) ? "?" : data.gold;
            this.labelJewel.string = Utils.isNull( data.diamond ) ? "?" : data.diamond;
        }
    },

    /**
     * 头像信息 回调
     */
    onUserInfo() {
        G.ViewManager.openTips( G.I18N.get( 27 ) );
    },

    /**
     * 金币回调
     */
    onGold() {
        G.ViewManager.openTips( G.I18N.get( 27 ) );
    },

    /**
     * 钻石 回调
     */
    onJewel() {
        G.ViewManager.openTips( G.I18N.get( 27 ) );
    },

    /**
     * 邮件 回调
     */
    onMain() {
        G.ViewManager.openTips( G.I18N.get( 27 ) );
    },

    /**
     * 设置 回调
     */
    onSetting() {
        G.ViewManager.openTips( G.I18N.get( 27 ) );
    },

    /**
     * 帮助 回调
     */
    onHelp() {
        G.ViewManager.openTips( G.I18N.get( 27 ) );
    },

    /**
     * 商城 回调
     */
    onShop() {
        G.ViewManager.openTips( G.I18N.get( 27 ) );
    },

    /**
     * 货币购 回调
     */
    onMoneyBuy() {
        G.ViewManager.openTips( G.I18N.get( 27 ) );
    },

    /**
     * 背包 回调
     */
    onBag() {
        G.ViewManager.openTips( G.I18N.get( 27 ) );
    },

    /**
     * 活动 回调
     */
    onActivity() {
        G.ViewManager.openTips( G.I18N.get( 27 ) );
    },

    /**
     * 社区 回调
     */
    onCommunity() {
        G.ViewManager.openTips( G.I18N.get( 27 ) );
    },

    /**
     * 好友对战 回调
     */
    onFriendBattle() {
        G.ViewManager.openPrefab( ConfView.Prefab.FriendBattle );
    },

    /**
     * 匹配对战 回调
     */
    onMatchBattle() {
        G.ViewManager.openTips( G.I18N.get( 27 ) );
    },

    /**
     * 创建 成功
     * @param data {object} 数据
     */
    onEventCreateSucceed( data ) {
        if( data.code < 0 ) {
            Log.error( data.code );
            return ;
        }
        let message = Protocol.getC2S( Protocol.Join );
        message.data.roomId = data.roomId;
        G.NetManager.send( message.cmd, message.data );
    },

    /**
     * 加入 成功
     * @param data {object} 数据
     */
    onEventJoinSucceed( data ) {
        let modeId = data.gameInfo.roomInfo.modeId;
        switch( modeId ) {
            case ConfGame.ModeId.Friend:
                G.ViewManager.replaceScene( ConfView.Scene.MahjongFriend );
                break;
            case ConfGame.ModeId.Match:
                G.ViewManager.replaceScene( ConfView.Scene.MahjongMatch );
                break;
        }
    },

    /**
     * 加入 失败
     * @param data {object} 数据
     */
    onEventJoinFailed( data ) {
        G.ViewManager.openTips( ConfCode.WebSocket[data.code.toString()] );
    },

    /**
     * 推送加入事件 回调
     */
    onEventPushJoin( data ) {
        G.ViewManager.closeAllPrefab();

        let ids = {};
        ids[DefView.DialogBoxIDs.IDOK] = function() {
            let message = Protocol.getC2S( Protocol.Join );
            message.data.roomId = data.roomId;
            G.NetManager.send( message.cmd, message.data );
            G.ViewManager.closeDialogBox();
        }.bind( this );
        ids[DefView.DialogBoxIDs.IDCANCEL] = function() {
            G.ViewManager.closeDialogBox();
        }.bind( this );

        G.ViewManager.openDialogBox( G.I18N.get( 36 ), ids );
    },

    /**
     * 事件 回调
     * @param event
     */
    onEvent( event ) {
        switch( event.id ) {
            case ConfEvent.EVENT_CREATE_SUCCEED:
                this.onEventCreateSucceed( event.data );
                break;
            case ConfEvent.EVENT_JOIN_SUCCEED:
                this.onEventJoinSucceed( event.data );
                break;
            case ConfEvent.EVENT_JOIN_FAILED:
                this.onEventJoinFailed( event.data );
                break;
            case ConfEvent.EVENT_PUSH_JOIN:
                this.onEventPushJoin( event.data );
                break;
        }
    },

    // update (dt) {},
});
