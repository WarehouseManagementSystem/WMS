<template>
    <div>
        <template v-for="(item, index) in list">
            <item :item="item" :key="index" v-bind="$attrs" v-on="inputListeners" v-model="checkedValues"></item>
        </template>
    </div>
</template>

<script>
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-checkbox-tree',
    inheritAttrs: false,
    mixins: [ utilities.mixins.form.base,],
    components: { item: () => import('./b-checkbox-tree-item') },
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
}
</script>