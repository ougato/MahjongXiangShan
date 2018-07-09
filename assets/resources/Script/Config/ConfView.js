/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 场景
 */
const Scene = {
    Update: "Update",
    LoginWXGame: "LoginWXGame",
    LoginBrowser: "LoginBrowser",
    Lobby: "Lobby",
};

/**
 * 预制
 */
const Prefab = {
    FriendBattle: "Lobby/FriendBattle",
    FriendCreateRoom: "Lobby/FriendCreateRoom",
    FriendJoinRoom: "Lobby/FriendJoinRoom",
};


module.exports = {
    Scene: Scene,
    Prefab: Prefab,
};