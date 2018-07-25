/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-07
 */

/**
 * 系统信息
 */

let UIBase = require( "UIBase" );
let ConfNet = require( "ConfNet" );

// 每个功能的间隔宽度（p）
const GAP_WIDTH = 5;
// 系统信息
const SYSTEM_FUNCTION = {
    Net: 0,
    Time: 1,
    RemainCard: 2,
};

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

    },

    /**
     * 初始化数据
     */
    initData() {
        // 系统功能
        this.m_objFunction = {};
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
    addNet( type ) {
        this.m_objFunction[SYSTEM_FUNCTION.Net].node.active = false;
        this.m_objFunction[SYSTEM_FUNCTION.Net] = null;

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
        this.updateSystemFunction();
    },

    /**
     * 删除网络
     */
    delNet() {
        this.m_objFunction[SYSTEM_FUNCTION.Net].node.active = false;
        this.m_objFunction[SYSTEM_FUNCTION.Net] = null;
        this.updateSystemFunction();
    },

    /**
     * 添加时间
     */
    addTime() {

    },

    /**
     * 删除时间
     */
    delTime() {

    },

    /**
     * 添加剩余牌
     * @param num {number} 剩余牌数
     */
    addRemainCard( num ) {

    },

    /**
     * 删除剩余牌
     */
    delRemainCard() {

    },

    /**
     * 获取大小
     */
    getSize() {
        let size = 0;
        for( let key in object ) {
            ++size;
        }
        return size;
    },

    /**
     * 刷新系统信息
     */
    updateSystemFunction() {
        let frameWidth = GAP_WIDTH;

        for( key in object ) {
            if( key === SYSTEM_FUNCTION.Net ) {
                value.node.setPositionX( frameWidth + ( value.node.width * 0.5 ) );
                frameWidth = frameWidth + value.node.width + GAP_WIDTH;
            } else if( key === SYSTEM_FUNCTION.Time ) {
                value.node.setPositionX( frameWidth + ( value.node.width * 0.5 ) );
                frameWidth = frameWidth + value.node.width + GAP_WIDTH;
            } else if( key === SYSTEM_FUNCTION.RemainCard ) {
                let parent = value.node.parent();
                let parentWorldX = parent.getWorldPosition().x;
                let childWorldX = value.getWorldPosition().x;
                let gapWidth = childWorldX - parentWorldX;
                parent.setPositionX( frameWidth + ( parent.width ) );
                frameWidth = frameWidth + parent.width + gapWidth + value.width;
            }
            value.node.width = frameWidth;
        }

        if( this.getSize() <= 0 ) {
            this.nodeRoot.active = false;
        } else {
            this.nodeRoot.active = true;
        }
    },

    // update (dt) {},
});
