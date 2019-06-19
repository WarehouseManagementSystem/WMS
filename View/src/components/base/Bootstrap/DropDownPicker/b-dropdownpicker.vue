<template>
    <div class="form-group" :id="id">
        <div class="form-control" :class="[objClass, readonlyClass]" ref="dropdownpicker" :readonly="disabled" @click="show = disabled ? !disabled : !show">
            <div class="row">
                <font class="col" :class="fontClass">
                    {{ text }}
                    <small v-if="info" class="text-muted"><em>({{ info }})</em></small>
                </font>
                <slot name="icon">
                    <i class="fas fa-caret-down col-auto align-middle"></i>
                </slot>
            </div>
        </div>
        <tran-drop>
            <div v-show="!isHide || show" class="position-absolute bg-white border rounded text-center my-1 p-1" style="min-width: 300px; z-index: 1000;">
                <slot>No Data</slot>
                <hr>
                <footer class="text-right">
                    <base-button :disabled="disabled" value="关 闭" @click.stop="show = false" outline></base-button>
                </footer>
            </div>
        </tran-drop>
    </div>
</template>

<script>
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

import tranDrop from '@/components/transition/tran-drop.vue'
import BaseButton from '@/components/base/Bootstrap/Button/b-button.vue'

export default {
    name: 'b-dropdownpicker',
    mixins: [ utilities.mixins.form.base, utilities.mixins.form.readonly, ],
    components: { tranDrop, BaseButton, },
    data () {
        return {
            show: false,
            isHide: true,
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
        info: utilities.props.text,
        value: [String, Number, Date, ],
        disabled: utilities.props.disabled,
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
            if (!(e || e.nodeName) || ['#document', 'HTML', 'BODY'].includes(e.nodeName)) return this.show = false
            e = e.parentNode
            if (e.id && e.id == id) return
            this.isChild(e, id)
        },
    },
    watch: {
        show: function (newValue) {
            newValue 
                ? document.body.addEventListener('mousedown', this.hindeMenu ) 
                : document.body.removeEventListener('mousedown', this.hindeMenu )
        },
    }
}
</script>
