<template>
    <div class=" bg-light border border-muted rounded text-muted" style="width: 340px; height: 115px">
        <div class="py-1 mx-0" style="height: 70%">
            
            <div  class=" text-center align-self-center">
                <blockquote class="blockquote d-inline-flex m-0 py-1 w-100">
                    <strong class="text-truncate" :class="!showAuthor ? 'w-100': 'w-75'">{{ loading ? 'loading...' : info.name }}</strong>
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
        <b-range class="my-1 p-0" hideValue :min-value="seek" :max-value="length" :disabled="loading" @input="rangeInput" :value="value" />
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
            seek: '--:--',
            sound: null,
            soundID: null,
            length: '--:--',
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
        loading: function () {
            return this.status == 'loading'
        },
        showAuthor: function () {
            return this.info.author
        },
        playing: function () {
            return this.status == 'playing'
        },
        pauseing: function () {
            return this.status == 'pauseing'
        },
    },
    mounted () {
        this.status = 'loading'
        this.sound = new Howl({
            src: [require('@/assets/examp.mp3')],
            volume: 1,
            html5: true,
            onload: this.onload,
            onend: this.onend,
            onplay: this.onplay,
            onseek: this.onseek,
        })
        this.status = 'pauseing'
    },
    beforeDestroy () {
      this.sound = null,
      clearInterval(this.timer)  
    },
    methods: {
        formatTime: function(s) {
            let secs = Math.round(s)
            let minutes = Math.floor(secs / 60) || 0
            let seconds = (secs - minutes * 60) || 0
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
        },
        onload: function () {
            this.seek = '0:00'
            this.length = this.formatTime(this.sound.duration(this.soundID))
        },
        play: function () {
            if (this.loading) return
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
            this.timer = setInterval(() => {
                this.value = Math.floor((this.sound.seek(this.soundID) || 0) + 1)
                this.seek = this.formatTime(this.value)
            }, 1000)
        },
        onseek: async function () {
            await this.$nextTick()
            this.seek = this.formatTime(this.sound.seek(this.soundID))
        },
        rangeInput: function (value) {
            this.sound.seek(this.sound.duration() * value / 100)
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