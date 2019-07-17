<template>
    <div>
        <template v-for="(item, index) in list">
            <redio 
                :ValidClass="ValidClass"
                :key="index"
                v-bind="$attrs" 
                :name="name" 
                :label="item.label" 
                :value="item.value" 
                :checked="value" 
                :disabled="item.disabled || disabled" 
                v-on="inputListeners" 
                @change="validator($event)">
                <template v-if="list.length - 1 == index">
                    <b-info key="valid" v-if="validInfo || Object.keys($scopedSlots).includes('valid-info')" state="valid"><slot name="valid-info">{{ validInfo }}</slot></b-info>
                    <b-info key="invalid" v-if="invalidInfo || Object.keys($scopedSlots).includes('invalid-info')" state="invalid"><slot name="invalid-info">{{ invalidInfo }}</slot></b-info>
                </template>
            </redio>
        </template>
        <b-help v-if="info" :info="info" />
    </div>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import redio from './b-radio'
import BInfo from '@/components/base/Bootstrap/Form/Other/b-form-info.vue'
import BHelp from '@/components/base/Bootstrap/Form/Other/b-form-help.vue'

export default {
    name: 'b-radio-group',
    inheritAttrs: false,
    mixins: [ utilities.mixins.form.base, utilities.mixins.form.validator ],
    components: { redio, BInfo, BHelp },
    model: {
        prop: 'value',
        event: 'change',
    },
    data () {
        return {
            ValidClass: '',
        }
    },
    props: {
        value: String,
        list: utilities.props.list,
        info: utilities.props.value,
        disabled: utilities.props.disabled,
        name: {
            type: String,
            required: true,
        },
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
                    change: function (e) {
                        vm.$emit('change', e.target.value)
                    }
                }
            )
        },
    },
     methods: {
        validator: function (e) {
            if (this.disabled) return // disabled 时不校验
            // 验证函数不会对传入的数据进行处理
            const value = e.target ? e.target.value.trim() : e.value.trim()
            // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
            if (!this.validateRequired(value)) { this.ValidClass = 'is-invalid'; return }
            this.ValidClass = '' // 移除可能的 is-invalid
            // 当存在 valid-info slot 或 validInfo 时 
            if (Object.keys(this.$scopedSlots).includes('valid-info') || this.validInfo) this.ValidClass =  'is-valid'
            this.$emit('valid')
        },
    },
}
</script>