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
                @input="validator($event)">
                <template #valid v-if="list.length - 1 == index">
                    <b-valid key="valid" v-if="validInfo || $slots.validInfo" state="valid"><slot name="valid-info">{{ validInfo }}</slot></b-valid>
                    <b-valid key="invalid" v-if="invalidInfo || $slots.invalidInfo" state="invalid"><slot name="invalid-info">{{ invalidInfo }}</slot></b-valid>
                </template>
            </redio>
        </template>
        <b-info :info="info" />
    </div>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import redio from './b-radio'
import BValid from '@/components/base/Bootstrap/Form/Other/b-form-valid.vue'
import BInfo from '@/components/base/Bootstrap/Form/Other/b-form-info.vue'

export default {
    name: 'b-radio-group',
    inheritAttrs: false,
    mixins: [ utilities.mixins.form.base, utilities.mixins.form.validator ],
    components: { redio, BValid, BInfo },
    model: {
        prop: 'value',
        event: 'input',
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
    methods: {
        validator: function (e) {
            if (this.disabled) return // disabled 时不校验
            // 验证函数不会对传入的数据进行处理
            const value = e.target ? e.target.value.trim() : e.value.trim()
            // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
            if (!this.validateRequired(value)) { this.ValidClass = 'is-invalid'; return }
            this.ValidClass = '' // 移除可能的 is-invalid
            // 当存在 valid-info slot 或 validInfo 时 
            if (this.$slots.validInfo || this.validInfo) this.ValidClass =  'is-valid'
            this.$emit('valid')
        },
    },
}
</script>