<template>
    <td 
        class="align-middle" 
        :class="[cell.class, ObjStyle && ObjStyle.class]" 
        :style="[cell.style, ObjStyle && ObjStyle.style]" 
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
       ObjStyle: function () {
            return this.col.cellStyle && typeof this.col.cellStyle  == 'function' 
                ? this.col.cellStyle(this.value)
                : this.col.cellStyle
           
       }
    },
}
</script>