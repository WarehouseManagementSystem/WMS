<template>
    <div>
        <template v-for="(item, index) in list">
            <redio 
                :key="index"
                v-bind="$attrs" 
                :text="item.text" 
                :value="item.value" 
                :checked="item.checked" 
                :disabled="item.disabled" 
                :aria-disabled="item.disabled" 
                v-on="inputListeners">
                <template v-if="list.length == index && (validInfo || Object.keys($scopedSlots).includes('valid-info'))" #valid-info>
                    <slot name="valid-info">{{ validInfo }}</slot>
                </template>
                <template v-if="list.length == index && (invalidInfo || Object.keys($scopedSlots).includes('invalid-info'))" #invalid-info>
                    <slot name="invalid-info">{{ invalidInfo }}</slot>
                </template>
            </redio>
        </template>
    </div>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import redio from './b-radio'

export default {
    name: 'b-radio-group',
    inheritAttrs: false,
    mixins: [ utilities.mixins.form.base, utilities.mixins.form.validator ],
    components: { redio },
    model: {
        prop: 'values',
        event: 'input',
    },
    props: {
        list: utilities.props.list,
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
                        vm.$emit('input', e.target.value)
                    }
                }
            )
        },
    },
}
</script>