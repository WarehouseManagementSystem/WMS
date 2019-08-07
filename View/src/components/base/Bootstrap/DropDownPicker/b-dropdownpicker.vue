<template>
    <div :id="id">
        <div class="form-control" :class="[objClass, readonlyClass]" ref="dropdownpicker" :readonly="disabled" @click="isShow = disabled ? !disabled : !isShow">
            <div class="row">
                <font class="col" :class="fontClass">{{ text }}</font>
                <slot name="icon" v-if="!disabled">
                    <i class="fas fa-caret-down col-auto align-middle"></i>
                </slot>
            </div>
        </div>
        <tran-drop>
            <div v-show="isShow" class="position-absolute bg-white border rounded shadow-sm text-center my-1 p-1" style="min-width: 300px; z-index: 1000;">
                <slot></slot>
                <footer v-show="showFooter" class="text-right">
                    <hr>
                    <base-button :disabled="disabled || !canHide" value="确 定" @click.stop="isShow = false" outline></base-button>
                </footer>
            </div>
        </tran-drop>
        <b-help :info="info" />
    </div>
</template>

<script>
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

import tranDrop from '@/components/transition/tran-drop.vue'
import BaseButton from '@/components/base/Bootstrap/Button/b-button.vue'

import BHelp from '@/components/base/Bootstrap/Form/Other/b-form-help.vue'

export default {
    name: 'b-dropdownpicker',
    mixins: [ utilities.mixins.form.base, utilities.mixins.form.readonly, ],
    components: { tranDrop, BaseButton, BHelp, },
    data () {
        return {
            isShow: false,
        }
    },
    props: {
        id: {
            type: String,
            default: function () {
                return 'drop-picker-' + util.random.getRandomString()
            }
        },
        placeholder: {
            ...utilities.props.text,
            required: true,
        },
        canHide: {
            type: Boolean,
            default: true,
        },
        show: Boolean,
        showFooter: Boolean,
        info: utilities.props.text,
        value: [String, Number, Date, ],
    },
    computed: {
        text: function () {
            return this.value ? this.value : this.placeholder
        },
        fontClass: function () {
            return this.value ? '' : 'text-muted'
        },
    },
    methods: {
        hindeMenu: function (event) {
            const e = event.target
            // 判断鼠标点击位置是否在菜单内，如果是则不隐藏，如果不是则隐藏
            this.isChild(e, this.id)
        },
        isChild: function (e, id) {
            if (this.disabled) return
            if (!(e || e.nodeName) || ['#document', 'HTML', 'BODY'].includes(e.nodeName)) return this.canHide ? this.isShow = false : null
            e = e.parentNode
            if (e.id && e.id == id) return
            this.isChild(e, id)
        },
    },
    watch: {
        isShow: function (newValue) {
            newValue 
                ? document.body.addEventListener('mousedown', this.hindeMenu ) 
                : this.canHide ? document.body.removeEventListener('mousedown', this.hindeMenu ) : null
            this.$emit('showOrHide', newValue)
        },
        show: function (value) {
            this.isShow = value
        },
    }
}
</script>
