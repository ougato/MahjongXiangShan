/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 事件管理器
 */

let Utils = require( "Utils" );
let List = require( "List" );

// 实例化对象
let instance = null;

let EventManager = cc.Class({

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
                instance = new EventManager();
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
        // 存储消息结构 事件列表
        this.m_mapEventList = new Map();

    },

    /**
     * 销毁
     */
    destroy() {
        this.m_mapEventList.clear();
        this.m_mapEventList = null;
    },

    /**
     * 添加 消息事件
     * @param script {object} 脚本
     * @param id {number} 事件ID
     */
    addEvent( script, id ) {
        let scriptList = this.m_mapEventList.get( id );

        if( Utils.isNull( scriptList ) ) {
            scriptList = new List;
            this.m_mapEventList.set( id, scriptList );
        }
        if( Utils.isNull( scriptList.find( script ) ) )  {
            scriptList.insert( script );
        }
    },

    /**
     * 卸载 消息事件
     * @param script {object} 脚本
     * @param id {number} 事件ID
     */
    unEvent( script, id ) {
        let scriptList = this.m_mapEventList.get( id );
        if( !Utils.isNull( scriptList ) && !scriptList.isEmpty() ) {
            scriptList.delete( script );
        }
    },

    /**
     * 发送消息
     * @param id {number} 事件ID
     * @param data {*} 数据任意类型
     */
    sendEvent( id, data ) {
        let scriptList = this.m_mapEventList.get( id );
        if( !Utils.isNull( scriptList ) && !scriptList.isEmpty() ) {
            scriptList.forEach( function( script ) {
                if( Utils.isObject( script ) ) {
                    if( Utils.isFunction( script.onEvent ) ) {
                        let event = {};
                        event.id = id;
                        event.data = data;
                        script.onEvent( event );
                    }
                }
            } );
        }
    },
});

module.exports = EventManager;