<template>
    <div 
        class="container bg-light border border-light rounded-pill"
        @dragenter.stop
        @dragover.stop.prevent
        @drop.stop.prevent="drop" >
        <div class="row my-1 px-1 align-items-center">
            <!-- 控制器 -->
            <div class="col-auto row mx-1 px-0">
                <c-controller-button :icon="icon.stepBackward" v-show="showStepBackward" :disabled="disabledStepBackward" />
                <b-loading v-show="status == EStatus.loading" class='btn btn-outline-primary rounded-circle' status='grow' />
                <c-controller-button :icon="icon.stop" v-show="status == EStatus.loading" @click.native="stopload" />
                <c-controller-button :icon="icon.play" v-show="showPlay" :disabled="disabledPlay" @click.native="play" />
                <c-controller-button :icon="icon.pause" v-show="showPause" :disabled="disabledPause" @click.native="pause" />
                <c-controller-button :icon="icon.stepForward" v-show="showStepForward" :disabled="disabledStepForward" />
            </div>
            <!-- 音量 -->
            <div class="row mx-0 align-items-center d-none d-sm-inline-flex" @mouseover="audoMouseover" @mouseleave="audoMouseleave">
                <c-controller-button  @click.native="audioMuteClick" :icon="mute ? icon.volumeMute : icon.volumeUp" class="mr-1" />
                <vue-page-transition name="fade-in-right" class=" d-none d-lg-inline">
                    <b-range v-show="audioMuteRangeShow" class="p-0" hideValue max="1" step='0.01' v-model.number="volumeRange" />
                </vue-page-transition>
            </div>
            <!-- 播放进度 -->
            <div class="col px-1 align-items-center border-left border-right">
                <font v-if="isError" class="text-danger">Play Error: File not found or In an unsupported format</font>
                <b-range v-else hideValue :max="duration" :disabled="disabledSeekRange" @input="seekInput" :value="seek" />
            </div>
            <div class="col-auto align-items-center">
                <font>{{ seekTime }} <br> {{ durationTime }}</font>
            </div>
        </div>
    </div>
</template>

<script>
import util from '@/util/index.js'
import config from '@/config/index.js'

/** 
 * howler.js HomePage
 * https://howlerjs.com
 * howler.js Github
 * https://github.com/goldfire/howler.js
 * audiosprite(可用于 sprite 选型，多用于游戏)
 * https://github.com/tonistiigi/audiosprite
 * Web Audio API
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Audio_API
 */
import {Howl} from 'howler'

import CControllerButton from './c-controller-button'
import BRange from '@/components/base/Bootstrap/Form/b-range.vue'
import BLoading from "@/components/base/Bootstrap/Loading/b-loading.vue"

export default {
    name: 'c-raido',
    components: { CControllerButton, BRange, BLoading, },
    data () {
        return {
            boblSrc: null,
            sound: null, // 声音对象
            soundId: '', // 声音对象 Id
            seek: 0, // 播放进度
            mute: false, // 是否静音
            volume: 0.5,// 音量
            volumeRange: 0.5,
            status: null, // 状态
            EStatus: { // 状态 枚举
                unloaded: 'unloaded', // 未加载
                loading: 'loading', // 加载
                loaded: 'loaded', // 加载错误
                loaderror: 'loaderror', // 加载错误
                playing: 'playing', // 播放
                playerror: 'playerror', // 播放错误
                pauseing: 'pauseing', // 暂停
                finished: 'finished', // 播放结束
            },
            audioMuteRangeShow: false, // 显示调节音量按钮
            timer: null, // 计时器
        }
    },
    props: {
        playList: { // 播放列表
            type: Array,
            default: () => [],
        },
        index: { // 序号
            type: Number,
            default: 0,
            validator: function (val) {
                return !isNaN(val) && val >= 0
            }
        },
    },
    computed: {
        // ------ icon ------
        icon: function () {
            return config.ui.icon
        },
        // ------ sound opt ------
        duration: function () { // 播放时长
            return this.sound && this.sound.duration ? this.sound.duration(this.soundId) : 0
        },
        seekTime: function () { // 播放时间
            if (this.seek == 0 && this.duration != 0) 
                return this.duration - 60 * 60 > 0 ? '0:00:00' : '0:00'
            else 
                return this.formatTime(this.seek)
        },
        durationTime: function () { // 总时长
            return this.formatTime(this.duration)
        },
        // ------ PlayList ------
        checkedPlayList: function () { // 播放列表
            return this.playList.filter(e => e.src)
        },
        isPlaseList: function () { // 列表/单文件
            return this.checkedPlayList && this.checkedPlayList.length > 0
        },
        isError: function () {
            return this.status == this.EStatus.loaderror || this.status == this.EStatus.playerror
        },
        // ------ controllers ------
        showPlay: function () {
            return this.status == this.EStatus.pauseing || 
            this.status == this.EStatus.finished || 
            this.status == this.EStatus.loaded || 
            this.status == this.EStatus.unloaded
        },
        disabledPlay: function () {
            return this.duration == 0
        },
        showPause: function () {
            return this.status == this.EStatus.playing
        },
        disabledPause: function () {
            return false
        },
        disabledSeekRange: function () {
            return this.disabledPlay
        },
        showStepBackward: function () {
            return this.isPlaseList
        },
        disabledStepBackward: function () {
            return this.showStepBackward && this.index == 0
        },
        showStepForward: function () {
            return this.isPlaseList
        },
        disabledStepForward: function () {
            return this.showStepForward && this.index < this.checkedPlayList.length - 1
        },
    },
    mounted () {
        this.status = this.EStatus.unloaded
        this.volumeRange = this.mute ? 0 : this.volume
    },
    beforeDestroy () {
        this.clear()
    },
    methods: {
        // 格式化时间
        // 从秒转换成时分秒
        formatTime: function(s) {
            let secs = Math.round(s)
            let hour = Math.floor(secs / 60 / 60) || 0
            let minutes = Math.floor((secs - hour * 60 * 60) / 60) || 0
            let seconds = (secs - hour * 60 * 60 - minutes * 60) || 0
            return this.duration - 60 * 60 > 0 
                    ? `${hour}:${util.string.padStart(minutes, 2, '0')}:${util.string.padStart(seconds, 2, '0')}`
                    : `${minutes}:${util.string.padStart(seconds, 2, '0')}`
        },
        // ----- sound event ------
        onload: function () {
            this.status = this.EStatus.loaded
        },
        onloaderror: function () {
            this.status = this.EStatus.loaderror
        },
        stopload: function () {
            this.clear()
        },
        // ------ 播放控制 ------
        play: function () {
            if (this.duration == this.seek) this.seek = 0
            this.soundId = this.sound.play()
            this.status = this.EStatus.playing
        },
        pause: function () {
            if (this.status != this.EStatus.playing) return
            this.sound.pause()
            this.status = this.EStatus.pauseing
        },
        onplay: function () {
            this.timer = setInterval(() => {
                this.seek = Math.floor((this.sound.seek(this.soundId) || 0) + 1)
            }, 1000)
        },
        onend: function () {
            this.status = this.EStatus.finished
            clearInterval(this.timer)
        },
        // ------ 进度调节 ------
        seekInput: function (value) {
            this.sound.seek(value, this.soundId)
        },
        onseek: async function () {
            await this.$nextTick()
            // 在调整进度时会出现静音的情况，暂不清楚原因，使用此方法可解决
            this.sound.mute(false, this.soundId)
            this.mute = false
        },
        // ------ 声音 ------
        onmute: function () {
            this.volumeRange = this.mute ? 0 : this.volume
        },
        onvolume: function () {
            if (this.mute) this.mute = false
        },
        // ------ 静音按钮事件 ------
        audioMuteClick: function () {
            this.mute = !this.mute
        },
        audoMouseover: function () {
            this.audioMuteRangeShow = true
        },
        audoMouseleave: function () {
            this.audioMuteRangeShow = false
        },
        // ------- drop ---------
        drop: function (e) {
            let files = e.dataTransfer.files
            this.filesHandler(files)
        },
        filesHandler: async function (files) {
            this.clear()

            if (files.length == 0) return
            this.boblSrc = await window.URL.createObjectURL(files[0])
            
            // this.boblSrc = URL.createObjectURL(files[0])
            this.sound = new Howl({
                src: [this.boblSrc],
                format: ['mp3'],
                volume: this.volume,
                buffer: true,
                mute: this.mute,
                onload: this.onload,
                onloaderror: this.onloaderror,
                onplay: this.onplay,
                onend: this.onend,
                onseek: this.onseek,
                onmute: this.onmute,
                onvolume: this.onvolume,
                onplayerror: () => {
                    this.sound.once('unlock', () => {
                        this.play()
                    })
                },
            })

            this.status = this.sound.state()
            window.URL.revokeObjectURL(this.boblSrc)
        },
        clear: function () {
            this.status = this.EStatus.unloaded
            this.seek = 0
            if (this.sound) {
                this.sound.unload()
                this.sound = null
            }
            if (this.timer) clearInterval(this.timer)
            if (this.boblSrc) {
                window.URL.revokeObjectURL(this.boblSrc)
                this.boblSrc = null
            }
        },
    },
    watch: {
        volumeRange: function (value) {
            if (!this.mute || value != 0) this.volume = value
        },
        volume: function (value) {
            if (value == 0 ) {
                this.mute = true
            } else {
                this.sound.volume(value, this.soundId)
                if (this.mute) this.mute = false
            }
        },
        mute: function (value) {
            this.sound.mute(value, this.soundId)
        }
    },
}
</script>