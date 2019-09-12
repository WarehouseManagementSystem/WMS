<template>
    <div>
        <div class="row mx-1">
            <span class="col-auto text-right">{{ fillMinValue }}</span>
            <input type="range" class="custom-range col align-middle" :min="min" :max="max" :step="step" :value="value" v-bind="$attrs" v-on="inputListeners">
            <span class="col-auto text-left">{{ fillMaxValue }}</span>
        </div>
        <b-info :info="message" />
    </div>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import BInfo from '@/components/base/Bootstrap/Form/Other/b-form-info.vue'

export default {
    name: 'b-range',
    inheritAttrs: false,
    components: { BInfo },
     model: {
        prop: 'value',
        event: 'input'
    },
    data () {
        return {
            select: Number(this.value),
        }
    },
    props: {
        min: {
            type: [Number, String,],
            default: 0,
            validator: function (value) {
                return !isNaN(value)
            },
        },
        max: {
            type: [Number, String,],
            default: 100,
            validator: function (value) {
                return !isNaN(value)
            },
        },
        step: {
            type: [Number, String,],
            default: 1,
            validator: function (value) {
                return !isNaN(value)
            },
        },
        value: {
            type: [Number, String,],
            default: function (value) {
                return Number(value) ? Number(value) : Number(this.min)
            },
            validator: function (value) {
                return !isNaN(value)
            },
        },
        prompt: Boolean,
        info: utilities.props.value,
        minValue: utilities.props.value,
        maxValue: utilities.props.value,
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
                        vm.select = Number(event.target.value)
                        vm.$emit('input', vm.select)
                    }
                }
            )
        },
        fillMinValue: function () {
            return this.minValue ? this.minValue : Number(this.min)
        },
        fillMaxValue: function () {
            return this.maxValue ? this.maxValue : Number(this.max)
        },
        message: function () {
            return this.prompt ? `${this.select} ${this.info}` : this.info
        },
    },
}
</script>