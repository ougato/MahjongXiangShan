/**
 * Author = oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 全局 对象
 */

let AudioManager = require( "AudioManager" );
let EventManager = require( "EventManager" );
let ViewManager = require( "ViewManager" );
let StoreManager = require( "StoreManager" );
let NetManager = require( "NetManager" );
let DataManager = require( "DataManager" );

let Proto = require( "Proto" );
let I18N = require( "I18N" );
let Game = require( "Game" );

let Global = {};

// 声音管理器
Global.AudioManager = AudioManager.getInstance();
// 事件管理器
Global.EventManager = EventManager.getInstance();
// 视图管理器
Global.ViewManager = ViewManager.getInstance();
// 存储管理器
Global.StoreManager = StoreManager.getInstance();
// 网络管理器
Global.NetManager = NetManager.getInstance();
// 数据管理器
Global.DataManager = DataManager.getInstance();

// 网络协议
Global.Proto = Proto.getInstance();
// 国际语言
Global.I18N = I18N.getInstance();
// 游戏
Global.Game = Game.getInstance();

module.exports = Global;