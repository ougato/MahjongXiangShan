/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 声音基类
 * @type {Function}
 */

let DefAudio = require( "DefAudio" );

let AudioBase = cc.Class({

    /**
     * 构造
     */
    ctor() {
        // ID
        this.m_nId = 0;
        // 是否循环
        this.m_bIsLoop = false;
        // 路径
        this.m_strPath = "";
        // 音量
        this.m_fVolume = 1.0;
        // 状态
        this.m_nState = DefAudio.State.INITIALZING;

        // 赋值
        this.initData( arguments[0], arguments[1], arguments[2] );
    },

    /**
     * 初始化数据
     * @param path {string} 路径
     * @param loop {boolean} 循环
     * @param volume {number} 音量
     */
    initData( path, loop, volume ) {
        if( !Utils.isNull( path ) ) {
            this.m_strPath = path;
        }
        if( !Utils.isNull( loop ) ) {
            this.m_bIsLoop = loop;
        }
        if( !Utils.isNull( volume ) ) {
            this.m_fVolume = volume;
        }
    },

    /**
     * 播放
     */
    play() {
        let id = cc.audioEngine.play( cc.url.raw( this.m_strPath ), this.m_bIsLoop, this.m_fVolume );
        this.m_nId = id;
        this.m_nState = DefAudio.State.PLAYING;
        return id;
    },

    /**
     * 停止
     */
    stop() {
        cc.audioEngine.stop( this.m_nId );
        this.m_nState = DefAudio.State.INITIALZING;
    },

    /**
     * 暂停
     */
    pause() {
        if( this.m_nState !== DefAudio.State.PLAYING ) {
            return ;
        }
        cc.audioEngine.pause( this.m_nId );
        this.m_nState = DefAudio.State.PAUSE;
    },

    /**
     * 恢复
     */
    resume() {
        if( this.m_nState !== DefAudio.State.PAUSE ) {
            return ;
        }
        cc.audioEngine.resume( this.m_nId );
        this.m_nState = DefAudio.State.PLAYING;
    },
});

module.exports = AudioBase;