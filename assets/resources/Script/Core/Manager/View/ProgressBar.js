/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-06
 */

/**
 * 进度条
 */

let DefView = require( "DefView" );
let Utils = require( "Utils" );

// 路径名
const PREFAB_PATH = "Prefab/Common/";
const PREFAB_NAME = "ComProgressBar";

let ProgressBar = cc.Class({
    /**
     * 构造
     */
    ctor() {
        // 进度条节点
        this.m_nodeProgressBar = null;
        // 进度条脚本
        this.m_scriptProgressBar = null;

    },

    /**
     * 加载进度条预制
     * @param callback {function} 加载完成回调
     */
    load( callback ) {
        cc.loader.loadRes( PREFAB_PATH + PREFAB_NAME, function( _, prefab ) {
            this.m_nodeProgressBar = cc.instantiate( prefab );
            this.m_scriptProgressBar = this.m_nodeProgressBar.getComponent( PREFAB_NAME );
            let parentNode = G.ViewManager.getScene().getNode();
            parentNode.addChild( this.m_nodeProgressBar, DefView.Zorder.TOP );
            if( Utils.isFunction( callback ) ) {
                callback();
            }
        }.bind( this ) );
    },

    /**
     * 销毁
     */
    destroy() {
        this.m_nodeProgressBar.destroy();
        this.m_nodeProgressBar = null;
        this.m_scriptProgressBar = null;
    },

    /**
     * 显示进度条
     * @param percent {string} 百分比
     */
    show( percent ) {
        this.m_scriptProgressBar.setPercent( percent );
        if( !this.m_nodeProgressBar.active ) {
            this.m_nodeProgressBar.active = true;
        }
    },

    /**
     * 隐藏进度条
     */
    hide() {
        this.m_nodeProgressBar.active = false;
    },
});

module.exports = ProgressBar;