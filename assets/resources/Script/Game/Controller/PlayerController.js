/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-07
 */

/**
 * 玩家 控制器
 */

let PlayerController = cc.Class({

    /**
     * 构造
     */
    ctor() {
        this.m_objPlayerData = arguments[0];
        this.m_objPlayerView = arguments[1];
    },

    /**
     * 销毁
     */
    destroy() {
        this.m_objPlayerData.clear();
        this.m_objPlayerView.clear();
    },

    /**
     * 加入
     * @param seat {number} 座位号
     * @param data {object} 玩家数据
     */
    join( seat, data ) {
        this.m_objPlayerData.join( seat, data );
        this.m_objPlayerView.join( seat, data );
    },

    /**
     * 退出
     * @param seat {number} 座位号
     */
    exit( seat ) {
        this.m_objPlayerData.exit( seat );
        this.m_objPlayerView.exit( seat );
    },

});

module.exports = PlayerController;