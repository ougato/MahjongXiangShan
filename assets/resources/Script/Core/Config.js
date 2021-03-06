/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 配置
 * @type {{}}
 */

let DefLanguage = require( "DefLanguage" );
let ConfView = require( "ConfView" );

const Config = {
    // 是否调试模式
    isDebug: true,
    // 是否支持一个浏览器开多个账号
    isMulti: true,
    // 默认场景
    defaultScene: ConfView.Scene.Update,
    // 默认语言
    defaultLanguage: DefLanguage.CN,

};

module.exports = Config;