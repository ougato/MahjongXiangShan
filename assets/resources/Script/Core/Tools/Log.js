/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 日志 工具对象
 * @type {Function}
 */

let Log = {

    /**
     * 错误提示
     * @param text {string} 提示文字
     */
    error( text ) {
        cc.error( text );
    },

    /**
     * 警告提示
     * @param text {string} 提示文字
     */
    warn( text ) {
        cc.warn( text );
    },

    /**
     * 正常提示
     * @param text {string} 提示文字
     */
    print( text ) {
        cc.log( text );
    },

};

module.exports = Log;