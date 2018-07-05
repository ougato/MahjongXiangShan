/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-05
 */

/**
 * 进度条
 */

let UIBase = require( "UIBase" );

cc.Class({
    extends: UIBase,

    properties: {
        nodeRoot: { default: null, type: cc.Node, tooltip: "根节点" },
        spritePercent: { default: null, type: cc.Sprite, tooltip: "进度条" },
        labelPercent: { default: null, type: cc.Label, tooltip: "提示文字" },
    },

    onLoad () {
        this.initData();
        this.initView();
        this.register();
    },

    onEnable() {

    },

    onDisable() {

    },

    start () {

    },

    onDestroy() {

    },

    /**
     * 初始化数据
     */
    initData() {
        // 百分比
        this.m_nPercent = 0;
    },

    /**
     * 初始化视图
     */
    initView() {
        this.nodeRoot.active = false;
    },

    /**
     * 注册事件
     */
    register() {

    },

    /**
     * 设置百分比
     * @param percent {number} 百分比
     */
    setPercent( percent ) {
        if( percent >= 0 && percent <= 100 ) {
            this.m_nPercent = percent;
        } else {
            percent = 0;
        }
        this.labelPercent.string = percent;
        this.spritePercent.fillRange = -(percent * 0.01);
    },

    /**
     * 获取百分比
     * @return {number} 百分比
     */
    getPercent() {
        return this.m_nPercent;
    },

    // update (dt) {},
});
