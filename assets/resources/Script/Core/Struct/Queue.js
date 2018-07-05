/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 队列类
 */

let Node = require( "Node" );
let Utils = require( "Utils" );

let Queue = cc.Class({
    /**
     * 构造
     */
    ctor() {
        // 首元素
        this.m_nodeFirst = null;
        // 尾元素
        this.m_nodeLast = null;
        // 容量
        this.m_nCount = 0;
    },

    /**
     * 弹出
     */
    pop() {
        if( this.m_nCount <= 0 ) {
            return null;
        }

        let data = this.m_nodeFirst.getData();

        this.m_nodeFirst = this.m_nodeFirst.getNext();
        if( Utils.isNull( this.m_nodeFirst ) ) {
            this.m_nodeLast = this.m_nodeFirst;
        }
        --this.m_nCount;

        return data;
    },

    /**
     * 压入
     * @param data {*} 数据
     */
    push( data ) {
        let newNode = new Node();

        if( Utils.isNull( this.m_nodeFirst ) ) {
            this.m_nodeFirst = newNode;
        }
        if( Utils.isNull( this.m_nodeLast ) ) {
            this.m_nodeLast = newNode;
        } else {
            this.m_nodeLast.setNext( newNode );
        }

        newNode.setData( data );
        newNode.setPrev( this.m_nodeLast );

        ++this.m_nCount;
    },

    /**
     * 判空
     */
    empty() {
        return this.m_nCount <= 0;
    },

    /**
     * 容量
     */
    size() {
        return this.m_nCount;
    },

    /**
     * 访问首元素
     */
    front() {
        return this.m_nodeFirst;
    },

    /**
     * 访问尾元素
     */
    back() {
        return this.m_nodeLast;
    },


});

module.exports = Queue;
