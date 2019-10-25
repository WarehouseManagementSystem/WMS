<template>
    <th 
        class="text-center align-middle" 
        :rowspan="cell.rowspan" 
        :aria-rowspan="cell.rowspan" 
        :colspan="cell.colspan" 
        :aria-colspan="cell.colspan" 
        :data-field="cell.field" >
        <div class="d-flex justify-content-center align-items-center">
            <font class="px-1">{{ cell.title }}</font>
            <i v-if="cell.field && cell.sort" :class="iconClass" style="cursor: pointer" @click="$emit('table:sort', cell)" />
        </div>
    </th>
</template>

<script>
import config from '@/config/index.js'

export default {
    name: 'table-head-th',
    props: {
        cell: Object,
        sortObj: Object,
    },
    computed: {
        icon: function () {
            return config.ui.icon
        },
        iconClass: function () {
            if (!this.sortObj || !this.sortObj[this.cell.field]) return `${this.icon.sort} text-secondary`
            if (this.sortObj[this.cell.field] == 'asc') return this.icon.sortUp
            if (this.sortObj[this.cell.field] == 'desc') return this.icon.sortDown
            else return ''
        },
    }
}
</script>