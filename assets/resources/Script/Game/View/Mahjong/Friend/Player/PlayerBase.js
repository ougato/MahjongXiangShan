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
let ConfGame = require( "ConfGame" );

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
        this.nodePlayer.active = false;
        this.nodeAvatar.active = false;
        this.nodeCard.active = false;
        this.nodeActionCard.active = false;
        this.nodeStrandCard.active = false;
        this.nodeLieCard.active = false;
        this.nodeProneCard.active = false;
        this.spriteReady.node.active = false;

        this.updatePlayer( this.m_objPlayerData );
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
        this.m_objPlayerData = data;
        this.updatePlayer( data );
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
     * 刷新个人信息
     * @param data {object} 个人信息
     */
    updateUserInfo( data ) {
        if( !Utils.isNull( data ) ) {
            this.nodeAvatar.active = true;
        }

        // 金币
        if( this.labelGold.string !== data.gold ) {
            this.labelGold.string = data.gold;
        }

    },

    /**
     * 刷新麻将信息
     * @param data {array} 麻将信息
     */
    updateCardInfo( data ) {
        if( !Utils.isNull( data ) ) {
            this.nodeCard.active = true;
        }

    },

    /**
     * 刷新状态信息
     * @param data {object} 状态信息
     */
    updateStateInfo( data ) {
        this.spriteReady.node.active = data.isReady;

    },

    /**
     * 刷新玩家
     * @param data {object} 玩家数据
     */
    updatePlayer( data ) {
        if( !Utils.isNull( data ) ) {
            this.updateUserInfo( data.userInfo );
            this.updateCardInfo( data.cardInfo );
            this.updateStateInfo( data.stateInfo );

            this.nodePlayer.active = true;
        }
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
        this.nodeCard.active = false;

        this.nodeActionCard.active = false;
        let actionNodes = this.nodeActionCard.getChildren();
        for( let i = 0; i < actionNodes.length; ++i ) {
            actionNodes[i].active = false;
        }

        this.nodeStrandCard.active = false;
        let strandNodes = this.nodeStrandCard.getChildren();
        for( let i = 0; i < strandNodes.length; ++i ) {
            strandNodes[i].active = false;
        }

        this.nodeLieCard.active = false;
        let lieNodes = this.nodeLieCard.getChildren();
        for( let i = 0; i < lieNodes.length; ++i ) {
            lieNodes[i].active = false;
        }

        this.nodeProneCard.active = false;
        let proneNodes = this.nodeProneCard.getChildren();
        for( let i = 0; i < proneNodes.length; ++i ) {
            proneNodes[i].active = false;
        }
    },

    /**
     * 清理
     */
    clear() {
        this.nodePlayer.active = false;
        this.nodeAvatar.active = false;
        this.nodeCard.active = false;
        this.nodeActionCard.active = false;
        this.nodeStrandCard.active = false;
        this.nodeLieCard.active = false;
        this.nodeProneCard.active = false;
        this.spriteReady.node.active = false;
    },

    // update (dt) {},
});
