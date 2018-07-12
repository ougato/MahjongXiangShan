/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-07
 */

/**
 * 创建房间
 */

let UIBase = require( "UIBase" );
let ConfView = require( "ConfView" );
let ConfNet = require( "ConfNet" );
let Log = require( "Log" );
let ConfEvent = require( "ConfEvent" );
let ConfCode = require( "ConfCode" );
let ConfGame = require( "ConfGame" );

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
        G.EventManager.unEvent( this, ConfEvent.EVENT_CREATE_SUCCEED );
        G.EventManager.unEvent( this, ConfEvent.EVENT_CREATE_FAILED );
        G.EventManager.unEvent( this, ConfEvent.EVENT_JOIN_SUCCEED );
        G.EventManager.unEvent( this, ConfEvent.EVENT_JOIN_FAILED );
    },

    /**
     * 初始化数据
     */
    initData() {

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
        G.EventManager.addEvent( this, ConfEvent.EVENT_CREATE_SUCCEED );
        G.EventManager.addEvent( this, ConfEvent.EVENT_CREATE_FAILED );
        G.EventManager.addEvent( this, ConfEvent.EVENT_JOIN_SUCCEED );
        G.EventManager.addEvent( this, ConfEvent.EVENT_JOIN_FAILED );
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
        G.NetManager.send( ConfNet.NET_CREATE, {} );
    },

    /**
     * 创建 成功
     * @param data {object} 数据
     */
    onEventCreateSucceed( data ) {
        if( data.code < 0 ) {
            Log.error( data.code );
            return ;
        }
        G.NetManager.send( ConfNet.NET_JOIN, { roomId: data.roomId } );
    },

    /**
     * 创建 失败
     * @param data {object} 数据
     */
    onEventCreateFailed( data ) {
        G.ViewManager.openTips( ConfCode.WebSocket[data.code.toString()] );
    },

    /**
     * 加入 成功
     * @param data {object} 数据
     */
    onEventJoinSucceed( data ) {
        // TODO: 服务器要把modeId发过来
        // let modeId = data.roomInfo.deskInfo.modeId;

        let modeId = ConfGame.ModeId.Friend;
        switch( modeId ) {
            case ConfGame.ModeId.Friend:
                G.ViewManager.replaceScene( ConfView.Scene.MahjongFriend );
                break;
            case ConfGame.ModeId.Match:
                G.ViewManager.replaceScene( ConfView.Scene.MahjongMatch );
                break;
        }
    },

    /**
     * 加入 失败
     * @param data {object} 数据
     */
    onEventJoinFailed( data ) {
        G.ViewManager.openTips( ConfCode.WebSocket[data.code.toString()] );
    },

    /**
     * 事件 回调
     * @param msg
     */
    onEvent( msg ) {
        switch( msg.id ) {
            case ConfEvent.EVENT_CREATE_SUCCEED:
                this.onEventCreateSucceed( msg.data );
                break;
            case ConfEvent.EVENT_CREATE_FAILED:
                this.onEventCreateFailed( msg.data );
                break;
            case ConfEvent.EVENT_JOIN_SUCCEED:
                this.onEventJoinSucceed( msg.data );
                break;
            case ConfEvent.EVENT_JOIN_FAILED:
                this.onEventJoinFailed( msg.data );
                break;
        }
    },

    // update (dt) {},
});
