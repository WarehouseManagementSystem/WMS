<template>
    <div class="form-group">
        <select 
            class="custom-select" 
            :class="[objClass, sizeClass]" 
            v-bind="$attrs" 
            :multiple="multiple" 
            :size="row" 
            :disabled="disabled" 
            :aria-disabled="disabled" 
            @change.stop="change" 
            @blur.stop="validator" 
            v-on="inputListeners" >
            <option value="" :selected="value.length == 0" :aria-selected="value.length == 0" >&lt;Pleace select...&gt;</option>
            <option 
                v-for="item in list" 
                :key="item.value" 
                :value="item.value" 
                :selected="isSelected(item.value)"
                :aria-selected="isSelected(item.value)"
                :disabled="item.disabled"
                :aria-disabled="item.disabled" >
                {{ item.label ? item.label : item.value }}
            </option>
        </select>
        <b-valid v-if="validInfo || $slots.valid" state="valid"><slot name="valid">{{ validInfo }}</slot></b-valid>
        <b-valid v-if="invalidInfo || $slots.invalid" state="invalid"><slot name="invalid">{{ invalidInfo }}</slot></b-valid>
        <b-info :info="info" />
    </div>
</template>

<script>
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

import BValid from '@/components/base/Bootstrap/Form/Other/b-form-valid.vue'
import BInfo from '@/components/base/Bootstrap/Form/Other/b-form-info.vue'

export default {
    name: 'b-select',
    inheritAttrs: false,
    mixins: [ utilities.mixins.form.base, utilities.mixins.form.validator, ],
    components: { BValid, BInfo, },
    model: {
        prop: 'value',
        event: 'change'
    },
    data () {
        return {
            isSelectedValue: this.value,
        }
    },
    props: {
        list: utilities.props.list,
        disabled: utilities.props.disabled,
        info: utilities.props.value,
        value: {
            type: [String, Array],
            default: function () {
                return this.multiple ? [] : ''
            }
        },
        row: {
            type: [ Number, String, ],
            default: function () {
                return this.multiple ? this.list.length + 1 : null
            },
            validator: function (val) {
                return !isNaN(val) && Number(val) > 0
            }
        },
        multiple: Boolean,
    },
    computed: {
        sizeClass: function () {
            return this.size ? `custom-select-${this.size}` : ''
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
                    change: function () {
                        vm.$emit('change', vm.isSelectedValue)
                    }
                }
            )
        },
    },
    methods: {
        isSelected: function (val) {
            return this.multiple ? this.isSelectedValue.includes(val) : this.isSelectedValue == val
        },
        change: function (event) {
            this.isSelectedValue = this.multiple 
                ? Array.prototype.filter.call(event.target.options,(o) => o.selected && o.value ).map((o) => "_value" in o ? o._value : o.value)
                : event.target.value
            this.validator(event)
        },
        validator: function (e) {
            if (this.disabled) return // disabled 时不校验
            util.dom.removeClass(e.target, 'is-valid') // 移除可能的 is-valid
            // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
            if (!this.validateRequired(this.isSelectedValue)) { util.dom.addClass(e.target, 'is-invalid'); return }
            util.dom.removeClass(e.target, 'is-invalid') // 移除可能的 is-invalid
            // 当存在 valid slot 或 validInfo 时 
            if (this.$slots.valid || this.validInfo) util.dom.addClass(e.target, 'is-valid')
            this.$emit('valid')
        },
    }
}
</script>

