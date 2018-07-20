/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-07
 */

/**
 * 玩家数据
 * @type {Function}
 */

let Utils = require( "Utils" );

// 实例化对象
let instance = null;

let DataPlayer = cc.Class({

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
                instance = new DataPlayer();
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
        // 玩家信息
        this.m_mapPlayerInfo = new Map();
    },

    /**
     * 销毁
     */
    destroy() {

    },

    /**
     * 设置玩家信息
     * @param data {array} 玩家信息
     */
    setPlayerInfo( data ) {
        for( let i = 0; i < data.length; ++i ) {
            let playerInfo = data[i];
            this.m_mapPlayerInfo.set( playerInfo.seat, playerInfo );
        }
    },

    /**
     * 获取玩家信息
     * @param seat {number} [座位号]
     * @return {*}
     */
    getPlayerInfo( seat ) {
        if( Utils.isNull( seat ) ) {
            return this.m_mapPlayerInfo;
        } else {
            let playerInfo = null;
            if( this.m_mapPlayerInfo.has( seat ) ) {
                playerInfo = this.m_mapPlayerInfo.get( seat );
            }
            return playerInfo;
        }
    },

    /**
     * 加入玩家
     * @param data {object} 玩家信息
     */
    joinPlayer( data ) {
        this.m_mapPlayerInfo.set( data.seat, data );
    },

    /**
     * 退出玩家
     * @param seat {number} 座位号
     */
    exitPlayer( seat ) {
        this.m_mapPlayerInfo.delete( seat );
    },

});

module.exports = DataPlayer;