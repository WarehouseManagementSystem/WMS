<template>
    <tbody>
        <table-tr 
            v-for="(row, rowIndex) in data" 
            :key="rowIndex" 
            :row="row" 
            :index="rowIndex + 1" 
            :rowStyle="rowStyle" 
            :operate="operate" 
            :colunms="colunms" 
            :selectStatus="selectStatus" 
            :selectedOptions="selectedOptions" 
            :primary-key="primaryKey" 
            :hideSerial="hideSerial" 
            :hideSelect="hideSelect" 
            @tr:checked="checked => isChecked(checked, row)" 
            @click.native="$emit('tr:click', formatRowData(row))" 
            @tr:oper="data => trOper(data)"
            @dblclick.native="$emit('tr:dblclick', formatRowData(row))" />
    </tbody>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import tableTr from './../Tr/table-tr'

export default {
    name: 'table-body',
    components: { tableTr, },
    model: {
        prop: 'selected',
        event: 'tr:selected'
    },
    data () {
        return {
            selectedOptions: this.selected,
        }
    },
    props: {
        data: utilities.props.list,
        primaryKey: [ String, Number, ], 
        colunms: {
            type: Array,
            default: () => []
        },
        rowStyle: Object,
        operate: Array,
        hideSerial: Boolean,
        hideSelect: Boolean,
        selectStatus: Number, // 0: 默认, 1: 单选, 2: 多选
        selected: [Array, Object, ],
        theadCheckboxChecked: Boolean,
    },
    methods: {
        trOper: function (data) {
            if(this.selectStatus == 1) this.select(data.data)
            this.$emit('tr:selected', this.formatRowData(data.data))
        },
        select: function (row) {
            if (this.selectStatus == 0) return
            let formatRow = this.formatRowData(row)
            if (this.isSelected(row)) return
            if (this.selectStatus == 1) {
                // 单选
                this.selectedOptions = formatRow
            } else if (this.selectStatus == 2) {
                // 多选
                this.selectedOptions 
                    ? this.selectedOptions.push(formatRow)
                    : this.selectedOptions = [formatRow]
            }
        },
        unSelect: function (row) {
            // 多选（单选时会自动覆盖之前的值）
            if (this.selectStatus != 2 || !this.selectedOptions || this.selectedOptions.length == 0 ) return
            let value = row[this.primaryKey].value || row[this.primaryKey]
            this.selectedOptions.splice(this.selectedOptions.findIndex(e => e[this.primaryKey] && e[this.primaryKey] == value), 1)
        },
        formatRowData: function (row) {
            let o = {}
            Object.entries(row).map(e => {
                if (e[0].toString().charAt(0) != '$') {
                    this.$set(o, e[0], e[1].value || e[1])
                }
            })
            return o
        },
        isSelected: function (row) {
            let value = row[this.primaryKey].value || row[this.primaryKey]
            if (!this.selectedOptions || this.selectStatus == 0) return false
            if (this.selectStatus == 1) return this.selectedOptions[this.primaryKey] == value
            else if (this.selectStatus == 2) return this.selectedOptions.some && this.selectedOptions.some(e => e[this.primaryKey] && e[this.primaryKey] == value) 
            else return false
        },
        isChecked: function (checked, row) {
            checked
                ? this.select(row)
                : this.unSelect(row)
        },
    },
    watch: {
        theadCheckboxChecked: function (value) {
            this.data.forEach(e => this.isChecked(value, e))
        },
        selected: function (value) {
            this.selectedOptions = value
        },
        selectedOptions: function (value) {
            this.$emit('tr:selected', value)
        },
    }
}

</script>