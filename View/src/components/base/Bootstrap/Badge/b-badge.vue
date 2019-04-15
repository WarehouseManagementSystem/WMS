<template>
    <span class="badge" :class="objClass" v-show="$slots.default" v-if="!href">
        <slot></slot>
        <sr-message>{{ fillSrMessage }}</sr-message>
    </span>
    <a class="badge" :class="objClass" :href="href" v-show="$slots.default" v-else>
        <slot></slot>
        <sr-message>{{ fillSrMessage }}</sr-message>
    </a>
</template>
<script>
import utilities from './../utilities'
import SrMessage from '@/components/base/Bootstrap/SrOney/b-sr-only.vue'

export default {
    name: 'b-badge',
    components: {
        SrMessage
    },
    props: {
        variant: {
            type: String,
            default: 'primary',
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return utilities.themes.includes(value)
            },
        },
        pill: {
            type: Boolean,
            default: false,
        },
        href: {
            type: String,
            default: '',
        },
        SrMessage: {
            type: String,
            default: '',
        },
    },
    computed: {
        objClass: function () {
            return `badge-${this.variant} 
                ${this.pill ? 'badge-pill' : ''}`
        },
        fillSrMessage: function () {
            if (this.SrMessage) {
                return this.variant
            }
            return this.SrMessage
        },
    }
}
</script>
