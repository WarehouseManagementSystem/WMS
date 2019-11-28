<template>
    <thead>
        <template v-for="(headRow, index) in head">
            <table-head-tr 
                v-if="index == 0"
                :key="index"
                :row="headRow" 
                :sort="sort" 
                :rowCount="rowCount" 
                :hideSerial="hideSerial"
                :hideSelect="hideSelect" 
                :selectStatus="selectStatus" 
                :sortObj="sortObj" 
                @table:sort="cell => $emit('table:sort', cell)"
                v-model="selected" />
            <table-head-tr 
                v-else
                :key="index"
                :row="headRow" 
                hideSerial
                hideSelect 
                :sort="sort" 
                :sortObj="sortObj" 
                @table:sort="cell => $emit('table:sort', cell)" />
        </template>
    </thead>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import TableHeadTr from './table-head-tr'

export default {
    name: 'table-head',
    components: { TableHeadTr, },
    model: {
        prop: 'selected',
        event: 'thead:selected'
    },
    data () {
        return {
            selected: false,
        }
    },
    props: {
        head: utilities.props.list,
        sort: utilities.props.list,
        rowCount: {
            type: Number,
            default: 1,
        },
        hideSerial: Boolean,
        hideSelect: Boolean,
        selectStatus: Number,
        sortObj: Object,
    },
    watch: {
        selected: function (value) {
            this.$emit('thead:selected', value)
        },
    }
}
</script>