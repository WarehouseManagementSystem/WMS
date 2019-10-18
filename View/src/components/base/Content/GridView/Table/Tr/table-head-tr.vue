<template>
    <tr>
        <table-serial-td :hideSerial="hideSerial">No.</table-serial-td>
        <table-select-td :hideSelect="hideSelect || selectStatus != 2" v-model="checked" />
        <template v-for="(col, colIndex) in tr" >
            <table-operate-td  v-if="col.$operate" :operate="col.$operate" :key="colIndex" >Operate</table-operate-td>
            <th 
                v-else
                :key="colIndex" 
                class="text-center align-middle" 
                v-show="useColunms ? colunms.includes(col.field) : !col.hide" 
                :data-hide="useColunms ? !colunms.includes(col.field) : col.hide" 
                :data-field="col.field"
                :data-col-class="col.colClass"
                :data-col-style="col.colStyle" >
                {{ col.title }}
            </th>
        </template>
    </tr>
</template>

<script>
/** 
 * 暂
 * 未  2019-10-18
 * 使  cml
 * 用
 */
import utilities from '@/components/utilities/index.js'

import tableSerialTd from './../Td/table-serial-td'
import tableSelectTd from './../Td/table-select-td'
import tableOperateTd from './../Td/table-operate-td'

export default {
    name: 'table-head-tr',
    components: { tableSerialTd, tableSelectTd, tableOperateTd, },
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
        tr: utilities.props.list,
        colunms: {
            type: Array,
            default: () => [],
        },
        hideSerial: Boolean,
        hideSelect: Boolean,
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