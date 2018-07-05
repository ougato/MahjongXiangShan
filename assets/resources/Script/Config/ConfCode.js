/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * Http返回码
 */
let ConfCode = {
    "-1": "生成3rd_session时 未获取到微信code",
    "-2": "生成3rd_session时 未获取到微信返回的openid或session_key",
    "-3": "参数rd_session为空",
    "-4": "用户注册获取登录ws时 未获取到服务器session_key",
    "-5": "用户注册获取登录ws时 验签失败",
    "-6": "用户第一次登录时 写入用户信息失败",
    "-7": "用户第一次登录时 写入用户内部错误"
};

module.exports = ConfCode;