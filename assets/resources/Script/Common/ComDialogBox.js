/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-05
 */

/**
 * 对话框
 */

let UIBase = require( "UIBase" );
let DefView = require( "DefView" );

cc.Class({
    extends: UIBase,

    properties: {
        nodeRoot: { default: null, type: cc.Node, tooltip: "根节点" },
        spriteDialogBoxFrame: { default: null, type: cc.Sprite, tooltip: "对话框" },
        labelText: { default: null, type: cc.Label, tooltip: "提示文字" },
        buttonCommit: { default: [], type: cc.Button, tooltip: "按钮集" },
    },

    onLoad () {
        this.initData();
        this.initView();
        this.register();
    },

    onEnable() {
        this.labelText.string = this.m_strText;
    },

    onDisable() {
        this.m_strText = "";
        for( let i = 0; i < this.buttonCommit.length; ++i ) {
            this.buttonCommit[i].node.setScale( 1, 1 );
            this.buttonCommit[i].node.active = false;
        }
    },

    start () {

    },

    onDestroy() {
        this.m_strText = "";
    },

    /**
     * 初始化数据
     */
    initData() {
        // 提示文字
        this.m_strText = "";
        // 按钮位置
        this.m_arrButtonPos = this.makeButtonPos();
    },

    /**
     * 初始化视图
     */
    initView() {
        this.nodeRoot.active = false;
        this.labelText.string = this.m_strText;
        for( let i = 0; i < this.buttonCommit.length; ++i ) {
            this.buttonCommit[i].node.active = false;
        }
    },

    /**
     * 注册事件
     */
    register() {

    },

    /**
     * 确定
     */
    onOK() {

    },

    /**
     * 取消
     */
    onCancel() {

    },

    /**
     * 重试
     */
    onRetry() {

    },

    /**
     * 设置视图
     * @param text {string} 提示文字
     * @param ids {object} 数组ID + 回调函数
     */
    setView( text, ids ) {
        let index = 0;
        let length = Object.keys( ids ).length;
        let pos = this.m_arrButtonPos[length-1];
        this.m_strText = text;
        for( let key in ids ) {
            this.buttonCommit[key].node.active = true;
            this.buttonCommit[key].node.setPositionX( pos[index++] );
            switch( parseInt( key ) ) {
                case DefView.DialogBoxIDs.IDOK:
                    this.onOK = ids[key];
                    break;
                case DefView.DialogBoxIDs.IDCANCEL:
                    this.onCancel = ids[key];
                    break;
                case DefView.DialogBoxIDs.IDRETRY:
                    this.onRetry = ids[key];
                    break;
                default:

                    break;
            }
        }
    },

    /**
     * 获取提示文字
     * @returns {string} 提示文字
     */
    getText() {
        return this.m_strText;
    },

    /**
     * 生成按钮集位置
     * @param
     */
    makeButtonPos() {
        let dialogBoxFrameWidth = this.spriteDialogBoxFrame.node.getContentSize().width;
        let dialogBoxFrameAnchorPoint = this.spriteDialogBoxFrame.node.getAnchorPoint();
        let buttonWidth = this.buttonCommit[0].node.getContentSize().width;
        let position = new Array( this.buttonCommit.length );
        for( let i = 0; i < position.length; ++i ) {
            let buttonLength = i + 1;
            let buttonTotalWidth = buttonLength * buttonWidth;
            let differWidth = dialogBoxFrameWidth - buttonTotalWidth;
            let gapWidth = differWidth / (buttonLength + 1);
            position[i] = new Array( i + 1 );
            let originX = -(dialogBoxFrameWidth * dialogBoxFrameAnchorPoint.x);
            for( let j = 0; j <= i; ++j ) {
                position[i][j] = originX + gapWidth + (buttonWidth*0.5);
                originX = position[i][j] + buttonWidth*0.5;
            }
        }
        return position;
    },

    // update (dt) {},
});
