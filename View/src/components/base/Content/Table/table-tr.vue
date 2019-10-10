<template>
    <tr 
        :class="[row.$class, {'table-active': isSelected }]" 
        :style="row.$style" 
        :aria-selected="isSelected" 
        :data-primary-key="primaryKey" >
        <table-select-td v-if="selectStatus == 2" v-model="isChecked"/>
        <td 
            v-for="(col, colIndex) in colunms"  
            :key="colIndex" 
            class="align-middle" 
            :class="row[col] && row[col].class" 
            :style="row[col] && row[col].style" 
            :colspan="row[col] && row[col].colspan" 
            :aria-colspan="row[col] && row[col].colspan" 
            :rowspan="row[col] && row[col].rowspan" 
            :aria-rowspan="row[col] && row[col].rowspan" >
            {{ row[col].value || row[col] || '-' }}
        </td>
    </tr>
</template>

<script>
import tableSelectTd from './table-select-td'

export default {
    name: 'table-tr',
    components: { tableSelectTd, },
    data () {
        return {
            isChecked: this.isSelected,
        }
    },
    props: {
        primaryKey: [ String, Number, ], 
        row: Object,
        colunms: Array,
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