<template>
    <div>
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label 
                v-for="(item, index) in list" 
                :key="index" class="btn" 
                :class="[`btn-${item.color || color}`, { active: item.value == value, disabled: disabled || item.disabled }]">
                <input 
                    type="radio" 
                    :name="name" 
                    :id="item.id" 
                    autocomplete="off" 
                    :value="item.value" 
                    :checked="item.value == value" 
                    :aria-checked="item.value == value"
                    :disabled="disabled || item.disabled"
                    :aria-diasbled="disabled || item.disabled" 
                    v-on="inputListeners" />
                    {{item.label}}
            </label>
        </div>
        <b-help v-if="info" :info="info" />
    </div>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import BHelp from '@/components/base/Bootstrap/Form/Other/b-form-help.vue'

export default {
    name: 'b-radio-button-group',
    components: { BHelp, },
    model: {
        prop: 'value',
        event: 'change',
    },
    props: {
        value: utilities.props.text,
        list: utilities.props.list,
        info: utilities.props.text,
        disabled: utilities.props.disabled,
        name: {
            type: String,
            required: true,
        },
        color: {
            ...utilities.props.textColor,
            default: 'primary'
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
                    change: function (event) {
                        vm.$emit('change', event.target.value)
                    }
                }
            )
        },
    },
}
</script>
