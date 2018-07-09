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
        G.NetManager.unProto( this, ConfNet.CREATE_ROOM );
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
        G.NetManager.addProto( this, ConfNet.CREATE_ROOM );
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
        let cmd = 301;
        let data = {};
        G.NetManager.send( cmd, data );
    },

    /**
     * 创建房间成功 回调
     */
    onCreateRoomSucceed( data ) {
        if( data.code < 0 ) {
            Log.error( data.code );
            return ;
        }
    },

    /**
     * 网络 回调
     * @param msg {object} 网络消息
     */
    onNet( msg ) {
        switch( msg.cmd ) {
            case ConfNet.CREATE_ROOM:
                this.onCreateRoomSucceed( msg.data );
                break;
        }
    },


    // update (dt) {},
});
