<template>
    <div class="p-0">
        <!-- headr -->
        <div v-if="!hideHead" class="p-0" :class="{'overflow-auto': isActive}" ref="THead" @scroll="isActive && $emit('table:scroll', $event, 'activeTableHeader')">
            <table class="table table-sm m-0" :class="tableClass" style="table-layout: fixed">
                <table-colgroup :colgroup="colgroup" />
                <table-head 
                    :head="theadData" 
                    :sort="sort" 
                    :sortObj="sortObj" 
                    :class="theadClass" 
                    :theadRowCount="theadRowCount" 
                    :hideSerial="hideSerial" 
                    :hideSelect="hideSelect" 
                    :selectStatus="status" 
                    @table:sort="cell => $emit('table:sort', cell)" 
                    v-model="theadSelected" />
            </table>
        </div>
        <!-- body -->
        <div class="p-0 overflow-auto" style="min-height: 98px" ref="TBody" @scroll="$emit('table:scroll', $event, isActive ? 'activeTableBody' : 'fixedTableBody' )">
            <template v-if="!hideData">
                <table class="table m-0" :class="tableClass" style="table-layout: fixed">
                    <table-colgroup :colgroup="colgroup" />
                    <table-body 
                        :data="data" 
                        :rowStyle="rowStyle" 
                        :columns="fieldcolumns" 
                        :primaryKey="primaryKey" 
                        :operate="operate.value" 
                        :hideSerial="hideSerial" 
                        :hideSelect="hideSelect" 
                        :selectStatus="status" 
                        :theadSelected="theadSelected" 
                        @tr:click="row => $emit('tr:click', row)" 
                        @tr:dbclick="row => $emit('tr:dbclick', row)" 
                        v-model="selectedOptions" />
                </table>
            </template>
        </div>
        <!-- footer -->
        <div v-if="!hideFoot" class="p-0" :class="{'overflow-auto': isActive}" ref="TFoot" @scroll="isActive && $emit('table:scroll', $event, 'activeTableFooter')">
            <table class="table m-0" :class="tableClass" style="table-layout: fixed">
                <table-colgroup :colgroup="colgroup" />
            </table>
        </div>
    </div>
</template>

<script>
import config from '@/config/index.js'
import utilities from '@/components/utilities/index.js'

import tableColgroup from './Colgroup/table-colgroup'
import tableHead from './Head/table-head'
import tableBody from './Body/table-body'

export default {
    name: 'c-table',
    mixins: [ utilities.mixins.grid.thead ],
    components: { tableColgroup, tableHead, tableBody, },
    model: {
        prop: 'selected',
        event: 'table:selected'
    },
    data () {
        return {
            colgroup: [], 
            fieldcolumns: [], 
            theadSelected: false, 
            selectedOptions: this.selected, 
        }
    },
    props: {
        list: utilities.props.Object,
        primaryKey: String,
        isActive: Boolean,
        hideSerial: Boolean,
        hideSelect: Boolean,
        // class table
        tableTheme: utilities.props.theme,
        tableSm: Boolean,
        tableHover: Boolean,
        tableStriped: Boolean,
        tableBordered: Boolean,
        tableBorderless: Boolean,
        // class thead
        theadTheme: utilities.props.theme,
        selectStatus: {
            type: [String, Number,],
            default: 0,
            // 0: 默认, 1: 单选, 2: 多选
            validator: value => !isNaN(value) && [0, 1, 2].includes(Number(value)),
        },
        selected: [Array, Object, ],
        sortObj: Object,
    },
    computed: {
         // class table
        tableClass: function () {
            let theme = this.tableTheme ? `table-${this.tableTheme}` : ''
            let sm = this.tableSm ? 'table-sm' : ''
            let hover = this.tableHover ? 'table-hover' : ''
            let striped = this.tableStriped ? 'table-striped' : ''
            let bordered = this.tableBordered ? 'table-bordered' : ''
            let borderless = this.tableBorderless ? 'table-borderless' : ''
            return `${theme} ${hover} ${striped} ${bordered} ${borderless} ${sm} `
        },
        // class thead
        theadClass: function () {
            return this.theadTheme ? `thead-${this.theadTheme}` : ''
        },
        status: function () {
            return isNaN(this.selectStatus) ? 0 : Number(this.selectStatus)
        },
        operate: function () {
            if (this.isActive || this.status == 2 || !this.list || !this.list.operate) return {}
            let index = this.list.operate.index >= 0 ? this.list.operate.index : this.list.head.length
            let value = this.list.operate.value && this.list.operate.value.forEach && this.list.operate.value
                .filter(e => config.ui.table.operate[e].permissions(this.status)) || []
            let n = Math.min(...this.list.head.map((e, index) => { return e.children ? index : Infinity}))
            if (index > n) index = n
            return { index: index, value: value }
        },
        head: function () {
            let arr = Array.from(this.list && this.list.head || [])
            if (!this.isActive && this.status != 2 && this.operate && this.operate.index >= 0 && this.operate.value) {
                arr.splice(this.operate.index, 0, { $operate: this.operate.value })
            }
            return arr
        },
        data: function () {
            return this.list && this.list.data || []
        },
        foot: function () {
            return this.list && this.list.foot || []
        },
        sort: function () {
            return this.list && this.list.sort || []
        },
        hideHead: function () {
            return !this.head || this.head.length == 0
        },
        hideData: function () {
            return !this.data || this.data.length == 0 || this.hideHead
        },
        hideFoot: function () {
            return !this.foot || this.foot.length == 0
        },
        rowStyle: function () {
            return this.list && this.list.rowStyle || {}
        },
    },
    async mounted () {
        await this.InitColgroupAndcolumns()
        await this.initHead()
    },
    methods: {
        // head and colgroup
        InitColgroupAndcolumns: function () {
            if (this.hideHead) return
            this.colgroup = [], this.fieldcolumns = []
            if (!this.hideSerial) this.colgroup.push({ class: "text-center", style: "width: 58px;" } )
            if (this.status == 2 && !this.hideSelect) this.colgroup.push({ class: "text-center", style: "width: 35px;" } )

            let columns = this.getLastColumns()
            columns.forEach(e => {
                if (e.$operate) {
                    this.colgroup.push({class: 'text-center', style: `width: ${2 * this.operate.value.length < 5 ? 5 : 1.8 * this.operate.value.length + 1}em;`} )
                    this.fieldcolumns.push({ $operate: this.operate.index })
                } else {
                    this.colgroup.push({class: e.colClass, style: e.colStyle} )
                    this.fieldcolumns.push({ field: e.field, format: e.format, cellStyle: e.cellStyle, })
                }
            })
        },
    },
    watch: {
        selected: function (value) {
            this.selectedOptions = value
        },
        selectedOptions: function (value) {
            this.$emit('table:selected', value)
        },
    }
}
</script>

<style scoped>
div { 
  -ms-overflow-style: none;
   overflow: -moz-scrollbars-none;
}
div::-webkit-scrollbar {
  width: 0; 
  height: 0;
}

/* table > tbody > tr {
    background-color: rgba(0, 0, 0, .075)
} */
</style>