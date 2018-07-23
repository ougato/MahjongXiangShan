/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-07
 */

/**
 * 玩家 基类
 */

let UIBase = require( "UIBase" );

cc.Class({
    extends: UIBase,

    properties: {
        labelGold: { default: null, type: cc.Label, tooltip: "金币" },
        spriteAvatar: { default: null, type: cc.Sprite, tooltip: "头像" },

    },

    /**
     * 加载
     */
    onLoad () {

    },

    /**
     * 清理
     */
    clear() {

    },

    // update (dt) {},
});
