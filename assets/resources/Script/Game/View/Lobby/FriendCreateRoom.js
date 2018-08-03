/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-07
 */

/**
 * 创建房间
 */

let UIBase = require( "UIBase" );
let ConfView = require( "ConfView" );
let Protocol = require( "Protocol" );
let Log = require( "Log" );
let ConfEvent = require( "ConfEvent" );
let ConfCode = require( "ConfCode" );
let ConfGame = require( "ConfGame" );
let Utils = require( "Utils" );

cc.Class({
    extends: UIBase,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    start () {

    },

    /**
     * 加载
     */
    onLoad() {
        this.initData();
        this.initView();
        this.register();
    },

    /**
     * 销毁
     */
    onDestroy() {
        G.EventManager.unEvent( this, ConfEvent.EVENT_CREATE_FAILED );
    },

    /**
     * 初始化数据
     */
    initData() {
        // 房间人数
        this.m_nPlayerNum = 2;
    },

    /**
     * 初始化视图
     */
    initView() {

    },

    /**
     * 注册
     */
    register() {
        G.EventManager.addEvent( this, ConfEvent.EVENT_CREATE_FAILED );
    },

    /**
     * 返回
     */
    onGoBack() {
        G.ViewManager.closePrefab( ConfView.Prefab.FriendCreateRoom );
    },

    /**
     * 创建房间
     */
    onCreateRoom() {
        let ruleInfo = Protocol.getStruct( Protocol.RuleInfo );
        ruleInfo.playerNum = this.m_nPlayerNum;

        let message = Protocol.getC2S( Protocol.Create );
        message.data.ruleInfo = ruleInfo;

        G.NetManager.send( message.cmd, message.data );
    },

    /**
     * 创建 失败
     * @param data {object} 数据
     */
    onEventCreateFailed( data ) {
        G.ViewManager.openTips( ConfCode.WebSocket[data.code.toString()] );
    },

    /**
     * 事件 回调
     * @param event
     */
    onEvent( event ) {
        switch( event.id ) {
            case ConfEvent.EVENT_CREATE_FAILED:
                this.onEventCreateFailed( event.data );
                break;
        }
    },

    // update (dt) {},
});
