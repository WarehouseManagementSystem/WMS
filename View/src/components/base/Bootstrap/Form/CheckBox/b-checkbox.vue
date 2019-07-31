<template>
    <div class="custom-control custom-checkbox" :class="{ 'custom-control-inline': inline}">
        <input 
            type="checkbox" 
            class="custom-control-input" 
            :class="ValidClass" 
            :id="id" 
            ref="checkbox" 
            :value="value" 
            :checked="disabled ? defaultState : isChecked" 
            :aria-checked="disabled ? defaultState : isChecked" 
            :disabled="disabled" 
            :aria-disabled="disabled" 
            v-bind="$attrs" 
            v-on="inputListeners"
            @change="validator($event)">
        <label class="custom-control-label" :for="id">{{ label || value }}</label>
        <b-info v-if="validInfo || Object.keys($scopedSlots).includes('valid-info')" state="valid"><slot name="valid-info">{{ validInfo }}</slot></b-info>
        <b-info v-if="invalidInfo || Object.keys($scopedSlots).includes('invalid-info')" state="invalid"><slot name="invalid-info">{{ invalidInfo }}</slot></b-info>
        <b-help :class="{ 'pl-1': inline }" :info="info" />
    </div>
</template>

<script>
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

import BInfo from '@/components/base/Bootstrap/Form/Other/b-form-info.vue'
import BHelp from '@/components/base/Bootstrap/Form/Other/b-form-help.vue'

export default {
    name: 'b-checkbox',
    inheritAttrs: false,
    mixins: [ utilities.mixins.form.base, utilities.mixins.form.validator ],
    components: { BInfo, BHelp },
    model: {
        prop: 'checked',
        event: 'change'
    },
    data () {
        return {
            isChecked: false,
        }
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
        indeterminate: Number,
        checked: Boolean,
        defaultState: Boolean,
        inline: Boolean,
        disabled: Boolean,
        ValidClass: String,
        unvalid: Boolean,
        info: String,
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
                    change: function (event) {
                        vm.$emit('change', event.target.checked)
                    }
                }
            )
        },  
    },
    mounted () {
        this.isChecked = this.checked
        if (this.indeterminate)
            this.setIndeterminate(Number(this.indeterminate))
    },
    methods: {
        validator: function (e) {
            if (this.unvalid) return // unvalid 时不校验
            if (this.disabled) return // disabled 时不校验
            if (!this.required) return
            util.dom.removeClass(e.target, 'is-valid') // 移除可能的 is-valid
            // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
            if (!e.target.checked) { util.dom.addClass(e.target, 'is-invalid'); return }
            util.dom.removeClass(e.target, 'is-invalid') // 移除可能的 is-invalid
            // 当存在 valid-info slot 或 validInfo 时 
            if (Object.keys(this.$scopedSlots).includes('valid-info') || this.validInfo) util.dom.addClass(e.target, 'is-valid')
            this.$emit('valid')
        },
        setIndeterminate: function (val) {
            // 0 - 未 选 择
            // 1 - 部分选择
            // 2 - 全选
            if (val == 0) {
                if (this.$refs.checkbox.indeterminate) this.$refs.checkbox.indeterminate = false
                this.isChecked = false
            } else if (val == 1) {
                util.dom.addAttr(this.$refs.checkbox, 'indeterminate', 'true')
                this.isChecked = false
            } else {
                if (this.$refs.checkbox.indeterminate) this.$refs.checkbox.indeterminate = false
                this.isChecked = true
            }
        }
    },
    watch: {
        indeterminate: function (val) {
            this.setIndeterminate(val)
        },
        checked: function (val) {
            this.isChecked = val
        },
    }
}
</script>

