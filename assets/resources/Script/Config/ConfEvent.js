/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */


/**
 * 游戏 事件
 */
const ConfEvent = {
    // 网络改变 事件
    EVENT_NET_CHANGE: "EVENT_NET_CHANGE",
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
    EVENT_BROADCAST_READY: "EVENT_BROADCAST_READY",
    // 取消准备成功 事件
    EVENT_UN_READY_SUCCEED: "EVENT_UN_READY_SUCCEED",
    // 取消准备失败 事件
    EVENT_UN_READY_FAILED: "EVENT_UN_READY_FAILED",
    // 广播取消准备 事件
    EVENT_BROADCAST_UN_READY: "EVENT_BROADCAST_UN_READY",
    // 广播骰子 事件
    EVENT_BROADCAST_DICE: "EVENT_BROADCAST_DICE",
    // 推送发牌 事件
    EVENT_PUSH_DEAL: "EVENT_PUSH_DEAL",
    // 广播摸牌 事件
    EVENT_BROADCAST_DRAW: "EVENT_BROADCAST_DRAW",
    // 出牌成功 事件
    EVENT_DISCARD_SUCCEED: "EVENT_DISCARD_SUCCEED",
    // 出牌失败 事件
    EVENT_DISCARD_FAILED: "EVENT_DISCARD_FAILED",
    // 广播出牌 事件
    EVENT_BROADCAST_DISCARD: "EVENT_BROADCAST_DISCARD",
    // 广播本轮操作人 事件
    EVENT_BROADCAST_CONTROLLER: "EVENT_BROADCAST_CONTROLLER",
    // 推送吃碰杠听胡过 事件
    EVENT_PUSH_ACTION: "EVENT_PUSH_ACTION",
    // 吃成功 事件
    EVENT_CHI_SUCCEED: "EVENT_CHI_SUCCEED",
    // 吃失败 事件
    EVENT_CHI_FAILED: "EVENT_CHI_FAILED",
    // 广播吃 事件
    EVENT_BROADCAST_CHI: "EVENT_BROADCAST_CHI",
    // 碰成功 事件
    EVENT_PENG_SUCCEED: "EVENT_PENG_SUCCEED",
    // 碰失败 事件
    EVENT_PENG_FAILED: "EVENT_PENG_FAILED",
    // 广播碰 事件
    EVENT_BROADCAST_PENG: "EVENT_BROADCAST_PENG",
    // 杠成功 事件
    EVENT_GANG_SUCCEED: "EVENT_GANG_SUCCEED",
    // 杠失败 事件
    EVENT_GANG_FAILED: "EVENT_GANG_FAILED",
    // 广播杠 事件
    EVENT_BROADCAST_GANG: "EVENT_BROADCAST_GANG",
    // 听成功 事件
    EVENT_TING_SUCCEED: "EVENT_TING_SUCCEED",
    // 听失败 事件
    EVENT_TING_FAILED: "EVENT_TING_FAILED",
    // 广播听 事件
    EVENT_BROADCAST_TING: "EVENT_BROADCAST_TING",
    // 胡成功 事件
    EVENT_HU_SUCCEED: "EVENT_HU_SUCCEED",
    // 胡失败 事件
    EVENT_HU_FAILED: "EVENT_HU_FAILED",
    // 广播胡 事件
    EVENT_BROADCAST_HU: "EVENT_BROADCAST_HU",
    // 广播小结算 事件
    EVENT_BROADCAST_CLOSING: "EVENT_BROADCAST_CLOSING",
    // 广播大结算 事件
    EVENT_BROADCAST_TOTAL_CLOSING: "EVENT_BROADCAST_TOTAL_CLOSING",
};

module.exports = ConfEvent;