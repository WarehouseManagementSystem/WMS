<template>
    <tran-out-in>
        <div 
            class="alert position-absolute" 
            :class="objClass" 
            style="min-width: 300px; max-width: 600px;" 
            :style="objStyle" 
            v-show="$slots.default && isShow" 
            @mouseenter="clearTimer()" 
            @mouseleave="countDown()" 
            role="alert">
            <alert-header v-if="$slots.header"><slot name="header"></slot></alert-header>
            <div class="overflow-auto" style="max-height: 200px;">
               <slot>
                   <!-- <alert-link>{{countDownSec}}</alert-link> -->
               </slot>
               <sr-message>{{ fillsrMessage }}</sr-message>
            </div>
            <alert-footer v-if="$slots.footer"><slot name="footer"></slot></alert-footer>
            <button type="button" class="close" v-if="showDismisLable" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </tran-out-in>
</template>
<script>
import utilities from '@/components/utilities/index.js'

// import AlertLink from './b-alert-link'
import AlertHeader from './b-alert-header'
import AlertFooter from './b-alert-footer'
import srMessage from '@/components/base/Bootstrap/SrOney/b-sr-only.vue'

import TranOutIn from '@/components/transition/tran-out-in.vue'

export default {
    name: 'b-alert',
    components: {
        // AlertLink,
        AlertHeader,
        AlertFooter,
        srMessage,
        TranOutIn,
    },
    data () {
        return {
            isShow: false,
            dismissCountDownTimerId: null,
        }
    },
    props: {
        show: utilities.props.show,
        color: utilities.props.color,
        width: utilities.props.width,
        position: utilities.props.position,
        srMessage: utilities.props.srMessage,
        dismissible: Boolean,
        countDownDisdismis: Boolean,
        countDownSec: {
            type: [ String, Number, ],
            default: 5,
            validator: value => !isNaN(value)
        },
    },
    computed: {
        objClass: function () {
            return `alert-${this.color} 
                ${this.showDismisLable ? 'alert-dismissible' : ''}`
        },
        objStyle: function () {
            let position = {}
            switch (this.position) {
                case 'top-center':
                    position = {left: `${(document.body.offsetWidth) / 4}px`}
                    break
                case 'top-right':
                    position = {right: 0}
                    break
                case 'bottom-left':
                    position = {bottom: 0, left: 0}
                    break
                case 'bottom-center':
                    position = {bottom: 0, left: `${(document.body.offsetWidth) / 4}px`}
                    break
                case 'bottom-right':
                    position = {bottom: 0, right: 0}
                    break
            }
            return Object.assign(position, {width: `${this.width}%`}) 
        },
        showDismisLable: function () {
            // 保证在任何时候弹出框都可以关闭
            return !this.countDownDisdismis || this.dismissible
            //return this.dismissible
        },
        fillsrMessage: function () {
            return this.srMessage || this.variant 
        },
    },
    created () {
        this.isShow = this.show
        if (this.countDownDisdismis) this.countDown()
    },
    methods: {
        alert: function() {
            this.$emit('alert')
            this.isShow = true
            if (this.countDownDisdismis) this.countDown()
        },
        close: function () {
            this.$emit('close')
            this.clearTimer()
            this.isShow = false
        },
        reset: async function () {
            await this.close()
            await this.alert()
        },
        clearTimer: function () {
            if (this.dismissCountDownTimerId) window.clearInterval(this.dismissCountDownTimerId)
        },
        countDown: function () {
            if (Number(this.countDownSec) < 1) return
            // 每一次计时前都会先清空可能存在的计时器
            this.clearTimer()
            let countDownSec = Number(this.countDownSec)
            this.dismissCountDownTimerId = setInterval( () => {
                if (countDownSec < 1) {
                    this.close()
                    return
                }
                countDownSec--
            }, 1000)
        }
    },
    destroyed () {
        this.clearTimer()
    },
    watch: {
        show: function (newVal) {
            this.isShow = newVal
        },
        '$slots.default': function (newVal, oldVal) {
            if (newVal !== oldVal) this.reset();
        },
        variant: function (newVal, oldVal) {
            if (newVal !== oldVal) this.reset()
        },
    }
}
</script>
