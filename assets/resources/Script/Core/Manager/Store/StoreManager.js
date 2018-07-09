/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 存储管理器
 */

let Utils = require( "Utils" );

// 实例化对象
let instance = null;

let StoreManager = cc.Class({

    /**
     * 静态
     */
    statics: {
        /**
         * 获取实例
         * @returns {Function}
         */
        getInstance() {
            if( Utils.isNull( instance ) ) {
                instance = new StoreManager();
            }
            return instance;
        },

        /**
         * 销毁实例
         */
        destroy() {
            if( !Utils.isNull( instance ) ) {
                instance.destroy();
            }
        },

    },

    /**
     * 构造
     */
    ctor() {
        // 缓存存储结构
        this.m_mapStore = new Map();
    },

    /**
     * 销毁
     */
    destroy() {
        if( Utils.isNull( this.m_mapStore ) ) {
            this.m_mapStore.clear();
            this.m_mapStore = null;
        }
    },

    /**
     * 删除存储数据 通过key
     * @param key
     */
    del( key ) {
        cc.sys.localStorage.removeItem( key );
    },

    /**
     * 清理存储数据（注意：平时很少使用clear，会引起之前存储的所有数据被删除的情况）
     */
    clear() {
        cc.sys.localStorage.clear();
    },

    /**
     * 获取存储数据 通过key
     * @param key
     * @returns {*}
     */
    get( key ) {
        let cache = this.m_mapStore.get( key );
        if( !Utils.isNull( cache ) ) {
            return cache;
        }

        // 如果数据有加密，一定要解密后再返回，否则数据会出问题
        let value = cc.sys.localStorage.getItem( key );
        if( !Utils.isNull( value ) && value.length > 0 ) {
            value = JSON.parse( value );
            this.m_mapStore.set( key, value );
        } else {
            value = null;
        }
        return value;
    },

    /**
     * 设置存储数据
     * @param key {string} 字符串
     * @param data {*} 数据
     */
    set( key, data ) {
        // 允许加密数据 封装他的原因就是为了调用时不让开发者手动写加密
        if( !Utils.isNull( data ) ) {
            this.m_mapStore.set( key, data );
            cc.sys.localStorage.setItem( key, JSON.stringify( data ) );
        }
    },

});

module.exports = StoreManager;