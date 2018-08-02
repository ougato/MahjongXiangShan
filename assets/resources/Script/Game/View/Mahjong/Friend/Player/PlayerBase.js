/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-07
 */

/**
 * 玩家 基类
 */

let UIBase = require( "UIBase" );
let Utils = require( "Utils" );
let ConfData = require( "ConfData" );
let ConfGame = require( "ConfGame" );

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
        // 最大手牌数
        this.m_nMaxShouPaiNum = G.DataManager.getData( ConfData.PlayerData ).getMaxShouPaiNum();
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
        this.nodeDisCard.active = false;
        this.spriteReady.node.active = false;

        this.updatePlayer();
    },

    initAvatar() {
        this.nodePlayer.active = true;
        this.nodeAvatar.active = true;
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
        this.updatePlayer();
    },

    /**
     * 退出游戏
     */
    exit() {
        this.clear();
    },

    /**
     * 准备
     * @param isReady {boolean} 是否准备
     */
    ready( isReady ) {
        this.spriteReady.node.active = isReady;
    },

    /**
     * 发牌
     * @param cards {array} 手牌数据
     */
    deal( cards ) {
        this.updateShouPai( cards );
    },

    /**
     * 更新手牌
     * @param cards {array} 手牌
     */
    updateShouPai( cards ) {
        let roomState = G.DataManager.getData( ConfData.RoomData ).getState();
        if( roomState === ConfGame.RoomState.NotStarted ) {
            return;
        }

        for( let i = 0; i < cards.length; ++i ) {
            let cardNode = null;
            if( roomState === ConfGame.RoomState.Playing ) {
                cardNode = this.nodeStrandCard.getChildByName( "Card_" + ( ( this.m_nMaxShouPaiNum - 1 ) - i ) );
                cardNode.active = true;
            } else if( roomState === ConfGame.RoomState.Closing || roomState === ConfGame.RoomState.TotalClosing ) {
                let vaule = cards[( cards.length - 1 ) - i];
                let dig_1 = Math.floor( vaule % 10 );
                let dig_2 = Math.floor( vaule / 10 % 10 );

                cardNode = this.nodeLieCard.getChildByName( "Card_" + ( ( this.m_nMaxShouPaiNum - 1 ) - i ) );
                let cardValue = cardNode.getChildByName( "Value" );
                cc.loader.loadRes("Atlas/Game/Mahjong/Sprite_Card_" + dig_2 + "_" + dig_1, cc.SpriteFrame, function (err, spriteFrame) {
                    let sprite = cardValue.getComponent( cc.Sprite );
                    sprite.spriteFrame = spriteFrame;
                    cardNode.active = true;
                });
            }
        }
    },

    /**
     * 更新摆牌
     * @param cards {array} 摆牌
     */
    updateBaiPai( cards ) {
        let roomState = G.DataManager.getData( ConfData.RoomData ).getState();
        if( roomState === ConfGame.RoomState.NotStarted ) {
            return;
        }

    },

    /**
     * 更新出牌
     * @param cards {array} 出牌
     */
    updateChuPai( cards ) {
        let roomState = G.DataManager.getData( ConfData.RoomData ).getState();
        if( roomState === ConfGame.RoomState.NotStarted ) {
            return;
        }

        for( let i = 0; i < cards.length; ++i ) {
            let vaule = cards[i];
            let dig_1 = Math.floor( vaule % 10 );
            let dig_2 = Math.floor( vaule / 10 % 10 );

            let cardNode = this.nodeDisCard.getChildByName( "Card_" + i );
            let cardValue = cardNode.getChildByName( "Value" );
            cc.loader.loadRes("Atlas/Game/Mahjong/Sprite_Card_" + dig_2 + "_" + dig_1, cc.SpriteFrame, function (err, spriteFrame) {
                let sprite = cardValue.getComponent( cc.Sprite );
                sprite.spriteFrame = spriteFrame;
                cardNode.active = true;
            });
        }
    },

    /**
     * 更新摸牌
     * @param card {number} 摸牌
     */
    updateMoPai( card ) {
        let roomState = G.DataManager.getData( ConfData.RoomData ).getState();
        if( roomState === ConfGame.RoomState.NotStarted ) {
            return;
        }

        let cardNode = null;
        if( roomState === ConfGame.RoomState.Playing ) {
            cardNode = this.nodeStrandCard.getChildByName( "Card_" + this.m_nMaxShouPaiNum );
            cardNode.active = true
        } else if( roomState === ConfGame.RoomState.Closing || roomState === ConfGame.RoomState.TotalClosing ) {
            let dig_1 = Math.floor( card % 10 );
            let dig_2 = Math.floor( card / 10 % 10 );

            cardNode = this.nodeLieCard.getChildByName( "Card_" + this.m_nMaxShouPaiNum );
            let cardValue = cardNode.getChildByName( "Value" );
            cc.loader.loadRes("Atlas/Game/Mahjong/Sprite_Card_" + dig_2 + "_" + dig_1, cc.SpriteFrame, function (err, spriteFrame) {
                let sprite = cardValue.getComponent( cc.Sprite );
                sprite.spriteFrame = spriteFrame;
                cardNode.active = true;
            });
        }

    },

    /**
     * 刷新玩家
     */
    updatePlayer() {
        let data = G.DataManager.getData( ConfData.PlayerData ).getData( this.m_nSeat );
        if( !Utils.isNull( data ) ) {
            this.initAvatar();
            this.initCard();

            this.labelGold.string = data.gold;
            this.spriteReady.node.active = data.isReady;
            this.updateShouPai( data.shouPai );
            this.updateBaiPai( data.baiPai );
            this.updateChuPai( data.chuPai );
            this.updateMoPai( data.moPai );
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
