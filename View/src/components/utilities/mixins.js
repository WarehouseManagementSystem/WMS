// mixins
// 通用混入

import util from '@/util/index.js'
import props from '@/components/utilities/props.js'

export default {
    form: {
        base: {
            props: {
                color: props.color = { default: 'transparent' },
                textColor: props.textColor,
                size: props.size,
            },
            computed: {
                objClass: function () {
                    let size = ''
                    if (this.size) size = `form-control-${this.size}`
                    return `bg-${this.color} text-${this.textColor} ${size}`
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
        },
        validator: {
            props: {
                required: {
                    type: Boolean,
                    default: false,
                },
                minlength: {
                    type: [String, Number],
                    default: 0,
                    validator: (value) => {
                        // 这个值必须匹配下列字符串中的一个
                        return value >= 0
                    },
                },
                maxlength: {
                    type: [String, Number],
                    default: 64,
                    validator: (value) => {
                        // 这个值必须匹配下列字符串中的一个
                        return value >= 0
                    },
                },
                pattern: {
                    type: String,
                },
                validInfo: {
                    type: String,
                },
                invalidInfo: {
                    type: String,
                },
            },
            methods: {
                validator: function (e, regex = this.pattern) {
                    // 验证函数不会对传入的数据进行处理
                    const value = e.target ? e.target.value.trim() : e.value.trim()
                    // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
                    if (!this.validateRequired(value)) { util.dom.addClass(e.target, 'is-invalid'); return }
                    // 长度验证（传入字符串长度为 0、minlength 小于 0、minlength 大于 maxlength 不做校验直接返回 true，验证通过返回 true）
                    if (!this.validateLength(value)) { util.dom.addClass(e.target, 'is-invalid'); return }
                    // 正则校验（传入字符串长度为 0、无正则表达式 不做校验直接返回 true，验证通过返回 true）
                    if (!this.validateRange(value, regex)) { util.dom.addClass(e.target, 'is-invalid'); return }
                    util.dom.removeClass(e.target, 'is-invalid')
                    this.$emit('valid')
                },
                // 非空验证（验证通过返回 true）
                validateRequired: function (value) {
                    // required 为 false 不做校验直接返回 true
                    if (this.required && value.length == 0) {
                        this.$emit('invalid', 'required')
                        return false
                    }
                    return true
                },
                // 长度验证（验证通过返回 true）
                validateLength: function (value) {
                    // 传入字符串长度为 0、minlength 小于 0、minlength 大于 maxlength 不做校验直接返回 true
                    if (value.length == 0 || this.minlength < 0 || this.minlength >= this.maxlength) return true
                    const length = util.string.codePointLength(value)
                    if (length < this.minlength) {
                        this.$emit('invalid', 'short')
                        return false
                    }
                    if (length > this.maxlength) {
                        this.$emit('invalid', 'long')
                        return false
                    }
                    return true
                },
                // 正则校验（验证通过返回 true）
                validateRange: function (value, regex) {
                    // 传入字符串长度为 0、无正则表达式 不做校验直接返回 true
                    if (value.length == 0 || !regex) return true

                    if (!(value.match(regex))) {
                        this.$emit('invalid', 'regex')
                        return false
                    }
                    return true
                },
            },
        },
        readonly: {
            props: {
                readonly: props.readonly,
            },
            computed: {
                readonlyClass: function () { 
                    return this.readonly ? 'form-control-plaintext' : ''
                },
            },
        },
    },
}