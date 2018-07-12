/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 登录
 */

let UIBase = require( "UIBase" );
let Http = require( "Http" );
let Utils = require( "Utils" );
let ConfUrl = require( "ConfUrl" );
let ConfStore = require( "ConfStore" );
let ConfView = require( "ConfView" );
let DefView = require( "DefView" );
let Config = require( "Config" );
let ConfEvent = require( "ConfEvent" );
let Log = require( "Log" );
let ConfCode = require( "ConfCode" );
let ConfNet = require( "ConfNet" );
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
        G.EventManager.unEvent( this, ConfEvent.EVENT_LOGIN_SUCCEED );
        G.EventManager.unEvent( this, ConfEvent.EVENT_LOGIN_FAILED );
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
        G.EventManager.addEvent( this, ConfEvent.EVENT_LOGIN_SUCCEED );
        G.EventManager.addEvent( this, ConfEvent.EVENT_LOGIN_FAILED );
        G.EventManager.addEvent( this, ConfEvent.EVENT_JOIN_SUCCEED );
        G.EventManager.addEvent( this, ConfEvent.EVENT_JOIN_FAILED );
    },

    /**
     * 添加下载事件
     */
    addDownloadEvent() {
        G.EventManager.addDownloadEvent( this.onPercent );
    },

    /**
     * 检测token
     */
    checkToken() {
        if( this.isTokenExist() ) {
            Http.get( this.makeGetWSUrl(), function( data ) {
                if ( data.code === 0 ) {
                    G.StoreManager.set( ConfStore.Token, data.token );
                    G.NetManager.connect( data.loginws );
                } else if( data.code === -4 ) {
                    let ids = {};
                    ids[DefView.DialogBoxIDs.IDOK] = function() {
                        this.enterLogin();
                        G.ViewManager.closeDialogBox();
                    }.bind( this );
                    G.ViewManager.openDialogBox( G.I18N.get( 23 ), ids );
                }
            }.bind( this ) );
        } else {
            this.enterLogin();
        }
    },

    /**
     * token是否存在
     * @return {boolean}
     */
    isTokenExist() {
        let token = G.StoreManager.get( ConfStore.Token );
        return !Utils.isNull( token ) && token.length > 0;
    },

    /**
     * 登录界面
     */
    enterLogin() {
        G.ViewManager.replaceScene( ConfView.Scene.Login );
    },

    /**
     * 生成请求Websocket链接
     */
    makeGetWSUrl() {
        let userInfo = G.StoreManager.get( ConfStore.UserInfo );
        let token = G.StoreManager.get( ConfStore.Token );
        let url = "";
        // TODO写完需要用到的参数
        if (cc.sys.isMobile) {
            url = Utils.format( ConfUrl.GET_WEBSOCKET_URL_MOBILE, userInfo.rawData, userInfo.signature, userInfo.encryptedData, userInfo.iv, token );
        } else if (cc.sys.isBrowser || cc.sys.isNative) {
            if( Config.isDebug ) {
                url = Utils.format( ConfUrl.GET_WEBSOCKET_URL_BROWSER_GUEST, token );
            } else {
                url = Utils.format( ConfUrl.GET_WEBSOCKET_URL_BROWSER, token );
            }
        }
        return url;
    },

    /**
     * 网络下载资源百分比
     * @param progress {number} 百分比
     * @param countSize {number} 总大小
     * @param currSize {number} 当前大小
     */
    onPercent( progress, countSize, currSize ) {
        if( countSize !== currSize ) {
            G.ViewManager.openProgressBar( progress );
        } else {
            G.ViewManager.closeProgressBar( progress );
        }
        Log.print( "总进度：" +progress + "%" );
        Log.print( "文件大小：" + countSize + "/" + currSize );
    },

    /**
     * 登录 成功
     * @param data {*} 登录数据
     */
    onEventLoginSucceed( data ) {
        if( Utils.isNull( data.gameInfo ) ) {
            G.ViewManager.replaceScene( ConfView.Scene.Lobby );
        } else {
            G.NetManager.send( ConfNet.NET_JOIN, data.gameInfo.roomId );
        }
    },

    /**
     * 登录 失败
     * @param data {*} 登录数据
     */
    onEventLoginFailed( data ) {
        let ids = {};
        ids[DefView.DialogBoxIDs.IDOK] = function() {
            G.ViewManager.replaceScene( ConfView.Scene.Login );
            G.ViewManager.closeDialogBox();
        };
        G.ViewManager.openDialogBox( ConfCode.WebSocket[data.code.toString()], ids );
    },

    /**
     * 加入 成功
     * @param data {*} 加入数据
     */
    onEventJoinSucceed( data ) {
        let dataUser = G.DataManager.getData( "DataUser" );
        switch( dataUser.getUndoneModeId() ) {
            case ConfGame.ModeId.Friend:
                G.ViewManager.replaceScene( ConfView.Scene.MahjongFriend, null, function( view ) {
                    view.reconnect();
                } );
                break;
            case ConfGame.ModeId.Match:
                G.ViewManager.replaceScene( ConfView.Scene.MahjongMatch, null, function( view ) {
                    view.reconnect();
                } );
                break;

        }

    },

    /**
     * 加入 失败
     * @param data {*} 加入数据
     */
    onEventJoinFailed( data ) {
        G.ViewManager.replaceScene( ConfView.Scene.Lobby );
    },

    /**
     * 监听事件 回调
     */
    onEvent( msg ) {
        switch( msg.id ) {
            case ConfEvent.EVENT_LOGIN_SUCCEED:
                this.onEventLoginSucceed( msg.data );
                break;
            case ConfEvent.EVENT_LOGIN_FAILED:
                this.onEventLoginFailed( msg.data );
                break;
            case ConfEvent.EVENT_JOIN_SUCCEED:
                this.onEventLoginSucceed( msg.data );
                break;
            case ConfEvent.EVENT_JOIN_FAILED:
                this.onEventLoginFailed( msg.data );
                break;
        }
    },

    // update (dt) {},
});
