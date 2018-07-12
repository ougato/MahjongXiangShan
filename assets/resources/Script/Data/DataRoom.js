/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-07
 */

/**
 * 房间数据
 * @type {Function}
 */

let Utils = require( "Utils" );

// 实例化对象
let instance = null;

let DataRoom = cc.Class({

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
                instance = new DataRoom();
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

    },

    /**
     * 销毁
     */
    destroy() {

    },

});

module.exports = DataRoom;