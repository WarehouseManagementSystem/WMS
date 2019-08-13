<template>
    <span class="badge" :class="objClass" v-show="$slots.default" v-if="!href">
        <slot></slot>
        <sr-message>{{ fillsrMessage }}</sr-message>
    </span>
    <a class="badge" :class="objClass" :href="href" v-show="$slots.default" v-else>
        <slot></slot>
        <sr-message>{{ fillsrMessage }}</sr-message>
    </a>
</template>
<script>
import srMessage from '@/components/base/Bootstrap/SrOney/b-sr-only.vue'
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-badge',
    components: {
        srMessage
    },
    props: {
        color: utilities.props.color,
        href: utilities.props.href,
        srMessage: utilities.props.srMessage,
        pill: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        objClass: function () {
            return `badge-${this.variant} 
                ${this.pill ? 'badge-pill' : ''}`
        },
        fillsrMessage: function () {
            if (this.srMessage) {
                return this.variant
            }
            return this.srMessage
        },
    }
}
</script>
