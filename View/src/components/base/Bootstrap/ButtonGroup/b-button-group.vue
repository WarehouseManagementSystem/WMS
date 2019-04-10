<template>
    <div 
        v-if="$slots.default"
        class="btn-group"
        :class="objClass" 
        :role="role" 
        :aria-label="AriaLabel">
        <slot></slot>
    </div>
</template>
<script>
import utilities from './../utilities'

export default {
    name: 'b-button-group',
    props: {
         size: {
            type: String,
            default: '',
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return utilities.btnSize.includes(value)
            },
        },
        vertical: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            default: 'group',
        },
        AriaLabel: {
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
