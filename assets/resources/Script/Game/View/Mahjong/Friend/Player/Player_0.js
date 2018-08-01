/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-07
 */

/**
 * 玩家 下
 */

let PlayerViewBase = require( "PlayerViewBase" );

cc.Class({
    extends: PlayerViewBase,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
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

        // 调用父类方法
        this._super();
    },

    /**
     * 更新手牌
     * @param card {array} 牌数据
     */
    updateShou( card ) {
        for( let i = 0; i < card.length; ++i ) {
            let vaule = card[( card.length - 1 ) - i];
            let dig_1 = Math.floor( vaule % 10 );
            let dig_2 = Math.floor( vaule / 10 % 10 );

            let cardNode = this.nodeStrandCard.getChildByName( "Card_" + ( this.m_nMaxShouPaiNum - i ) );
            let cardValue = cardNode.getChildByName( "Value" );
            cc.loader.loadRes("Atlas/Game/Mahjong/Sprite_Card_" + dig_2 + "_" + dig_1, cc.SpriteFrame, function (err, spriteFrame) {
                let sprite = cardValue.getComponent( cc.Sprite );
                sprite.spriteFrame = spriteFrame;
                cardNode.active = true;
            });
        }
    },

    // update (dt) {},
});
