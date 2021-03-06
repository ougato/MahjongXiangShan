
//
// 注：预留001-100之间消息协议号、供服务器内部处理。
//
// Copyright (c) 2018-03
//
// 说明：
// Notice 通知协议（其他玩家可收到，自己无法收到此协议）
// Push 推送协议（只有自己能收到此协议）
// Broadcast 广播协议（所有房间内玩家均可收到此协议）

let Protocol = {};

////////////////////////////////////////////////////// 方法接口 //////////////////////////////////////////////////////

/**
 * 判断是否类型为数组
 * @param value
 * @return {boolean}
 */
Protocol._isArray = function( value ) {
    let flag = false;
    if( typeof( value ) === "object" ) {
        if( value instanceof Array ) {
            flag = true;
        }
    }
    return flag;
};

/**
 * 判断是否类型为对象
 * @param value
 * @return {boolean}
 */
Protocol._isObject = function( value ) {
    let flag = false;
    if( typeof( value ) === "object" ) {
        if( !(value instanceof Array) ) {
            flag = true;
        }
    }
    return flag;
};

/**
 * 克隆
 * @param variable {*} 任意类型变量
 * @return {*}
 */
Protocol._clone = function( variable ) {
    let v = variable;
    if( Protocol._isArray( variable ) ) {
        v = [];
        for( let i = 0; i < variable.length; ++i ) {
            v.push( Protocol._clone( variable[i] ) );
        }
    } else if( Protocol._isObject( variable ) ) {
        v = {};
        for( let key in variable ) {
            v[key] = Protocol._clone( variable[key] );
        }
    }
    return v;
};

/**
 * 获取 客户端 需要的协议数据
 * @param proto {object} 协议
 * @return {object}
 */
Protocol.getC2S = function( proto ) {
    proto = Protocol._clone( proto );
    let message = {};
    message.cmd = proto.cmd;
    message.data = proto.request;
    return message;
};

/**
 * 获取 服务器 需要的协议数据
 * @param proto {object} 协议
 * @return {object}
 */
Protocol.getS2C = function( proto ) {
    proto = Protocol._clone( proto );
    let message = {};
    message.cmd = proto.cmd;
    message.data = proto.response;
    return message;
};

/**
 * 获取结构体
 * @param struct {object} 结构
 * @return {object}
 */
Protocol.getStruct = function( struct ) {
    return Protocol._clone( struct );
};

////////////////////////////////////////////////////// 公共结构 //////////////////////////////////////////////////////

// 用户信息
Protocol.UserInfo = {
    userId: "",
    name: "", // 名字
    sex: false, // 性别
    pictureUrl: "", // 头像链接
    gold: 0, // 金币
    diamond: 0, // 钻石
};

// 牌信息
Protocol.CardInfo = {
    card: [], // [001, 020, 003] 牌（百位[以0开始 ID] 十位[0-筒 1-条 2-万 3-东南西北 4-春夏秋冬 5-梅兰竹菊 6-中发白] 个位[以0开始 点数]）
    type: 0, // 类型（0-手牌 1-出牌 2-吃牌 3-碰牌 4-明杠 5-暗杠 6-巴杠 7-抢杠 8-摸牌 9-自摸 10-点炮）
};

// 动作信息
Protocol.ActionInfo = {
    cards: [], // [ AAAA, BBBB, CCC ]
    action: 0, // 动作信息 [ 0-吃，1-碰，2-杠，3-听，4-胡，5-过 ]
};

// 规则信息
Protocol.RuleInfo = {
    playerNum: 0, // 玩家数量
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
    userInfo: Protocol.getStruct( Protocol.UserInfo ), // 用户信息
    cardInfo: [], // 牌堆信息 CardInfo
    stateInfo: Protocol.getStruct( Protocol.PlayerState ), // 玩家状态
};

// 手牌信息
Protocol.HoldCardInfo = {
    seat: 0, // 座位号
    cards: [], // 手牌组
};

// 桌子信息
Protocol.DeskInfo = {
    dice: 0, // 骰子
};

// 房间信息
Protocol.RoomInfo = {
    ruleInfo: Protocol.getStruct( Protocol.RuleInfo ), // 规则信息
    modeId: 0, // 模式ID（0-好友 1-匹配）
    roomId: "", // 房间ID
    state: 0, // 状态（0-未开始 1-游戏中 2-小结算 3-大结算）
};

// 游戏信息
Protocol.GameInfo = {
    roomInfo: Protocol.getStruct( Protocol.RoomInfo ), // 房间信息
    deskInfo: Protocol.getStruct( Protocol.DeskInfo ), // 桌子信息
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
        code: 0, // 返回码
        userInfo: Protocol.getStruct( Protocol.UserInfo ), // 个人信息
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
        ruleInfo: Protocol.getStruct( Protocol.RuleInfo ),
    },
    response: {
        code: 0, // 返回码
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
        gameInfo: Protocol.getStruct( Protocol.GameInfo ), // 房间信息
    },
};

// 通知加入房间
Protocol.NoticeJoin = {
    cmd: 303,
    response: {
        playerInfo: Protocol.getStruct( Protocol.PlayerInfo ), // 玩家信息
    },
};

// 推送加入房间
Protocol.PushJoin = {
    cmd: 304,
    response: {
        roomId: "", // 房间号
    }
};

// 退出房间
Protocol.Exit = {
    cmd: 305,
    request: {

    },
    response: {
        code: 0, // 返回码
    },
};

// 广播退出房间
Protocol.BroadcastExit = {
    cmd: 306,
    response: {
        seat: 0, // 座位号
    },
};

// 解散房间
Protocol.Disband = {
    cmd: 307,
    request: {
        isAgree: false, // 是否同意
    },
    response: {
        code: 0, // 返回码
    },
};

// 广播解散房间
Protocol.BroadcastDisband = {
    cmd: 308,
    response: {
        seat: 0, // 座位号
        isAgree: false, // 是否同意
        isDisband: false, // 是否解散
    },
};

////////////////////////////////////////////////////// 游戏开始 //////////////////////////////////////////////////////

// 准备
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

// 广播准备
Protocol.BroadcastReady = {
    cmd: 1003,
    response: {
        seat: 0, // 座位号
    },
};

// 广播取消准备
Protocol.BroadcastUnReady = {
    cmd: 1004,
    response: {
        seat: 0, // 座位号
    },
};

// 广播骰子
Protocol.BroadcastDice = {
    cmd: 1005,
    response: {
        dice: 0, // 骰子
    },
};

// 推送发牌
Protocol.PushDeal = {
    cmd: 1006,
    response: {
        cards: [], // 牌堆
    },
};

// 广播摸牌
Protocol.BroadcastDraw = {
    cmd: 1007,
    response: {
        seat: 0, // 座位
        card: 0, // 牌值
    },
};

// 出牌
Protocol.Discard = {
    cmd: 1008,
    request: {
        card: 0, // 牌值
    },
    response: {
        code: 0, // 返回码
    },
};

// 广播出牌
Protocol.BroadcastDiscard = {
    cmd: 1009,
    response: {
        seat: 0, // 座位
        card: 0, // 牌值
    },
};

// 广播本轮操作人
Protocol.BroadcastController = {
    cmd: 1010,
    response: {
        seat: 0, // 座位
    },
};

// 推送 吃碰杠听胡过
Protocol.PushAction = {
    cmd: 1011,
    response: {
        actions: [], // 动作信息集 [] ActionInfo
    },
};

// 吃
Protocol.Chi = {
    cmd: 1012,
    request: {
        cards: [], // 牌组
    },
    response: {
        code: 0, // 返回码
    },
};

// 广播 吃
Protocol.BroadcastChi = {
    cmd: 1013,
    response: {
        seat: 0, // 座位号
        cards: [], // 牌组
    },
};

// 碰
Protocol.Peng = {
    cmd: 1014,
    request: {
        cards: [], // 牌组
    },
    response: {
        code: 0, // 返回码
    },
};

// 广播 碰
Protocol.BroadcastPeng = {
    cmd: 1015,
    response: {
        seat: 0, // 座位号
        cards: [], // 牌组
    },
};

// 杠
Protocol.Gang = {
    cmd: 1016,
    request: {
        cards: [], // 牌组
    },
    response: {
        code: 0, // 返回码
    },
};

// 广播 杠
Protocol.BroadcastGang = {
    cmd: 1017,
    response: {
        seat: 0, // 座位号
        type: 0, // 0-明杠 1-暗杠 2-巴杠 3-抢杠
        cards: [], // 牌组
    },
};

// 听
Protocol.Ting = {
    cmd: 1018,
    request: {

    },
    response: {
        code: 0, // 返回码
    },
};

// 广播 听
Protocol.BroadcastTing = {
    cmd: 1019,
    response: {
        seat: 0, // 座位号
    },
};

// 胡
Protocol.Hu = {
    cmd: 1020,
    request: {
        card: 0, // 胡牌
    },
    response: {
        code: 0, // 返回码
    },
};

// 广播 胡
Protocol.BroadcastHu = {
    cmd: 1021,
    response: {
        seatHu: 0, // 胡牌 座位号
        seatDianPao: 0, // 点炮 座位号
        huCard: 0, // 胡 牌值
        holdCardInfo: [], // 手牌 信息 HoldCardInfo
    },
};

// 广播 小结算
Protocol.BroadcastClosing = {
    cmd: 1022,
    response: {

    },
};

// 广播 大结算
Protocol.BroadcastTotalClosing = {
    cmd: 1023,
    response: {

    },
};

module.exports = Protocol;