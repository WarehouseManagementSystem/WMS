<template>
    <thead>
        <template v-for="(headRow, index) in headData">
            <table-head-tr 
                v-if="index == 0"
                :key="index"
                :row="headRow" 
                :rowCount="rowCount" 
                :hideSerial="hideSerial"
                :hideSelect="hideSelect" 
                :selectStatus="selectStatus" 
                :sortObj="sortObj" 
                @table:sort="cell => $emit('table:sort', cell)"
                v-model="checked" />
            <table-head-tr 
                v-else
                :key="index"
                :row="headRow" 
                hideSerial
                hideSelect 
                :sortObj="sortObj" 
                @table:sort="cell => $emit('table:sort', cell)" />
        </template>
        
    </thead>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import TableHeadTr from './../Tr/table-head-tr'

export default {
    name: 'table-head',
    components: { TableHeadTr, },
    model: {
        prop: 'checked',
        event: 'change'
    },
    data () {
        return {
            checked: false,
            headData: [],
            rowCount: 1,
        }
    },
    props: {
        head: utilities.props.list,
        hideSerial: Boolean,
        hideSelect: Boolean,
        selectStatus: Number,
        sortObj: Object,
    },
    mounted () {
        this.getRowCount()
        this.initHeadData()
        this.getHeadData()
    },
    methods: {
        getRowCount: function () {
            this.rowCount = this.getTheadRowCount(this.head)
        },
        // initHeadData: function (head = this.head) {
        //     if (!head || head.length == 0) return []
        //     let rowspan = this.getTheadRowCount(head)
        //     let vm = this
        //     head.forEach(e => {
        //         let colspan = vm.getTheadColCount(e)
        //         e.colspan = colspan > 1 ? colspan : null
        //         if (e.children) {
        //             let c_rowspan = vm.rowCount - rowspan - vm.getTheadRowCount(e.children) - 1
        //             e.rowspan = c_rowspan > 1 ? c_rowspan : null
        //             vm.initHeadData(e.children)
        //         } else {
        //             debugger
        //             let c_rowspan = vm.rowCount == rowspan ? vm.rowCount : vm.rowCount - rowspan + 1 == 1 ? rowspan : vm.rowCount - rowspan + 1// vm.rowCount == rowspan ? vm.rowCount : rowspan == 1 ? vm.rowCount - rowspan : rowspan
        //             e.rowspan = c_rowspan > 1 ? c_rowspan : null
        //         }
        //     })
        // },
        initHeadData: function (head = this.head, index = 0) {
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
        getHeadData: function (head = this.head) {
            if (!head || head.length == 0) return []
            this.headData.push([...head])
            this.getHeadData(head.filter(e => e.children).map(e => e.children).flat())
        },
        getTheadRowCount: function (arr = [], count = 1) {
            return Math.max(...arr.map(e => e.children ? this.getTheadRowCount(e.children, count + 1) : count))
        },
        getCellRowCount: function (obj = {}, index) {
            return obj.children ? 1 : this.rowCount - index
        },
        getCellColCount: function (obj = {}, count = 1) {
            return obj.children
                ? obj.children.filter(e => !e.children).length + obj.children.filter(e => e.children).reduce( (acc, cur) => acc + this.getCellColCount(cur), 0) 
                : count
        },
    },
    watch: {
        checked: function (value) {
            this.$emit('change', value)
        },
    }
}
</script>