/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 登录 浏览器
 */

let UIBase = require( "UIBase" );
let Http = require( "Http" );
let Utils = require( "Utils" );
let ConfUrl = require( "ConfUrl" );
let ConfStore = require( "ConfStore" );
let Config = require( "Config" );

cc.Class({
    extends: UIBase,

    properties: {
        nodePhoneNumber: { default: null, type: cc.Node, tooltip: "手机号登录节点" },
        nodeGuest: { default: null, type: cc.Node, tooltip: "游客登录节点" },
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
        if( Config.isDebug ) {
            this.nodePhoneNumber.active = false;
        } else {
            this.nodeGuest.active = false;
        }
    },

    /**
     * 注册
     */
    register() {

    },

    /**
     * 手机号 登录
     */
    onPhoneNumber() {

    },

    /**
     * 游客 登录
     */
    onGuest() {
        let token = G.StoreManager.get( ConfStore.Token );
        if( Utils.isNull( token ) || token.length < 0 ) {
            token = "null";
        }
        Http.get( Utils.format( ConfUrl.GET_WEBSOCKET_URL_BROWSER_GUEST, token ), function( data ) {
            if( data.code === 0 ) {
                if( token !== data.token ) {
                    G.StoreManager.set( ConfStore.Token, data.token );
                    G.StoreManager.set( ConfStore.LoginMode, 0 );
                }
                G.NetManager.connect( data.loginws );
            }
        } );
    },


    // update (dt) {},
});
