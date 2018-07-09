/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-07
 */

/**
 * 好友对战
 */

let UIBase = require( "UIBase" );
let ConfView = require( "ConfView" );

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

    },

    /**
     * 返回
     */
    onGoBack() {
        G.ViewManager.closePrefab( ConfView.Prefab.FriendBattle );
    },

    /**
     * 创建房间
     */
    onCreateRoom() {
        G.ViewManager.openPrefab( ConfView.Prefab.FriendCreateRoom );
    },

    /**
     * 加入房间
     */
    onJoinRoom() {
        G.ViewManager.openPrefab( ConfView.Prefab.FriendJoinRoom );
    },

    // update (dt) {},
});
