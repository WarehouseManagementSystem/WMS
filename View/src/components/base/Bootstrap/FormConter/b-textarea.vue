<template>
    <div>
        <textarea ref="textarea" class="form-control" :class="objClass" :style="objStyle" :rows="rows" :cols="cols" v-bind="$attrs" v-on="inputListeners" @input.stop="change" @blur="validator"/>
        <b-info v-if="validInfo || Object.keys($scopedSlots).includes('valid-info')" state="valid"><slot name="valid-info">{{ validInfo }}</slot></b-info>
        <b-info v-if="invalidInfo || Object.keys($scopedSlots).includes('invalid-info')" state="invalid"><slot name="invalid-info">{{ invalidInfo }}</slot></b-info>
        <b-help :message="message"></b-help>
    </div>
</template>
<script>
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

import BInfo from './b-form-info'
import BHelp from './b-form-help.vue'

export default {
    name: 'b-textarea',
    inheritAttrs: false,
    mixins: [utilities.mixins.form],
    components: {
        BInfo,
        BHelp,
    },
    data () {
        return {
            message: `可输入 ${this.maxlength} 个字符，已输入 0 个字符，还可输入 ${this.maxlength} 个字符`,
        }
    },
    props: {
        rows: {
            type: [Number, String],
            default: 3,
            validator: (value) => {
                return value > 0
            },
        },
        cols: {
            type: [Number, String],
            validator: (value) => {
                return value > 0
            },
        },
        resize: {
            type: Boolean,
            default: false,
        },
        maxlength: utilities.props.maxlength = {default: 512,},
        validInfo: {
            type: String,
        },
        invalidInfo: {
            type: String,
        },
    },
    computed: {
        objStyle: function () {
            return this.resize ? '':'resize: none'
        },

    },
    methods: {
         validator: function (e) {
             debugger
            // 验证函数不会对传入的数据进行处理
            const value = e.target.value.trim()
            // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
            if (!this.validateRequired(value)) { util.dom.addClass(e.target, 'is-invalid'); return }
            // 长度验证（传入字符串长度为 0、minlength 小于 0、minlength 大于 maxlength 不做校验直接返回 true，验证通过返回 true）
            if (!this.validateLength(value)) { util.dom.addClass(e.target, 'is-invalid'); return } 
            // 正则校验（传入字符串长度为 0、无正则表达式 不做校验直接返回 true，验证通过返回 true）
            if (!this.validatRange(value)) { util.dom.addClass(e.target, 'is-invalid'); return } 
            util.dom.removeClass(e.target, 'is-invalid')
            this.$emit('valid')
        },
        change: function (e) {
            let codeCount = util.string.codePointLength(e.target.value)
            this.message = `可输入 ${this.maxlength} 个字符，已输入 ${codeCount} 个字符，还可输入 ${this.maxlength > codeCount ? this.maxlength - codeCount : 0} 个字符`
        },
    },
}
</script>
