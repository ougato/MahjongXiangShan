/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 国际语言
 */

let Utils = require( "Utils" );
let DefStore = require( "DefStore" );
let Config = require( "Config" );
let DefLog = require( "DefLog" );
let StoreManager = require( "StoreManager" );

// 实例化对象
let instance = null;

let I18N = cc.Class({

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
                instance = new I18N();
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
        // 语言
        this.m_objContent = null;

        // 初始化语言
        this.setLanguage( Config.defaultLanguage );
    },

    /**
     * 销毁
     */
    destroy() {
        if( Utils.isNull( this.m_objLanguage ) ) {
            this.m_objLanguage = null;
        }
    },

    /**
     * 获取内容
     * @param index {number|string} 内容下标
     */
    get( index ) {
        let content = this.m_objContent[index];
        if( Utils.isNull( content ) ) {
            Log.error( DefLog[3] );
            return "";
        }
        return content;
    },

    /**
     * 设置语言
     * @param language
     */
    setLanguage( language ) {
        StoreManager.getInstance().set( DefStore.Language, language );
        this.m_objContent = require( language );
    },

    /**
     * 获取语言
     */
    getLanguage() {
        let language =  StoreManager.getInstance().get( DefStore.Language );
        if( Utils.isNull( language ) ) {
            language = Config.defaultLanguage;
        }
        return language;
    },

});

module.exports = I18N;