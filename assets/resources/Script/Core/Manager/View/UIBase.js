/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * UI基类
 */

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    /**
     * 组件脚本的初始化阶段，我们提供了 onLoad 回调函数。onLoad 回调会在组件首次激活时触发，比如所在的场景被载入，或者所
     * 在节点被激活的情况下。在 onLoad 阶段，保证了你可以获取到场景中的其他节点，以及节点关联的资源数据。onLoad 总是会在
     * 任何 start 方法调用前执行，这能用于安排脚本的初始化顺序。通常我们会在 onLoad 阶段去做一些初始化相关的操作。
     */
    // onLoad() {
    //
    // },

    /**
     * 回调函数会在组件第一次激活前，也就是第一次执行 update 之前触发。start 通常用于初始化一些中间状态的数据，这些数据
     * 可能在 update 时会发生改变，并且被频繁的 enable 和 disable。
     */
    // start() {
    //
    // },

    /**
     * 游戏开发的一个关键点是在每一帧渲染前更新物体的行为，状态和方位。这些更新操作通常都放在 update 回调中。
     */
    // update( dt ) {
    //
    // },

    /**
     * 会在所有动画更新前执行，但如果我们要在动画更新之后才进行一些额外操作，或者希望在所有组件的 update 都执行完之后才
     * 进行其它操作，那就需要用到 lateUpdate 回调。
     */
    // lateUpdate( dt ) {
    //
    // },

    /**
     * 当组件的 enabled 属性从 false 变为 true 时，或者所在节点的 active 属性从 false 变为 true 时，会激活 onEnable 回调
     * 。倘若节点第一次被创建且 enabled 为 true，则会在 onLoad 之后，start 之前被调用。
     */
    // onEnable() {
    //
    // },

    /**
     * 当组件的 enabled 属性从 true 变为 false 时，或者所在节点的 active 属性从 true 变为 false 时，会激活 onDisable 回
     * 调。
     */
    // onDisable() {
    //
    // },

    /**
     * 当组件或者所在节点调用了 destroy()，则会调用 onDestroy 回调，并在当帧结束时统一回收组件。
     */
    // onDestroy() {
    //
    // },

    /**
     * 更新UI（子类需要重写）
     * @param data
     */
    refresh( data ) {

    },

});
