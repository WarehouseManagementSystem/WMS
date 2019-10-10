<template>
    <div class="border border-dark rounded p-1" data-name="fixedTableWrapper">
        <template v-if="!noFindData">
            <!-- headr -->
            <div v-if="!noHead" class="p-0" :class="{ 'sticky-top': theadSticky }" ref="THead">
                <table class="table m-0" :class="tableClass" style="table-layout: fixed">
                    <table-colgroup :colgroup="colgroup" />
                    <slot name="head"><table-head 
                        :colunms="showColunms" 
                        :selectStatus="Number(selectStatus)"
                        :head="head"
                        v-model="theadCheckboxChecked" /></slot>
                </table>
            </div>
            <!-- body -->
            <div class="p-0 overflow-auto" style="min-height: 98px" ref="TBody">
                <template v-if="!noData">
                    <table class="table m-0" :class="tableClass" style="table-layout: fixed">
                        <table-colgroup :colgroup="colgroup" />
                        <table-body 
                            :colunms="showColunms" 
                            :primaryKey="primaryKey" 
                            :selectStatus="Number(selectStatus)" 
                            :theadCheckboxChecked="theadCheckboxChecked" 
                            :data="data" 
                            @tr:click="row => $emit('tr:click', row)" 
                            @tr:dbclick="row => $emit('tr:dbclick', row)" 
                            v-model="selectedOptions" />
                    </table>
                </template>
                <template v-else>
                    <div class="d-flex h-100 align-items-center justify-content-center">
                        No Fond Data
                    </div>
                </template>
            </div>
            <!-- footer -->
            <div v-if="!noFoot" class="p-0" ref="TFoot">
                <table class="table m-0" :class="tableClass" style="table-layout: fixed">
                    <table-colgroup :colgroup="colgroup" />
                    <slot name="foot"><table-foot :foot="foot" /></slot>
                </table>
            </div>
        </template>
        <template v-else>
            <div class="d-flex h-100 align-items-center justify-content-center">
                No Data
            </div>
        </template>
    </div>
</template>

<script>
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

import TableColgroup from './table-colgroup'
import TableHead from './table-head'
import TableBody from './table-body'
import TableFoot from './table-foot'

export default {
    name: 'c-table',
    components: { TableColgroup, TableHead, TableBody, TableFoot },
    model: {
        prop: 'selected',
        event: 'table:selectedChanged'
    },
    data () {
        return {
            thead: undefined,
            colgroup: [],
            fieldColunms: [],
            theadCheckboxChecked: false,
            selectedOptions: this.selected,
        }
    },
    props: {
        list: utilities.props.Object,
        tableTheme: utilities.props.theme,
        colunms: Array,
        primaryKey: {
            type: [ String, Number ],
            default: 'id',
            validator: value => value
        },
        tableSm: Boolean,
        tableHover: Boolean,
        tableStriped: Boolean,
        tableBordered: Boolean,
        tableBorderless: Boolean,
        theadTheme: utilities.props.theme,
        theadSticky: Boolean,
        selectStatus: {
            type: [String, Number],
            default: 0, // 0: 默认, 1: 单选, 2: 多选
            validator: value => !isNaN(value) && [0, 1, 2].includes(Number(value)),
        },
        selected: [Array, Object, ],
    },
    computed: {
        head: function () {
            return this.list.head
        },
        data: function () {
            return this.list.data || []
        },
        foot: function () {
            return this.list.foot || []
        },
        noColgroup: function () {
            return !this.colgroup || this.colgroup.length == 0
        },
        // hide head
        noHead: function () {
            return !this.head || this.head.length == 0
        },
        // hide body
        noData: function () {
            return !this.data || this.data.length == 0
        },
        // hide foot
        noFoot: function () {
            return !this.foot || this.foot.length == 0
        },
        // hide all
        noFindData: function () {
            return this.noData && this.noHead
        },
        tableClass: function () {
            let theme = this.tableTheme ? `table-${this.tableTheme}` : ''
            let sm = this.tableSm ? 'table-sm' : ''
            let hover = this.tableHover ? 'table-hover' : ''
            let striped = this.tableStriped ? 'table-striped' : ''
            let bordered = this.tableBordered ? 'table-bordered' : ''
            let borderless = this.tableBorderless ? 'table-borderless' : ''
            return `${theme} ${hover} ${striped} ${bordered} ${borderless} ${sm} `
        },
        showColunms: function () {
            return this.colunms || this.fieldColunms
        },
    },
    mounted () {
        this.init()
    },
    methods: {
        init: async function () {
            await this.initHeight(this.$parent.$el.offsetHeight)
            await this.getThead()
            await this.initTHead()
            await this.InitColgroupAndColunms()
        },
        initHeight: function (height) {
            this.$el.style.height = height + 'px'

            if (!this.$refs.TBody) return
            let THeadHeight = this.$refs.THead ? this.$refs.THead.offsetHeight : 0
            let TFootHeight = this.$refs.TFoot ? this.$refs.TFoot.offsetHeight : 0
            let TBodyHeight = height - THeadHeight - TFootHeight - 10
            this.$refs.TBody.style.height = TBodyHeight < 0 ? 0 : TBodyHeight + 'px'
        },
        getThead: function () {
            let dom = document.getElementsByTagName('thead')
            this.thead = !dom || dom.length == 0 ? undefined : dom[0]
        },
        initTHead: function () {
            if (!this.thead) return
            let theme = this.theadTheme ? `thead-${this.theadTheme}` : ''
            util.dom.addClass(this.thead, theme)
        },
        InitColgroupAndColunms: function () {
            if (!this.thead) return
            let cells = this.thead.children[this.thead.children.length - 1].cells
            if (!cells) return
            
            for (let i = 0; i < cells.length; i++) {
                if (cells[i].dataset.hide) continue
                this.colgroup.push({class: cells[i].dataset.colClass, style: cells[i].dataset.colStyle} )
                if (!['select', 'operate'].includes(cells[i].dataset.type)) this.fieldColunms.push(cells[i].dataset.field)
            }
        },
        theadCheckboxChange: function (checked) {
            this.theadCheckboxChecked = checked
        },
    },
    watch: {
        '$parent.$el.offsetHeight': function (val) {
            this.initHeight(val)
        },
        selected: function (value) {
            this.selectedOptions = value
        },
        selectedOptions: function (value) {
            this.$emit('table:selectedChanged', value)
        },
    }
}
</script>

<style scoped>
div { 
  -ms-overflow-style: none;
   overflow: -moz-scrollbars-none;
}
div::-webkit-scrollbar{
  width: 0; 
  height: 0;
}
/* table > tbody > tr {
    background-color: rgba(0, 0, 0, .075)
} */
</style>