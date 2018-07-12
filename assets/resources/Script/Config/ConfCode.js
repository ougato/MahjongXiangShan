/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * Http返回码
 */
let Http = {
    "-1": "生成3rd_session时 未获取到微信code",
    "-2": "生成3rd_session时 未获取到微信返回的openid或session_key",
    "-3": "参数rd_session为空",
    "-4": "用户注册获取登录ws时 未获取到服务器session_key",
    "-5": "用户注册获取登录ws时 验签失败",
    "-6": "用户第一次登录时 写入用户信息失败",
    "-7": "用户第一次登录时 写入用户内部错误"
};

/**
 * WebSocket返回码
 */
let WebSocket = {
    "-1": "不存在的用户",
    "-2": "重复登录",
    "-3": "禁止登录",
    "-4": "请注册",
    "-5": "创建房间失败",
    "-6": "金币不足",
    "-7": "房卡不足",
    "-8": "钻石不足",
    "-9": "退出房间失败",
    "-10": "解散房间失败",
    "-11": "读取redis数据失败",
    "-12": "读取mysql数据失败",
    "-13": "token为null",
    "-14": "token的值格式不对",
};

module.exports = {
    Http: Http,
    WebSocket: WebSocket,
};