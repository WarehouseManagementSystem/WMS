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
import SrMessage from '@/components/base/Bootstrap/SrOney/b-sr-only.vue'
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-badge',
    components: {
        SrMessage
    },
    props: {
        color: utilities.props.color(),
        href: utilities.props.href(),
        SrMessage: utilities.props.SrMessage(),
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
        fillSrMessage: function () {
            if (this.SrMessage) {
                return this.variant
            }
            return this.SrMessage
        },
    }
}
</script>
