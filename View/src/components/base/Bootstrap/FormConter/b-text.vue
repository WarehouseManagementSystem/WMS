<template>
    <input :type="imputType" ref="imput" class="form-control" :class="objClass" :placeholder="fillPlaceholder" @blur="validator"/>
</template>
<script>
import util from '@/util/index.js'
import mixins from '@/components/utilities/mixins.js'
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-text',
    mixins: [mixins.form],
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
    },
    computed: {
      imputType: function () {
          if (this.type == 'phone') return 'tel'
          return this.type
      },
      fillPlaceholder: function () {
        return (!this.placeholder) 
            ? Object.getOwnPropertyDescriptor(utilities.placeholder, this.type).value
            : this.placeholder
      },
    },
    methods: {
        validator: function (e) {
            if (!this.validateRequired(e)) { util.dom.addClass(e.target, 'is-invalid'); return }
            if (!this.validateLength(e)) { util.dom.addClass(e.target, 'is-invalid'); return } 
            if (!this.validatRange(e, this.type)) { util.dom.addClass(e.target, 'is-invalid'); return } 
            util.dom.removeClass(e.target, 'is-invalid')
        },
        validateRequired: function (e) {
            if (this.required && e.target.value.trim().length == 0) {
                this.$emit('inValidate', 'required')
                return false
            }
            return true
        },
        validateLength: function (e) {
            if (this.minlenght <= 0 || this.minlenght >= this.maxlength) return
            const length = util.string.codePointLength(e.target.value.trim())

            if (length > this.maxlenght) {
                this.$emit('inValidate', 'long')
                return false
            }
            if (length < this.minlenght) {
                this.$emit('inValidate', 'short')
                return false
            }
            return true
        },
        validatRange: function (e, target) {
            const value = e.target.value.trim()
            const regex = Object.getOwnPropertyDescriptor(util.regex, target).value
            if (!(value && value.match(regex))) {
                this.$emit('inValidate', target)
                return false
            }
            return true
        },
    }
}
</script>
