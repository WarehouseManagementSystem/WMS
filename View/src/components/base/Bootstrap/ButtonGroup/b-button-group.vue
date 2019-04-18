<template>
    <div 
        v-if="$slots.default"
        class="btn-group"
        :class="objClass" 
        :role="role" 
        :aria-label="ariaLabel">
        <slot></slot>
    </div>
</template>
<script>
import utilities from '@/components/base/Bootstrap/utilities/index.js'

export default {
    name: 'b-button-group',
    props: {
        size: utilities.props.size(),
        vertical: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            default: 'group',
        },
        ariaLabel: {
            type: String,
            default: 'Button Group',
        },
    },
    computed: {
        objClass: function () {
            return `${this.size ? `btn-group-${this.size}` : ''} 
                ${this.vertical ? `btn-group-vertical` : ''}`
        },
    }
}
</script>
