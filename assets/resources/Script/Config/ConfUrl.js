/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 配置 HTTP
 */

// 远程测试
// const HOST = "http://47.106.125.21:9999";
// 本地测试
const HOST = "http://192.168.1.108:9999";

const ConfUrl = {
    GET_TOKEN_MOBILE: HOST + "/api/WeiXin/GetSession_key/{0}",
    GET_TOKEN_BROWSER: HOST + "/api/WeiXin/GetUserLoginWsAsync?rawData={0}&signature={1}&encryptedData={2}&iv={3}&rd_session={4}",
    GET_WEBSOCKET_URL_MOBILE: HOST + "/api/WeiXin/GetUserLoginWsAsync?rawData={0}&signature={1}&encryptedData={2}&iv={3}&rd_session={4}",
    GET_WEBSOCKET_URL_BROWSER: HOST + "/api/WeiXin/GetUserLoginWsAsync?rawData={0}&signature={1}&encryptedData={2}&iv={3}&rd_session={4}",
    GET_WEBSOCKET_URL_BROWSER_GUEST: HOST + "/api/Tourists/GetLoginWs/{0}",
};

module.exports = ConfUrl;