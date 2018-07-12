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
let Config = require( "Config" );
let ConfEvent = require( "ConfEvent" );
let DefView = require( "DefView" );
let ConfView = require( "ConfView" );
let ConfNet = require( "ConfNet" );
let ConfGame = require( "ConfGame" );
let ConfCode = require( "ConfCode" );

cc.Class({
    extends: UIBase,

    properties: {
        nodePhoneNumber: { default: null, type: cc.Node, tooltip: "手机号登录节点" },
        nodeGuest: { default: null, type: cc.Node, tooltip: "游客登录节点" },
        nodeWechat: { default: null, type: cc.Node, tooltip: "微信登录节点" },
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

        if( !Utils.isNull( this.buttonGetUserInfo ) ) {
            this.buttonGetUserInfo.hide();
        }
    },

    /**
     * 初始化数据
     */
    initData() {
        // 微信获取用户信息组件
        this.buttonGetUserInfo = null;
    },

    /**
     * 初始化视图
     */
    initView() {
        this.nodePhoneNumber.active = false;
        this.nodeGuest.active = false;
        this.nodeWechat.active = false;

        if( cc.sys.isMobile ) {
            let button = this.createGetUserInfoButton();
            button.onTap( this.onGetUserInfo.bind( this ) );
            this.buttonGetUserInfo = button;
        } else if( cc.sys.isBrowser || cc.sys.isNative ) {
            if( Config.isDebug ) {
                this.nodeGuest.active = true;
            } else {
                this.nodePhoneNumber.active = true;
            }
        }

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
     * 创建 获取 微信用户信息 按钮
     * @return {object}
     */
    createGetUserInfoButton() {
        let wechatButton = this.nodeWechat.getChildByName( "Button_Wechat" );

        let systemInfo = wx.getSystemInfoSync();
        let winSize = cc.director.getWinSize();
        let screenWidth = systemInfo.screenWidth;
        let screenHeight = systemInfo.screenHeight;
        let width = screenWidth / winSize.width * wechatButton.getContentSize().width;
        let height = screenHeight / winSize.height * wechatButton.getContentSize().height;

        let style = {
            left: screenWidth * 0.5 - width * 0.5,
            top: screenHeight * 0.7,
            width: width,
            height: height,
        };

        return wx.createUserInfoButton({
            type: 'image',
            image: 'http://47.106.125.21/cocos/origin/Atlas/Login/Button_1.png',
            style: style,
        });
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

    /**
     * 回调 获取用户信息
     * @param res
     */
    onGetUserInfo( res ) {
        let self = this;
        if( Utils.isWxSuccee( res.errMsg ) ) {
            let userInfo = self.makeUserInfo( res );
            G.StoreManager.set( ConfStore.UserInfo, userInfo );
            self.wxLogin( function( res ) {
                Http.get( self.makeGetTokenUrl( res.code ), function( data ) {
                    if( data.code === 0 ) {
                        G.StoreManager.set( ConfStore.Token, data.rd_session );
                        G.StoreManager.set( ConfStore.LoginMode, 1 );
                        Http.get( self.makeGetWSUrl(), function( data ) {
                            if( data.code === 0 ) {
                                G.NetManager.connect( data.loginws );
                            }
                        })
                    }
                } );
            } );
        }
    },


    /**
     * 微信登录
     * @param callback {function} 回调函数
     */
    wxLogin( callback ) {
        let self = this;
        wx.login( {
            success( res ) {
                callback( res );
            },
            fail( err ) {
                let ids = {};
                ids[DefView.DialogBoxIDs.IDRETRY] = function() {
                    self.wxLogin( callback );
                    G.ViewManager.closeDialogBox();
                };
                ids[DefView.DialogBoxIDs.IDCANCEL] = function() {
                    self.wxExitGame();
                    G.ViewManager.closeDialogBox();
                };

                G.ViewManager.openDialogBox( Utils.format( G.I18N.get( 18 ), err.errcode, err.errmsg ), ids );
            },
        } );
    },

    /**
     * 生成用户信息
     * @param res {*} 微信返回数据
     */
    makeUserInfo( res ) {
        let userInfo = {};
        userInfo.userInfo = res.userInfo;
        userInfo.rawData = res.rawData;
        userInfo.signature = res.signature;
        userInfo.encryptedData = res.encryptedData;
        userInfo.iv = res.iv;
        return userInfo;
    },

    /**
     * 生成获取token链接
     * @param code {string} 通过code来兑换Token
     */
    makeGetTokenUrl( code ) {
        code = Utils.isNull( code ) ? "null" : code;
        return Utils.format( ConfUrl.GET_TOKEN_MOBILE, code );
    },

    /**
     * 生成获取websocket链接
     */
    makeGetWSUrl() {
        let userInfo = G.StoreManager.get( ConfStore.UserInfo );
        let token = G.StoreManager.get( ConfStore.Token );

        let rawData = Utils.isNull( userInfo.rawData ) ? "null" : userInfo.rawData;
        let signature = Utils.isNull( userInfo.signature ) ? "null" : userInfo.signature;
        let encryptedData = Utils.isNull( userInfo.encryptedData ) ? "null" : userInfo.encryptedData;
        let iv = Utils.isNull( userInfo.iv ) ? "null" : userInfo.iv;

        return Utils.format( ConfUrl.GET_WEBSOCKET_URL_MOBILE, rawData, signature, encryptedData, iv, token );
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
        G.ViewManager.openTips( ConfCode.WebSocket[data.code.toString()] );
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
