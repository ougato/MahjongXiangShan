/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-06
 */

/**
 * 对话框
 */

let DefView = require( "DefView" );
let Utils = require( "Utils" );

// 路径名
const PREFAB_PATH = "Prefab/Common/";
const PREFAB_NAME = "ComDialogBox";

let Tips = cc.Class({
    /**
     * 构造
     */
    ctor() {
        // 对话框节点
        this.m_nodeDialogBox = null;
        // 对话框脚本
        this.m_scriptDialogBox = null;

    },

    /**
     * 加载漂浮提示预制
     * @param callback {function} 加载完成回调
     */
    load( callback ) {
        cc.loader.loadRes( PREFAB_PATH + PREFAB_NAME, function( _, prefab ) {
            this.m_nodeDialogBox = cc.instantiate( prefab );
            this.m_scriptDialogBox = this.m_nodeDialogBox.getComponent( PREFAB_NAME );
            let parentNode = G.ViewManager.getScene().getNode();
            parentNode.addChild( this.m_nodeDialogBox, DefView.Zorder.POPUP );
            if( Utils.isFunction( callback ) ) {
                callback();
            }
        }.bind( this ) );
    },

    /**
     * 销毁
     */
    destroy() {
        this.m_nodeDialogBox.destroy();
        this.m_nodeDialogBox = null;
        this.m_scriptDialogBox = null;
    },

    /**
     * 显示对话框
     * @param text {string} 提示文字
     * @param ids {object} 数组ID + 回调函数
     */
    show( text, ids ) {
        this.m_scriptDialogBox.setView( text, ids );
        this.m_nodeDialogBox.active = true;
    },

    /**
     * 隐藏对话框
     */
    hide() {
        this.m_nodeDialogBox.active = false;
    },
});

module.exports = Tips;