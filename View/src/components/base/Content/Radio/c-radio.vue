<template>
    <div class=" bg-light border border-muted rounded text-muted" style="width: 340px; height: 115px">
        <div class="py-1 mx-0" style="height: 70%">
            
            <div  class=" text-center align-self-center">
                <blockquote class="blockquote d-inline-flex m-0 py-1 w-100">
                    <strong class="text-truncate" :class="!showAuthor ? 'w-100': 'w-75'">{{ title }}</strong>
                    <cite v-show="showAuthor"  class="text-capitalize w-25"> - {{ info.author }}</cite>
                </blockquote>
                <div class="py-1" style="font-size: 1.5em">
                    <i class='rounded-circle mx-4' style="cursor: grab;" :class="icon.backward" @mouseover="mouseover" @mouseleave="mouseleave" />
                    <b-loading v-show="loading" class='rounded-circle mx-4' status='grow' />
                    <i v-show="pauseing" class='rounded-circle mx-4' style="cursor: grab;" :class="icon.play" @click="play" @mouseover="mouseover" @mouseleave="mouseleave" :disabled="loading" />
                    <i v-show="playing" class='rounded-circle mx-4' style="cursor: grab;" :class="icon.pause" @click="pause" @mouseover="mouseover" @mouseleave="mouseleave" :disabled="loading" />
                    <i class='rounded-circle mx-4' style="cursor: grab;" :class="icon.forward" @mouseover="mouseover" @mouseleave="mouseleave" />
                </div>
            </div>
        </div>
        <b-range class="my-1 p-0" hideValue :min-value="seek" :max-value="length" :max="max" :disabled="loading || error" @input="rangeInput" :value="value" />
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

import BRange from '@/components/base/Bootstrap/Form/b-range.vue'
import BLoading from "@/components/base/Bootstrap/Loading/b-loading.vue"

export default {
    name: 'c-radio',
    components: { BRange, BLoading, },
    data () {
        return {
            value: 0,
            max: 0,
            seek: '--:--',
            sound: null,
            soundID: null,
            length: '--:--',
            errorMessage: null,
            info: {
                name: 'Dorian',
                author: 'author',
                img: '',
            },
            status: 'loading', // loading: 加载，playing: 播放，pauseing: 暂停
            timer: null,
        }
    },
    computed: {
        icon: function () {
            return config.ui.icon
        },
        showAuthor: function () {
            return this.info.author && !this.error
        },
        title: function () {
            return this.loading ? 'loading...' : this.error ? this.errorMessage : this.info.name
        },
        loading: function () {
            return this.status == 'loading'
        },
        playing: function () {
            return this.status == 'playing'
        },
        pauseing: function () {
            return this.status == 'pauseing'
        },
        error : function () {
            return this.status == 'error'
        },
    },
    mounted () {
        this.status = 'loading'
        this.sound = new Howl({
            // src: [require('example.mp3')],
            volume: 1,
            html5: true,
            onloaderror: this.onloaderror,
            onload: this.onload,
            onend: this.onend,
            onplay: this.onplay,
            onseek: this.onseek,
            onplayerror: () => {
                this.sound.once('unlock', () => {
                    this.sound.play();
                })
            },
        })
        this.status = 'pauseing'
    },
    beforeDestroy () {
        this.sound.unload()
        this.sound = null,
        clearInterval(this.timer)  
    },
    methods: {
        formatTime: function(s) {
            let secs = Math.round(s)
            let hour = Math.floor(secs / 60 / 60) || 0
            let minutes = Math.floor((secs - hour * 60 * 60) / 60) || 0
            let seconds = (secs - hour * 60 * 60 - minutes * 60) || 0
            return hour > 0 
                    ? `${hour}:${util.string.padStart(minutes, 2, '0')}:${util.string.padStart(seconds, 2, '0')}`
                    : `${minutes}:${util.string.padStart(seconds, 2, '0')}`
        },
        onloaderror: function () {
            this.status = 'error',
            this.errorMessage = 'load error'
        },
        onload: function () {
            this.errorMessage = null
            this.max = this.sound.duration(this.soundID)
            this.length = this.formatTime(this.max)
            this.seek = this.max > 60 * 60 ? '0:00:00' : '0:00'
        },
        play: function () {
            if (this.loading) return
            this.errorMessage = null
            if (this.sound.duration(this.soundID) == this.value) this.value = 0
            this.soundID = this.sound.play()
            this.status = 'playing'
        },
        pause: function () {
            if (this.loading) return
            this.sound.pause()
            this.status = 'pauseing'
        },
        onend: function () {
            this.status = 'pauseing'
            clearInterval(this.timer)
        },
        onplay: function () {
            let seek
            this.timer = setInterval(() => {
                this.value = Math.floor((this.sound.seek(this.soundID) || 0) + 1)
                seek = this.formatTime(this.value)
                this.seek = this.max > 60 * 60 ? util.string.padStart(seek, 7, '0:00:00') : seek
            }, 1000)
        },
        onseek: async function () {
            await this.$nextTick()
            this.seek = this.formatTime(this.sound.seek(this.soundID))
        },
        rangeInput: function (value) {
            this.sound.seek(value)
        },
        mouseover: function (event) {
            if (this.loading) return
            util.dom.addClass(event.target, 'text-primary')
        },
        mouseleave: function (event) {
            if (this.loading) return
            util.dom.removeClass(event.target, 'text-primary')
        },
    },
}
</script>