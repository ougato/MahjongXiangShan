/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-07
 */

/**
 * 数据管理器
 * @type {Function}
 */

let Utils = require( "Utils" );
let DataUser = require( "DataUser" );
let DataRoom = require( "DataRoom" );

// 实例化对象
let instance = null;

let DataManager = cc.Class({

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
                instance = new DataManager();
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
        // 数据列表
        this.m_objDataList = new Map();
        this.m_objDataList.set( "DataUser", DataUser.getInstance() );
        this.m_objDataList.set( "DataRoom",DataRoom.getInstance() );

    },

    /**
     * 销毁
     */
    destroy() {

    },

    /**
     * 获取数据
     * @param fileDataName {string} 数据文件名
     */
    getData( fileDataName ) {
        return this.m_objDataList.get( fileDataName );
    }

});

module.exports = DataManager;