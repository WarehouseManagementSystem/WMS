<template>
    <div v-if="showToast" class="toast fade px-0" :class="{show: showToast}" style="min-width: 300px;" role="alert" aria-live="assertive" aria-atomic="true" data-animation="true">
        <!-- header -->
        <div class="toast-header" style="font-size: 1.2em">
            <slot name="header">
                <slot name="icon"><i class="mr-2" :class="iconClass"></i></slot>
                <strong class="mr-auto">
                    <font v-if="!href">{{ fillTitle }}</font>
                    <a v-else class="text-body" :href="href">{{ fillTitle }}</a>
                </strong>
                <small class="text-muted">{{ fillTime }}</small>
            </slot>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" @click="hide">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <!-- body -->
        <div class="toast-body"><slot>{{ content }}</slot> </div>
    </div>
</template>

<script>
import moment from 'moment'

import config from '@/config/index.js'
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-toast',
    data () {
        return {
            show: true,
        }
    },
    props: {
        title: String,
        href: String,
        autohide: Boolean,
        time: [String, Number, Array,],
        icon: utilities.props.value,
        content: utilities.props.value,
        delay: {
            type: [Number, String,],
            default: 10000,
            validator: val => !isNaN(val) && Number(val) > 0,
        },
        status: {
            type: String,
            validator: val => ['', 'info', 'system', 'issue' ,'warning', 'error', 'success', 'danger'].includes(val),
        },
    },
    computed: {
        showToast: function () {
            return (this.content || this.$slots.default) && this.show
        },
        o: function () {
            return Object.getOwnPropertyDescriptor(config.ui.status, this.status)
        },
        iconClass: function () {
            let icon = this.icon, color = ''
            if (this.o && this.o.value) {
                icon = this.o.value.icon, color = this.o.value.color
            }
            return `${icon} text-${color}`
        },
        fillTitle: function () {
            return this.title || this.o && this.o.value && this.o.value.title
        },
        fillTime: function () {
            return moment(this.time || moment()).from()
        }
    },
    mounted () {
        this.delayOut()
    },
    methods: {
        hide: function () {
            this.show = false
        },
        delayOut: function () {
            if (this.autohide) return
            setTimeout(() => { this.hide() }, Number(this.delay))
        }
    },
}
</script>
