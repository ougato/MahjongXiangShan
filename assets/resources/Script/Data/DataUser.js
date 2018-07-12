/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-07
 */

/**
 * 用户数据
 * @type {Function}
 */

let Utils = require( "Utils" );

// 实例化对象
let instance = null;

let DataUser = cc.Class({

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
                instance = new DataUser();
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
        // 名字
        this.m_strName = null;
        // 性别
        this.m_nSex = null;
        // 头像连接
        this.m_strPictureUrl = null;
        // 金币
        this.m_nGold = null;
        // 钻石
        this.m_nDiamond = null;
        // 未完成的游戏ID
        this.m_nUndoneGameId = null;
        // 未完成的模式ID
        this.m_nUndoneModeId = null;
        // 未完成的房间ID
        this.m_nUndoneRoomId = null;

    },

    /**
     * 销毁
     */
    destroy() {

    },

    /**
     * 设置用户信息
     * @param userInfo {object} 用户信息
     */
    setUserInfo( userInfo ) {
        this.m_strName = Utils.isNull( userInfo.name ) ? "?" : userInfo.name;
        this.m_nSex = Utils.isNull( userInfo.sex ) ? 1 : userInfo.sex;
        this.m_strPictureUrl = Utils.isNull( userInfo.pictureUrl ) ? "" : userInfo.pictureUrl;
        this.m_nGold = Utils.isNull( userInfo.gold ) ? 0 : userInfo.gold;
        this.m_nDiamond = Utils.isNull( userInfo.diamond ) ? 0 : userInfo.diamond;
    },

    /**
     * 设置游戏信息
     * @param gameInfo {object} 游戏信息
     */
    setGameInfo( gameInfo ) {
        this.m_nUndoneGameId = Utils.isNull( gameInfo.gameId ) ? null : gameInfo.gameId;
        this.m_nUndoneModeId = Utils.isNull( gameInfo.modeId ) ? null : gameInfo.modeId;
        this.m_nUndoneRoomId = Utils.isNull( gameInfo.roomId ) ? null : gameInfo.roomId;
    },

    /**
     * 设置名字
     * @param name {string} 名字
     */
    setName( name ) {
        this.m_strName = name;
    },

    /**
     * 获取名字
     * @return {string}
     */
    getName() {
        return this.m_strName;
    },

    /**
     * 设置性别
     * @param sex {number} 性别
     */
    setSex( sex ) {
        this.m_nSex = sex;
    },

    /**
     * 获取性别
     * @return {number}
     */
    getSex() {
        return this.m_nSex;
    },

    /**
     * 设置头像链接
     * @param pictureUrl {string} 头像链接
     */
    setPictureUrl( pictureUrl ) {
        this.m_strPictureUrl = pictureUrl;
    },

    /**
     * 获取头像链接
     * @return {string}
     */
    getPictureUrl() {
        return this.m_strPictureUrl;
    },

    /**
     * 设置金币
     * @param gold {number} 金币
     */
    setGold( gold ) {
        this.m_nGold = gold;
    },

    /**
     * 获取金币
     * @return {number}
     */
    getGold() {
        return this.m_nGold;
    },

    /**
     * 设置钻石
     * @param diamond {number} 钻石
     */
    setDiamond( diamond ) {
        this.m_nDiamond = diamond;
    },

    /**
     * 获取钻石
     * @return {number}
     */
    getDiamond() {
        return this.m_nDiamond;
    },

    /**
     * 设置未完成游戏ID
     * @param gameId {number} 未完成游戏ID
     */
    setUndoneGameId( gameId ) {
        this.m_nUndoneGameId = gameId;
    },

    /**
     * 获取未完成游戏ID
     * @return {number}
     */
    getUndoneGameId() {
        return this.m_nUndoneGameId;
    },

    /**
     * 设置未完成模式ID
     * @param modeId {number} 未完成模式ID
     */
    setUndoneModeId( modeId ) {
        this.m_nUndoneModeId = modeId;
    },

    /**
     * 获取未完成模式ID
     * @return {number}
     */
    getUndoneModeId() {
        return this.m_nUndoneModeId;
    },

    /**
     * 设置未完成房间ID
     * @param roomId {string} 未完成房间ID
     */
    setUndoneRoomId( roomId ) {
        this.m_nUndoneRoomId = roomId;
    },

    /**
     * 获取未完成房间ID
     * @return {string}
     */
    getUndoneRoomId() {
        return this.m_nUndoneRoomId;
    },
});

module.exports = DataUser;