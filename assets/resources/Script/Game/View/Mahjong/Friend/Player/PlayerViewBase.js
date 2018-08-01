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
let Log = require( "Log" );
let DefLog = require( "DefLog" );

cc.Class({
    extends: UIBase,

    properties: {
        nodePlayer: { default: null, type: cc.Node, tooltip: "玩家节点" },
        nodeAvatar: { default: null, type: cc.Node, tooltip: "头像节点" },
        nodeCard: { default: null, type: cc.Node, tooltip: "牌节点" },
        labelGold: { default: null, type: cc.Label, tooltip: "金币" },
        spriteAvatar: { default: null, type: cc.Sprite, tooltip: "头像" },
        nodeActionCard: { default: null, type: cc.Node, tooltip: "吃碰杠牌节点" },
        nodeStrandCard: { default: null, type: cc.Node, tooltip: "站立牌节点" },
        nodeLieCard: { default: null, type: cc.Node, tooltip: "躺牌节点" },
        nodeProneCard: { default: null, type: cc.Node, tooltip: "卧牌节点" },
        nodeDisCard: { default: null, type: cc.Node, tooltip: "打出牌节点" },
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
        // 最大手牌数
        this.m_nMaxShouPaiNum = 13;
    },

    /**
     * 初始化视图
     */
    initView() {
        this.updatePlayer( this.m_objPlayerData );
    },

    /**
     * 初始化麻将
     */
    initCard() {
        this.nodeActionCard.active = true;
        let actionNodes = this.nodeActionCard.getChildren();
        for( let i = 0; i < actionNodes.length; ++i ) {
            actionNodes[i].active = false;
        }

        this.nodeStrandCard.active = true;
        let strandNodes = this.nodeStrandCard.getChildren();
        for( let i = 0; i < strandNodes.length; ++i ) {
            strandNodes[i].active = false;
        }

        this.nodeLieCard.active = true;
        let lieNodes = this.nodeLieCard.getChildren();
        for( let i = 0; i < lieNodes.length; ++i ) {
            lieNodes[i].active = false;
        }

        this.nodeProneCard.active = true;
        let proneNodes = this.nodeProneCard.getChildren();
        for( let i = 0; i < proneNodes.length; ++i ) {
            proneNodes[i].active = false;
        }

        this.nodeDisCard.active = true;
        let discardNodes = this.nodeDisCard.getChildren();
        for( let i = 0; i < discardNodes.length; ++i ) {
            discardNodes[i].active = false;
        }
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
            this.nodePlayer.active = true;
            this.nodeAvatar.active = true;
        }

        // 金币
        if( this.labelGold.string !== data.gold ) {
            this.labelGold.string = data.gold;
        }

    },

    /**
     * 更新手牌
     * @param card {array} 牌数据
     */
    updateShou( card ) {
        for( let i = 0; i < card.length; ++i ) {
            let cardNode = this.nodeStrandCard.getChildByName( "Card_" + ( this.m_nMaxShouPaiNum - i ) );
            cardNode.active = true;
        }
    },

    /**
     * 更新出牌
     * @param card {array} 牌数据
     */
    updateChu( card ) {
        for( let i = 0; i < card.length; ++i ) {
            let vaule = card[i];
            let dig_1 = Math.floor( vaule % 10 );
            let dig_2 = Math.floor( vaule / 10 % 10 );

            let cardNode = this.nodeDisCard.getChildByName( "Card_" + i );
            let cardValue = cardNode.getChildByName( "Value" );
            cc.loader.loadRes("Atlas/Game/Mahjong/Sprite_Card_" + dig_2 + "_" + dig_1, cc.SpriteFrame, function (err, spriteFrame) {
                let sprite= cardValue.getComponent( cc.Sprite );
                sprite.spriteFrame = spriteFrame;
                cardNode.active = true;
            });
        }
    },

    /**
     * 更新吃牌
     * @param card {array} 牌数据
     */
    updateChi( card ) {

    },

    /**
     * 更新碰牌
     * @param card {array} 牌数据
     */
    updatePeng( card ) {

    },

    /**
     * 更新明杠
     * @param card {array} 牌数据
     */
    updateMingGang( card ) {

    },

    /**
     * 更新暗杠
     * @param card {array} 牌数据
     */
    updateAnGang( card ) {

    },

    /**
     * 更新巴杠
     * @param card {array} 牌数据
     */
    updateBaGang( card ) {

    },

    /**
     * 更新抢杠
     * @param card {array} 牌数据
     */
    updateQiangGang( card ) {

    },

    /**
     * 更新摸牌
     * @param card {array} 牌数据
     */
    updateMo( card ) {

    },

    /**
     * 更新自摸
     * @param card {array} 牌数据
     */
    updateZiMo( card ) {

    },

    /**
     * 更新点炮
     * @param card {array} 牌数据
     */
    updateDianPao( card ) {

    },

    /**
     * 刷新麻将信息
     * @param data {array} 麻将信息
     * @return {*}
     */
    updateCardInfo( data ) {
        if( !Utils.isArray( data ) ) {
            return;
        }
        for( let i = 0; i < data.length; ++i ) {
            let card = data[i].card;
            switch( data[i].type ) {
                // 手牌
                case 0:
                    this.updateShou( card );
                    break;
                // 出牌
                case 1:
                    this.updateChu( card );
                    break;
                // 吃牌
                    this.updateChi( card );
                    break;
                // 碰牌
                    this.updatePeng( card );
                    break;
                // 明杠
                    this.updateMingGang( card );
                    break;
                // 暗杠
                    this.updateAnGang( card );
                    break;
                // 巴杠
                    this.updateBaGang( card );
                    break;
                // 抢杠
                    this.updateQiangGang( card );
                    break;
                // 摸牌
                    this.updateMo( card );
                    break;
                // 自摸
                    this.updateZiMo( card );
                    break;
                // 点炮
                    this.updateDianPao( card );
                    break;
                // 未知牌型
                default:
                    Log.warn( Utils.format( DefLog[18], data[i].type ) );
                    break;
            }
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
            this.initCard();
            this.updateUserInfo( data.userInfo );
            this.updateCardInfo( data.cardInfo );
            this.updateStateInfo( data.stateInfo );
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
        this.nodeDisCard.active = false;
        this.spriteReady.node.active = false;
    },

    // update (dt) {},
});
