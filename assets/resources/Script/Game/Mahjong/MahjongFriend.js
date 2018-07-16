/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-07
 */

/**
 * 麻将 朋友场
 */

let UIBase = require( "UIBase" );

cc.Class({
    extends: UIBase,

    properties: {
        labelTime: { default: null, type: cc.Label, tooltip: "时间" },
        nodeWiFi: { default: null, type: cc.Node, tooltip: "网络" },
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

    // update (dt) {},
});
