/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 间隔
 */
const SPAN = 100;

/**
 * 视图 层级
 */
const Zorder = {
    BOTTOM: SPAN * 0,
    UI: SPAN * 1,
    POPUP: SPAN * 3,
    TOP: SPAN * 2,
    SYSTEM: SPAN * 4,
};

/**
 * 预制路径
 */
const PREFAB_PATH = "Prefab/";

/**
 * 场景路径
 */
const SCENE_PATH = "Scene/";

/**
 * 对话框提交ID
 */
const DialogBoxIDs = {
    // 重试
    IDRETRY: 0,
    // 取消
    IDCANCEL: 1,
    // 确定
    IDOK: 2,
};

module.exports = {
    Zorder: Zorder,
    PREFAB_PATH: PREFAB_PATH,
    SCENE_PATH: SCENE_PATH,
    DialogBoxIDs: DialogBoxIDs,
};