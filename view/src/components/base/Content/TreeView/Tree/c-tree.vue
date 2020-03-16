<template>
    <div>
        <tree-item 
            v-for="(item, index) in list" 
            :key="index" 
            :item="item" 
            :status="statusNu" 
            :selected="selected" 
            :primaryKey="primaryKey"
            @item:selected="itemSelected" />
    </div>
</template>

<script>
import utilities from '@/components/utilities/index.js'

export default {
    name: 'c-tree',
    components: { TreeItem: () => import('./c-tree-item') },
    model: {
        prop: 'selected',
        event: 'tree:selected'
    },
    data () {
        return {
            selectedOption: this.selected,
        }
    },
    props: {
        list: utilities.props.list,
        status: {
            type: [String, Number],
            default: 0,
            validator: (value) => {
                // 0: default,1: edit,2: Single choice, 3: Multiple choice
                return !isNaN(value) && [0, 1, 2, 3].includes(Number(value))
            }
        },
        primaryKey: {
            type: String,
            default: 'id',
            require: true,
        },
        selected: Object,
    },
    computed: {
        statusNu: function () {
            return Number(this.status) || 0
        },
    },
    methods: {
        itemSelected: function (item) {
            this.selectedOption = item
        },
    },
    watch: {
        selected: function (value) {
            this.selectedOption = value
        },
        selectedOption: function (value) {
            this.$emit('tree:selected', value)
        },
    }
}
</script>