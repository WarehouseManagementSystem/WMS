<template>
    <div class="p-0">
        <!-- headr -->
        <div v-if="!hideHead" class="p-0" :class="{'overflow-auto': isActive}" ref="THead" @scroll="isActive && $emit('table:scroll', $event, 'activeTableHeader')">
            <table class="table table-sm m-0" :class="tableClass" style="table-layout: fixed">
                <table-colgroup :colgroup="colgroup" />
                <table-head 
                    :head="head" 
                    :sort="sort" 
                    :sortObj="sortObj" 
                    :class="theadClass" 
                    :hideSerial="hideSerial" 
                    :hideSelect="hideSelect" 
                    :selectStatus="Number(selectStatus)" 
                    @table:sort="cell => $emit('table:sort', cell)" 
                    v-model="theadCheckboxChecked" />
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
                        :selectStatus="Number(selectStatus)" 
                        :theadCheckboxChecked="theadCheckboxChecked" 
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
                <table-foot :foot="foot" />
            </table>
        </div>
    </div>
</template>

<script>
import config from '@/config/index.js'
import utilities from '@/components/utilities/index.js'

import TableColgroup from './Colgroup/table-colgroup'
import TableHead from './Head/table-head'
import TableBody from './Body/table-body'
import TableFoot from './Foot/table-foot'

export default {
    name: 'c-table',
    components: { TableColgroup, TableHead, TableBody, TableFoot },
    model: {
        prop: 'selected',
        event: 'table:selected'
    },
    data () {
        return {
            colgroup: [],
            fieldcolumns: [],
            theadRowCount: 1,
            theadCheckboxChecked: false,
            selectedOptions: this.selected,
        }
    },
    props: {
        list: utilities.props.Object,
        primaryKey: {
            type: [ String, Number ],
            default: 'id',
            validator: value => value
        },
        sortObj: Object,
        tableClass: String,
        theadClass: String,
        isActive: Boolean,
        hideHead: Boolean,
        hideData: Boolean,
        hideFoot: Boolean,
        hideSerial: Boolean,
        hideSelect: Boolean,
        selectStatus: {
            type: [String, Number],
            default: 0, // 0: 默认, 1: 单选, 2: 多选
            validator: value => !isNaN(value) && [0, 1, 2].includes(Number(value)),
        },
        selected: [Array, Object, ],
    },
    computed: {
        status: function () {
            return !this.isActive && Number(this.selectStatus) != 0 ? Number(this.selectStatus) : 'default'
        },
        operate: function () {
            if (this.isActive || this.selectStatus == 2 || !this.list || !this.list.operate) return {}
            let index = this.list.operate.index >= 0 ? this.list.operate.index : this.list.head.length
            let value = this.list.operate.value && this.list.operate.value.forEach && this.list.operate.value
                .filter(e => config.ui.table.operate[e].permissions(this.status)) || []
            let n = Math.min(...this.list.head.map((e, index) => { return e.children ? index : Infinity}))
            if (index > n) index = n
            return { index: index, value: value }
        },
        head: function () {
            let arr = Array.from(this.list && this.list.head || [])
            if (!this.isActive && this.selectStatus != 2 && this.operate && this.operate.index >= 0 && this.operate.value) {
                arr.splice(this.operate.index, 0, { $operate: this.operate.value })
            }
            return arr
        },
        sort: function () {
            return this.list && this.list.sort || []
        },
        data: function () {
            return this.list && this.list.data || []
        },
        foot: function () {
            return this.list && this.list.foot || []
        },
        rowStyle: function () {
            return this.list && this.list.rowStyle || {}
        },
    },
    mounted () {
        this.init()
    },
    methods: {
        init: function () {
            this.InitColgroupAndcolumns()
        },
        InitColgroupAndcolumns: function () {
            if (this.hideHead) return
            this.colgroup = [], this.fieldcolumns = []
            if (!this.hideSerial) this.colgroup.push({ class: "text-center", style: "width: 58px;" } )
            if (this.selectStatus == 2 && !this.hideSelect) this.colgroup.push({ class: "text-center", style: "width: 35px;" } )

            // let lastcolumns = this.getLastColumns().filter(e => this.columns.includes(e.field))
            // if (this.operate && this.operate.value && this.operate.value.length > 0) lastcolumns.splice(this.operate.index, 0, { $operate: this.operate.value, })
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
        getLastColumns: function (head = this.head) {
            let arr = []
            head.forEach(e => {
                e.children ? arr.push(...this.getLastColumns(e.children)) : arr.push(e)
            })
            return arr
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