/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-07
 */

/**
 * 系统信息
 */

let UIBase = require( "UIBase" );
let ConfNet = require( "ConfNet" );
let Utils = require( "Utils" );

// 每个功能的间隔宽度（p）
const GAP_WIDTH = 10;
// 系统信息
const SYSTEM_FUNCTION = {
    Net: "Net",
    Time: "Time",
    RemainCard: "RemainCard",
};
// 获取事件间隔（s）
const GET_TIME_GAP = 30;

cc.Class({
    extends: UIBase,

    properties: {
        nodeRoot: { default: null, type: cc.Node, tooltip: "根节点" },
        spriteWiFi: { default: null, type: cc.Sprite, tooltip: "WiFi" },
        sprite2G: { default: null, type: cc.Sprite, tooltip: "2G" },
        sprite3G: { default: null, type: cc.Sprite, tooltip: "3G" },
        sprite4G: { default: null, type: cc.Sprite, tooltip: "4G" },
        spriteUnknown: { default: null, type: cc.Sprite, tooltip: "未知网络" },
        spriteNone: { default: null, type: cc.Sprite, tooltip: "无网络" },
        labelTime: { default: null, type: cc.Label, tooltip: "时间" },
        labelRemainCard: { default: null, type: cc.Label, tooltip: "剩余牌数" },
    },

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
        this.m_objFunction = null;
        if( !Utils.isNull( this.m_nGetTimeTimerId ) ) {
            clearInterval( this.m_nGetTimeTimerId );
            this.m_nGetTimeTimerId = null;
        }
    },

    /**
     * 初始化数据
     */
    initData() {
        // 系统功能
        this.m_objFunction = {};
        // 获取时间定时器
        this.m_nGetTimeTimerId = null;
    },

    /**
     * 初始化视图
     */
    initView() {
        this.spriteWiFi.node.active = false;
        this.sprite2G.node.active = false;
        this.sprite3G.node.active = false;
        this.sprite4G.node.active = false;
        this.spriteUnknown.node.active = false;
        this.spriteNone.node.active = false;
        this.labelTime.node.active = false;
        this.labelRemainCard.node.active = false;
        this.labelRemainCard.node.parent.active = false;
        this.nodeRoot.active = false;
    },

    /**
     * 注册
     */
    register() {

    },

    /**
     * 添加网络
     * @param type {number} 网络类型
     */
    setNet( type ) {
        if( !Utils.isNull( this.m_objFunction[SYSTEM_FUNCTION.Net] ) ) {
            this.m_objFunction[SYSTEM_FUNCTION.Net].node.active = false;
            this.m_objFunction[SYSTEM_FUNCTION.Net] = null;
        }

        switch( type ) {
            case ConfNet.WiFi:
                this.m_objFunction[SYSTEM_FUNCTION.Net] = this.spriteWiFi;
                break;
            case ConfNet._2G:
                this.m_objFunction[SYSTEM_FUNCTION.Net] = this.sprite2G;
                break;
            case ConfNet._3G:
                this.m_objFunction[SYSTEM_FUNCTION.Net] = this.sprite3G;
                break;
            case ConfNet._4G:
                this.m_objFunction[SYSTEM_FUNCTION.Net] = this.sprite4G;
                break;
            case ConfNet.Unknown:
                this.m_objFunction[SYSTEM_FUNCTION.Net] = this.spriteUnknown;
                break;
            case ConfNet.None:
                this.m_objFunction[SYSTEM_FUNCTION.Net] = this.spriteNone;
                break;
            default:

                break;
        }
        if( !Utils.isNull( this.m_objFunction[SYSTEM_FUNCTION.Net] ) ) {
            this.m_objFunction[SYSTEM_FUNCTION.Net].node.active = true;
        }
        this.updateSystemFunction();
    },

    /**
     * 删除网络
     */
    delNet() {
        if( !Utils.isNull( this.m_objFunction[SYSTEM_FUNCTION.Net] ) ) {
            this.m_objFunction[SYSTEM_FUNCTION.Net].node.active = false;
            this.m_objFunction[SYSTEM_FUNCTION.Net] = null;
            delete this.m_objFunction[SYSTEM_FUNCTION.Net];
            this.updateSystemFunction();
        }
    },

    /**
     * 添加时间
     */
    setTime() {
        this.labelTime.string = G.Game.getDate();
        this.m_nGetTimeTimerId = setInterval( function() {
            this.labelTime.string = G.Game.getDate();
        }.bind( this ), GET_TIME_GAP * 1000 );

        if( Utils.isNull( this.m_objFunction[SYSTEM_FUNCTION.Time] ) ) {
            this.labelTime.node.active = true;
            this.m_objFunction[SYSTEM_FUNCTION.Time] = this.labelTime;
        }
        this.updateSystemFunction();
    },

    /**
     * 删除时间
     */
    delTime() {
        if( Utils.isNull( this.m_nGetTimeTimerId ) ) {
            clearInterval( this.m_nGetTimeTimerId );
            this.m_nGetTimeTimerId = null;
        }
        if( !Utils.isNull( this.m_objFunction[SYSTEM_FUNCTION.Time] ) ) {
            this.m_objFunction[SYSTEM_FUNCTION.Time].node.active = false;
            this.m_objFunction[SYSTEM_FUNCTION.Time] = null;
            delete this.m_objFunction[SYSTEM_FUNCTION.Time];
            this.updateSystemFunction();
        }
    },

    /**
     * 添加剩余牌
     * @param num {number} 剩余牌数
     */
    setRemainCard( num ) {
        this.labelRemainCard.string = num;
        if( Utils.isNull( this.m_objFunction[SYSTEM_FUNCTION.RemainCard] ) ) {
            this.labelRemainCard.node.active = true;
            this.labelRemainCard.node.parent.active = true;
            this.m_objFunction[SYSTEM_FUNCTION.RemainCard] = this.labelRemainCard;
        }
        this.updateSystemFunction();
    },

    /**
     * 删除剩余牌
     */
    delRemainCard() {
        if( !Utils.isNull( this.m_objFunction[SYSTEM_FUNCTION.RemainCard] ) ) {
            this.m_objFunction[SYSTEM_FUNCTION.RemainCard].node.active = false;
            this.m_objFunction[SYSTEM_FUNCTION.RemainCard].node.parent.active = false;
            this.m_objFunction[SYSTEM_FUNCTION.RemainCard] = null;
            delete this.m_objFunction[SYSTEM_FUNCTION.RemainCard];
            this.updateSystemFunction();
        }
    },

    /**
     * 获取大小
     */
    getSize() {
        let size = 0;
        for( let _ in this.m_objFunction ) {
            ++size;
        }
        return size;
    },

    /**
     * 刷新系统信息
     */
    updateSystemFunction() {
        let frameWidth = GAP_WIDTH;

        for( let key in this.m_objFunction ) {
            let value = this.m_objFunction[key];
            if( key === SYSTEM_FUNCTION.Net ) {
                value.node.setPosition( frameWidth + ( value.node.width * 0.5 ), 0 );
                frameWidth = frameWidth + value.node.width;
            } else if( key === SYSTEM_FUNCTION.Time ) {
                value.node.setPosition( frameWidth + ( value.node.width * 0.5 ), 0 );
                frameWidth = frameWidth + value.node.width;
            } else if( key === SYSTEM_FUNCTION.RemainCard ) {
                let parent = value.node.parent;
                let gapWidth = value.node.getPositionX() - ( parent.width * 0.5 );
                parent.setPosition( frameWidth + ( parent.width * 0.5 ), 0 );
                frameWidth = frameWidth + parent.width + gapWidth + value.node.width;
            }
            frameWidth += GAP_WIDTH;
        }

        if( this.getSize() > 0 ) {
            this.nodeRoot.width = frameWidth;
            this.nodeRoot.active = true;
        } else {
            this.nodeRoot.active = false;
        }
    },

    // update (dt) {},
});
