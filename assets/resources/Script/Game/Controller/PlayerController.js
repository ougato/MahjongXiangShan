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
        this.m_objPlayerData = null;
        this.m_objPlayerView = null;
    },

    /**
     * 加入
     * @param seat {number} 客户端座位号
     * @param data {object} 玩家数据
     */
    join( seat, data ) {
        this.m_objPlayerData.join( seat, data );
        this.m_objPlayerView.join( seat, data );
    },

    /**
     * 退出
     * @param seat {number} 客户端座位号
     */
    exit( seat ) {
        this.m_objPlayerData.exit( seat );
        this.m_objPlayerView.exit( seat );
    },

    /**
     * 准备
     * @param seat {number} 客户端座位号
     * @param isReady {boolean} 是否准备
     */
    ready() {
        let argLen = arguments.length;
        if( argLen === 1 ) {
            let arg0 = arguments[0];
            let playerData = this.m_objPlayerData.m_mapPlayerInfo;
            playerData.forEach( function( value, index ) {
                this.m_objPlayerData.ready( G.Game.transSeat( value.seat ), arg0 );
                this.m_objPlayerView.ready( G.Game.transSeat( value.seat ), arg0 );
            }.bind( this ) );
        } else {
            let arg0 = arguments[0];
            let arg1 = arguments[1];
            this.m_objPlayerData.ready( arg0, arg1 );
            this.m_objPlayerView.ready( arg0, arg1 );
        }
    },

    /**
     * 发牌
     * @param seat {number} 座位
     * @param cards {array} 手牌
     */
    deal( seat, cards ) {
        this.m_objPlayerData.deal( seat, cards );
        this.m_objPlayerView.deal( seat, cards );
    },
});

module.exports = PlayerController;