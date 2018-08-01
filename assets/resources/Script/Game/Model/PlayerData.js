/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-07
 */

let Utils = require( "Utils" );
let ConfCard = require( "ConfCard" );
let Log = require( "Log" );
let DefLog = require( "DefLog" );

/**
 * 数据
 */
let Data = cc.Class( {

    /**
     * 构造
     */
    ctor() {
        // 座位号
        this.seat = null;
        // ID
        this.userId = null;
        // 名字
        this.name = null;
        // 性别
        this.sex = null;
        // 头像连接
        this.pictureUrl = null;
        // 金币
        this.gold = null;
        // 钻石
        this.diamond = null;
        // 手牌
        this.shouPai = [];
        // 摆牌
        this.baiPai = [];
        // 摸牌
        this.moPai = null;
        // 出牌
        this.chuPai = [];
        // 是否庄家
        this.isBanker = null;
        // 是否房主
        this.isHost = null;
        // 是否准备
        this.isReady = null;
        // 是否听牌
        this.isReadyHand = null;
        // 是否离线
        this.isOffLine = null;
    },

    /**
     * 销毁
     */
    destroy() {

    },

} );

// 实例化对象
let instance = null;

/**
 * 玩家数据
 */
let PlayerData = cc.Class({

    /**
     * 静态
     */
    statics: {

        /**
         * 获取实例
         * @returns {Function}
         */
        getInstance() {
            if( Utils.isNull( instance ) ) {
                instance = new PlayerData();
            }
            return instance;
        },

        /**
         * 销毁实例
         */
        destroy() {
            if( !Utils.isNull( instance ) ) {
                instance.destroy();
            }
        },

    },

    /**
     * 构造
     */
    ctor() {
        // 玩家信息
        this.m_mapPlayerInfo = new Map();
        // 自己服务器座位号
        this.m_nSelfSeat = null;
    },

    /**
     * 销毁
     */
    destroy() {
        this.m_mapPlayerInfo.clear();
        this.m_mapPlayerInfo = null;
        this.m_nSelfSeat = null;
    },

    /**
     * 设置牌数据
     * @param seat {number} 客户端座位号
     * @param cardData {array} 牌数据
     */
    setCardData( seat, cardData ) {
        for( let i = 0; i < cardData; ++i ) {
            let type = cardData[i].type;
            let card = cardData[i].card;
            switch( type ) {
                case ConfCard.CardType.ShouPai:
                    this.setShouPai( seat, card );
                    break;
                case ConfCard.CardType.ChuPai:
                    this.setChuPai( seat, card );
                    break;
                case ConfCard.CardType.ChiPai:
                case ConfCard.CardType.PengPai:
                case ConfCard.CardType.MingGang:
                case ConfCard.CardType.AnGang:
                case ConfCard.CardType.BaGang:
                case ConfCard.CardType.QiangGang:
                    this.addBaiPai( seat, card );
                    break;
                case ConfCard.CardType.MoPai:
                    this.setMoPai( seat, card );
                    break;
                default:

                    break;
            }
        }
    },

    /**
     * 设置数据
     */
    setData( seat, serverData ) {
        let data = null;
        if( this.m_mapPlayerInfo.has( seat ) ) {
            data = this.m_mapPlayerInfo.get( seat );
        } else {
            data = new Data();
            this.m_mapPlayerInfo.set( seat, data );
        }

        // 座位号
        data.seat = serverData.seat;
        // ID
        data.userId = serverData.userInfo.userId;
        // 名字
        data.name = serverData.userInfo.name;
        // 性别
        data.sex = serverData.userInfo.sex;
        // 头像连接
        data.pictureUrl = serverData.userInfo.pictureUrl;
        // 金币
        data.gold = serverData.userInfo.gold;
        // 钻石
        data.diamond = serverData.userInfo.diamond;
        //设置牌数据
        this.setCardData( seat, serverData.cardInfo );
        // 是否庄家
        data.isBanker = serverData.stateInfo.isBanker;
        // 是否房主
        data.isHost = serverData.stateInfo.isHost;
        // 是否准备
        data.isReady = serverData.stateInfo.isReady;
        // 是否听牌
        data.isReadyHand = serverData.stateInfo.isReadyHand;
        // 是否离线
        data.isOffLine = serverData.stateInfo.isOffLine;
    },

    /**
     * 获取数据
     * @param seat {number} 客户端座位号
     * @return {object|*}
     */
    getData( seat ) {
        let data = null;
        if( this.m_mapPlayerInfo.has( seat ) ) {
            data = this.m_mapPlayerInfo.get( seat );
        }
        return data;
    },

    /**
     * 设置自己服务器座位号
     * @param seat {number} 服务器座位号
     */
    setSelfSeat( seat ) {
        this.m_nSelfSeat = seat;
    },

    /**
     * 获取自己服务器座位号
     * @return {number}
     */
    getSelfSeat(){
        return this.m_nSelfSeat;
    },

    /**
     * 设置手牌
     * @param seat {number} 客户端座位号
     * @param cardInfo {object} 手牌信息
     */
    setShouPai( seat, cardInfo ) {
        if( this.m_mapPlayerInfo.has( seat ) ) {
            let data = this.m_mapPlayerInfo.get( seat );
            data.shouPai = cardInfo.card;
        } else {
            Log.error( DefLog[19] );
        }
    },

    /**
     * 添加手牌
     * @param seat {number} 客户端座位号
     * @param card {number} 牌
     */
    addShouPai( seat, card ) {
        if( this.m_mapPlayerInfo.has( seat ) ) {
            let data = this.m_mapPlayerInfo.get( seat );
            if( !Utils.isArray( data.shouPai ) ) {
                data.shouPai = [];
            }
            data.shouPai.splice( data.shouPai.length, 0, cardInfo );
            data.shouPai.sort();
        } else {
            Log.error( DefLog[19] );
        }
    },

    /**
     * 删除手牌
     * @param seat {number} 客户端座位号
     * @param card {number} 牌
     */
    delShouPai( seat, card ) {
        if( this.m_mapPlayerInfo.has( seat ) ) {
            let data = this.m_mapPlayerInfo.get( seat );
            if( Utils.isArray( data.shouPai ) ) {
                if( data.shouPai.length > 0 ) {
                    for( let i = 0; i < data.shouPai.length; ++i ) {
                        if( data.shouPai[i] === card ) {
                            data.shouPai.splice( i, 1 );
                            break;
                        }
                    }
                }
            } else {
                data.shouPai = [];
            }
        } else {
            Log.error( DefLog[19] );
        }
    },

    /**
     * 清理手牌
     * @param seat {number} 客户端座位号
     */
    clearShouPai( seat ) {
        if( this.m_mapPlayerInfo.has( seat ) ) {
            let data = this.m_mapPlayerInfo.get( seat );
            if( Utils.isArray( data.shouPai ) ) {
                if( data.shouPai.length > 0 ) {
                    data.shouPai.splice( 0, data.shouPai.length );
                }
            } else {
                data.shouPai = [];
            }
        } else {
            Log.error( DefLog[19] );
        }
    },

    /**
     * 添加摆牌
     * @param seat {number} 客户端座位号
     * @param cardInfo {object} 牌信息
     */
    addBaiPai( seat, cardInfo ) {
        if( this.m_mapPlayerInfo.has( seat ) ) {
            let data = this.m_mapPlayerInfo.get( seat );
            if( !Utils.isArray( data.baiPai ) ) {
                data.baiPai = [];
            }
            data.baiPai.splice( data.baiPai.length, 0, cardInfo );
        } else {
            Log.error( DefLog[19] );
        }
    },

    /**
     * 删除摆牌
     * @param seat {number} 客户端座位号
     * @param index {number} 摆牌下标
     */
    delBaiPai( seat, index ) {
        if( this.m_mapPlayerInfo.has( seat ) ) {
            let data = this.m_mapPlayerInfo.get( seat );
            if( Utils.isArray( data.baiPai ) ) {
                if( data.baiPai.length > index ) {
                    data.baiPai.splice( index, 1 );
                }
            } else {
                data.baiPai = [];
            }
        } else {
            Log.error( DefLog[19] );
        }
    },

    /**
     * 清理摆牌
     * @param seat {number} 客户端座位号
     */
    clearBaiPai( seat ) {
        if( this.m_mapPlayerInfo.has( seat ) ) {
            let data = this.m_mapPlayerInfo.get( seat );
            if( Utils.isArray( data.baiPai ) ) {
                if( data.baiPai.length > 0 ) {
                    data.baiPai.splice( 0, data.baiPai.length );
                }
            } else {
                data.baiPai = [];
            }
        } else {
            Log.error( DefLog[19] );
        }
    },

    /**
     * 设置出牌
     * @param seat {number} 客户端座位号
     * @param cardInfo {object} 出牌信息
     */
    setChuPai( seat, cardInfo ) {
        if( this.m_mapPlayerInfo.has( seat ) ) {
            let data = this.m_mapPlayerInfo.get( seat );
            data.chuPai = cardInfo.card;
        } else {
            Log.error( DefLog[19] );
        }
    },

    /**
     * 添加出牌
     * @param seat {number} 客户端座位号
     * @param card {number} 牌
     */
    addChuPai( seat, card ) {
        if( this.m_mapPlayerInfo.has( seat ) ) {
            let data = this.m_mapPlayerInfo.get( seat );
            if( !Utils.isArray( data.chuPai ) ) {
                data.chuPai = [];
            }
            data.chuPai.splice( data.chuPai.length, 0, card )
        } else {
            Log.error( DefLog[19] );
        }
    },

    /**
     * 删除出牌
     * @param seat {number} 客户端座位号
     * @param card {number} 牌
     */
    delChuPai( seat, card ) {
        if( this.m_mapPlayerInfo.has( seat ) ) {
            let data = this.m_mapPlayerInfo.get( seat );
            if( Utils.isArray( data.chuPai ) ) {
                if( data.chuPai.length > 0 ) {
                    for( let i = data.chuPai.length; i > 0; --i ) {
                        if( data.chuPai[i] === card ) {
                            data.chuPai.splice( i, 1 );
                            break;
                        }
                    }
                }
            } else {
                data.chuPai = [];
            }
        } else {
            Log.error( DefLog[19] );
        }
    },

    /**
     * 清理出牌
     * @param seat {number} 客户端座位号
     */
    clearChuPai( seat ) {
        if( this.m_mapPlayerInfo.has( seat ) ) {
            let data = this.m_mapPlayerInfo.get( seat );
            if( Utils.isArray( data.chuPai ) ) {
                if( data.chuPai.length > 0 ) {
                    data.chuPai.splice( 0, data.chuPai.length );
                }
            } else {
                data.chuPai = [];
            }
        } else {
            Log.error( DefLog[19] );
        }
    },

    /**
     * 设置摸牌
     * @param seat {number} 客户端座位号
     * @param cardInfo {array} 摸牌信息
     */
    setMoPai( seat, cardInfo ) {
        if( this.m_mapPlayerInfo.has( seat ) ) {
            let data = this.m_mapPlayerInfo.get( seat );
            data.moPai = cardInfo.card[0];
        } else {
            Log.error( DefLog[19] );
        }
    },


    /**
     * 清理摸牌
     * @param seat {number} 客户端座位号
     */
    clearMoPai( seat ) {
        if( this.m_mapPlayerInfo.has( seat ) ) {
            let data = this.m_mapPlayerInfo.get( seat );
            data.moPai = null;
        } else {
            Log.error( DefLog[19] );
        }
    },

    /**
     * 清理玩家
     */
    clear() {
        this.m_mapPlayerInfo.clear();
        this.m_nSelfSeat = null;
    },
});

module.exports = PlayerData;