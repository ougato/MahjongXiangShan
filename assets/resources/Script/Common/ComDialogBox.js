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
        this.m_strText = text;
        for( let key in ids ) {
            this.buttonCommit[key].node.active = true;
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

    // update (dt) {},
});
