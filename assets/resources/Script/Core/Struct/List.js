/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 链表类
 */

let Node = require( "Node" );
let Utils = require( "Utils" );

let List = cc.Class({

    /**
     * 构造
     */
    ctor() {
        // 链表 列表
        this.m_node = null;
    },

    /**
     * 获取首节点
     * @returns {object}
     */
    getFirst() {
        let firstNode = this.m_node;
        while( !Utils.isNull( firstNode ) ) {
            if( Utils.isNull( firstNode.getPrev() ) ) {
                break;
            }
            firstNode = firstNode.getPrev();
        }
        return firstNode;
    },

    /**
     * 获取尾节点
     * @returns {object}
     */
    getLast() {
        let lastNode = this.m_node;
        while( !Utils.isNull( lastNode ) ) {
            if( Utils.isNull( lastNode.getNext() ) ) {
                break;
            }
            lastNode = lastNode.getNext();
        }
        return lastNode;
    },

    /**
     * 获取链表的大小
     * @returns {number}
     */
    getSize() {
        let node = this.getFirst();
        let size = 0;
        while( !Utils.isNull( node ) ) {
            ++size;
            node = node.getNext();
        }
        return size;
    },

    /**
     * 是否空链表
     */
    isEmpty() {
        return Utils.isNull( this.m_node );
    },

    /**
     * 插入 通过数据插入到前后链表
     * @param data 数据
     * @param about 前后（-1 前，1 后）默认后
     * @private
     */
    _insert1( data, about ) {
        let newNode = new Node();
        newNode.setData( data );

        let listSize = this.getSize();
        if( listSize <= 0 ) {
            this.m_node = newNode;
        } else {
            if( about < 0 ) {
                let firstNode = this.getFirst();
                firstNode.setPrev( newNode );
                newNode.setNext( firstNode );
            } else {
                let lastNode = this.getLast();
                lastNode.setNext( newNode );
                newNode.setPrev( lastNode );
            }
        }
    },

    /**
     * 插入 到node节点 前后
     * @param node
     * @param data
     * @param about
     * @private
     */
    _insert2( node, data, about ) {
        let newNode = new Node();
        newNode.setData( data );
        let listSize = this.getSize();
        if( listSize <= 0 ) {
            this.m_node = newNode;
        } else {
            if( about < 0 ) {
                let prevNode = node.getPrev();
                if( !Utils.isNull( prevNode ) ) {
                    prevNode.setNext( newNode );
                    newNode.setPrev( prevNode );
                }
                node.setPrev( newNode );
                newNode.setNext( node );
            } else {
                let nextNode = node.getNext();
                if( !Utils.isNull( nextNode ) ) {
                    nextNode.setPrev( newNode );
                    newNode.setNext( nextNode );
                }
                node.setNext( newNode );
                node.setPrev( node );
            }
        }
    },

    /**
     * { 重载函数 }
     * 插入节点 到 链表中
     *
     * 一、通过数据插入到前后链表
     * 参数1 data object 数据
     * 参数2 about number 前后（-1 前，1, 后）[默认后]
     *
     * 二、通过节点来插入数据
     * 参数1 node object 节点
     * 参数2 data object 数据
     * 参数3 about number 前后（-1 前，1 后）[默认后]
     */
    insert() {
        let arg = arguments;

        if( Utils.isObject( arg[0] ) && ( Utils.isNumber( arg[1] ) || Utils.isNull( arg[1] ) ) ) {
            // 通过数据插入到前后链表
            this._insert1( arg[0], arg[1] );
        } else if( Utils.isObject( arg[0] ) && Utils.isObject( arg[1] ) && ( Utils.isNumber( arg[2] ) || Utils.isNull( arg[2] ) ) ) {
            // 通过节点来插入数据
            if( Utils.isObject( arg[0] ) && Utils.isNumber( arg[2] ) ) {
                this._insert2( arg[0], arg[1], arg[2] );
            }
        }
    },

    /**
     * 删除链表中的节点 通过data来删除
     * @param data
     */
    delete( data ) {
        let firstNode = this.getFirst();
        let delNode = this.find( data );

        if( Utils.isNull( delNode ) ) {
            return ;
        }

        let prevNode = delNode.getPrev();
        if( Utils.isNull( prevNode ) ) {
            let nextNode = delNode.getNext();
            if( !Utils.isNull( nextNode ) ) {
                nextNode.setPrev( null );
            }
        } else {
            prevNode.setNext( delNode.getNext() );
        }

        let nextNode = delNode.getNext();
        if( Utils.isNull( nextNode ) ) {
            let prevNode = delNode.getPrev();
            if( !Utils.isNull( prevNode ) ) {
                prevNode.setNext( null );
            }
        } else {
            nextNode.setPrev( delNode.getPrev() );
        }

        if( firstNode === delNode ) {
            this.m_node = firstNode.getNext();
        }

        // 临界点
        if( Utils.isNull( delNode.getNext() ) && Utils.isNull( delNode.getPrev() ) ) {
            this.m_node = null;
        }

        delNode.destroy();
        delNode = null;

    },

    /**
     * 通过数据查找node
     */
    find( data ) {
        let node = this.getFirst();
        while( !Utils.isNull( node ) ) {
            if( node.getData() === data ) {
                return node;
            }
            node = node.getNext();
        }
        return null;
    },

    /**
     * 清理链表
     */
    clear() {
        let node = this.getFirst();
        while( !Utils.isNull( node ) ) {
            let nextNode = node.getNext();
            node.destroy();
            node = nextNode;
        }
        this.m_node = null;
    },

    /**
     * 遍历
     */
    forEach( callback ) {
        let node = this.m_node;
        while( !Utils.isNull( node ) ) {
            callback( node );
            node = node.getNext();
        }
    },

});

module.exports = List;