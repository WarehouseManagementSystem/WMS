<template>
    <c-tree :list="list" :status="statusNu" />
</template>

<script>
import utilities from '@/components/utilities/index.js'

import CTree from './Tree/c-tree'

export default {
    name: 'tree-view',
    components: { CTree, },
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
    },
    computed: {
        statusNu: function () {
            return Number(this.status) || 0
        },
    },
}
</script>