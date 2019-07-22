<template>
    <div class="custom-control custom-checkbox" :class="{ 'custom-control-inline': inline}">
        <input 
            type="checkbox" 
            class="custom-control-input" 
            :id="id" 
            ref="checkbox" 
            :value="value" 
            :checked="checked" 
            :aria-checked="checked" 
            :disabled="disabled" 
            :aria-disabled="disabled" 
            v-bind="$attrs" 
            v-on="inputListeners" >
        <b-info v-if="validInfo || Object.keys($scopedSlots).includes('valid-info')" state="valid"><slot name="valid-info">{{ validInfo }}</slot></b-info>
        <b-info v-if="invalidInfo || Object.keys($scopedSlots).includes('invalid-info')" state="invalid"><slot name="invalid-info">{{ invalidInfo }}</slot></b-info>
        <label class="custom-control-label" :for="id">{{ label }}</label>
    </div>
</template>

<script>
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

import BInfo from '@/components/base/Bootstrap/Form/Other/b-form-info.vue'

export default {
    name: 'b-checkbox',
    inheritAttrs: false,
    mixins: [ utilities.mixins.form.base, utilities.mixins.form.validator ],
    components: { BInfo },
    model: {
        prop: 'checked',
        event: 'input'
    },
    props: {
        value: utilities.props.text,
        label: utilities.props.text,
        id: {
            type: String,
            default: function () {
                return 'Checkbox-' + util.random.getRandomString()
            }
        },
        indeterminate: {
            type: Number,
            default: 0,
        },
        checked: Boolean,
        disabled: Boolean,
        inline: Boolean,
    },
    computed: {
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
                        vm.$emit('input', event.target.checked)
                    }
                }
            )
        },
    },
    mounted () {
        this.setIndeterminate(this.indeterminate)
    },
    methods: {
        validator: function (e) {
            // 验证函数不会对传入的数据进行处理
            const value = e.target ? e.target.value.trim() : e.value.trim()
            // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
            if (!this.validateRequired(value)) { util.dom.addClass(e.target, 'is-invalid'); return }
            util.dom.removeClass(e.target, 'is-invalid')
            this.$emit('valid')
        },
        setIndeterminate: function (val) {
            if (!val) return
            if (val == 0) {
                if (this.$refs.checkbox.indeterminate) this.$refs.checkbox.indeterminate = false
                this.$refs.checkbox.checked = false
            } else if (val == 1) {
                util.dom.addAttr(this.$refs.checkbox, 'indeterminate', 'true')
            } else {
                if (this.$refs.checkbox.indeterminate) this.$refs.checkbox.indeterminate = false
                this.$refs.checkbox.checked = true
            }
        }
        
    },
    watch: {
        indeterminate: function (val) {
            this.setIndeterminate(val)
        },
    }
}
</script>

