<template>
    <thead>
        <tr>
            <table-select-td v-if="selectStatus == 2" v-model="checked" />
            <th 
                v-for="(col, colIndex) in head" 
                :key="colIndex" 
                class="text-center align-middle" 
                v-show="useColunms ? colunms.includes(col.field) : !col.hide" 
                :data-hide="useColunms ? !colunms.includes(col.field) : col.hide" 
                :data-field="col.field"
                :data-col-class="col.colClass"
                :data-col-style="col.colStyle" >
                {{ col.title }}
            </th>
        </tr>
    </thead>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import tableSelectTd from './table-select-td'

export default {
    name: 'table-head',
    components: { tableSelectTd, },
    model: {
        prop: 'checked',
        event: 'change'
    },
    data () {
        return {
            checked: false,
        }
    },
    props: {
        head: utilities.props.list,
        colunms: {
            type: Array,
            default: () => [],
        },
        selectStatus: Number,
    },
    computed: {
        useColunms: function () {
            return this.colunms && this.colunms.length > 0
        },
    },
    watch: {
        checked: function (value) {
            this.$emit('change', value)
        },
    }
}
</script>