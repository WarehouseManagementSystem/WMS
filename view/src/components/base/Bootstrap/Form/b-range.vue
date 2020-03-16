<template>
    <div>
        <div class="row align-items-center mx-1">
            <span class="col-auto text-right text-monospace pl-0 pr-1" v-if="prompt || minValue">{{ fillMinValue }}</span>
            <input 
                type="range" 
                class="custom-range col" 
                :min="min" 
                :max="max" 
                :step="step" 
                :value="select" 
                v-bind="$attrs" 
                v-on="inputListeners" />
            <span class="col-auto text-left text-monospace pl-1 pr-0" v-if="prompt || maxValue">{{ fillMaxValue }}</span>
            <span class="col-auto text-left text-monospace px-1" v-if="!hideValue">{{ select }}</span>
        </div>
        <b-info :info="info" />
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
            validator: value => !isNaN(value),
        },
        max: {
            type: [Number, String,],
            default: 100,
            validator: value => !isNaN(value),
        },
        step: {
            type: [Number, String,],
            default: 1,
            validator: value => !isNaN(value),
        },
        value: {
            type: [Number, String,],
            default: function (value) { return !isNaN(value) ? Number(value) : Number(this.min) },
            validator: value => !isNaN(value),
        },
        prompt: Boolean,
        hideValue: Boolean,
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
                        vm.select = event.target.value
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
    },
    watch: {
        value: function (value) {
            this.select = Number(value)
        },
    }
}
</script>