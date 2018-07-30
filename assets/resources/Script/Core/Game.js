/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 游戏
 */

let Utils = require( "Utils" );
let Config = require( "Config" )
let ConfEvent = require( "ConfEvent" );
let Protocol = require( "Protocol" );
let ConfData = require( "ConfData" );

// 实例化对象
let instance = null;

let Game = cc.Class({

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
                instance = new Game();
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

    },

    /**
     * 销毁
     */
    destroy() {
        // 释放 登录 网络
        G.NetManager.unProto( this, Protocol.Login.cmd );
        // 释放 创建 网络
        G.NetManager.unProto( this, Protocol.Create.cmd );
        // 释放 加入 网络
        G.NetManager.unProto( this, Protocol.Join.cmd );
        // 释放 通知加入房间
        G.NetManager.unProto( this, Protocol.NoticeJoin.cmd );
        // 添加 推送加入房间
        G.NetManager.unProto( this, Protocol.PushJoin.cmd );
        // 释放 退出房间 网络
        G.NetManager.unProto( this, Protocol.Exit.cmd );
        // 释放 广播退出房间
        G.NetManager.unProto( this, Protocol.BroadcastExit.cmd );
        // 释放 解散房间
        G.NetManager.unProto( this, Protocol.Disband.cmd );
        // 释放 广播解散房间
        G.NetManager.unProto( this, Protocol.BroadcastDisband.cmd );
        // 释放 准备 网络
        G.NetManager.unProto( this, Protocol.Ready.cmd );
        // 释放 广播准备 网络
        G.NetManager.unProto( this, Protocol.BroadcastReady.cmd );

    },

    /**
     * 初始化游戏需要的模块
     */
    init() {
        // 初始化数据
        this.initData();
        // 初始化设备
        this.initDevice();
        // 注册
        this.register();
        // 进入游戏
        this.intoGame();
    },

    /**
     * 初始化数据
     */
    initData() {

    },

    /**
     * 初始化设备
     */
    initDevice() {
        if( Utils.isWeChatGame() ) {
            this.initWeChatDebug();
            this.initWeChatScreenKeepOn();
        }
    },

    /**
     * 注册
     */
    register() {
        // 添加 登录 网络
        G.NetManager.addProto( this, Protocol.Login.cmd );
        // 添加 创建 网络
        G.NetManager.addProto( this, Protocol.Create.cmd );
        // 添加 加入 网络
        G.NetManager.addProto( this, Protocol.Join.cmd );
        // 添加 通知加入房间
        G.NetManager.addProto( this, Protocol.NoticeJoin.cmd );
        // 添加 推送加入房间
        G.NetManager.addProto( this, Protocol.PushJoin.cmd );
        // 添加 退出房间 网络
        G.NetManager.addProto( this, Protocol.Exit.cmd );
        // 添加 广播退出房间
        G.NetManager.addProto( this, Protocol.BroadcastExit.cmd );
        // 添加 解散房间
        G.NetManager.addProto( this, Protocol.Disband.cmd );
        // 添加 广播解散房间
        G.NetManager.addProto( this, Protocol.BroadcastDisband.cmd );
        // 添加 准备 网络
        G.NetManager.addProto( this, Protocol.Ready.cmd );
        // 添加 广播准备 网络
        G.NetManager.addProto( this, Protocol.BroadcastReady.cmd );

    },

    /**
     * 进入游戏
     */
    intoGame() {
        G.ViewManager.replaceScene( Config.defaultScene, null, function( view ) {
            this.listenerLoadProgress();
            let script = view.getNode().getComponent( view.getName() );
            script.checkToken();
            if( Utils.isWeChatGame() ) {
                wx.onNetworkStatusChange( this.onNetChange.bind( this ) );
            }
        }.bind( this ) );
    },

    /**
     * 初始化微信是否调试
     */
    initWeChatDebug() {
        wx.setEnableDebug( {
            enableDebug: true,
            success( res ) {},
            fail( res ) {},
            complete( res ) {},
        } )
    },

    /**
     * 初始化屏幕是否常亮
     */
    initWeChatScreenKeepOn() {
        wx.setKeepScreenOn( {
            keepScreenOn: true,
            success( res ) {},
            fail( res ) {},
            complete( res ) {},
        } )
    },

    /**
     * 监听加载进度
     */
    listenerLoadProgress() {
        if( Utils.isWeChatGame() ) {
            cc.loader.onProgress = function( completedCount, totalCount, item ) {
                let currPercent = Math.floor( ( completedCount / totalCount ) * 100 );
                if( completedCount !== totalCount ) {
                    G.ViewManager.openProgressBar( currPercent );
                } else {
                    G.ViewManager.closeProgressBar();
                }
            };
        }
    },

    /**
     * 转换 服务器座位号 到 客户端座位号
     * @param serverSeat {number} 服务器座位号
     * @return {number} 客户端座位号
     */
    transSeat( serverSeat ) {
        let roomData = G.DataManager.getData( ConfData.RoomData );
        let playerData = G.DataManager.getData( ConfData.PlayerData );
        let maxPlayer = roomData.getRuleInfo().playerNum;
        let selfSeat = playerData.getSelfSeat();
        return ( ( ( maxPlayer - ( selfSeat ) + ( serverSeat ) ) % maxPlayer ) );
    },

    /**
     * 获取本机时间
     */
    getDate() {
        let date = new Date();
        return Utils.pad( date.getHours(), 2 ) + ":" + Utils.pad( date.getMinutes(), 2 );
    },

    /**
     * 查找自己的服务器座位号
     * @param playerInfo
     * @returns {*}
     */
    findSelfSeat( playerInfo ) {
        let selfSeat = null;
        for( let i = 0; i < playerInfo.length; ++i ) {
            if( playerInfo[i].userInfo.userId === G.DataManager.getData( ConfData.UserData ).getUserId() ) {
                selfSeat = playerInfo[i].seat;
                break;
            }
        }
        return selfSeat;
    },

    /**
     * 网络状态改变
     * @param res {object} 回调数据
     */
    onNetChange( res ) {
        G.EventManager.sendEvent( ConfEvent.EVENT_NET_CHANGE, res.networkType );
    },

    /**
     * 登录 网络回调
     * @param data {object} 登录数据
     */
    onNetLogin( data ) {
        if( data.code >= 0 ) {
            Utils.isNull( data.userInfo ) || G.DataManager.getData( ConfData.UserData ).setUserInfo( data.userInfo );
            G.EventManager.sendEvent( ConfEvent.EVENT_LOGIN_SUCCEED, data );
        } else {
            G.EventManager.sendEvent( ConfEvent.EVENT_LOGIN_FAILED, data );
        }
    },

    /**
     * 创建 网络回调
     * @param data {object} 创建数据
     */
    onNetCreate( data ) {
        if( data.code >= 0 ) {
            G.EventManager.sendEvent( ConfEvent.EVENT_CREATE_SUCCEED, data );
        } else {
            G.EventManager.sendEvent( ConfEvent.EVENT_CREATE_FAILED, data );
        }
    },

    /**
     * 加入 网络回调
     * @param data {object} 加入数据
     */
    onNetJoin( data ) {
        if( data.code >= 0 ) {
            let gameInfo = data.gameInfo;
            Utils.isNull( gameInfo.roomInfo ) || G.DataManager.getData( ConfData.RoomData ).setRoomInfo( gameInfo.roomInfo );
            Utils.isNull( gameInfo.deskInfo ) || G.DataManager.getData( ConfData.DeskData ).setDeskInfo( gameInfo.deskInfo );
            if( !Utils.isNull( gameInfo.playerInfo ) ) {
                let playerInfo = gameInfo.playerInfo;
                let playerData = G.DataManager.getData( ConfData.PlayerData );
                playerData.setSelfSeat( this.findSelfSeat( playerInfo ) );
                for( let i = 0; i < playerInfo.length; ++i ) {
                    playerData.setPlayerData( this.transSeat( playerInfo[i].seat ), playerInfo[i] );
                }
            }
            G.EventManager.sendEvent( ConfEvent.EVENT_JOIN_SUCCEED, data );
        } else {
            G.EventManager.sendEvent( ConfEvent.EVENT_JOIN_FAILED, data );
        }
    },

    /**
     * 通知加入 网络回调
     * @param data {object} 通知加入数据
     */
    onNetNoticeJoin( data ) {
        G.EventManager.sendEvent( ConfEvent.EVENT_NOTICE_JOIN, data );
    },

    /**
     * 推送加入 网络回调
     * @param data {object} 推送加入数据
     */
    onNetPushJoin( data ) {
        G.EventManager.sendEvent( ConfEvent.EVENT_PUSH_JOIN, data );
    },

    /**
     * 退出 网络回调
     * @param data {object} 退出数据
     */
    onNetExit( data ) {
        if( data.code >= 0 ) {
            G.EventManager.sendEvent( ConfEvent.EVENT_EXIT_SUCCEED, data );
        } else {
            G.EventManager.sendEvent( ConfEvent.EVENT_EXIT_FAILED, data );
        }
    },

    /**
     * 广播退出 网络回调
     * @param data {object} 广播退出数据
     */
    onNetBroadcastExit( data ) {
        G.EventManager.sendEvent( ConfEvent.EVENT_BROADCAST_EXIT, data );
    },

    /**
     * 解散 网络回调
     * @param data {object} 解散数据
     */
    onNetDisband( data ) {
        if( data.code >= 0 ) {
            G.EventManager.sendEvent( ConfEvent.EVENT_DISBAND_SUCCEED, data );
        } else {
            G.EventManager.sendEvent( ConfEvent.EVENT_DISBAND_FAILED, data );
        }
    },

    /**
     * 广播解散 网络回调
     * @param data {object} 广播解散数据
     */
    onNetBroadcastDisband( data ) {
        G.EventManager.sendEvent( ConfEvent.EVENT_BROADCAST_DISBAND, data );
    },

    /**
     * 准备 网络回调
     * @param data {object} 准备数据
     */
    onNetReady( data ) {
        if( data.code >= 0 ) {
            G.EventManager.sendEvent( ConfEvent.EVENT_READY_SUCCEED, data );
        } else {
            G.EventManager.sendEvent( ConfEvent.EVENT_READY_FAILED, data );
        }
    },

    /**
     * 广播准备 网络回调
     * @param data {object} 广播准备数据
     */
    onNetBroadcastReady( data ) {
        G.EventManager.sendEvent( ConfEvent.EVENT_BROADCAST_READY, data );
    },

    /**
     * 取消准备 网络回调
     * @param data {object} 广播取消准备数据
     */
    onNetUnReady( data ) {
        if( data.code >= 0 ) {
            G.EventManager.sendEvent( ConfEvent.EVENT_UN_READY_SUCCEED, data );
        } else {
            G.EventManager.sendEvent( ConfEvent.EVENT_UN_READY_FAILED, data );
        }
    },

    /**
     * 广播取消准备 网络回调
     * @param data {object} 广播取消准备数据
     */
    onNetBroadcastUnReady( data ) {
        G.EventManager.sendEvent( ConfEvent.EVENT_BROADCAST_UN_READY, data );
    },

    /**
     * 广播骰子 网络回调
     * @param data {object} 广播骰子数据
     */
    onNetBroadcastDice( data ) {
        G.EventManager.sendEvent( ConfEvent.EVENT_BROADCAST_DICE, data );

    },

    /**
     * 推送发牌 网络回调
     * @param data {object} 推送发牌数据
     */
    onNetPushDeal( data ) {
        G.EventManager.sendEvent( ConfEvent.EVENT_PUSH_DEAL, data );
    },

    /**
     * 广播摸牌 网络回调
     * @param data {object} 广播摸牌数据
     */
    onNetBroadcastDraw( data ) {
        G.EventManager.sendEvent( ConfEvent.EVENT_BROADCAST_DRAW, data );
    },

    /**
     * 出牌 网络回调
     * @param data {object} 出牌数据
     */
    onNetDiscard( data ) {
        if( data.code >= 0 ) {
            G.EventManager.sendEvent( ConfEvent.EVENT_DISCARD_SUCCEED, data );
        } else {
            G.EventManager.sendEvent( ConfEvent.EVENT_DISCARD_FAILED, data );
        }
    },

    /**
     * 广播出牌 网络回调
     * @param data {object} 广播出牌数据
     */
    onNetBroadcastDiscard( data ) {
        G.EventManager.sendEvent( ConfEvent.EVENT_BROADCAST_DISCARD, data );
    },

    /**
     * 广播本轮操作人 网络回调
     * @param data {object} 广播本轮操作人数据
     */
    onNetBroadcastController( data ) {
        G.EventManager.sendEvent( ConfEvent.EVENT_BROADCAST_CONTROLLER, data );
    },

    /**
     * 推送吃碰杠听胡过 网络回调
     * @param data {object} 推送 吃碰杠听胡过数据
     */
    onNetPushAction( data ) {
        G.EventManager.sendEvent( ConfEvent.EVENT_PUSH_ACTION, data );
    },

    /**
     * 吃 网络回调
     * @param data {object} 吃数据
     */
    onNetChi( data ) {
        if( data.code >= 0 ) {
            G.EventManager.sendEvent( ConfEvent.EVENT_CHI_SUCCEED, data );
        } else {
            G.EventManager.sendEvent( ConfEvent.EVENT_CHI_FAILED, data );
        }
    },

    /**
     * 广播吃 网络回调
     * @param data {object} 广播吃数据
     */
    onNetBroadcastChi( data ) {
        G.EventManager.sendEvent( ConfEvent.EVENT_BROADCAST_CHI, data );
    },

    /**
     * 碰 网络回调
     * @param data {object} 碰数据
     */
    onNetPeng( data ) {
        if( data.code >= 0 ) {
            G.EventManager.sendEvent( ConfEvent.EVENT_PENG_SUCCEED, data );
        } else {
            G.EventManager.sendEvent( ConfEvent.EVENT_PENG_FAILED, data );
        }
    },

    /**
     * 广播碰 网络回调
     * @param data {object} 广播碰数据
     */
    onNetBroadcastPeng( data ) {
        G.EventManager.sendEvent( ConfEvent.EVENT_BROADCAST_PENG, data );
    },

    /**
     * 杠 网络回调
     * @param data {object} 杠数据
     */
    onNetGang( data ) {
        if( data.code >= 0 ) {
            G.EventManager.sendEvent( ConfEvent.EVENT_GANG_SUCCEED, data );
        } else {
            G.EventManager.sendEvent( ConfEvent.EVENT_GANG_FAILED, data );
        }
    },

    /**
     * 广播杠 网络回调
     * @param data {object} 广播杠数据
     */
    onNetBroadcastGang( data ) {
        G.EventManager.sendEvent( ConfEvent.EVENT_BROADCAST_GANG, data );
    },

    /**
     * 听 网络回调
     * @param data {object} 听数据
     */
    onNetTing( data ) {
        if( data.code >= 0 ) {
            G.EventManager.sendEvent( ConfEvent.EVENT_TING_SUCCEED, data );
        } else {
            G.EventManager.sendEvent( ConfEvent.EVENT_TING_FAILED, data );
        }
    },

    /**
     * 广播听 网络回调
     * @param data {object} 广播听数据
     */
    onNetBroadcastTing( data ) {
        G.EventManager.sendEvent( ConfEvent.EVENT_BROADCAST_TING, data );
    },

    /**
     * 胡 网络回调
     * @param data {object} 胡数据
     */
    onNetHu( data ) {
        if( data.code >= 0 ) {
            G.EventManager.sendEvent( ConfEvent.EVENT_HU_SUCCEED, data );
        } else {
            G.EventManager.sendEvent( ConfEvent.EVENT_HU_FAILED, data );
        }
    },

    /**
     * 广播胡 网络回调
     * @param data {object} 广播胡数据
     */
    onNetBroadcastHu( data ) {
        G.EventManager.sendEvent( ConfEvent.EVENT_BROADCAST_HU, data );
    },

    /**
     * 广播小结算 网络回调
     * @param data {object} 广播小结算数据
     */
    onNetBroadcastClosing( data ) {
        G.EventManager.sendEvent( ConfEvent.EVENT_BROADCAST_CLOSING, data );
    },

    /**
     * 广播大结算 网络回调
     * @param data {object} 广播大结算数据
     */
    onNetBroadcastTotalClosing( data ) {
        G.EventManager.sendEvent( ConfEvent.EVENT_BROADCAST_TOTAL_CLOSING, data );
    },

    /**
     * 网络 回调
     * @param msg
     */
    onNet( msg ) {
        switch( msg.cmd ) {
            case Protocol.Login.cmd:
                this.onNetLogin( msg.data );
                break;
            case Protocol.Create.cmd:
                this.onNetCreate( msg.data );
                break;
            case Protocol.Join.cmd:
                this.onNetJoin( msg.data );
                break;
            case Protocol.NoticeJoin.cmd:
                this.onNetNoticeJoin( msg.data );
                break;
            case Protocol.PushJoin.cmd:
                this.onNetPushJoin( msg.data );
                break;
            case Protocol.Exit.cmd:
                this.onNetExit( msg.data );
                break;
            case Protocol.BroadcastExit.cmd:
                this.onNetBroadcastExit( msg.data );
                break;
            case Protocol.Disband.cmd:
                this.onNetDisband( msg.data );
                break;
            case Protocol.BroadcastDisband.cmd:
                this.onNetBroadcastDisband( msg.data );
                break;
            case Protocol.Ready.cmd:
                this.onNetReady( msg.data );
                break;
            case Protocol.BroadcastReady.cmd:
                this.onNetBroadcastReady( msg.data );
                break;
            case Protocol.UnReady.cmd:
                this.onNetUnReady( msg.data );
                break;
            case Protocol.BroadcastUnReady.cmd:
                this.onNetBroadcastUnReady( msg.data );
                break;
            case Protocol.BroadcastDice.cmd:
                this.onNetBroadcastDice( msg.data );
                break;
            case Protocol.PushDeal.cmd:
                this.onNetPushDeal( msg.data );
                break;
            case Protocol.BroadcastDraw.cmd:
                this.onNetBroadcastDraw( msg.data );
                break;
            case Protocol.Discard.cmd:
                this.onNetDiscard( msg.data );
                break;
            case Protocol.BroadcastDiscard.cmd:
                this.onNetBroadcastDiscard( msg.data );
                break;
            case Protocol.BroadcastController.cmd:
                this.onNetBroadcastController( msg.data );
                break;
            case Protocol.PushAction.cmd:
                this.onNetPushAction( msg.data );
                break;
            case Protocol.Chi.cmd:
                this.onNetChi( msg.data );
                break;
            case Protocol.BroadcastChi.cmd:
                this.onNetBroadcastChi( msg.data );
                break;
            case Protocol.Peng.cmd:
                this.onNetPeng( msg.data );
                break;
            case Protocol.BroadcastPeng.cmd:
                this.onNetBroadcastPeng( msg.data );
                break;
            case Protocol.Gang.cmd:
                this.onNetGang( msg.data );
                break;
            case Protocol.BroadcastGang.cmd:
                this.onNetBroadcastGang( msg.data );
                break;
            case Protocol.Ting.cmd:
                this.onNetTing( msg.data );
                break;
            case Protocol.BroadcastTing.cmd:
                this.onNetBroadcastTing( msg.data );
                break;
            case Protocol.Hu.cmd:
                this.onNetHu( msg.data );
                break;
            case Protocol.BroadcastHu.cmd:
                this.onNetBroadcastHu( msg.data );
                break;
            case Protocol.BroadcastClosing.cmd:
                this.onNetBroadcastClosing( msg.data );
                break;
            case Protocol.BroadcastTotalClosing.cmd:
                this.onNetBroadcastTotalClosing( msg.data );
                break;


        }
    },
});

module.exports = Game;