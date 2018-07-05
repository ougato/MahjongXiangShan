/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 视图基类
 */

let Utils = require( "Utils" );

let ViewBase = cc.Class({

    /**
     * 构造
     */
    ctor() {
        // 路径
        this.m_strPath = "";
        // 数据
        this.m_objData = null;
        // 根节点
        this.m_objNode = null;

    },

    /**
     * 更新视图
     */
    refresh() {
        let script = this.m_objNode.getComponent( this.getName() );
        if( !Utils.isNull( script ) && !Utils.isNull( script.refresh ) ) {
            script.refresh( this.m_objData );
        }
    },

    /**
     * 销毁视图
     */
    destroy() {

    },

    /**
     * 隐藏
     */
    hide() {
        let node = this.getNode();
        if( node.active ) {
            node.active = false;
        }
    },

    /**
     * 显示
     */
    show() {
        let node = this.getNode();
        if( !node.active ) {
            node.active = true;
        }
    },

    /**
     * 设置路径
     * @param path
     */
    setPath( path ) {
        this.m_strPath = path;
    },

    /**
     * 获取路径
     * @returns {string|*}
     */
    getPath(){
        return this.m_strPath;
    },

    /**
     * 设置数据
     * @param data
     */
    setData( data ) {
        this.m_objData = data;
    },

    /**
     * 获取数据
     * @returns {object|*}
     */
    getData(){
        return this.m_objData;
    },

    /**
     * 设置节点
     * @param node
     */
    setNode( node ) {
        this.m_objNode = node;
    },

    /**
     * 获取节点
     * @returns {object|*}
     */
    getNode(){
        return this.m_objNode;
    },

    /**
     * 获取视图名
     */
    getName() {
        let name = "";
        let lastOffset = this.m_strPath.lastIndexOf( "/" );
        name = this.m_strPath.substr( lastOffset + 1, this.m_strPath.length );
        return name;
    },

});

module.exports = ViewBase;