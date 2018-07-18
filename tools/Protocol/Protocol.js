//
// 注：预留001-100之间消息协议
// 号、供服务器内部处理。
//
// Copyright (c) 2018-03
//
//

////////////////////////////////////////////////////// 公共结构 //////////////////////////////////////////////////////

// 用户信息
.UserInfo {
name 0: string // 名字
sex 1: boolean // 性别
pictureUrl 2: string // 头像链接
gold 3: integer // 金币
diamond 4: integer // 钻石

}

// 牌信息
.CardInfo {
card 0: *integer // 牌（百位[以0开始 ID] 十位[0-筒 1-条 2-万 3-东南西北 4-春夏秋冬 5-梅兰竹菊 6-中发白] 个位[以0开始 点数]）
type 1: integer // 类型（0-手牌 1-出牌 2-吃牌 3-碰牌 4-明杠 5-暗杠 6-巴杠 7-抢杠）
}


// 动作信息
.ActionInfo {
type 0: integer // 类型（准备0，取消准备1，抓牌2，出牌3，吃4，碰5，暗杠6，明杠7，巴杠8，抢杠9，听10，胡11）
}

// 规则信息
.RuleInfo {

}

// 玩家状态
.PlayerState {
isBanker 0: boolean // 是否庄家
isHost 1: boolean // 是否房主
isReady 2: boolean // 是否准备
isReadyHand 3: boolean // 是否听牌
isOffLine 4: boolean // 是否离线
}

// 玩家信息
.PlayerInfo {
seat 0: integer // 座位号
userInfo 1: UserInfo // 用户信息
cardInfo 2: *CardInfo // 牌堆信息
stateInfo 3: PlayerState // 玩家状态
}

// 桌子信息
.DeskInfo {
dice 0: integer // 骰子
}

// 房间信息
.RoomInfo {
ruleInfo 0: RuleInfo // 规则信息
modeId 1: integer // 模式ID（0-好友 1-匹配）
roomId 2: string // 房间ID
}

// 游戏信息
.GameInfo {
roomInfo: 0: RoomInfo
deskInfo 1: DeskInfo
playerInfo 2: *PlayerInfo
}

////////////////////////////////////////////////////// 公共接口 //////////////////////////////////////////////////////

// 刷新用户信息
UpdateUserInfo {
request {

}
response {
userInfo 0: UserInfo // 个人信息
}
}

////////////////////////////////////////////////////// 登录大厅 //////////////////////////////////////////////////////

// 心跳
Ping 101 {
request {

}
response {

}
}

// 登录（code = 0, -1, -2,-3, -4. -11, -12, -13, -14）
Login 102 {
request {
token 0: string // 校验码（3rd_session）
type 1: integer // 登录类型（0-游客 1-微信小游戏 2.手机号）
}
response {
code 0: integer // 返回码
userInfo 1: UserInfo // 个人信息
roomId 2: string // 房间号
}
}

// 广播
Broadcast 103 {
response {
connect 0: string // 广播内容
}
}

////////////////////////////////////////////////////// 匹配模式 //////////////////////////////////////////////////////

// 开始匹配
Match 201 {
request {

}
response {
code 0: integer // 返回码
roomId 1: string // 房间号
}
}

// 取消匹配
UnMatch 202 {
request {

}
response {
code 0: integer // 返回码
}
}

////////////////////////////////////////////////////// 房卡模式 //////////////////////////////////////////////////////

// 创建房间 (code = -5,-6,-7,-8)
Create 301 {
request {

}
response {
code 0: integer // 返回码
roomId 1: string // 房间号
}
}

// 加入房间
Join 302 {
request {
roomId 0: string // 房间号
}
response {
code 0: integer // 返回码
gameInfo 1: GameInfo // 房间信息
}
}

// 通知加入房间
NoticeJoin 303 {
response {
playerInfo 0: PlayerInfo // 玩家信息
}
}

////////////////////////////////////////////////////// 游戏开始 //////////////////////////////////////////////////////

// 开始准备
Ready 1001 {
request {

}
response {
code 0: integer // 返回码
}
}

// 取消准备
UnReady 1002 {
request {

}
response {
code 0: integer // 返回码
}
}

// 通知开始准备
NoticeReady 1003 {
response {
seat 0: integer // 座位号
}
}

// 通知取消准备
NoticeUnReady 1004 {
response {
seat 0: integer // 座位号
}
}

// 骰子
Dice 1005 {
response {
dice 0: integer // 骰子
}
}

// 发牌
Deal 1006 {
response {
cards 0: CardInfo // 牌堆
}
}

// 摸牌
Draw 1007 {
response {
card 0: CardInfo // 牌值
}
}

//通知摸牌
NoticeDraw 1008 {
response {
seat 0: integer // 座位
}
}


// 提示 吃碰杠听胡
TipAction 1009 {
response {
types 0: *ActionInfo // 动作信息集
}
}
// 出牌0，吃1，碰2，杠3，听4，胡5
Action 1010 {
request {
type 0: ActionInfo // 动作信息
card 1: integer     // 当type==0时， card不为空，其它情况 card为空
}
}

// 通知 准备0，取消准备1，抓牌,2, 出牌3，吃4，碰5，暗杠6，明杠7，巴杠8，抢杠9，听,10，胡11，
NoticeAction 1011 {
response {
type 0: integer
card 1: *integer     //当type=2,3,4,
}
}
