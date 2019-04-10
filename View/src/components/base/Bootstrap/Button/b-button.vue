<template>
    <span>
        <a class="btn" 
            v-if="target == 'a'" 
            :class="objClass" 
            :href="href" 
            :aria-pressed="active" 
            :aria-disabled="disabled"
            :tabindex="objTabindex" 
            :autocomplete="autocomplete" 
            @click="onClick($event)"
            data-toggle="button" 
            role="button">
            {{value}}
        </a>
        <input class="btn" 
            v-else-if="target == 'input'" 
            :class="objClass" 
            :type="type" 
            :value="value" 
            :aria-pressed="active" 
            :disabled="disabled" 
            :tabindex="objTabindex" 
            :autocomplete="autocomplete" 
            @click="onClick($event)" 
            data-toggle="button">
        <button class="btn" 
            v-else 
            :class="objClass" 
            :type="type" 
            :aria-pressed="active" 
            :disabled="disabled" 
            :tabindex="objTabindex" 
            :autocomplete="autocomplete" 
            @click="onClick($event)" 
            data-toggle="button">
            {{value}}
        </button>
        <sr-message>{{ fillSrMessage }}</sr-message>
    </span>
</template>
<script>
import utilities from './../utilities'
import SrMessage from '@/components/base/Bootstrap/SrOney/b-sr-only.vue'

export default {
    name: 'b-button',
    components: {
        SrMessage,
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
        outline: {
            type: Boolean,
            default: false,
        },
        target: {
            type: String,
            default: 'button',
            validator: function (value) {
                return utilities.btnTarget.includes(value)
            },
        },
        type: {
            type: String,
            default: 'button',
            validator: function (value) {
                return utilities.btnType.includes(value)
            },
        },
        value: {
            type: String,
            default: function () {
                return `${this.type.substring(0, 1).toUpperCase()}${this.type.substring(1)}`
            },
        },
        size: {
            type: String,
            default: '',
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return utilities.btnSize.includes(value)
            },
        },
        block: {
            type: Boolean,
            default: false,
        },
        active: {
            type: Boolean,
            default: false,
        },
        disabled: {
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
        href: {
            type: String,
            default: '#',
        },
        SrMessage: {
            type: String,
            default: '',
        },
    },
    computed: {
        objClass: function () {
            return `btn-${this.outline ? 'outline-' : ''}${this.variant} 
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
