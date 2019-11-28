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
                        :colunms="fieldColunms" 
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
    components: { tableColgroup, tableHead, tableBody, },
    model: {
        prop: 'selected',
        event: 'table:selected'
    },
    data () {
        return {
            colgroup: [], 
            fieldColunms: [], 
            theadRowCount: 1,
            theadData: [],
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
        await this.InitColgroupAndColunms()
        await this.initHead()
    },
    methods: {
        // head and colgroup
        InitColgroupAndColunms: function () {
            if (this.hideHead) return
            this.colgroup = [], this.fieldColunms = []
            if (!this.hideSerial) this.colgroup.push({ class: "text-center", style: "width: 58px;" } )
            if (this.status == 2 && !this.hideSelect) this.colgroup.push({ class: "text-center", style: "width: 35px;" } )

            let colunms = this.getLastColunms()
            colunms.forEach(e => {
                if (e.$operate) {
                    this.colgroup.push({class: 'text-center', style: `width: ${2 * this.operate.value.length < 5 ? 5 : 1.8 * this.operate.value.length + 1}em;`} )
                    this.fieldColunms.push({ $operate: this.operate.index })
                } else {
                    this.colgroup.push({class: e.colClass, style: e.colStyle} )
                    this.fieldColunms.push({ field: e.field, format: e.format, cellStyle: e.cellStyle, })
                }
            })
        },
        // head
        getLastColunms: function (head = this.head) {
            let arr = []
            head.forEach(e => {
                e.children ? arr.push(...this.getLastColunms(e.children)) : arr.push(e)
            })
            return arr
        },
        // head
        initHead: function () {
            this.theadRowCount = this.getTheadRowCount(this.head)
            this.initHeadData(this.head)
            this.getHeadData(this.head)
        },
        // head
        getTheadRowCount: function (arr = [], count = 1) {
            return Math.max(...arr.map(e => e.children ? this.getTheadRowCount(e.children, count + 1) : count))
        },
        // head
        initHeadData: function (head = [], index = 0) {
            if (!head || head.length == 0) return []
            let vm = this
            let hasChildren = head.some(e => e.children)
            index += hasChildren ? 1 : 0
            head.forEach(e => {
                let colspan = vm.getCellColCount(e)
                let rowspan = vm.getCellRowCount(e, hasChildren ? index - 1 : index)
                e.colspan = colspan > 1 ? colspan : null
                e.rowspan = rowspan > 1 ? rowspan : null
                if (e.children) {
                    if (e.sort) e.sort = false
                    vm.initHeadData(e.children, index)
                }
            })
        },
        // head
        getCellRowCount: function (obj = {}, index) {
            return obj.children && obj.children.length > 0 ? 1 : this.theadRowCount - index
        },
        // head
        getCellColCount: function (obj = {}, count = 1) {
            return obj.children
                ? obj.children.filter(e => !e.children).length + obj.children.filter(e => e.children).reduce( (acc, cur) => acc + this.getCellColCount(cur), 0) 
                : count
        },
        // head
        getHeadData: function (head = []) {
            if (!head || head.length == 0) return []
            this.theadData.push([...head])
            this.getHeadData(head.filter(e => e.children).map(e => e.children).flat())
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