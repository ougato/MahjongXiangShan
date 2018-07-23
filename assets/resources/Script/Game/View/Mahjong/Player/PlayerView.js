/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-07
 */

/**
 * 玩家 视图
 */

let UIBase = require( "UIBase" );

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
        this.m_arrPlayer = [];
        for( let i = 0; i < this.nodePlayer.length; ++i ) {
            this.m_arrPlayer[i] = this.nodePlayer[i].getComponent( "Player_" + i );
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
     * @param seat
     */
    join( seat ) {
        // TODO: 需要转换下 服务器座位号 到 本地座位号

    },

    /**
     * 退出游戏
     */
    exit( seat ) {
        // TODO: 需要转换下 服务器座位号 到 本地座位号
        this.clear( seat );
    },

    /**
     *
     */
    clear( seat ) {
        // TODO: 需要转换下 服务器座位号 到 本地座位号
        if( Utils.isNull( seat ) ) {
            for( let i = 0; i < this.m_arrPlayer.length; ++i ) {
                this.m_arrPlayer[i].clear();
            }
        } else {
            this.m_arrPlayer[seat].clear();
        }
    },

    // update (dt) {},
});
