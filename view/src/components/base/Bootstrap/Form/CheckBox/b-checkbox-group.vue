<template>
    <div>
        <template  v-for="(item, index) in list">
            <checkbox
                :id="item.id"
                :key="item.key ? item.key : (item.id ? item.id : index)" 
                v-bind="$attrs" 
                :color="color" 
                :ValidClass="ValidClass" 
                unvalid
                :label="item.label" 
                :value="item.value" 
                :checked="values.includes(item.value)" 
                :disabled="item.disabled || disabled" 
                v-on="inputListeners" 
                @input="getCheckedValues($event)">
                <template v-if="list.length - 1 == index" #valid>
                    <slot name="valid">{{ validInfo }}</slot>
                </template>
                <template v-if="list.length - 1 == index" #invalid>
                    <slot name="invalid">{{ invalidInfo }}</slot>
                </template>
            </checkbox>
        </template>
        <b-info :info="info" />
    </div>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import checkbox from './b-checkbox'
import BInfo from '@/components/base/Bootstrap/Form/Other/b-form-info.vue'

export default {
    name: 'b-checkbox-group',
    inheritAttrs: false,
    mixins: [ utilities.mixins.form.base, utilities.mixins.form.validator, ],
    components: { checkbox, BInfo },
    model: {
        prop: 'values',
        event: 'change',
    },
    data () {
        return {
            ValidClass: '',
        }
    },
    props: {
        list: utilities.props.list,
        values: utilities.props.list,
        info: utilities.props.value,
        disabled: utilities.props.disabled,
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
                    change: function () {
                        vm.$emit('change', vm.values)
                    }
                }
            )
        },
    },
    methods: {
        getCheckedValues: function (event) {
            if (event.target.checked) {
                this.values.push(event.target.value)
            } else {
                if (this.values.includes(event.target.value))
                    this.values.splice(this.values.indexOf(event.target.value), 1);
            }
            this.validator()
        },
        validator: function () {
            if (this.disabled) return // disabled 时不校验
            if (!this.required) return
            // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
            if (!this.values || this.values.length == 0) { this.ValidClass = 'is-invalid'; return }
            this.ValidClass = '' // 移除可能的 is-invalid
            // 当存在 valid slot 或 validInfo 时 
            if (this.$slots.valid || this.validInfo) this.ValidClass ='is-valid'
            this.$emit('valid')
        },
    }
}
</script>
