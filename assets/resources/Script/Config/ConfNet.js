/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-06
 */

/**
 * id
 */
const ProtocolIDs = {
    /** ------------------- 登录大厅 ------------------- */

    // 心跳
    NET_PING: 101,
    // 登录
    NET_LOGIN: 102,
    // 广播
    NET_BROADCAST: 103,

    /** ------------------- 游戏匹配 ------------------- */


    /** ------------------- 游戏房卡 ------------------- */

    // 创建房间
    NET_CREATE: 301,
    // 加入房间
    NET_JOIN: 302,
};

module.exports = ProtocolIDs;