/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-07
 */

/**
 * 加入房间
 */

let UIBase = require( "UIBase" );
let ConfView = require( "ConfView" );

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
     * 销毁
     */
    onDestroy() {
        this.m_strRoomNum = "";
        this.m_nIndex = 0;
    },

    /**
     * 注册
     */
    register() {

    },

    /**
     * 插入数字
     * @param num {string} 数字
     */
    inserRoomNum( num ) {
        if( this.m_strRoomNum.length < this.labelRoomNum.length ) {
            this.m_strRoomNum = this.m_strRoomNum + num;
            this.labelRoomNum[this.m_nIndex++].string = num;
            if( this.m_strRoomNum === this.labelRoomNum.length ) {
                // TODO: 加入房间号
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

    // update (dt) {},
});
