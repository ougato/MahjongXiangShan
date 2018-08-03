/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-07
 */

/**
 * 玩家 下
 */

let PlayerBase = require( "PlayerBase" );
let ConfData = require( "ConfData" );
let ConfGame = require( "ConfGame" );
let Utils = require( "Utils" );

cc.Class({
    extends: PlayerBase,

    properties: {
        nodeTouchCard: { default: null, type: cc.Node, tooltip: "牌触摸" },
    },

    /**
     * 初始化数据
     */
    initData() {
        // 客户端座位号
        this.m_nSeat = 0;

        // 调用父类方法
        this._super();
    },

    /**
     * 初始化视图
     */
    initView() {

        // 调用父类方法
        this._super();
    },

    /**
     * 注册
     */
    register() {
        this.nodeTouchCard.on( cc.Node.EventType.TOUCH_START, this.onTouchStart.bind( this ) );
        this.nodeTouchCard.on( cc.Node.EventType.TOUCH_MOVE, this.onTouchMove.bind( this ) );
        this.nodeTouchCard.on( cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind( this ) );
        this.nodeTouchCard.on( cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel.bind( this ) );

        // 调用父类方法
        this._super();
    },

    /**
     * 触摸开始
     * @param event {object} 事件
     */
    onTouchStart( event ) {

    },

    /**
     * 触摸移动
     * @param event {object} 事件
     */
    onTouchMove( event ) {

    },

    /**
     * 触摸结束
     * @param event {object} 事件
     */
    onTouchEnd( event ) {

    },

    /**
     * 触摸取消
     * @param event {object} 事件
     */
    onTouchCancel( event ) {

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
            let vaule = cards[( cards.length - 1 ) - i];
            let dig_1 = Math.floor( vaule % 10 );
            let dig_2 = Math.floor( vaule / 10 % 10 );

            let cardNode = null;
            if( roomState === ConfGame.RoomState.Playing ) {
                cardNode = this.nodeStrandCard.getChildByName( "Card_" + ( ( this.m_nMaxShouPaiNum - 1 ) - i ) );
            } else if( roomState === ConfGame.RoomState.Closing || roomState === ConfGame.RoomState.TotalClosing ) {
                cardNode = this.nodeLieCard.getChildByName( "Card_" + ( ( this.m_nMaxShouPaiNum - 1 ) - i ) );
            }
            let cardValue = cardNode.getChildByName( "Value" );
            cc.loader.loadRes( "Atlas/Game/Mahjong/Sprite_Card_" + dig_2 + "_" + dig_1, cc.SpriteFrame, function (err, spriteFrame) {
                let sprite = cardValue.getComponent( cc.Sprite );
                sprite.spriteFrame = spriteFrame;
                cardNode.active = true;
            } );
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
     * 更新摸牌
     * @param card {number} 摸牌
     */
    updateMoPai( card ) {
        let roomState = G.DataManager.getData( ConfData.RoomData ).getState();
        if( roomState === ConfGame.RoomState.NotStarted ) {
            return;
        }

        let dig_1 = Math.floor( card % 10 );
        let dig_2 = Math.floor( card / 10 % 10 );

        let cardNode = null;
        if( roomState === ConfGame.RoomState.Playing ) {
            cardNode = this.nodeStrandCard.getChildByName( "Card_" + this.m_nMaxShouPaiNum );
        } else if( roomState === ConfGame.RoomState.Closing || roomState === ConfGame.RoomState.TotalClosing ) {
            cardNode = this.nodeLieCard.getChildByName( "Card_" + this.m_nMaxShouPaiNum );
        }

        let cardValue = cardNode.getChildByName( "Value" );
        cc.loader.loadRes("Atlas/Game/Mahjong/Sprite_Card_" + dig_2 + "_" + dig_1, cc.SpriteFrame, function (err, spriteFrame) {
            let sprite = cardValue.getComponent( cc.Sprite );
            sprite.spriteFrame = spriteFrame;
            cardNode.active = true;
        });
    },

    // update (dt) {},
});
