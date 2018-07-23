/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-05
 */

/**
 * 游戏ID
 */
const GameId = {
    MahjongXiangShan: 0
};

/**
 * 模式ID
 */
const ModeId = {
    Friend: 0,
    Match: 1,
};

/**
 * 房间状态
 */
const RoomState = {
    // 未开始
    NotStarted: 0,
    // 游戏中
    Playing: 1,
    // 小结算
    Closing: 2,
    // 大结算
    TotalClosing: 3,
};

module.exports = {
    GameId: GameId,
    ModeId: ModeId,
    RoomState: RoomState,
};