<template>
    <div>
        <div class="row">
            <span class="col-auto text-right">{{ fillMinValue }}</span>
            <input type="range" class="custom-range col align-middle" :min="min" :max="max" :step="step" :value="value" v-bind="$attrs" v-on="inputListeners">
            <span class="col-auto text-left">{{ fillMaxValue }}</span>
        </div>
    </div>
</template>

<script>

export default {
    name: 'b-range',
    inheritAttrs: false,
     model: {
        prop: 'value',
        event: 'input'
    },
    props: {
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 100,
        },
        step: {
            type: Number,
            default: 1,
        },
        value: {
            type: Number,
            default: function (value) {
                return value ? value : this.min
            },
        },
        minValue: {
            type:  String,
        },
        maxValue: {
            type:  String,
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
                    input: function (event) {
                        vm.$emit('input', Number(event.target.value))
                    }
                }
            )
        },
        fillMinValue: function () {
            return this.minValue ? this.minValue : this.min
        },
        fillMaxValue: function () {
            return this.maxValue ? this.maxValue : this.max
        },
    },
}
</script>