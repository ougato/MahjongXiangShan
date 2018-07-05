// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

let Utils = require( "Utils" );
let DefView = require( "DefView" );
let Http = require( "Http" );

cc.Class({
    extends: cc.Component,

    properties: {
        pBG: { default: null, type: cc.Sprite },
        pFrame: { default: null, type: cc.Sprite },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.index = 0;
        this.arrLoading = [];
        this.loading1 = null;
        this.loading2 = null;
    },

    callfunc() {

    },

    onSend() {
        G.NetManager.connect( "ws://192.168.1.24:8181/" );
    },

    onClick() {
        // G.ViewManager.openLoading( "爱你哟" );
        // this.arrLoading[this.index++] = G.ViewManager.openLoading();
        Http.get( "https://httpbin.org/get?show_env=1", function( data ) {
            cc.log( data );
        } );
        // Http.get( "https://www.baidu.com/s?wd=http", function( data ) {
        //     cc.log( data );
        // } );
    },

    onClick2() {
        let ws = G.NetManager.getWS();

        let cmd = ConfNet.LOGIN;
        let data = {};
        data.login = "我要登录";
        ws.send( cmd, data );
    },

    onClose1() {
        let ws = G.NetManager.getWS();
        ws.getWSObject().close();
    },

    onClose2() {
        G.ViewManager.openTips( "666" );
    },


    // update (dt) {},
});
