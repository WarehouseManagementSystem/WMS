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
        <div class="text-center mx-3">
            <picker-row class="border-bottom border-primary" :items="[{text: '日'},{text: '一'}, {text: '二'}, {text: '三'}, {text: '四'}, {text: '五'}, {text: '六'}]" :colCount="colCount"></picker-row>
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
    name: 'date-date-picker',
    components: { pickerHeader, pickerRow, },
    model: {
        prop: 'value',
        event: 'change'
    },
    data () {
        return {
            colCount: 7,
            selectValue: null,
            year: null,
            month: null,
            date: null,
        }
    },
    props: {
        value: {
            type: [String, Number, Date, ],
            default: () => new Date(new Date().getFullYear() + '-' + util.string.padStart(new Date().getMonth() , 2) + '-' + util.string.padStart(new Date().getDate() , 2))
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
        hearderText: function () {
            return this.year + '-' + util.string.padStart(Number(this.month + 1), 2)
        },
        total: function () {
            return new Date(this.year, this.month + 1, 0).getDate();
        },
        rowCount: function () { 
            return Math.ceil(this.total / this.colCount)
        },
        nowDisabled: function () {
            return this.now < this.min || this.now > this.max
        },
        lists: function () {
            if (!this.year || isNaN(this.year)) return
            if (this.month < 0 || isNaN(this.month)) return
            let arrs = []
            let value = 1
            let flag = false
            let day = new Date(this.year, this.month, 1).getDay()
            const d = new Date(this.selectValue)
            const selectYear = d.getFullYear()
            const selectMonth = d.getMonth()
            const selectDate = d.getDate()
            while (value <= this.total) {
                let arr = []
                for (let i = 0; i < this.colCount; i++) {
                    value > this.total ? flag = false : (flag ? null : flag = (i == day))
                    if (!flag) {
                        arr.push({text: ''})
                    } else {
                        let date = new Date(this.formatDate(this.year, this.month, value))
                        arr.push({ value: value, text: util.string.padStart(value, 2), select: value == selectDate && selectYear == this.year && selectMonth == this.month, disabled: date < this.min || date > this.max })
                        value++
                    }
                }
                arrs.push(arr)
            }
            return arrs
        },
    },
    mounted () {
        this.year = this.value.getFullYear()
        this.month = this.value.getMonth()
        this.date = this.value.getDate()
        this.selectValue = this.formatDate(this.year, this.month, this.date)
    },
    methods: {
        clickHeader: function () {
            this.$emit('date2Month', this.selectValue)
        },
        click: function (value) {
            this.selectValue = this.formatDate(this.year, this.month, value)
            this.$emit('dateChecked')
        },
        forward: function () {
            if (this.month == 0) {
                this.year -= 1
                this.month = 11
            } else {
                this.month -= 1
            }
            
        },
        checknow: function () {
            this.year = this.now.getFullYear()
            this.month = this.now.getMonth()
            this.date = this.now.getDate()
            this.selectValue = this.formatDate(this.year, this.month, this.date)
            this.$emit('dateChecked')
        },
        backward: function () {
            if (this.month == 11) {
                this.year += 1
                this.month = 0
            } else {
                this.month += 1
            }
        },
        formatDate: function (year, month, date) {
            return year + '-' + util.string.padStart(Number(month + 1), 2) + '-' + util.string.padStart(date, 2)
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