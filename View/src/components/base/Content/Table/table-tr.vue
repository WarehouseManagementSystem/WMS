<template>
    <tr 
        :class="[row.$class, {'table-active': selected }]" 
        :style="row.$style" 
        :aria-selected="selected" 
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
    model: {
        prop: 'selected',
        event: 'tr:checked',
    },
    data () {
        return {
            isChecked: this.selected,
        }
    },
    props: {
        primaryKey: [ String, Number, ], 
        row: Object,
        colunms: {
            type: Array,
            default: () => [],
        },
        selectStatus: {
            type: Number,
            default: 0, // 0: 默认, 1: 单选, 2: 多选
        },
        selected: Boolean,
    },
    watch: {
        selected: function (value) {
            this.isChecked = value
        },
        isChecked: function (value) {
            this.$emit('tr:checked', value)
        },
    }
}
</script>