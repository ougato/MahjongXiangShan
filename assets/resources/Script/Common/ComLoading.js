/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-05
 */

/**
 * 菊花加载
 */

let UIBase = require( "UIBase" );
let Utils = require( "Utils" );

// 旋转360°需要秒数
const ROTATE_SEC = 1;

cc.Class({
    extends: UIBase,

    properties: {
        nodeRoot: { default: null, type: cc.Node, tooltip: "根节点" },
        spriteBG: { default: null, type: cc.Sprite, tooltip: "背景图片" },
        labelText: { default: null, type: cc.Label, tooltip: "提示文字" },
        spriteLoading: { default: null, type: cc.Sprite, tooltip: "转圈菊花" },
    },

    onLoad () {
        this.initData();
        this.initView();
        this.register();
    },

    onEnable() {
        this.runLoading();
    },

    onDisable() {
        this.stopLoading();
    },

    start () {

    },

    onDestroy() {
        if( !Utils.isNull( this.m_objAction ) ) {
            this.spriteLoading.node.stopAction( this.m_objAction );
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
        // 转动菊花 动作对象
        this.m_objAction = null;
    },

    /**
     * 初始化视图
     */
    initView() {
        this.nodeRoot.active = false;

        let parentNode = this.nodeRoot.getParent();
        let parentSize = parentNode.getContentSize();
        this.nodeRoot.setContentSize( parentSize );
        this.spriteBG.node.setContentSize( parentSize );
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
     * 转动菊花
     */
    runLoading() {
        if( Utils.isNull( this.m_objAction ) ) {
            let rotateTo = cc.rotateBy( ROTATE_SEC, 360 );
            let repeatForever = cc.repeatForever( rotateTo );
            this.m_objAction = this.spriteLoading.node.runAction( repeatForever );
        }
    },

    /**
     * 停止菊花
     */
    stopLoading() {
        if( !Utils.isNull( this.m_objAction ) ) {
            this.spriteLoading.node.stopAction( this.m_objAction );
            this.m_objAction = null;
        }
        this.setText( "" );
    },

    // update (dt) {},
});
