/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 视图预制体
 */

let ViewBase = require( "ViewBase" );
let DefView = require( "DefView" );
let Utils = require( "Utils" );

let ViewPrefab = cc.Class({
    extends: ViewBase,

    /**
     * 构造
     */
    ctor() {
        // 层级
        this.m_nZOrder = DefView.Zorder.UI;

        // 初始化数据
        this.initData( arguments[0], arguments[1], arguments[2] );
        // 初始化视图
        this.initView();
    },

    /**
     * 初始化数据
     * @param path
     * @param data
     * @param zorder {*|number} [] 传入的层级
     */
    initData( path, data, zorder ) {
        if( !Utils.isNull( path ) ) {
            this.m_strPath = path;
        }
        if( !Utils.isNull( data ) ) {
            this.m_objData = data;
        }
        if( !Utils.isNull( zorder ) ) {
            this.m_nZOrder = zorder;
        }
    },

    /**
     * 初始化视图
     */
    initView() {

    },

    /**
     * 加载预制
     */
    load( callback ) {
        cc.loader.loadRes( this.m_strPath, function( _, prefab ) {
            this.m_objNode = cc.instantiate( prefab );
            callback( this.m_objNode );
        }.bind( this ) );
    },

    /**
     * 卸载预制
     */
    unload() {
        cc.loader.releaseRes( this.m_strPath );
    },

    /**
     * 销毁节点
     */
    destroy() {
        this.unload();
        this.m_strPath = null;
        this.m_objData = null;
        this.m_nZOrder = null;
        if( cc.isValid( this.m_objNode ) ) {
            this.m_objNode.destroy();
        }
        this.m_objNode = null;
    },

    /**
     * 设置层级
     * @param zorder {number} 层级
     */
    setZOrder( zorder ) {
        this.m_nZOrder = zorder;
    },

    /**
     * 获取层级
     * @returns {number|*}
     */
    getZOrder(){
        return this.m_nZOrder;
    },

});

module.exports = ViewPrefab;
