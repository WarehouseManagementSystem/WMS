<template>
    <div class="p-0">
        <!-- headr -->
        <div v-if="!hideHead" class="p-0" :class="{'overflow-auto': isActive}" ref="THead" @scroll="isActive && $emit('table:scroll', $event, 'activeTableHeader')">
            <table class="table m-0" :class="tableClass" style="table-layout: fixed">
                <table-colgroup :colgroup="colgroup" />
                <table-head 
                    :head="head" 
                    :class="theadClass" 
                    :colunms="fieldColunms" 
                    :operate="operate.value" 
                    :hideSerial="hideSerial" 
                    :hideSelect="hideSelect" 
                    :selectStatus="Number(selectStatus)"
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
                        :colunms="fieldColunms" 
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
            status: 'default',
            operate: {},
            thead: undefined,
            colgroup: [],
            fieldColunms: [],
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
        head: function () {
            if (!this.isActive && this.selectStatus != 2 && this.operate && this.operate.index >= 0 && this.operate.value) {
                let head = Array.from(this.list.head)
                head.splice(this.operate.index, 0, {$operate: this.operate.value })
                return head
            }
            return this.list && this.list.head || []
        },
        data: function () {
            return this.list && this.list.data || []
        },
        foot: function () {
            return this.list && this.list.foot || []
        },
    },
    mounted () {
        this.init()
    },
    methods: {
        init: async function () {
            if (!this.isActive) {
                await this.initStatus()
                await this.initOperate()
            }
            await this.getThead()
            await this.InitColgroupAndColunms()
        },
        initStatus: function () {
            if (Number(this.selectStatus) != 0) this.status = Number(this.selectStatus)
        },
        initOperate: function () {
            if (this.selectStatus == 2 || !this.list || !this.list.operate) return {}
            let index = this.list.operate.index >= 0 ? this.list.operate.index : this.list.head.length
            let value = this.list.operate.value && this.list.operate.value.forEach && this.list.operate.value
                .filter(e => config.ui.table.operate[e].permissions(this.status)) || []
            if (index > (this.list.head && this.list.head.length)) index = this.list.head.length
            this.operate = { index: index, value: value }
        },
        getThead: function () {
            this.thead = this.$refs.THead && this.$refs.THead.children[0] && this.$refs.THead.children[0].children[1] || undefined
        },
        InitColgroupAndColunms: function () {
            if (!this.thead) return
            let cells = this.thead.children[this.thead.children.length - 1].cells
            if (!cells) return
            for (let i = 0; i < cells.length; i++) {
                if (cells[i].dataset.hide) continue
                let index = this.hideSerial ? this.operate.index : this.operate.index + 1
                if (i == index) {
                    this.colgroup.push({class: 'text-center', style: `width: ${2 * this.operate.value.length < 5 ? 5 : 2 * this.operate.value.length + 1}em;`} )
                    this.fieldColunms.push({ $operate: this.operate.index })
                }
                if (cells[i].dataset.type != 'operate') this.colgroup.push({class: cells[i].dataset.colClass, style: cells[i].dataset.colStyle} )
                if (!['select', 'operate', 'serial'].includes(cells[i].dataset.type)) this.fieldColunms.push(cells[i].dataset.field)
            }
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