/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-05
 */

/**
 * 漂浮提示
 */

let DefView = require( "DefView" );
let Utils = require( "Utils" );

// 路径名
const PREFAB_PATH = "Prefab/Common/";
const PREFAB_NAME = "ComTips";

let Tips = cc.Class({
    /**
     * 构造
     */
    ctor() {
        // 漂浮提示节点
        this.m_nodeTips = null;
        // 漂浮提示脚本
        this.m_scriptTips = null;

    },

    /**
     * 加载漂浮提示预制
     * @param callback {function} 加载完成回调
     */
    load( callback ) {
        cc.loader.loadRes( PREFAB_PATH + PREFAB_NAME, function( _, prefab ) {
            this.m_nodeTips = cc.instantiate( prefab );
            this.m_scriptTips = this.m_nodeTips.getComponent( PREFAB_NAME );
            let parentNode = G.ViewManager.getScene().getNode();
            parentNode.addChild( this.m_nodeTips, DefView.Zorder.SYSTEM );
            if( Utils.isFunction( callback ) ) {
                callback();
            }
        }.bind( this ) );
    },

    /**
     * 销毁
     */
    destroy() {
        this.m_nodeTips.destroy();
        this.m_nodeTips = null;
        this.m_scriptTips = null;
    },

    /**
     * 显示漂浮提示转动
     * @param text 提示文字
     */
    show( text ) {
        this.m_scriptTips.setText( text );
        this.m_scriptTips.runTips();
    },
});

module.exports = Tips;