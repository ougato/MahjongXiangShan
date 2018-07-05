/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-05
 */

/**
 * 漂浮提示加载
 */

let UIBase = require( "UIBase" );
let Utils = require( "Utils" );

// 起始位置
const ORIGIN_POS = cc.p( 0, 0 );
// 目标位置
const TARGET_POS = cc.p( 0, 200 );
// 移动时间（s）
const MOVE_SEC = 0.5;
// 停留时间
const DELAY_SEC = 1;
// 渐隐时间（s）
const FADE_OUT_SEC = 1;
// 描边大小
const CONTOUR = 20;

cc.Class({
    extends: UIBase,

    properties: {
        nodeRoot: { default: null, type: cc.Node, tooltip: "根节点" },
        spriteBG: { default: null, type: cc.Sprite, tooltip: "背景图片" },
        labelText: { default: null, type: cc.Label, tooltip: "提示文字" },
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
        if( !Utils.isNull( this.m_objAction ) ) {
            this.nodeRoot.stopAction( this.m_objAction );
            this.m_objAction = null;
        }
        this.m_strText = "";
    },

    /**
     * 初始化数据
     */
    initData() {
        // 提示文字
        this.m_strText = "";
        // 转动漂浮提示 动作对象
        this.m_objAction = null;
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
     * 设置提示文字
     * @param text {string} 提示文字
     */
    setText( text ) {
        if( Utils.isNull( text ) ) {
            text = "";
        }
        this.m_strText = text;
        this.labelText.string = text;
    },

    /**
     * 获取提示文字
     * @returns {string} 提示文字
     */
    getText() {
        return this.m_strText;
    },

    /**
     * 运动漂浮提示
     */
    runTips() {
        this.stopTips();

        let labelSize = this.labelText.node.getContentSize();
        this.nodeRoot.height = labelSize.height + CONTOUR;
        this.spriteBG.node.height = labelSize.height + CONTOUR;
        this.nodeRoot.active = true;

        let moveTo = cc.moveTo( MOVE_SEC, TARGET_POS );
        let delayTime = cc.delayTime( DELAY_SEC );
        let fadeOut = cc.fadeOut( FADE_OUT_SEC );

        let sequence = cc.sequence( moveTo, delayTime, fadeOut );
        this.m_objAction = this.nodeRoot.runAction( sequence );
    },

    /**
     * 停止漂浮提示
     */
    stopTips() {
        if( !Utils.isNull( this.m_objAction ) ) {
            this.nodeRoot.active = false;
            this.nodeRoot.stopAction( this.m_objAction );
            this.m_objAction = null;
            this.nodeRoot.setPosition( ORIGIN_POS );
            this.nodeRoot.opacity = 255;
        }
    },

    // update (dt) {},
});
