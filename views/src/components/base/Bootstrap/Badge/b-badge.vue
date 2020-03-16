<template>
    <span v-if="!href" class="badge align-self-center" :class="objClass" :style="objStyle">
        <slot></slot>
        <sr-message>{{ fillsrMessage }}</sr-message>
    </span>
    <base-a v-else class="badge  align-self-center" :class="objClass" :href="href" :style="objStyle">
        <slot></slot>
        <sr-message>{{ fillsrMessage }}</sr-message>
    </base-a>
</template>
<script>
import utilities from '@/components/utilities/index.js'

import BaseA from '@/components/base/Content/A/c-a.vue'

import srMessage from '@/components/base/Bootstrap/SrOney/b-sr-only.vue'

export default {
    name: 'b-badge',
    components: { BaseA, srMessage, },
    props: {
        color: {
            ...utilities.props.color,
            default: 'danger',
        },
        href: utilities.props.href,
        srMessage: utilities.props.srMessage,
        pill: Boolean,
    },
    computed: {
        objClass: function () {
            return `badge-${this.color} ${!this.$slots.default || this.pill ? 'badge-pill' : ''}`
        },
        objStyle: function () {
            return !this.$slots.default ? 'height: 15px' : null
        },
        fillsrMessage: function () {
            return this.srMessage || this.color
        },
    }
}
</script>
