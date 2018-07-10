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
     * 初始化数据
     */
    initData() {

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

    },

    /**
     * 刷新数据
     * @param data {object} 用户数据
     * @return {*}
     */
    refresh( data ) {
        if( data.code < 0 ) {
            Log.error( Utils.format( DefLog[14], data.code ) );
            return ;
        }

        this.labelName.string = Utils.isNull( data.name ) ? "?" : data.name;
        this.labelGold.string = Utils.isNull( data.gold ) ? "?" : data.gold;
        this.labelJewel.string = Utils.isNull( data.diamond ) ? "?" : data.diamond;
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

    },

    // update (dt) {},
});
