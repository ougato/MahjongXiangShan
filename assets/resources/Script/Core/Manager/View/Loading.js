/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-05
 */

/**
 * 加载菊花类
 */

let DefView = require( "DefView" );
let Utils = require( "Utils" );

// 路径名
const PREFAB_PATH = "Prefab/Common/";
const PREFAB_NAME = "ComLoading";

let Loading = cc.Class({
    /**
     * 构造
     */
    ctor() {
        // 菊花节点
        this.m_nodeLoading = null;
        // 菊花脚本
        this.m_scriptLoading = null;

    },

    /**
     * 加载菊花预制
     * @param callback {function} 加载完成回调
     */
    load( callback )  {
        cc.loader.loadRes( PREFAB_PATH + PREFAB_NAME, function( _, prefab ) {
            this.m_nodeLoading = cc.instantiate( prefab );
            this.m_scriptLoading = this.m_nodeLoading.getComponent( PREFAB_NAME );
            let parentNode = G.ViewManager.getScene().getNode();
            parentNode.addChild( this.m_nodeLoading, DefView.Zorder.TOP );
            if( Utils.isFunction( callback ) ) {
                callback();
            }
        }.bind( this ) );
    },

    /**
     * 销毁
     */
    destroy() {
        this.m_nodeLoading.destroy();
        this.m_nodeLoading = null;
        this.m_scriptLoading = null;
    },

    /**
     * 显示菊花转动
     * @param text 提示文字
     */
    show( text ) {
        this.m_scriptLoading.setText( text );
        this.m_nodeLoading.active = true;
    },

    /**
     * 隐藏菊花转动
     */
    hide() {
        this.m_nodeLoading.active = false;
    },

});

module.exports = Loading;
