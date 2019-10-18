<template>
    <tr 
        :class="[row.$class, {'table-active': isChecked }]" 
        :style="row.$style" 
        :aria-selected="isSelected" 
        :data-primary-key="primaryKey" >
        <table-serial-td :hideSerial="hideSerial" :number="index" />
        <table-select-td :hideSelect="hideSelect || selectStatus != 2" v-model="isChecked"/>
        <template v-for="(col, colIndex) in colunms"  >
            <table-operate-td v-if="col.$operate >= 0" :operate="operate" :key="colIndex" @tr:oper="type => $emit('tr:oper', {type: type, data: row})"  />
            <td 
                v-else 
                :key="colIndex" 
                class="align-middle" 
                :class="row[col] && row[col].class" 
                :style="row[col] && row[col].style" 
                :colspan="row[col] && row[col].colspan" 
                :aria-colspan="row[col] && row[col].colspan" 
                :rowspan="row[col] && row[col].rowspan" 
                :aria-rowspan="row[col] && row[col].rowspan" >
                {{ row[col] && (row[col].value || row[col]) || '-' }}
            </td>
        </template>
    </tr>
</template>

<script>
import tableSerialTd from './../Td/table-serial-td'
import tableSelectTd from './../Td/table-select-td'
import tableOperateTd from './../Td/table-operate-td'

export default {
    name: 'table-tr',
    components: { tableSerialTd, tableSelectTd, tableOperateTd, },
    data () {
        return {
            isChecked: this.isSelected,
        }
    },
    props: {
        primaryKey: [ String, Number, ], 
        row: Object,
        index: Number,
        colunms: Array,
        operate: Array,
        hideSerial: Boolean,
        hideSelect: Boolean,
        selectStatus: Number,
        selectedOptions: [Array, Object],
    },
    computed: {
        isSelected: function () {
            let value = this.row[this.primaryKey].value || this.row[this.primaryKey]
            if (!this.selectedOptions || this.selectStatus == 0) return false
            if (this.selectStatus == 1) return this.selectedOptions[this.primaryKey] == value
            else if (this.selectStatus == 2) return this.selectedOptions.some && this.selectedOptions.some(e => e[this.primaryKey] && e[this.primaryKey] == value) 
            else return false
        },
    },
    watch: {
        isSelected: function (value) {
            this.isChecked = value
        },
        isChecked: function (value) {
            this.$emit('tr:checked', value)
        },
    }
}
</script>

<style scoped>
.hover {
    background-color: rgba(0, 0, 0, .075)
}
</style>