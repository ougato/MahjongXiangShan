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
let DefView = require( "DefView" );
let ConfStore = require( "ConfStore" );
let ConfEvent = require( "ConfEvent" );
let ConfView = require( "ConfView" );

cc.Class({
    extends: UIBase,

    properties: {
        pEnterGame: { default: null, type: cc.Button },
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
        G.EventManager.unEvent( this, ConfEvent.LOGIN_SUCCEED );
    },

    /**
     * 初始化数据
     */
    initData() {
        this.buttonGetUserInfo = null;

    },

    /**
     * 初始化视图
     */
    initView() {
        let style = {
            // left: this.pEnterGame.node.getPositionX(),
            left: 360,
            // top: this.pEnterGame.node.getPositionY(),
            top: 200,
            width: this.pEnterGame.node.getContentSize().width,
            height: this.pEnterGame.node.getContentSize().height,
        };
        this.buttonGetUserInfo = wx.createUserInfoButton({
            type: 'image',
            image: cc.url.raw( "resources/atlas/loading.png" ),
            style: style,
        });
        this.buttonGetUserInfo.onTap( this.onGetUserInfo.bind( this ) );
    },

    /**
     * 注册
     */
    register() {
        G.EventManager.addEvent( this, ConfEvent.LOGIN_SUCCEED );
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
     * 退出微信小游戏
     */
    wxExitGame( callback ) {
        let self = this;
        wx.exitMiniProgram( {
            success( res ) {
                Utils.isFunction( callback ) && callback( res );
            },
            fail( err ) {
                let ids = {};
                ids[DefView.DialogBoxIDs.IDRETRY] = function() {
                    self.wxExitGame( callback );
                };
                G.ViewManager.openDialogBox( Utils.format( G.I18N.get( 22 ), err.errcode, err.errmsg ), ids );
            },
        } );
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
                ids[DefView.DialogBoxIDs.IDOK] = function() {
                    self.wxLogin( callback );
                };
                ids[DefView.DialogBoxIDs.IDCANCEL] = function() {
                    self.wxExitGame()
                };

                G.ViewManager.openDialogBox( Utils.format( G.I18N.get( 18 ), err.errcode, err.errmsg ), ids );
            },
        } );
    },

    /**
     * 生成用户信息
     * @param res
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
     * 登录成功
     * @param data {object} 用户数据
     */
    onLoginSucceed( data ) {
        G.ViewManager.replaceScene( ConfView.Scene.Lobby, data );
    },

    /**
     * 事件 回调
     */
    onEvent( msg ) {
        switch( msg.id ) {
            case ConfEvent.LOGIN_SUCCEED:
                this.onLoginSucceed( msg.data );
                break;
        }
    },

    // update (dt) {},
});
