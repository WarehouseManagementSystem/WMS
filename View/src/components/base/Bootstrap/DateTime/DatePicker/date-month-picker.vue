<template>
    <div>
        <pickerHeader 
            :hearderText="hearderText" 
            :disabled="disabled" 
            :nowDisabled="nowDisabled" 
            @clickHeader="clickHeader" 
            @forward="forward" 
            @checknow="checknow" 
            @backward="backward" ></pickerHeader>
        <hr>
        <div class="text-center mx-3">
            <picker-row v-for="(items, index) in lists" :key="index" :items="items" :colCount="colCount" :disabled="disabled" @click="click"></picker-row>
        </div>
    </div>
</template>

<script>
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

import pickerHeader from './date-picker-header'
import pickerRow from '@/components/base/Bootstrap/DropDownPicker/b-dropdownpicker-row.vue'

export default {
    name: 'date-month-picker',
    components: { pickerHeader, pickerRow, },
    model: {
        prop: 'value',
        event: 'change'
    },
    data () {
        return {
            total: 12,
            colCount: 3,
            selectValue: null,
            year: null,
            month: null,
        }
    },
    props: {
        value: {
            type: [String, Number, Date, ],
            default: () => new Date(new Date().getFullYear() + '-' + util.string.padStart(new Date().getMonth()) , 2)
        },
        min: {
            type: Date,
        },
        max: {
            type: Date,
        },
        disabled: utilities.props.disabled,
    },
    computed: {
        now: () => new Date(),
        rowCount: function () { 
            return Math.ceil(this.total / this.colCount)
        },
        hearderText: function () {
            return this.year
        },
        nowDisabled: function () {
            return this.now < this.min || this.now > this.max
        },
        lists: function () {
            if (!this.year || isNaN(this.year)) return
            let arrs = []
            for (let i = 0; i < this.rowCount; i++) {
                let arr = []
                const max = this.total < this.colCount * (i + 1) ? this.total % this.colCount : this.colCount
                const d = new Date(this.selectValue)
                const selectYeaer = d.getFullYear()
                const selectMonth = d.getMonth()
                for (let n = 0; n < max; n++) {
                    let value = 0 + i * this.colCount + n
                    let date = new Date(this.formatMonth(this.year, value))
                    arr.push({ value: value, text: util.string.padStart(value + 1, 2), select: value == selectMonth && selectYeaer == this.year, disabled: date < this.min || date > this.max })
                }
                arrs.push(arr)
            }
            
            return arrs
        },
    },
    mounted () {
        this.year = this.value.getFullYear()
        this.month = this.value.getMonth()
        this.selectValue = this.formatMonth(this.year, this.month)
    },
    methods: {
        clickHeader: function () {
            this.$emit('month2Year', this.selectValue)
        },
        click: function (value) {
            this.selectValue = this.formatMonth(this.year, value)
            this.$emit('month2Date', this.selectValue)
        },
        forward: function () {
            this.year -= 1
        },
        checknow: function () {
            this.year = this.now.getFullYear()
            this.month = this.now.getMonth()
            this.selectValue = this.formatMonth(this.year, this.month)
        },
        backward: function () {
            this.year += 1
        },
        formatMonth: function (year, month) {
            return year + '-' + util.string.padStart(Number(month + 1), 2)
        },
    },
    watch: {
        selectValue: function (val) {
            // 配合 v-model 工作
            this.$emit('change', val)
        },
    },
}
</script>
