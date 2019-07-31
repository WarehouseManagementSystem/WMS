<template>
    <div>
        <b-checkbox-tree-item 
            v-for="(item, index) in list"
            :key="index" 
            :item="item" 
            :isChecked="checked" 
            :disabled="disabled" 
            v-model="values" />
    </div>
</template>

<script>
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-checkbox-tree',
    components: { BCheckboxTreeItem: () => import('./b-checkbox-tree-item') },
    model: {
        prop: 'values',
        event: 'input',
    },
    props: {
        list: utilities.props.list,
        disabled: utilities.props.disabled,
        checked: Boolean,
        values: Array,
    },
    watch: {
        'values.length': function () {
            this.$emit('input', this.values)
        },
    }
}
</script>

