/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-07
 */

/**
 * 玩家 视图
 */

let UIBase = require( "UIBase" );
let ConfData = require( "ConfData" );
let Utils = require( "Utils" );

cc.Class({
    extends: UIBase,

    properties: {
        nodePlayer: { default: [], type: cc.Node, tooltip: "玩家集合" },
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

    },

    /**
     * 初始化数据
     */
    initData() {
        // 玩家视图数组
        this.m_arrScriptPlayer = [];
        for( let i = 0; i < this.nodePlayer.length; ++i ) {
            this.m_arrScriptPlayer[i] = this.nodePlayer[i].getComponent( "Player_" + i );
        }

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
     * 加入游戏
     * @param seat {number} 座位号
     * @param data {object} 玩家数据
     */
    join( seat, data ) {
        this.m_arrScriptPlayer[seat].join( data );
    },

    /**
     * 退出游戏
     * @param seat {number} 座位号
     */
    exit( seat ) {
        this.m_arrScriptPlayer[seat].exit();
    },

    /**
     * 清理所有玩家
     */
    clear() {
        for( let i = 0; i < this.m_arrScriptPlayer.length; ++i ) {
            this.m_arrScriptPlayer[i].clear();
        }
    },

    // update (dt) {},
});
