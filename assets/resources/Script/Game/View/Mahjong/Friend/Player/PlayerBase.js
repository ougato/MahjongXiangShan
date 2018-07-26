/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-07
 */

/**
 * 玩家 基类
 */

let UIBase = require( "UIBase" );
let ConfData = require( "ConfData" );
let Utils = require( "Utils" );

cc.Class({
    extends: UIBase,

    properties: {
        nodePlayer: { default: null, type: cc.Node, tooltip: "玩家节点" },
        nodeAvatar: { default: null, type: cc.Node, tooltip: "头像节点" },
        nodeCard: { default: null, type: cc.Node, tooltip: "牌节点" },
        labelGold: { default: null, type: cc.Label, tooltip: "金币" },
        spriteAvatar: { default: null, type: cc.Sprite, tooltip: "头像" },
        nodeActionCard: { default: null, type: cc.Node, tooltip: "操作动作牌节点" },
        nodeStrandCard: { default: null, type: cc.Node, tooltip: "站立牌节点" },
        nodeLieCard: { default: null, type: cc.Node, tooltip: "躺牌节点" },
        nodeProneCard: { default: null, type: cc.Node, tooltip: "卧牌节点" },
        spriteReady: { default: null, type: cc.Sprite, tooltip: "准备" },
    },

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

    },

    /**
     * 初始化数据
     */
    initData() {
        // 玩家信息
        this.m_objPlayerData = G.DataManager.getData( ConfData.PlayerData ).getPlayerData( this.m_nSeat );
    },

    /**
     * 初始化视图
     */
    initView() {
        this.clear();
        if( !Utils.isNull( this.m_objPlayerData ) ) {
            this.initAvatar();
            this.initCard();
        }

        this.spriteReady.node.active = false;
    },

    /**
     * 注册
     */
    register() {

    },

    /**
     * 加入游戏
     * @param data {object} 数据
     */
    join( data ) {
        this.labelGold.string = data.userInfo.gold;
        // TODO: 头像加载未设置
        // this.spriteAvatar

        this.nodeCard.active = true;
        this.nodeAvatar.active = true;
        this.nodePlayer.active = true;
    },

    /**
     * 退出游戏
     */
    exit() {
        this.clear();
    },

    /**
     * 准备
     */
    ready() {
        this.spriteReady.node.active = true;
    },

    /**
     * 初始化头像
     */
    initAvatar() {
        this.labelGold.string = this.m_objPlayerData.userInfo.gold;

        this.nodeAvatar.active = true;
    },

    /**
     * 清理头像
     */
    clearAvatar() {
        this.nodeAvatar.active = false;
    },

    /**
     * 清理牌
     */
    clearCard() {
        this.nodeActionCard.active = false;
        this.nodeStrandCard.active = false;
        this.nodeLieCard.active = false;
        this.nodeProneCard.active = false;
    },

    /**
     * 清理
     */
    clear() {
        this.clearAvatar();
        this.clearCard();
    },

    // update (dt) {},
});
