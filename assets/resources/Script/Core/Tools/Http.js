/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * HTTP 工具对象
 * @type {Function}
 */

let Utils = require( "Utils" );
let ConfCode = require( "ConfCode" );
let Log = require( "Log" );
let DefLog = require( "DefLog" );

// 超时时间（s）
const TIMEOUT = 5;

let Http = {
    /**
     * 请求HTTP
     * @param url {string} 链接
     * @param data {string} [数据]
     * @param callback {function} [回调]
     * @private
     */
    _request() {
        let url = arguments[0];
        let data = null;
        let callback = null;
        let len = arguments.length;

        Log.print( DefLog[11] );
        Log.print( url );

        G.ViewManager.openLoading();

        let xhr = new XMLHttpRequest();
        xhr.timeout = TIMEOUT * 1000;

        // 超时回调
        xhr.ontimeout = function() {
            G.ViewManager.openTips( G.I18N.get( 4 ) );
            G.ViewManager.closeLoading();
        };
        // 错误回调
        xhr.onerror = function( err ) {
            G.ViewManager.openTips( Utils.format( G.I18N.get( 21 ), err ) );
            G.ViewManager.closeLoading();
        };

        // 完成回调
        xhr.onreadystatechange = function() {
            if( xhr.readyState === 4 ) {
                if( xhr.status >= 200 && xhr.status < 400 ) {
                    let response = xhr.responseText;
                    if( Utils.isJson( response ) ) {
                        response = JSON.parse( response );
                    }
                    response.code < 0 && Log.print( Utils.format( G.I18N.get( 20 ), response.code, ConfCode[response.code.toString()] ) );
                    Utils.isFunction( callback ) && callback( response );
                    Log.print( DefLog[12] );
                    Log.print( response );
                } else {
                    G.ViewManager.openTips( Utils.format( G.I18N.get( 2 ), ( xhr.status ) ) );
                }
                G.ViewManager.closeLoading();
            }
        }.bind( this );

        if( len === 2 ) {
            callback = arguments[1];
            xhr.open( "GET", url, true );
            xhr.send();
        } else if( len === 3 ) {
            data = arguments[1];
            callback = arguments[2];
            xhr.open( "POST", url, true );
            if( Utils.isJson( data ) ) {
                data = JSON.stringify( data );
            }
            xhr.send( data );
        }

    },

    /**
     * POST请求
     * @param url {string} 链接
     * @param data {string} 数据
     * @param callback {function} 回调
     */
    post( url, data, callback ) {
        this._request( url, data, callback );
    },

    /**
     * GET请求
     * @param url {string} 链接
     * @param callback {function} 回调
     */
    get( url, callback ) {
        this._request( url, callback );
    },
};

module.exports = Http;