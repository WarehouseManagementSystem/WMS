<template>
    <div>
        <template  v-for="(item, index) in list">
            <checkbox
                :id="item.id"
                :key="item.key ? item.key : (item.id ? item.id : index)" 
                v-bind="$attrs" 
                :color="color" 
                :text-color="textColor" 
                :text="item.text" 
                :value="item.value" 
                :checked="checkedValues.includes(item.value)" 
                :disabled="item.disabled" 
                v-on="inputListeners" 
                @change.stop="getCheckedValues">
                <template v-if="list.length == index && (validInfo || Object.keys($scopedSlots).includes('valid-info'))" #valid-info>
                    <slot name="valid-info">{{ validInfo }}</slot>
                </template>
                <template v-if="list.length == index && (invalidInfo || Object.keys($scopedSlots).includes('invalid-info'))" #invalid-info>
                    <slot name="invalid-info">{{ invalidInfo }}</slot>
                </template>
            </checkbox>
        </template>
    </div>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import checkbox from './b-checkbox'

export default {
    name: 'b-checkbox-group',
    inheritAttrs: false,
    mixins: [ utilities.mixins.form.base, utilities.mixins.form.validator ],
    components: { checkbox },
    model: {
        prop: 'checkedValues',
        event: 'change',
    },
    props: {
        list: utilities.props.list,
        checkedValues: utilities.props.list,
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
                        vm.$emit('change', vm.checkedValues)
                    }
                }
            )
        },
    },
    methods: {
        getCheckedValues: function (e) {
            if (e.target.checked) {
                this.checkedValues.push(e.target.value)
            } else {
                if (this.checkedValues.includes(e.target.value))
                    this.checkedValues.splice(this.checkedValues.indexOf(e.target.value), 1);
            }
        },
    }
}
</script>
