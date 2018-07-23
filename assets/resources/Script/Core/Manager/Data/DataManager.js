/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-07
 */

/**
 * 数据管理器
 * @type {Function}
 */

let Utils = require( "Utils" );
let UserData = require( "UserData" );
let RoomData = require( "RoomData" );
let DeskData = require( "DeskData" );
let PlayerData = require( "PlayerData" );

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
        this.m_objDataList.set( "UserData", UserData.getInstance() );
        this.m_objDataList.set( "RoomData",RoomData.getInstance() );
        this.m_objDataList.set( "DeskData", DeskData.getInstance() );
        this.m_objDataList.set( "PlayerData", PlayerData.getInstance() );

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
    },

    /**
     * 清理数据
     * @param fileDataName {string} [数据文件名]
     */
    clearData( fileDataName ) {
        if( Utils.isNull( fileDataName ) ) {
            this.m_objDataList.forEach( function( value ) {
                if( Utils.isFunction( value.clear ) ) {
                    value.clear();
                }
            } )
        } else {
            this.getData( fileDataName ).clear();
        }
    },

});

module.exports = DataManager;