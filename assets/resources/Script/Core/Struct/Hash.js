/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 哈希结构
 */

let Hash = cc.Class({
    /**
     * 构造
     */
    ctor() {
        // 键
        this.m_key = null;
        // 值
        this.m_value = null;
    },

    /**
     * 销毁
     */
    destroy() {
        this.m_key = null;
        this.m_value = null;
    },

    /**
     * 获取 键
     * @returns {*}
     */
    getKey() {
        return this.m_key;
    },

    /**
     * 获取 值
     */
    getValue() {
        return this.m_value;
    },

    /**
     * 设置
     * @param key {*} 键
     * @param value {*} 值
     */
    set( key, value ) {
        this.m_key = key;
        this.m_value = value;
    },

    /**
     * 获取值
     * @param key {*} 键
     * @returns value {*} 值
     */
    get( key ) {
        if( key === this.m_key ) {
            return value;
        }
    },

    /**
     * 清空
     */
    clear() {
        this.m_key = null;
        this.m_value = null;
    },

});

module.exports = Hash;