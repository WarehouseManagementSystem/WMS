<template>
    <c-tree :list="list" :status="statusNu" primaryKey="label" :selected="selectedOption" v-model="selectedOption" />
</template>

<script>
import utilities from '@/components/utilities/index.js'

import CTree from './Tree/c-tree'

export default {
    name: 'tree-view',
    components: { CTree, },
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
        primaryKey: {
            type: String,
            default: 'id',
            require: true,
        },
        status: {
            type: [String, Number],
            default: 0,
            validator: (value) => {
                // 0: default,1: edit,2: Single choice, 3: Multiple choice
                return !isNaN(value) && [0, 1, 2, 3].includes(Number(value))
            }
        },
        selected: Object,
    },
    computed: {
        statusNu: function () {
            return Number(this.status) || 0
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