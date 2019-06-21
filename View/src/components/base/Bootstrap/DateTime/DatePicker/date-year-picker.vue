<template>
    <div>
        <pickerHeader 
            :hearderText="hearderText" 
            :disabled="disabled" 
            :nowDisabled="nowDisabled"  
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
import utilities from '@/components/utilities/index.js'

import pickerHeader from './date-picker-header'
import pickerRow from '@/components/base/Bootstrap/DropDownPicker/b-dropdownpicker-row.vue'

export default {
    name: 'date-year-picker',
    components: { pickerHeader, pickerRow, },
    model: {
        prop: 'value',
        event: 'change'
    },
    data () {
        return {
            total: 10, 
            colCount: 4,
            start: 2001,
            selectValue: null,
        }
    },
    props: {
        value: {
            type: [String, Number, Date ],
            default: () => new Date().getFullYear(),
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
        year: function () { return this.now.getFullYear() },
        rowCount: function () { 
            return Math.ceil(this.total / this.colCount)
        },
        hearderText: function () {
            return `${this.start} - ${this.start + this.total - 1}`
        },
        nowDisabled: function () {
            return this.now < this.min || this.now > this.max
        },
        lists: function () {
            let arrs = []
            for (let i = 0; i < this.rowCount; i++) {
                let arr = []
                const max = this.total < this.colCount * (i + 1) ? this.total % this.colCount : this.colCount
                for (let n = 0; n < max; n++) {
                    let value = this.start + i * this.colCount + n
                    arr.push({ value: value, text: value, select: value == this.selectValue, disabled: value < this.min.getFullYear() || value > this.max.getFullYear() })
                }
                arrs.push(arr)
            }

            return arrs
        },
    },
    mounted () {
        this.start = this.formatStart(this.value.getFullYear() || this.year)
        this.selectValue = new Date(this.value).getFullYear()
    },
    methods: {
        click: function (value) {
            this.selectValue = value
            this.$emit('year2Month', this.selectValue)
        },
        formatStart: function (val) {
            return val % this.total == 0 
                ? Math.floor(val / this.total) * this.total - (this.total - 1)
                : Math.floor(val / this.total) * this.total + 1
        },
        forward: function () {
            this.start -= this.total
        },
        checknow: function () {
            this.selectValue = this.year
            this.start = this.formatStart(this.selectValue)
        },
        backward: function () {
            this.start += this.total
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