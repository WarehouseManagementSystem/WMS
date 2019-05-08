<template>
    <div>
        <input :type="imputType" class="form-control" :class="objClass" :placeholder="fillPlaceholder" v-bind="$attrs" v-on="inputListeners" @blur="validator"/>
        <b-info v-if="valid || $scopedSlots.valid" state="valid" name="valid"><slot>{{ valid }}</slot></b-info>
        <b-info v-if="valid || $scopedSlots.invalid" state="invalid" name="invalid"><slot>{{ invalid }}</slot></b-info>
    </div>
</template>
<script>
import util from '@/util/index.js'
import mixins from '@/components/utilities/mixins.js'
import utilities from '@/components/utilities/index.js'

import BInfo from './b-form-info'

export default {
    name: 'b-text',
    inheritAttrs: false,
    mixins: [mixins.form],
    components: {
        BInfo
    },
    props: {
        type: {
            type: String,
            default: 'text',
            validator: (value) => {
                // 这个值必须匹配下列字符串中的一个
                return ['text', 'password', 'search', 'email', 'url', 'tel', 'phone'].includes(value)
                //   'number', 'date', `time`, 'range', 'color'
            },
        },
        placeholder: {
            type: String,
        },
        valid: {
            type: String,
        },
        invalid: {
            type: String,
        },
    },
    computed: {
        imputType: function () {
            if (this.type == 'phone') return 'tel'
            return this.type
        },
        fillPlaceholder: function () {
            return this.placeholder 
                ? this.placeholder
                : ((Object.getOwnPropertyDescriptor(utilities.placeholder, this.type) 
                    && Object.getOwnPropertyDescriptor(utilities.placeholder, this.type).value) 
                    || null)
        },
        inputListeners: function () {
            var vm = this
            // `Object.assign` 将所有的对象合并为一个新对象
            return Object.assign({},
                // 我们从父级添加所有的监听器
                this.$listeners,
                // 然后我们添加自定义监听器，
                // 或覆写一些监听器的行为
                {
                    // 这里确保组件配合 `v-model` 的工作
                    input: function (event) {
                        vm.$emit('input', event.target.value)
                    }
                }
            )
        },
    },
    methods: {
        validator: function (e) {
            // 验证函数不会对传入的数据进行处理
            const value = e.target.value.trim()
            // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
            if (!this.validateRequired(value)) { util.dom.addClass(e.target, 'is-invalid'); return }
            // 长度验证（传入字符串长度为 0、minlenght 小于 0、minlenght 大于 maxlenght 不做校验直接返回 true，验证通过返回 true）
            if (!this.validateLength(value)) { util.dom.addClass(e.target, 'is-invalid'); return } 
            // 正则校验（传入字符串长度为 0、无正则表达式 不做校验直接返回 true，验证通过返回 true）
            if (!this.validatRange(value, this.type)) { util.dom.addClass(e.target, 'is-invalid'); return } 
            util.dom.removeClass(e.target, 'is-invalid')
            this.$emit('valid')
        },
        // 非空验证（验证通过返回 true）
        validateRequired: function (value) {
            // required 为 false 不做校验直接返回 true
            if (this.required && value == 0) {
                this.$emit('invalid', 'required')
                return false
            }
            return true
        },
        // 长度验证（验证通过返回 true）
        validateLength: function (value) {
            // 传入字符串长度为 0、minlenght 小于 0、minlenght 大于 maxlenght 不做校验直接返回 true
            if (value.length == 0 || this.minlenght < 0 || this.minlenght >= this.maxlength) return true
            const length = util.string.codePointLength(value)
            if (length > this.maxlenght) {
                this.$emit('invalid', 'long')
                return false
            }
            if (length < this.minlenght) {
                this.$emit('invalid', 'short')
                return false
            }
            return true
        },
        // 正则校验（验证通过返回 true）
        validatRange: function (value, type) {
            // 传入字符串长度为 0、无正则表达式 不做校验直接返回 true
            const regex = this.pattern 
                ? util.string.toRegExp(this.pattern) 
                : ((Object.getOwnPropertyDescriptor(util.regex, type) 
                    && Object.getOwnPropertyDescriptor(util.regex, type).value) 
                    || null)

            if (value.length == 0 || !regex) return true
            
            if (!(value.match(regex))) {
                this.$emit('invalid', type)
                return false
            }
            return true
        },
    }
}
</script>
