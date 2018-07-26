/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 常用 工具对象
 * @type {Function}
 */

let Utils = {

    /**
     * 判断是否为空
     * @param value
     * @returns {boolean}
     */
    isNull: function( value ) {
        let flag = false;
        if( value === null || value === undefined ) {
            flag = true
        }
        return flag;
    },

    /**
     * 判断是否类型为对象
     * @param value
     * @returns {boolean}
     */
    isObject( value ) {
        let flag = false;
        if( typeof( value ) === "object" ) {
            if( !(value instanceof Array) ) {
                flag = true;
            }
        }
        return flag;
    },

    /**
     * 判断是否类型为数组
     * @param value
     * @returns {boolean}
     */
    isArray( value ) {
        let flag = false;
        if( typeof( value ) === "object" ) {
            if( value instanceof Array ) {
                flag = true;
            }
        }
        return flag;
    },

    /**
     * 判断是否类型为数字
     * @param value
     * @returns {boolean}
     */
    isNumber( value ) {
        let flag = false;
        if( typeof( value ) === "number" ) {
            flag = true;
        }
        return flag;
    },

    /**
     * 判断是否类型为字符串
     * @param value
     * @returns {boolean}
     */
    isString( value ) {
        let flag = false;
        if( typeof( value ) === "string" ) {
            flag = true;
        }
        return flag;
    },

    /**
     * 判断是否类型为布尔
     * @param value
     * @returns {boolean}
     */
    isBoolean( value ) {
        let flag = false;
        if( typeof( value ) === "boolean" ) {
            flag = true;
        }
        return flag;
    },

    /**
     * 判断是否类型为JSON
     * @param value
     * @returns {boolean}
     */
    isJson( value ) {
        let flag = false;
        if( typeof( value ) === "string" ) {
            try {
                let obj = JSON.parse( value );
                if( this.isObject( obj ) ) {
                    flag = true;
                } else {
                    flag = false;
                }
            } catch( e ) {
                flag = false;
            }
        }
        return flag;
    },

    /**
     * 判断是否类型为函数
     * @param value
     * @returns {boolean}
     */
    isFunction( value ) {
        let flag = false;
        if( typeof( value ) === "function" ) {
            flag = true;
        }
        return flag;
    },

    /**
     * 获取key 通过value
     * @param object
     * @param value
     * @returns {*}
     */
    getKeyByValue( object, value ) {
        let key = null;
        for( let k in object ){
            if( object[k] === value ) {
                key = k;
                break;
            }
        }
        return key;
    },

    /**
     * 格式化字符串
     * @param str {string} 字符串
     * @returns {*} 格式化后的字符串
     */
    format( str ) {
        function _removeFirst( arg ) {
            let args = [];
            for( let i = 1; i < arg.length; ++i ) {
                args[i-1] = arg[i];
            }
            return args;
        }

        let result = str;
        if( this.isString( result ) ) {
            let args = _removeFirst( arguments );
            if( args.length > 0 ) {
                for( let i = 0; i < args.length; ++i ) {
                    if( !this.isNull( args[i] ) ) {
                        let reg = new RegExp( "({)" + i + "(})", "g" );
                        result = result.replace( reg, args[i] );
                    }
                }
            }
        }
        return result;
    },

    /**
     * 是否微信调用接口错误
     * @param msg {string} 返回信息
     * @return {boolean}
     */
    isWxSuccee( msg ) {
        let flag = false;
        if( this.isString( msg ) ) {
            flag = msg.indexOf( "ok" ) !== -1;
        }
        return flag;
    },

    /**
     * 克隆
     * @param variable {*} 任意类型变量
     * @returns {*}
     */
    clone( variable ) {
        let v = variable;
        if( this.isArray( variable ) ) {
            v = [];
            for( let i = 0; i < variable.length; ++i ) {
                v.push( this.clone( variable[i] ) );
            }
        } else if( this.isObject( variable ) ) {
            v = {};
            for( let key in variable ) {
                v[key] = this.clone( variable[key] );
            }
        }
        return v;
    },

    /**
     * 字符串补0
     * @param value {string|number} 字符串或者数字
     * @param len {number} 长度
     * @return {string} 完整字符串
     */
    pad( value, len ) {
        if( this.isNumber( value ) ) {
            value = value.toString();
        }
        if( this.isString( value ) ) {
            for( let i = value.length; i < len; ++i ) {
                value = "0" + value;
            }
        }
        return value;
    },


};

module.exports = Utils;