<template>
    <div class="custom-control custom-radio" :class="{ 'custom-control-inline': inline}">
        <input 
            type="radio" 
            class="custom-control-input" 
            :class="ValidClass"
            :id="id" 
            :value="value" 
            :checked="value ? checked == value : checked" 
            :aria-checked="value ? checked  == value : checked" 
            :disabled="disabled" 
            :aria-disabled="disabled" 
            v-bind="$attrs" 
            v-on="inputListeners" />
        <label class="custom-control-label" :for="id">{{ label || value }}</label>
        <font v-if="inline">   </font>
        <slot name="valid"></slot>
        <b-info :class="{ 'pl-1': inline }" :info="info" />
    </div>
</template>

<script>
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

import BInfo from '@/components/base/Bootstrap/Form/Other/b-form-info.vue'

export default {
    name: 'b-radio',
    inheritAttrs: false,
    components: { BInfo, },
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        value: utilities.props.text,
        label: utilities.props.text,
        info: utilities.props.text,
        ValidClass: utilities.props.text,
        disabled: utilities.props.disabled,
        id: {
            type: String,
            default: function () {
                return 'Radio-' + util.random.getRandomString()
            }
        },
        checked: [String, Boolean,],
        inline: Boolean,
        
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