//
// 注：预留001-100之间消息协议
// 号、供服务器内部处理。
//
// Copyright (c) 2018-03
// 
//

let Protocol = {};

////////////////////////////////////////////////////// 公共结构 //////////////////////////////////////////////////////

// 用户信息
Protocol.UserInfo = {
    name: "", // 名字
    sex: false, // 性别
    pictureUrl: "", // 头像链接
    gold: 0, // 金币
    diamond: 0, // 钻石
};

// 牌信息
Protocol.CardInfo = {
    card: [], // 牌（百位[以0开始 ID] 十位[0-筒 1-条 2-万 3-东南西北 4-春夏秋冬 5-梅兰竹菊 6-中发白] 个位[以0开始 点数]）
    type: 0, // 类型（0-手牌 1-出牌 2-吃牌 3-碰牌 4-明杠 5-暗杠 6-巴杠 7-抢杠）
};


// 动作信息
Protocol.ActionInfo = {
    type: 0, // 类型（准备0，取消准备1，抓牌2，出牌3，吃4，碰5，暗杠6，明杠7，巴杠8，抢杠9，听10，胡11）
};

// 规则信息
Protocol.RuleInfo = {

};

// 玩家状态
Protocol.PlayerState = {
    isBanker: false, // 是否庄家
    isHost: false, // 是否房主
    isReady: false, // 是否准备
    isReadyHand: false, // 是否听牌
    isOffLine: false, // 是否离线
};

// 玩家信息
Protocol.PlayerInfo = {
    seat: 0, // 座位号
    userInfo: new Object( Protocol.UserInfo ), // 用户信息
    cardInfo: [], // 牌堆信息 CardInfo
    stateInfo: new Object( Protocol.PlayerState ), // 玩家状态
};

// 桌子信息
Protocol.DeskInfo = {
    dice: 0, // 骰子
};

// 房间信息
Protocol.RoomInfo = {
    ruleInfo: new Object( Protocol.RuleInfo ), // 规则信息
    modeId: 0, // 模式ID（0-好友 1-匹配）
    roomId: "", // 房间ID
};

// 游戏信息
Protocol.GameInfo = {
    roomInfo: new Object( Protocol.RoomInfo ), // 房间信息
    deskInfo: new Object( Protocol.DeskInfo ), // 桌子信息
    playerInfo: [], // 玩家信息 PlayerInfo,
};

////////////////////////////////////////////////////// 公共接口 //////////////////////////////////////////////////////


////////////////////////////////////////////////////// 登录大厅 //////////////////////////////////////////////////////

// 心跳
Protocol.Ping = {
    cmd: 101,
    request: {

    },
    response: {

    },
};

// 登录（code = 0, -1, -2,-3, -4. -11, -12, -13, -14）
Protocol.Login = {
    cmd: 102,
    request: {
        token: "", // 校验码（3rd_session）
        type: 0, // 登录类型（0-游客 1-微信小游戏 2.手机号）
    },
    response: {
        code: "", // 返回码
        userInfo: new Object( Protocol.UserInfo ), // 个人信息
        roomId: "", // 房间号
    },
};

// 广播
Protocol.Broadcast = {
    cmd: 103,
    response: {
        connect: "", // 广播内容
    },
};

////////////////////////////////////////////////////// 匹配模式 //////////////////////////////////////////////////////

// 开始匹配
Protocol.Match = {
    cmd: 201,
    request: {

    },
    response: {
        code: 0, // 返回码
        roomId: "", // 房间号
    },
};

// 取消匹配
Protocol.UnMatch = {
    cmd: 202,
    request: {

    },
    response: {
        code: 0, // 返回码
    },
};

////////////////////////////////////////////////////// 房卡模式 //////////////////////////////////////////////////////

// 创建房间 (code = -5,-6,-7,-8)
Protocol.Create = {
    cmd: 301,
    request: {

    },
    response: {
        code: "", // 返回码
        roomId: "", // 房间号
    },
};

// 加入房间
Protocol.Join = {
    cmd: 302,
    request: {
        roomId: "", // 房间号
    },
    response: {
        code: 0, // 返回码
        gameInfo: new Object( Protocol.GameInfo ), // 房间信息
    },
};

// 通知加入房间
Protocol.NoticeJoin = {
    cmd: 303,
    response: {
        playerInfo: new Object( Protocol.PlayerInfo ), // 玩家信息
    },
};

////////////////////////////////////////////////////// 游戏开始 //////////////////////////////////////////////////////

// 开始准备
Protocol.Ready = {
    cmd: 1001,
    request: {

    },
    response: {
        code: 0, // 返回码
    },
};

// 取消准备
Protocol.UnReady = {
    cmd: 1002,
    request: {

    },
    response: {
        code: 0, // 返回码
    },
};

// 通知开始准备
Protocol.NoticeReady = {
    cmd: 1003,
    response: {
        seat: 0, // 座位号
    },
};

// 通知取消准备
Protocol.NoticeUnReady = {
    cmd: 1004,
    response: {
        seat: 0, // 座位号
    },
};

// 骰子
Protocol.Dice = {
    cmd: 1005,
    response: {
        dice: 0, // 骰子
    },
};

// 发牌
Protocol.Deal = {
    cmd: 1006,
    response: {
        cards: new Object( Protocol.CardInfo ), // 牌堆
    },
};

// 摸牌
Protocol.Draw = {
    cmd: 1007,
    response: {
        card: new Object( Protocol.CardInfo ), // 牌值
    },
};

//通知摸牌
Protocol.NoticeDraw = {
    cmd: 1008,
    response: {
        seat: 0, // 座位
    },
};

// 提示 吃碰杠听胡
Protocol.TipAction = {
    cmd: 1009,
    response: {
        types: [], // 动作信息集 *ActionInfo
    },
};

// 出牌0，吃1，碰2，杠3，听4，胡5
Protocol.Action = {
    cmd: 1010,
    request: {
        type: new Object( Protocol.ActionInfo ), // 动作信息
        card: 0, // 当type==0时， card不为空，其它情况 card为空
    },
};

// 通知 准备0，取消准备1，抓牌,2, 出牌3，吃4，碰5，暗杠6，明杠7，巴杠8，抢杠9，听,10，胡11，
Protocol.NoticeAction = {
    cmd: 1011,
    response: {
        type: 0,
        card: [], //当type=2,3,4, *CardInfo
    },
};

module.exports = Protocol;