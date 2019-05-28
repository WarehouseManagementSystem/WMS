<template>
    <div class="form-group">
        <select 
            class="custom-select" 
            :class="[objClass, sizeClass]" 
            v-bind="$attrs" 
            :multiple="multiple" 
            :size="row" 
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
                {{ item.text ? item.text : item.value }}
            </option>
        </select>
        <b-info v-if="validInfo || Object.keys($scopedSlots).includes('valid-info')" state="valid"><slot name="valid-info">{{ validInfo }}</slot></b-info>
        <b-info v-if="invalidInfo || Object.keys($scopedSlots).includes('invalid-info')" state="invalid"><slot name="invalid-info">{{ invalidInfo }}</slot></b-info>
    </div>
</template>

<script>
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

import BInfo from './b-form-info'

export default {
    name: 'b-select',
    inheritAttrs: false,
    mixins: [ utilities.mixins.form.base, utilities.mixins.form.validator, ],
    components: { BInfo },
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        list: utilities.props.list,
        value: {
            type: [String, Array],
            default: function () {
                return this.multiple ? [] : ''
            }
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        row: {
            type: Number,
            default: function () {
                return this.multiple ? this.list.length + 1 : null
            },
            validator: function (val) {
                return val > 0 && /^\d+$/.test(val)
            }
        },
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
                        vm.$emit('change', vm.value)
                    }
                }
            )
        },
    },
    methods: {
        isSelected: function (val) {
            return this.multiple ? this.value.includes(val) : this.value == val
        },
        change: function (event) {
            this.value = this.multiple 
                ? Array.prototype.filter.call(event.target.options,(o) => o.selected ).map((o) => "_value" in o ? o._value : o.value)
                : event.target.value
            this.validator(event)
        },
        validator: function (e) {
            // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
            if (!this.validateRequired(this.value)) { util.dom.addClass(e.target, 'is-invalid'); return }
            util.dom.removeClass(e.target, 'is-invalid')
            this.$emit('valid')
        },
    }
}
</script>

