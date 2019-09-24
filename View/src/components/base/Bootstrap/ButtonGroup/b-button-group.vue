<template>
    <div 
        v-if="$slots.default"
        class="btn-group"
        :class="objClass" 
        role="group" >
        <slot></slot>
    </div>
</template>
<script>
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-button-group',
    props: {
        size: utilities.props.size,
        vertical: Boolean,
    },
    computed: {
        objClass: function () {
            return `${this.size ? `btn-group-${this.size}` : ''} 
                ${this.vertical ? `btn-group-vertical` : ''}`
        },
    }
}
</script>
