<template>
    <a :href="href" :class="{disabled: disabled}" :target="filTarget" :rel="`noopener norefferrer ${rel}`" :aria-disabled="disabled">
        <i v-if="!hideIcon && iconClass" class="pr-1 align-self-baseline" :class="iconClass"/>
        <slot>{{ fillText }}</slot>
    </a>
</template>

<script>
import util from '@/util/index.js'
import config from '@/config/index.js'
import utilities from '@/components/utilities/index.js'

export default {
    name: 'base-a',
    props: {
        href: {
            ...utilities.props.href,
            required: true,
        },
        text: utilities.props.value,
        rel: utilities.props.value,
        icon: utilities.props.value,
        target: {
            type: String,
            default: '_self',
            validator: (value) => ['_self', '_blank'].includes(value),
        },
        disabled: utilities.props.disabled,
        download: utilities.props.value,
        hideIcon: Boolean,
    },
    computed: {
        kind: function () {
            if (!this.href || ['#', '#top'].includes(this.href)) return null
            // download
            if (this.download) return 'download'
            //  blob: URL 
            if (this.href.includes(':')) {
                const type = this.href.split(':')[0]
                if (type === 'mailto') return 'email'
                if (type === 'tel') return 'phone'
                if (type === 'sms') return 'sms'
            }
            // Anchor point
            if (this.href[0] === '#') return 'hash'
            // url
            const o = Object.getOwnPropertyDescriptor(config.regex, 'url')
            const regex = o && o.value ? o.value : null
            if (regex) {
                if (this.href.match(new RegExp(regex))) return 'url'
            }

            return null
        },
        iconClass: function () {
            if (this.icon) return this.icon
            if (!this.kind) return
            const o = Object.getOwnPropertyDescriptor(config.ui.icon, this.kind)
            return o && o.value ? o.value : null
        },
        fillText: function () {
            if (this.text) return this.text
            if (['email', 'phone', 'sms'].includes(this.kind)) {
                const arr = this.href.split(':')
                return arr.length > 1 ? arr[1] : null
            }
            return this.href
        },
        filTarget: function () {
            return ['url', 'download'].includes(this.kind) ? '_blank' : this.target
        },
    },
    mounted () {
        if (this.disabled) util.dom.addAttr(this.$el, 'index', '-1')
        if (this.download) util.dom.addAttr(this.$el, 'download', this.download)
    },
    watch: {
        disabled: function (val) {
            val ? util.dom.addAttr(this.$el, 'index', '-1') : util.dom.removeAttr(this.$el, 'index')
        }
    }
}
</script>