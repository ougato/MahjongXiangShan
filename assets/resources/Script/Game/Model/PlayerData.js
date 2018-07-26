/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-07
 */

/**
 * 玩家数据
 */

let Utils = require( "Utils" );

// 实例化对象
let instance = null;

let PlayerData = cc.Class({

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
                instance = new PlayerData();
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
        // 自己服务器座位号
        this.m_nSelfSeat = 0;
    },

    /**
     * 销毁
     */
    destroy() {
        this.m_mapPlayerInfo.clear();
        this.m_mapPlayerInfo = null;
        this.m_nSelfSeat = null;
    },

    /**
     * 设置玩家信息
     * @param seat {number} 客户端座位号
     * @param data {array} 玩家信息
     */
    setPlayerData( seat, data ) {
        this.m_mapPlayerInfo.set( seat, data );
    },

    /**
     * 获取玩家信息
     * @param seat {number} [客户端座位号]
     * @return {*}
     */
    getPlayerData( seat ) {
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
     * 设置自己 服务器 座位号
     * @param seat {number} 服务器座位号
     */
    setSelfSeat( seat ) {
        this.m_nSelfSeat = seat;
    },

    /**
     * 获取自己 服务器 座位号
     * @returns {number} 服务器座位号
     */
    getSelfSeat() {
        return this.m_nSelfSeat;
    },

    /**
     * 加入玩家
     * @param seat {number} 客户端座位号
     * @param data {object} 玩家信息
     */
    join( seat, data ) {
        this.m_mapPlayerInfo.set( seat, data );
    },

    /**
     * 退出玩家
     * @param seat {number} 客户端座位号
     */
    exit( seat ) {
        this.m_mapPlayerInfo.delete( seat );
    },

    /**
     * 退出玩家
     * @param seat {number} 客户端座位号
     * @param isReady {boolean} 是否准备
     */
    ready( seat, isReady ) {
        this.setReady( seat, isReady );
    },

    /**
     * 设置玩家是否准备
     * @param seat {number} 客户端座位号
     * @param isReady {boolean} 是否准备
     */
    setReady( seat, isReady ) {
        let player = this.m_mapPlayerInfo.get( seat );
        if( !Utils.isNull( player ) ) {
            player.stateInfo.isReady = isReady;
        }
    },

    /**
     * 获取玩家是否准备
     * @param seat {number} 客户端座位号
     * @return {boolean|*}
     */
    getReady( seat ) {
        let player = this.m_mapPlayerInfo.get( seat );
        let isReady = null;
        if( !Utils.isNull( player ) ) {
            isReady = player.stateInfo.isReady;
        }
        return isReady;
    },

    /**
     * 清理玩家
     */
    clear() {
        this.m_mapPlayerInfo.clear();
        this.m_nSelfSeat = null;
    },

});

module.exports = PlayerData;