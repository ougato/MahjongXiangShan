/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-07
 */

/**
 * 加入房间
 */

let UIBase = require( "UIBase" );
let ConfView = require( "ConfView" );
let Protocol = require( "Protocol" );
let ConfEvent = require( "ConfEvent" );

cc.Class({
    extends: UIBase,

    properties: {
        labelRoomNum: { default: [], type: cc.Label, tooltip: "房号" },
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
        G.EventManager.unEvent( this, ConfEvent.EVENT_JOIN_FAILED );

        cc.systemEvent.off( cc.SystemEvent.EventType.KEY_DOWN );
    },

    /**
     * 初始化数据
     */
    initData() {
        // 房间号
        this.m_strRoomNum = "";
        // 指针下标
        this.m_nIndex = 0;

    },

    /**
     * 初始化视图
     */
    initView() {
        for( let i = 0; i < this.labelRoomNum.length; ++i ) {
            this.labelRoomNum[i].string = "";
        }
    },

    /**
     * 注册
     */
    register() {
        G.EventManager.addEvent( this, ConfEvent.EVENT_JOIN_FAILED );

        cc.systemEvent.on( cc.SystemEvent.EventType.KEY_DOWN, this.onKey.bind( this ) );
    },

    /**
     * 插入数字
     * @param num {string} 数字
     */
    inserRoomNum( num ) {
        if( this.m_strRoomNum.length < this.labelRoomNum.length ) {
            this.m_strRoomNum = this.m_strRoomNum + num;
            this.labelRoomNum[this.m_nIndex++].string = num;
            if( this.m_strRoomNum.length === this.labelRoomNum.length ) {
                let message = Protocol.getC2S( Protocol.Join );
                message.data.roomId = this.m_strRoomNum;
                G.NetManager.send( message.cmd, message.data );
            }
        }
    },

    /**
     * 删除数字
     */
    deleteLastRoomNum() {
        if( this.m_nIndex > 0 ) {
            this.m_strRoomNum = this.m_strRoomNum.substr( 0, this.m_nIndex - 1 );
            this.labelRoomNum[--this.m_nIndex].string = "";
        }
    },

    /**
     * 清理数字
     */
    clearRoomNum() {
        for( let i = 0; i < this.labelRoomNum.length; ++i ) {
            this.labelRoomNum[i].string = "";
        }
        this.m_strRoomNum = "";
        this.m_nIndex = 0;
    },

    /**
     * 返回 回调
     */
    onGoBack() {
        G.ViewManager.closePrefab( ConfView.Prefab.FriendJoinRoom );
    },

    /**
     * 按下数字 回调
     * @param target {object} 按钮对象
     * @param num {string} 数字
     */
    onPushNumber( target, num ) {
        switch( num ) {
            case "delete":
                this.deleteLastRoomNum();
                break;
            case "clear":
                this.clearRoomNum();
                break;
            default:
                this.inserRoomNum( num );
                break;
        }
    },

    /**
     * 加入 失败
     * @param data {object} 数据
     */
    onEventJoinFailed( data ) {
        this.clearRoomNum();
    },

    /**
     * 事件 回调
     * @param event
     */
    onEvent( event ) {
        switch( event.id ) {
            case ConfEvent.EVENT_JOIN_FAILED:
                this.onEventJoinFailed( event.data );
                break;
        }
    },

    /**
     * 键盘 回调
     */
    onKey( event ) {
        switch( event.keyCode ) {
            case cc.KEY.space:
                this.clearRoomNum();
                break;
            case cc.KEY.backspace: case cc.KEY.Delete:
                this.deleteLastRoomNum();
                break;
            case cc.KEY.num0: case cc.KEY["0"]:
                this.inserRoomNum( "0" );
                break;
            case cc.KEY.num1: case cc.KEY["1"]:
                this.inserRoomNum( "1" );
                break;
            case cc.KEY.num2: case cc.KEY["2"]:
                this.inserRoomNum( "2" );
                break;
            case cc.KEY.num3: case cc.KEY["3"]:
                this.inserRoomNum( "3" );
                break;
            case cc.KEY.num4: case cc.KEY["4"]:
                this.inserRoomNum( "4" );
                break;
            case cc.KEY.num5: case cc.KEY["5"]:
                this.inserRoomNum( "5" );
                break;
            case cc.KEY.num6: case cc.KEY["6"]:
                this.inserRoomNum( "6" );
                break;
            case cc.KEY.num7: case cc.KEY["7"]:
                this.inserRoomNum( "7" );
                break;
            case cc.KEY.num8: case cc.KEY["8"]:
                this.inserRoomNum( "8" );
                break;
            case cc.KEY.num9: case cc.KEY["9"]:
                this.inserRoomNum( "9" );
                break;
        }
    },

    // update (dt) {},
});
