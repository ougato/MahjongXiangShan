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

let DeskData = cc.Class({

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
                instance = new DeskData();
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
        // 骰子
        this.m_nDice = 0;
    },

    /**
     * 销毁
     */
    destroy() {
        this.m_nDice = null;
    },

    /**
     * 设置桌子信息
     * @param data {object} 桌子信息
     */
    setDeskInfo( data ) {
        this.m_nDice = data.dice;
    },

    /**
     * 设置骰子
     * @param dice {number} 骰子
     */
    setDice( dice ) {
        this.m_nDice = dice;
    },

    /**
     * 获取骰子
     * return {number}
     */
    getDice() {
        return this.m_nDice;
    },

    /**
     * 清理
     */
    clear() {
        // 骰子
        this.m_nDice = null;
    },

});

module.exports = DeskData;