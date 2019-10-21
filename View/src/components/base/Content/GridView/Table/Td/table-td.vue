<template>
    <td 
        class="align-middle" 
        :class="[cell.class, col.cellStyle && col.cellStyle(value).class]" 
        :style="[cell.style, col.cellStyle && col.cellStyle(value).style]" 
        style="min-width: 30px;" 
        :colspan="cell.colspan" 
        :aria-colspan="cell.colspan" 
        :rowspan="cell.rowspan" 
        :aria-rowspan="cell.rowspan" >
        {{ col.format ? col.format(value) : value || '-' }}
    </td>
</template>

<script>
export default {
    name: 'table-td',
    props: {
        cell: [Object, String, Number, Boolean],
        col: Object,
    },
    computed: {
       value: function () {
           return this.cell.value || this.cell
       },
    },
}
</script>