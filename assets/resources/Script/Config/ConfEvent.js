/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */


/**
 * 游戏 事件
 */
const ConfEvent = {
    // 登录成功 事件
    EVENT_LOGIN_SUCCEED: "EVENT_LOGIN_SUCCEED",
    // 登录失败 事件
    EVENT_LOGIN_FAILED: "EVENT_LOGIN_FAILED",
    // 创建成功 事件
    EVENT_CREATE_SUCCEED: "EVENT_CREATE_SUCCEED",
    // 创建失败 事件
    EVENT_CREATE_FAILED: "EVENT_CREATE_FAILED",
    // 加入成功 事件
    EVENT_JOIN_SUCCEED: "EVENT_JOIN_SUCCEED",
    // 加入失败 事件
    EVENT_JOIN_FAILED: "EVENT_JOIN_FAILED",
    // 通知加入 事件
    EVENT_NOTICE_JOIN: "EVENT_NOTICE_JOIN",
    // 推送加入 事件
    EVENT_PUSH_JOIN: "EVENT_PUSH_JOIN",
    // 退出成功 事件
    EVENT_EXIT_SUCCEED: "EVENT_EXIT_SUCCEED",
    // 退出失败 事件
    EVENT_EXIT_FAILED: "EVENT_EXIT_FAILED",
    // 广播退出 事件
    EVENT_BROADCAST_EXIT: "EVENT_BROADCAST_EXIT",
    // 解散成功 事件
    EVENT_DISBAND_SUCCEED: "EVENT_DISBAND_SUCCEED",
    // 解散失败 事件
    EVENT_DISBAND_FAILED: "EVENT_DISBAND_FAILED",
    // 广播解散 事件
    EVENT_BROADCAST_DISBAND: "EVENT_BROADCAST_DISBAND",

    // 准备成功 事件
    EVENT_READY_SUCCEED: "EVENT_READY_SUCCEED",
    // 准备失败 事件
    EVENT_READY_FAILED: "EVENT_READY_FAILED",
    // 广播准备 事件
    EVENT_BROADCAST_READY: "EVENT_BROADCAST_READY"

};

module.exports = ConfEvent;