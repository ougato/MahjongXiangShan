/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 音效管理器
 * @type {Function}
 */

let AudioMusic = require( "AudioMusic" );
let AudioSound = require( "AudioSound" );
let Utils = require( "Utils" );

// 实例化对象
let instance = null;

let AudioManager = cc.Class({

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
                instance = new AudioManager();
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
        // 音乐ID 因为背景音乐唯一 { object }
        this.m_objMusic = null;
        // 音效ID 列表 { array object }
        this.m_mapSound = new Map();

    },

    /**
     * 销毁
     */
    destroy() {
        this.stopAll();
        this.m_objMusic = null;
        this.m_mapSound.clear();
        this.m_mapSound = null;
    },

    /**
     * 播放音乐
     * @param path {string} 路径+文件
     * @param loop {boolean} 是否循环
     * @param volume {number} 音量
     * @returns id {number} 音乐id
     */
    playMusic( path, loop, volume ) {
        if( !Utils.isNull( this.m_objMusic ) ) {
            this.m_objMusic.stop();
            this.m_objMusic = null;
        }
        let audio = new AudioMusic( path, loop, volume );
        let id = audio.play();
        cc.audioEngine.setFinishCallback( id, this.onPlayMusicFinish.bind( this ) );
        this.m_objMusic = audio;
        return id;
    },

    /**
     * 播放音效
     * @param path {string} 路径+文件
     * @param volume {number} 音量
     * @returns id {number} 音效id
     */
    playSound( path, volume ) {
        let audio = new AudioSound( path, volume );
        let id = audio.play();
        cc.audioEngine.setFinishCallback( id, this.onPlaySoundFinish.bind( this ) );
        this.m_mapSound.set( id, audio );
        return id;
    },

    /**
     * 停止音乐
     */
    stopMusic() {
        let audio = this.m_objMusic;
        if( !Utils.isNull( audio ) ) {
            audio.stop();
            this.m_objMusic = null;
        }
    },

    /**
     * 停止音效
     * @param id {number} 音效ID
     */
    stopSound( id ) {
        let audio = this.m_mapSound.get( id );
        if( !Utils.isNull( audio ) ) {
            audio.stop();
            this.m_mapSound.splice(id, 1);
        }
    },

    /**
     * 停止所有声音
     */
    stopAll() {
        cc.audioEngine.stopAll();
    },

    /**
     * 暂停音乐
     */
    pauseMusic() {
        let audio = this.m_objMusic;
        if( !Utils.isNull( audio ) ) {
            audio.pause();
        }
    },

    /**
     * 暂停音效
     * @param id {number} 音效ID
     */
    pauseSound( id ) {
        let audio = this.m_mapSound.get( id );
        if( !Utils.isNull( audio ) ) {
            audio.pause();
        }
    },

    /**
     * 暂停所有声音
     */
    pauseAll() {
        cc.audioEngine.pauseAll();
    },

    /**
     * 恢复音乐
     */
    resumeMusic() {
        let audio = this.m_objMusic;
        if( !Utils.isNull( audio ) ) {
            audio.resume();
        }
    },

    /**
     * 恢复音效
     * @param id {number} 音效ID
     */
    resumeSound( id ) {
        let audio = this.m_mapSound.get( id );
        if( !Utils.isNull( audio ) ) {
            audio.resume();
        }
    },

    /**
     * 恢复所有声音
     */
    resumeAll() {
        cc.audioEngine.resumeAll();
    },

    /**
     * 播放音乐完成
     * @param event {object} 事件对象
     */
    onPlayMusicFinish( event ) {
        this.m_objMusic = null;
    },

    /**
     * 播放音效完成
     * @param event {object} 事件对象
     */
    onPlaySoundFinish( event ) {
        let id = event.getCurrentTarget().instanceId;
        this.m_mapSound.delete( id );
    },

});

module.exports = AudioManager;