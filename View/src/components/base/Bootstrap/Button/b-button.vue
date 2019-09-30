<template>
    <base-a class="btn" 
        v-if="target == 'a'" 
        :class="objClass" 
        :href="href" 
        :name="fillName" 
        :aria-pressed="active" 
        :disabled="disabled" 
        :aria-disabled="disabled"
        :tabindex="objTabindex" 
        :autocomplete="autocomplete" 
        @click="onClick($event)"
        data-toggle="button" 
        role="button">
        <slot>{{ value }}</slot>
        <sr-message>{{ fillsrMessage }}</sr-message>
    </base-a>
    <input class="btn" 
        v-else-if="target == 'input'" 
        :class="objClass" 
        :type="type" 
        :value="value" 
        :name="fillName" 
        :aria-pressed="active" 
        :disabled="disabled" 
        :aria-disabled="disabled"
        :tabindex="objTabindex" 
        :autocomplete="autocomplete" 
        @click="onClick($event)" 
        data-toggle="button" />
    <button class="btn" 
        v-else 
        :class="objClass" 
        :type="type" 
        :name="fillName" 
        :aria-pressed="active" 
        :disabled="disabled" 
        :aria-disabled="disabled" 
        :tabindex="objTabindex" 
        :autocomplete="autocomplete" 
        @click="onClick($event)" 
        data-toggle="button">
        <slot>{{ value }}</slot>
        <sr-message>{{ fillsrMessage }}</sr-message>
    </button>
</template>
<script>
import srMessage from '@/components/base/Bootstrap/SrOney/b-sr-only.vue'
import utilities from '@/components/utilities/index.js'

import BaseA from '@/components/base/Content/A/c-a.vue'

export default {
    name: 'b-button',
    components: { BaseA, srMessage, },
    props: {
        color: utilities.props.color,
        href: utilities.props.href,
        size: utilities.props.size,
        name: utilities.props.value,
        active: utilities.props.active,
        disabled: utilities.props.disabled,
        srMessage: utilities.props.srMessage,
        outline: Boolean,
        target: {
            type: String,
            default: 'button',
            validator: value => ['button', 'a', 'input'].includes(value),
        },
        type: {
            type: String,
            default: 'button',
            validator: value => ['button', 'reset', 'submit'].includes(value)
        },
        value: {
            ...utilities.props.value,
            default: function () {
                return `${this.type.substring(0, 1).toUpperCase()}${this.type.substring(1)}`
            },
        },
        block: Boolean,
        tabindex: Number,
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
                ${this.active ? 'active' : ''}`
        },
        objTabindex: function () {
            return this.disabled ? -1 : this.tabindex
        },
        fillName: function () {
            return this.name || this.type
        },
        fillsrMessage: function () {
            if (this.srMessage) {
                return this.variant
            }
            return this.srMessage
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
