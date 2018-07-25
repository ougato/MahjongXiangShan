/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-07
 */

/**
 * 房间数据
 */

let Utils = require( "Utils" );

// 实例化对象
let instance = null;

let RoomData = cc.Class({

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
                instance = new RoomData();
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
        // 自己服务器座位号
        this.m_nSelfSeat = 0;
        // 规则信息
        this.m_objRuleInfo = {};
        // 模式ID
        this.m_nModeId = 0;
        // 房间ID
        this.m_strRoomId = "";
        // 状态
        this.m_nState = 0;
    },

    /**
     * 销毁
     */
    destroy() {
        // 自己服务器座位号
        this.m_nSelfSeat = null;
        // 规则信息
        this.m_objRuleInfo = null;
        // 模式ID
        this.m_nModeId = null;
        // 房间ID
        this.m_strRoomId = null;
        // 状态
        this.m_nState = null;
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
     * 设置房间信息
     * @param data {object} 房间信息
     */
    setRoomInfo( data ) {
        this.m_objRuleInfo = data.ruleInfo;
        this.m_nModeId = data.modeId;
        this.m_strRoomId = data.roomId;
        this.m_nState = data.state;
    },

    /**
     * 设置规则信息
     * @param ruleInfo
     */
    setRuleInfo( ruleInfo ) {
        this.m_objRuleInfo = ruleInfo;
    },

    /**
     * 获取规则信息
     * @returns {*}
     */
    getRuleInfo() {
        return this.m_objRuleInfo;
    },

    /**
     * 设置模式ID
     * @param modeId
     */
    setModeId( modeId ) {
        this.m_nModeId = modeId;
    },

    /**
     * 获取模式ID
     * @returns {number}
     */
    getModeId() {
        return this.m_nModeId;
    },

    /**
     * 设置房间ID
     * @param roomId
     */
    setRoomId( roomId ) {
        this.m_strRoomId = roomId;
    },

    /**
     * 获取房间ID
     * @returns {string}
     */
    getRoomId() {
        return this.m_strRoomId;
    },


    /**
     * 设置状态
     * @param state {number} 房间状态
     */
    setState( state ) {
        this.m_nState = state;
    },

    /**
     * 获取状态
     * @returns {number}
     */
    getState() {
        return this.m_nState;
    },

    /**
     * 清理
     */
    clear() {
        // 自己服务器座位号
        this.m_nSelfSeat = null;
        // 规则信息
        this.m_objRuleInfo = null;
        // 模式ID
        this.m_nModeId = null;
        // 房间ID
        this.m_strRoomId = null;
        // 状态
        this.m_nState = null;
    },

});

module.exports = RoomData;