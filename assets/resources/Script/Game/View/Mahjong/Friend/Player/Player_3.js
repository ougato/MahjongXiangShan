/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-07
 */

/**
 * 玩家 左
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
        this.m_nSeat = 3;
        
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

    // update (dt) {},
});
