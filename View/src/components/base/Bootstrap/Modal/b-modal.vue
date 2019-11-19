<template>
    <div class="modal fade" :class="ObjClass" tabindex="-1" role="dialog" :aria-labelledby="labelledby" :aria-modal="show" aria-hidden="false">
        <div class="modal-dialog" :class="documentClass" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">
                    <slot name="icon"><i class="mr-2" :class="iconClass"></i></slot>
                    {{ fillTitle }}
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <slot>{{ content }}</slot>
            </div>
            <div v-if="!hideFooter" class="modal-footer">
                <slot name="footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </slot>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import config from '@/config/index.js'

export default {
    name: 'b-modal',
    data () {
        return {
            show: true,
        }
    },
    props: {
        title: String,
        icon: String,
        content: String,
        scrol: Boolean, //modal-dialog-scrollable
        center: Boolean, // modal-dialog-centered
        hideFooter: Boolean,
        size: {
            type: String,
            default: '',
            validator: function (val) {
                return ['', 'xl', 'lg', 'sm'].includes(val)
            },
        }, // modal-xl modal-lg modal-sm
        labelledby: {
            type: String,
            default: 'Modal Dialog',
        },
        status: {
            type: String,
            validator: function (val) {
                return ['', 'info', 'system', 'issue' ,'warning', 'error', 'success', 'danger'].includes(val)
            }
        },
    },
    computed: {
        ObjClass: function () {
            return this.show ? 'show' : '' 
        },
        documentClass: function () {
            let scrol = this.scrol ? 'modal-dialog-scrollable' : ''
            let center = this.center ? 'modal-dialog-centered' : ''
            let size = this.size ? `modal-${this.size}` : ''
            return `${scrol} ${center} ${size}`
        },
        o: function () {
            return Object.getOwnPropertyDescriptor(config.ui.status, this.status)
        },
        iconClass: function () {
            let icon = '', color = ''
            if (this.o && this.o.value) {
                icon =  this.o.value.icon
                color = this.o.value.color
            }
            return `${this.icon || icon} text-${color}`
        },
        fillTitle: function () {
            return this.title || this.o && this.o.value && this.o.value.title
        },
    },
    methods: {
        hideModel: function () {
            this.show = false
        },
        dismiss: function () {
            this.hideModel()
            this.$emit('click:dismiss')
        },
    }
}
</script>