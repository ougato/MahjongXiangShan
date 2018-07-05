/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 视图场景
 */

let ViewBase = require( "ViewBase" );
let Utils = require( "Utils" );

let ViewScene = cc.Class({
    extends: ViewBase,

    /**
     * 构造
     */
    ctor() {
        // 场景
        this.m_objScene = null;

        // 初始化数据
        this.initData( arguments[0], arguments[1] );
        // 初始化视图
        this.initView();
    },

    /**
     * 初始化数据
     * @param name
     * @param data
     */
    initData( name, data ) {
        if( !Utils.isNull( name ) ) {
            this.m_strPath = name;
        }
        if( !Utils.isNull( data ) ) {
            this.m_objData = data;
        }
    },

    /**
     * 初始化视图
     */
    initView() {

    },

    /**
     * 销毁场景
     */
    destroy() {
        if( cc.isValid( this.m_objScene ) ) {
            this.m_objScene = null;
        }
    },

    /**
     * 设置场景
     * @param scene
     */
    setScene( scene ) {
        this.m_objScene = scene;
    },

    /**
     * 获取场景
     * @returns {null|*}
     */
    getScene() {
        return this.m_objScene;
    },

});

module.exports = ViewScene;
