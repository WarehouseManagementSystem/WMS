<template>
    <a class="btn" 
        v-if="target == 'a'" 
        :class="objClass" 
        :href="href" 
        :aria-pressed="active" 
        :disabled="disabled" 
        :aria-disabled="disabled"
        :tabindex="objTabindex" 
        :autocomplete="autocomplete" 
        @click.stop="onClick($event)"
        data-toggle="button" 
        role="button">
        {{ value }}
        <sr-message>{{ fillSrMessage }}</sr-message>
    </a>
    <input class="btn" 
        v-else-if="target == 'input'" 
        :class="objClass" 
        :type="type" 
        :value="value" 
        :aria-pressed="active" 
        :disabled="disabled" 
        :aria-disabled="disabled"
        :tabindex="objTabindex" 
        :autocomplete="autocomplete" 
        @click.stop="onClick($event)" 
        data-toggle="button" />
    <button class="btn" 
        v-else 
        :class="objClass" 
        :type="type" 
        :aria-pressed="active" 
        :disabled="disabled" 
        :aria-disabled="disabled" 
        :tabindex="objTabindex" 
        :autocomplete="autocomplete" 
        @click.stop="onClick($event)" 
        data-toggle="button">
        {{ value }}
        <sr-message>{{ fillSrMessage }}</sr-message>
    </button>
</template>
<script>
import SrMessage from '@/components/base/Bootstrap/SrOney/b-sr-only.vue'
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-button',
    components: {
        SrMessage,
    },
    props: {
        color: utilities.props.color,
        href: utilities.props.href,
        size: utilities.props.size,
        active: utilities.props.active,
        disabled: utilities.props.disabled,
        SrMessage: utilities.props.SrMessage,
        outline: {
            type: Boolean,
            default: false,
        },
        target: {
            type: String,
            default: 'button',
            validator: function (value) {
                return ['button', 'a', 'input'].includes(value)
            },
        },
        type: {
            type: String,
            default: 'button',
            validator: function (value) {
                return ['button', 'reset', 'submit'].includes(value)
            },
        },
        value: {
            type: String,
            default: function () {
                return `${this.type.substring(0, 1).toUpperCase()}${this.type.substring(1)}`
            },
        },
        block: {
            type: Boolean,
            default: false,
        },
        tabindex: {
            type: Number,
        },
        autocomplete: {
            type: String,
            default: 'off'
        },
        
    },
    computed: {
        objClass: function () {
            return `btn-${this.outline ? 'outline-' : ''}${this.color} 
                ${this.size ? `btn-${this.size}` : ''} 
                ${this.block ? 'btn-block' : ''} 
                ${this.active ? 'active' : ''} 
                ${(this.disabled && this.target == 'a') ? 'disabled' : ''}`
        },
        objTabindex: function () {
            return this.disabled ? -1 : this.tabindex
        },
        fillSrMessage: function () {
            if (this.SrMessage) {
                return this.variant
            }
            return this.SrMessage
        },
    },
    methods: {
        onClick: function (e) {
            if (this.type == 'submit') {
                this.$emit('submit', e)
            } else if (this.type == 'reset') {
                this.$emit('reset', e)
            } else {
                this.$emit('click', e)
            }
        }
    }
}
</script>
