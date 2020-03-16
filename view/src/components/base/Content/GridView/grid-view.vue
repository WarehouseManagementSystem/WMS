<template>
    <div class="border border-dark rounded p-1">
        <template v-if="!hideData">
            <div ref="toolbar" class="d-flex d-print-none align-items-center justify-content-between">
                <div class="m-1 row"><slot name="toolbar" /></div> <!-- tiilbar left -->
                <div class="m-1 row">
                    <b-button-toolbar>
                        <b-button-group>
                             <b-button color="secondary" size="sm" v-tip="'Search'">
                                <i :class="icon.search" />
                            </b-button>
                            <b-button color="secondary" size="sm" v-tip="'Search Plus'">
                                <i :class="icon.searchPlus" />
                            </b-button>
                            <b-button color="secondary" size="sm" v-tip="'Sort Plus'" v-modal="'#sortmodal'" @click="sortPlusObj = Object.create(sortObj)">
                                <i :class="icon.sort" />
                            </b-button>
                            <b-button color="secondary" size="sm" @click="reset" v-tip="'Reset'">
                                <i :class="icon.sync" />
                            </b-button>
                            <b-button color="secondary" size="sm" @click="print" v-tip="'Print'">
                                <i :class="icon.print" />
                            </b-button>
                        </b-button-group>
                        <b-dropdown :list="downloadList" menuAlign="right" @menuClick="item => dataExport(item)" hideToggle>
                            <template #trigger>
                                <b-button color="secondary" size="sm" v-tip="'Export'">
                                    <i :class="icon.fileExport" />
                                    <i :class="icon.caretDown" class="pl-1" />
                                </b-button>
                            </template>
                        </b-dropdown> <!-- download dropdown -->
                    </b-button-toolbar>
                </div> <!-- tiilbar right -->
            </div> <!-- toolbar -->
            <div class="border row m-0" id="printWrap">
                <c-table 
                    :list="fixedList" 
                    ref="fixedTable" 
                    :class="fixedNum > 0 ? `col-${fixedSizeNum}` : ''" 
                    :sortObj="sortObj" 
                    :tableTheme="tableTheme"
                    :tableSm="tableSm"
                    :tableHover="tableHover"
                    :tableStriped="tableStriped"
                    :tableBordered="tableBordered"
                    :tableBorderless="tableBorderless"
                    :theadTheme="theadTheme"
                    :hideHead="hideHead" 
                    :hideData="hideData" 
                    :hideFoot="hideFoot" 
                    :hideSerial="hideSerial" 
                    v-model="selectedOptions" 
                    :selectStatus="selectStatus" 
                    :primary-key="primaryKey" 
                    @table:sort="cell => tableSort(cell)"
                    @table:scroll="(event, type) => scroll(event, type)" /> <!-- fixedTableContainer -->
               <c-table 
                    v-if="fixedNum > 0" 
                    :list="activeList" 
                    isActive 
                    hideSerial 
                    hideSelect 
                    ref="activeTable" 
                    :class="`col-${12 - fixedSizeNum}`" 
                    :sortObj="sortObj" 
                    :tableTheme="tableTheme"
                    :tableSm="tableSm"
                    :tableHover="tableHover"
                    :tableStriped="tableStriped"
                    :tableBordered="tableBordered"
                    :tableBorderless="tableBorderless"
                    :theadTheme="theadTheme"
                    :hideHead="hideHead" 
                    :hideData="hideData" 
                    :hideFoot="hideFoot" 
                    :selected="selectedOptions" 
                    :selectStatus="selectStatus" 
                    :primary-key="primaryKey" 
                    @table:sort="cell => tableSort(cell)"
                    @table:scroll="(event, type) => scroll(event, type)" /><!-- activeTableContainer -->
            </div> <!-- tableContainer -->
            <div ref="pagination" class="d-flex d-print-none align-items-end justify-content-between py-1" >
                <!-- <font>共 {{ count }} 条数据，本页 {{ num }} 条，共 {{ pageCount }} 页，第 {{ pageNumber }} 页，每页 {{ pageSize }} 条，跳转至第 {{ pageNumber }} 页</font> -->
                <font class="d-flex align-items-center" style="min-width: 550px">
                    {{ dataSize }} / 
                    {{ dataCount }} 条&nbsp;&nbsp;
                    {{ pageNumber }} / 
                    {{ pageCount }} 页&nbsp;&nbsp;
                    每页 <b-select class="d-inline-block mx-1" :list="pageSizeList" v-model="pageSize" size="sm" hideNull /> 条&nbsp;&nbsp;
                    <b-pagination start="1" :end="pageCount" v-model.number="pageNumber" >
                        <b-number class="d-flex align-items-center mx-1" length="3" size="sm" min="1" :max="pageCount" v-model.number="pageNumber" hideButton />
                        <!-- <b-button class="mx-1" size="sm" value="跳转" outline /> -->
                    </b-pagination>
                </font>
            </div> <!-- pagination -->
        </template>
        <div v-else class="d-block d-print-none text-center h-100 align-items-center justify-content-center">
            <template v-if="hideData">
                <p class="display-4">No Related Data</p>
                <small class="text-secondary"><i class="text-primary px-1" :class="icon.info"></i>No related data found or Data format error</small>
            </template>
            <template v-else-if="loading">
                <b-loading color="primary" />
                <p class="display-4">Loading...</p>
            </template>
        </div>
        <b-modal id="sortmodal" title="Sort Plus" :icon="icon.sort">
            <template>
                <div class="row my-1" v-for="item in sort" :key="item">
                    <font class="col-3">{{ lastcolumns.filter(e => e.field == item)[0].title || item }}: </font>
                    <div class="col-9"><b-select :list="['asc', 'desc']" :value="sortPlusObj[item]" @change="sortPlusChanged($event, item)" size="sm" /></div>
                </div>
            </template>
            <template #footer>
                <b-button color="secondary" data-dismiss="modal">Close</b-button>
                <b-button color="primary" data-dismiss="modal" @click="clearSort">Clear Sort</b-button>
                <b-button color="primary" data-dismiss="modal" @click="sortPlus">Sort</b-button>
            </template>
        </b-modal>
    </div> <!-- gridView -->
</template>

<script>
// 参考： https://printjs.crabbly.com/
import printJS from 'print-js'

import util from '@/util/index.js'
import config from '@/config/index.js'
import utilities from '@/components/utilities/index.js'

import CTable from '@/components/base/Content/Table/c-table.vue'

import BButton from '@/components/base/Bootstrap/Form/Button/b-button.vue'
import BButtonGroup from '@/components/base/Bootstrap/ButtonGroup/b-button-group.vue'
import BButtonToolbar from '@/components/base/Bootstrap/ButtonGroup/b-btn-toolbar.vue'
import BDropdown from '@/components/base/Bootstrap/Dropdown/b-dropdown.vue'

import BNumber from '@/components/base/Bootstrap/Form/b-number.vue'
import BSelect from '@/components/base/Bootstrap/Form/Select/b-select.vue'
import BPagination from '@/components/base/Bootstrap/Navigation/Pagination/b-pag'

import BModal from '@/components/base/Bootstrap/Modal/b-modal.vue'

import BLoading from "@/components/base/Bootstrap/Loading/b-loading.vue"


export default {
    name: 'grid-view',
    components: { CTable, BButton, BButtonGroup, BButtonToolbar, BDropdown, BNumber, BSelect, BPagination, BLoading, BModal, },
    data () {
        return {
            loading: false, // 未使用
            selectedOptions: this.selected,
            downloadList: [
                { value: 'XML', type: 'xml', },
                { value: 'CSV', type: 'csv', },
                { value: 'TXT', type: 'txt', },
                // { value: 'SQL', type: 'sql', },
                // { value: 'PDF', type: 'pdf', },
                { value: 'JSON', type: 'json', },
                // { value: 'MS-EXCEL', type: 'ms-excel', },
            ],
            sortObj: {},
            sortPlusObj: {},
            pageSizeList: [10, 25, 50, 75, 100],
            pageNumber: 1, // 页码
            pageSize: 25, // 每页条数
        }
    },
    props: {
        list: {
            ...utilities.props.Object,
        },
        primaryKey: {
            type: [ String, Number ],
            default: 'id',
            // required: true,
            validator: value => value
        },
        fixed: {
            type: [ String, Number ],
            validator: value => !isNaN(value) && Number(value) > 0
        },
        fixedSize: utilities.props.size,
        tableTheme: utilities.props.theme,
        tableSm: Boolean,
        tableHover: Boolean,
        tableStriped: Boolean,
        tableBordered: Boolean,
        tableBorderless: Boolean,
        theadTheme: utilities.props.theme,
        theadSticky: Boolean,
        hideSerial: Boolean,
        selectStatus: {
            type: [String, Number],
            default: 0, // 0: 默认, 1: 单选, 2: 多选
            validator: value => !isNaN(value) && [0, 1, 2].includes(Number(value)),
        },
        selected: [Array, Object, ],
        printTitle: String,
    },
    computed: {
        icon: function () {
            return config.ui.icon
        },
        head: function () {
            return this.list && this.list.head || []
        },
        sort: function () {
            return this.list && this.list.sort || []
        },
        data: function () {
            return this.list && this.list.data || []
        },
        fillData: function () {
            return this.data.slice(this.pageSize * (this.pageNumber - 1) , this.pageSize * this.pageNumber)
        },
        foot: function () {
            return this.list && this.list.foot || []
        },
        dataCount: function () {
            // 总条数
            return this.data.length
        },
        pageCount: function () {
            // 总页数
            return Number.parseInt(this.dataCount / this.pageSize) + (this.dataCount % this.pageSize == 0 ? 0 : 1 )
        },
        dataSize: function () {
            // 本页条数
            return this.fillData.length
        },
        rowStyle: function () {
            return this.list && this.list.rowStyle || {}
        },
        lastcolumns: function () {
            return this.getLastColumns()
        },
        fixedNum: function () {
            return Number(this.fixed)
        },
        fixedSizeNum: function () {
            if (this.fixedNum <= 0) return 12
            if (this.fixedSize == 'sm') return 4
            else if (this.fixedSize == '') return 6
            else if (this.fixedSize == 'lg') return 9
            else return 12
        },
        fixedList: function () {
            return {
                head: this.fixedNum > 0 ? this.head.slice(0, this.fixedNum) : this.head,
                operate: this.list.operate,
                sort: this.sort,
                data: this.fillData,
                foot: this.foot,
                rowStyle: this.rowStyle,
            }
        },
        activeList: function () {
            if (this.fixedNum <= 0) return {}
            return {
                head: this.head.slice(this.fixedNum),
                sort: this.sort,
                data: this.fillData,
                foot: this.foot,
                rowStyle: this.rowStyle,
            }
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
        fixedTable: function () {
            return this.$refs && this.$refs.fixedTable
        },
        fixedTableTHead: function () {
            return this.fixedTable && this.fixedTable.$refs && this.fixedTable.$refs.Thead
        },
        fixedTableTBody: function () {
            return this.fixedTable && this.fixedTable.$refs && this.fixedTable.$refs.TBody
        },
        fixedTableTFoot: function () {
            return this.fixedTable && this.fixedTable.$refs && this.fixedTable.$refs.TFoot
        },
        activeTable: function () {
            return this.$refs && this.$refs.activeTable
        },
        activeTableTHead: function () {
            return this.activeTable && this.$refs.activeTable.$refs && this.activeTable.$refs.Thead
        },
        activeTableTBody: function () {
            return this.activeTable && this.$refs.activeTable.$refs && this.activeTable.$refs.TBody
        },
        activeTableTFoot: function () {
            return this.activeTable && this.$refs.activeTable.$refs && this.activeTable.$refs.TFoot
        },
    },
    mounted () {
        this.init()
    },
    methods: {
        init: async function () {
            if (this.fixed > 0) {
                await this.injectionHover(this.fixedTableTBody.children[0].children[1], this.activeTableTBody.children[0].children[1])
                await this.injectionHover(this.activeTableTBody.children[0].children[1], this.fixedTableTBody.children[0].children[1])
            }
            await this.$nextTick()
            await this.initHeight()
        },
        initHeight: function () {
            if (!this.fixedTableTBody && !this.activeTableTBody) return
            if (this.fixedTableTBody) this.fixedTableTBody.style.height = 0 + 'px'
            if (this.activeTableTBody) this.activeTableTBody.style.height = 0 + 'px'
            this.$el.style.height = this.$parent.$el.offsetHeight + 'px'

            this.$nextTick(function () {
                if (this.fixedTable && this.activeTable) {
                    this.initTrHeight(this.$refs.fixedTable.$refs.THead, this.$refs.activeTable.$refs.THead)
                    this.initTrHeight(this.$refs.fixedTable.$refs.TBody, this.$refs.activeTable.$refs.TBody)
                    this.initTrHeight(this.$refs.fixedTable.$refs.TFoot, this.$refs.activeTable.$refs.TFoot)
                }
                let ToolbarHeight = this.$refs.toolbar ? this.$refs.toolbar.offsetHeight : 0
                let THeadHeight = this.$refs.fixedTable.$refs.THead ? this.$refs.fixedTable.$refs.THead.offsetHeight : 0
                let TFootHeight = this.$refs.fixedTable.$refs.TFoot ? this.$refs.fixedTable.$refs.TFoot.offsetHeight : 0
                let PaginationHeight = this.$refs.pagination ? this.$refs.pagination.offsetHeight : 0
                let TBodyHeight = this.$parent.$el.offsetHeight - ToolbarHeight - THeadHeight - TFootHeight - PaginationHeight - 10
                if (this.fixedTableTBody) this.fixedTableTBody.style.height = TBodyHeight < 0 ? 0 : TBodyHeight + 'px'
                if (this.activeTableTBody) this.activeTableTBody.style.height = TBodyHeight < 0 ? 0 : TBodyHeight + 'px'
            })
        },
        initTrHeight: function (fixedTableTrList, activeTableTrList) {
            if (!fixedTableTrList && !activeTableTrList) return
            let fixed = fixedTableTrList.children[0].children[1].children
            let active = activeTableTrList.children[0].children[1].children
            let min = Math.min(fixed.length, active.length)
            
            for (let i = 0; i < min; i++) {
                if (i == (min - 1) && fixedTableTrList.children[0].children[1].offsetHeight != activeTableTrList.children[0].children[1].offsetHeight) {
                    fixedTableTrList.children[0].children[1].offsetHeight > activeTableTrList.children[0].children[1].offsetHeight 
                        ? active[active.length - 1].style.height = Array.from(fixed).slice(min - 1).reduce((acc, cur) => cur.offsetHeight + acc, 0)  + 'px'
                        : fixed[fixed.length - 1].style.height = Array.from(active).slice(min - 1).reduce((acc, cur) => cur.offsetHeight + acc, 0) + 'px'
                    return
                }

                if (!fixed[i] || !active[i]) continue
                fixed[i].offsetHeight > active[i].offsetHeight
                    ? active[i].style.height = fixed[i].offsetHeight + 'px'
                    : fixed[i].style.height = active[i].offsetHeight + 'px'
            }
        },
        injectionHover: function (dom1, dom2) {
            for (let i = 0; i < dom1.children.length; i++) {
                dom1.childNodes[i].addEventListener('mouseover', () => util.dom.addClass(dom2.children[i], 'hover'), false)
                dom1.childNodes[i].addEventListener('mouseout', () => util.dom.removeClass(dom2.children[i], 'hover'), false)
            }
        },
        scroll: function (elment, type) {
            if (!elment.target) return
            const e = elment.target
            let xCoord, yCoord = 0
            switch (type) {
            case 'fixedTableBody':
                yCoord = e.scrollTop
                break;
            case 'activeTableHeader':
                xCoord = e.scrollLeft
                break;
            case 'activeTableBody':
                xCoord = e.scrollLeft
                yCoord = e.scrollTop
                break;
            case 'activeTableFooter':
                xCoord = e.scrollLeft
                break;
            }
            this.syncScroll(xCoord, yCoord)
        },
        syncScroll: function (xCoord, yCoord) {
            if (this.fixedTableTBody && Math.abs(yCoord) > 1) this.fixedTableTBody.scrollTop = yCoord
            if (this.activeTableTHead && Math.abs(xCoord) > 1) this.activeTableTHead.scrollLeft = xCoord
            if (this.activeTableTBody) {
                if (Math.abs(xCoord) > 1) this.activeTableTBody.scrollLeft = xCoord
                if (Math.abs(yCoord) > 1) this.activeTableTBody.scrollTop = yCoord
            }
            if (this.activeTableTFoot && Math.abs(xCoord) > 1) this.activeTableTFoot.scrollLeft = xCoord
        },
        getLastColumns: function (head = this.head) {
            let arr = []
            head.forEach(e => {
                e.children ? arr.push(...this.getLastColumns(e.children)) : arr.push(e)
            })
            return arr
        },
        dataExport: function (item) {
            if (!item || !item.type) return
            switch (item.type) {
                case 'xml':
                    util.file.xml.writer(this.data)
                    break;
                case 'csv':
                    util.file.csv.writer(this.data)
                    break;
                case 'txt':
                    util.file.txt.writer(this.data)
                    break;
                // case 'sql':
                    
                //     break;
                // case 'pdf':
                    
                //     break;
                case 'json':
                    util.file.json.writer(this.data)
                    break;
                case 'ms-excel':
                    util.file.excel.writer(this.data)
                    break;
                default:
                    break;
            }
            return false
        },
        tableSort: function (cell) {
            this.$set(this.sortObj, cell.field, this.sortObj && this.sortObj[cell.field] == 'asc' ? 'desc' : 'asc')
            this.$emit('table:sort', {sort: this.sortObj, cell: cell} )
        },
        sortPlusChanged: function (value, field) {
            value
                ? this.$set(this.sortPlusObj, field, value)
                : this.$delete(this.sortPlusObj, field)
        },
        sortPlus: function () {
            this.sortObj = Object.create(this.sortPlusObj)
            this.$emit('table:sortPlus',this.sortObj)
        },
        clearSort: function () {
            this.sortObj = {}
            this.sortPlusObj = {}
            this.$emit('table:sortClear')
        },
        reset: function () {
            this.selectedOptions = this.selected
            this.sortObj = {}
            this.pageNumber = 1 // 页码
            this.pageSize = 25 // 每页条数
        },
        print: function () {
            printJS({
                type: 'json',
                printable: this.data,
                repeatTableHeader: true,
                properties: this.lastcolumns.map(e => ({field: e.field, displayName: e.title})),
                header: this.printTitle ? '<h3 class="text-center">'+ this.printTitle +'</h3>' : null,
            })
            this.$emit('table:print')
        },
    },
}
</script>
