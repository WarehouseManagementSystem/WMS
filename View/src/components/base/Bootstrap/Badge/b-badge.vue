<template>
    <span class="badge" :class="objClass" v-show="$slots.default" v-if="!href"><slot></slot></span>
    <a class="badge" :class="objClass" :href="href" v-show="$slots.default" v-else><slot></slot></a>
</template>
<script>
import utilities from './../utilities'

export default {
    name: 'b-badge',
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
    },
    computed: {
        objClass: function () {
            return `badge-${this.variant} ${this.pill ? 'badge-pill' : ''}`
        },
    }
}
</script>
