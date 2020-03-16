<template>
    <tr 
        :class="[row.$class, rowStyle.class && rowStyle.class(row), {'table-active': isSelected }]" 
        :style="[row.$style, rowStyle.style && rowStyle.style(row)]" 
        :aria-selected="isSelected" >
        <table-serial-td 
            :hideSerial="hideSerial" 
            :number="index" />
        <table-select-td 
            :hideSelect="hideSelect || selectStatus != 2" 
            v-model="isSelected"/>
        <template v-for="(col, colIndex) in columns"  >
            <table-operate-td 
                :key="colIndex" 
                v-if="col.$operate >= 0" 
                :operate="operate" 
                @tr:oper="type => $emit('tr:oper', {type: type, data: row})"  />
            <table-body-td v-else :key="colIndex" :cell="row[col.field] || '-'" :col="col" />
        </template>
    </tr>
</template>

<script>
import tableBodyTd from './table-body-td'
import tableSerialTd from './../Td/table-serial-td'
import tableSelectTd from './../Td/table-select-td'
import tableOperateTd from './../Td/table-operate-td'

export default {
    name: 'table--body-tr',
    components: { tableBodyTd, tableSerialTd, tableSelectTd, tableOperateTd, },
    data () {
        return {
            isSelected: this.selected,
        }
    },
    props: {
        primaryKey: [ String, Number, ], 
        row: Object,
        index: Number,
        columns: Array,
        rowStyle: Object,
        operate: Array,
        hideSerial: Boolean,
        hideSelect: Boolean,
        selectStatus: Number,
        selectedOptions: [Array, Object],
    },
    computed: {
        selected: function () {
            let value = this.row[this.primaryKey].value || this.row[this.primaryKey]
            if (!this.selectedOptions || this.selectStatus == 0) return false
            if (this.selectStatus == 1) return this.selectedOptions[this.primaryKey] == value
            else if (this.selectStatus == 2) return this.selectedOptions.some && this.selectedOptions.some(e => e[this.primaryKey] && e[this.primaryKey] == value) 
            else return false
        },
    },
    watch: {
        selected: function (value) {
            this.isSelected = value
        },
        isSelected: function (value) {
            this.$emit('tr:selected', value)
        },
    }
}
</script>

<style scoped>
.hover {
    background-color: rgba(0, 0, 0, .075)
}
</style>