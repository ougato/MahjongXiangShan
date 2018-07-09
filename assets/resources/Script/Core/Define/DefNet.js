/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 常量
 */
let DefNet = {
    // 重连最大次数
    RECONNECT_COUNT: 1,
    // 发送消息超时(s)
    MESSAGE_TIMEOUT: 3,
    // 重连间隔时间(s)
    RECONNECT_GAP: 3,
    // 心跳间隔时间(s)
    PING_GAP: 20,

};

module.exports = DefNet;