/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 节点
 */

let Node = cc.Class({
    /**
     * 构造
     */
    ctor() {
        // 数据
        this.m_objData = null;
        // 上节点
        this.m_objPrev = null;
        // 下节点
        this.m_objNext = null;
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
     * @returns {null}
     */
    getData() {
        return this.m_objData;
    },

    /**
     * 设置上一个节点
     * @param node
     */
    setPrev( node ) {
        this.m_objPrev = node;
    },

    /**
     * 获取上一个节点
     * @returns {null}
     */
    getPrev() {
        return this.m_objPrev;
    },

    /**
     * 设置下一个节点
     * @param node
     */
    setNext( node ) {
        this.m_objNext = node
    },

    /**
     * 获取下一个节点
     * @returns {null}
     */
    getNext() {
        return this.m_objNext;
    },

    /**
     * 销毁节点
     */
    destroy() {
        this.m_objData = null;
        this.m_objNext = null;
        this.m_objPrev = null;
    },

});

module.exports = Node;