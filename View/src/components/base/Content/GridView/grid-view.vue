<template>
    <div class="border border-dark rounded p-1">
        <template v-if="!hideData">
            <div class="row m-0">
                <c-table 
                    :list="fixedList" 
                    ref="fixedTable" 
                    :class="{'col-4': fixedNum > 0}" 
                    :tableClass="tableClass" 
                    :theadClass="theadClass" 
                    :hideHead="hideHead" 
                    :hideData="hideData" 
                    :hideFoot="hideFoot" 
                    :hideSerial="hideSerial" 
                    v-model="selectedOptions" 
                    :selectStatus="selectStatus" 
                    @table:scroll="(event, type) => scroll(event, type)" /> <!-- fixedTableContainer -->
               <c-table 
                    v-if="fixedNum > 0" 
                    :list="activeList" 
                    isActive 
                    hideSerial 
                    hideSelect 
                    ref="activeTable" 
                    :class="{'col-8': fixedNum > 0}" 
                    :tableClass="tableClass" 
                    :theadClass="theadClass" 
                    :hideHead="hideHead" 
                    :hideData="hideData" 
                    :hideFoot="hideFoot" 
                    :selected="selectedOptions" 
                    :selectStatus="selectStatus" 
                    @table:scroll="(event, type) => scroll(event, type)" /><!-- activeTableContainer -->
            </div> <!-- tableContainer -->
        </template>
        <template v-else>
            <div class="d-flex h-100 align-items-center justify-content-center">
                No Data
            </div>
        </template>
    </div> <!-- gridView -->
</template>

<script>
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

import CTable from './Table/c-table_2'
export default {
    name: 'grid-view',
    components: { CTable, },
    data () {
        return {
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
        fixed: {
            type: [ String, Number ],
            validator: value => !isNaN(value) && Number(value) > 0
        },
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
    },
    computed: {
        head: function () {
            return this.list && this.list.head || []
        },
        data: function () {
            return this.list && this.list.data || []
        },
        foot: function () {
            return this.list && this.list.foot || []
        },
        fixedList: function () {
            return {
                head: this.head.slice(0, this.fixedNum),
                operate: this.list.operate,
                data: this.data,
                foot: this.foot,
            }
        },
        activeList: function () {
            return {
                head: this.head.slice(this.fixedNum),
                data: this.data,
                foot: this.foot,
            }
        },
        // hide head
        hideHead: function () {
            return !this.head || this.head.length == 0
        },
        // hide body
        hideData: function () {
            return !this.data || this.data.length == 0
        },
        // hide foot
        hideFoot: function () {
            return !this.foot || this.foot.length == 0
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
        theadClass: function () {
            return this.theadTheme ? `thead-${this.theadTheme}` : ''
        },
        fixedNum: function () {
            return Number(this.fixed)
        },
    },
    mounted () {
        this.init()
    },
    methods: {
        init: async function () {
            await this.initHeight()
            await this.injectionHover(this.$refs.fixedTable.$refs.TBody.children[0].children[1], this.$refs.activeTable.$refs.TBody.children[0].children[1])
            await this.injectionHover(this.$refs.activeTable.$refs.TBody.children[0].children[1], this.$refs.fixedTable.$refs.TBody.children[0].children[1])
        },
        initHeight: function () {
            this.$refs.fixedTable.$refs.TBody.style.height = 0 + 'px'
            this.$refs.activeTable.$refs.TBody.style.height = 0 + 'px'
            this.$el.style.height = this.$parent.$el.offsetHeight + 'px'

            if (!this.$refs.fixedTable.$refs.TBody || !this.$refs.activeTable.$refs.TBody) return
            let THeadHeight = this.$refs.fixedTable.$refs.THead ? this.$refs.fixedTable.$refs.THead.offsetHeight : 0
            let TFootHeight = this.$refs.fixedTable.$refs.TFoot ? this.$refs.fixedTable.$refs.TFoot.offsetHeight : 0
            let TBodyHeight = this.$parent.$el.offsetHeight - THeadHeight - TFootHeight - 10
            this.$refs.fixedTable.$refs.TBody.style.height = TBodyHeight < 0 ? 0 : TBodyHeight + 'px'
            this.$refs.activeTable.$refs.TBody.style.height = TBodyHeight < 0 ? 0 : TBodyHeight + 'px'
        },
        injectionHover: function (dom1, dom2) {
            for (let i = 0; i < dom1.children.length; i++) {
                dom1.childNodes[i].addEventListener('mouseover', () => util.dom.addClass(dom2.children[i], 'hover'), false)
                dom1.childNodes[i].addEventListener('mouseout', () => util.dom.removeClass(dom2.children[i], 'hover'), false)
            }
        },
        getTheadRowCount: function (arr = this.head || [], count = 1) {
            let vm = this
            return arr.reduce(
                (acc, cur) => cur.children ? vm.getTheadRowCount(cur.children, acc + 1) : acc,
                count)
        },
        scroll: function (elment, type) {
            debugger
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
            if (this.$refs.fixedTable.$refs.TBody && Math.abs(yCoord) > 1) this.$refs.fixedTable.$refs.TBody.scrollTop = yCoord
            if (this.$refs.activeTable.$refs.THead && Math.abs(xCoord) > 1) this.$refs.activeTable.$refs.THead.scrollLeft = xCoord
            if (this.$refs.activeTable.$refs.TBody) {
                if (Math.abs(xCoord) > 1) this.$refs.activeTable.$refs.TBody.scrollLeft = xCoord
                if (Math.abs(yCoord) > 1) this.$refs.activeTable.$refs.TBody.scrollTop = yCoord
            }
            if (this.$refs.activeTable.$refs.TFoot && Math.abs(xCoord) > 1) this.$refs.activeTable.$refs.TFoot.scrollLeft = xCoord
        },
    },
}
</script>
