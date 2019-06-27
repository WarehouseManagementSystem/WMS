<template>
    <picker placeholder="YYYY" :value="selectValue" :info="info" :disabled="disabled">
        <template #icon>
            <i class="far fa-calendar-alt col-auto"></i>
        </template>
        <header>
            <font class="row text-center mx-1">
                <base-button class="col font-weight-bold border-0 bg-white text-body h5" style="height: 2.5em" :value="hearderText"></base-button>
                <base-button class="fas fa-angle-left border-0 bg-white text-muted" style="height: 2.5em" :disabled="disabled" value="" @click.stop="forward"></base-button>
                <base-button class="fas fa-circle border-0 bg-white text-muted" style="height: 2.5em" :disabled="disabled || nowDisabled" value="" @click.stop="checknow"></base-button>
                <base-button class="fas fa-angle-right border-0 bg-white text-muted" style="height: 2.5em" :disabled="disabled"  value="" @click.stop="backward"></base-button>
            </font>
        </header>
        <hr>
        <div class="text-center mx-3">
            <picker-row v-for="(items, index) in lists" :key="index" :items="items" :colCount="colCount" :disabled="disabled" @click="click"></picker-row>
        </div>
    </picker>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import picker from '@/components/base/Bootstrap/DropDownPicker/b-dropdownpicker.vue'
import pickerRow from '@/components/base/Bootstrap/DropDownPicker/b-dropdownpicker-row.vue'
import BaseButton from '@/components/base/Bootstrap/Button/b-button.vue'

export default {
    name: 'b-year-picker',
    components: { picker, pickerRow, BaseButton, },
    model: {
        prop: 'value',
        event: 'change'
    },
    data () {
        return {
            total: 10, 
            colCount: 4,
            start: 2001,
            pickertType: 'year',
            selectValue: this.value,
        }
    },
    props: {
        value: {
            ...utilities.props.value,
            default: () => new Date().getFullYear(),
        },
        min: {
            type: [String, Date, ],
        },
        max: {
            type: [String, Date, ],
        },
        disabled: utilities.props.disabled,
    },
    computed: {
        year: () => new Date().getFullYear(),
        rowCount: function () { 
            return Math.ceil(this.total / this.colCount)
        },
        getStart: {
            get: function() {
                let startYear = this.value || this.year
                return this.formatStart(startYear)
            },
            set: function (val) {this.start = val}
        },
        hearderText: function () {
            return `${this.start} - ${this.start + this.total - 1}`
        },
        info: function () {
            if (this.dateMin == 'Invalid Date' && this.max == 'Invalid Date') return ``
            if (this.dateMin.toString() != 'Invalid Date' && this.max.toString() != 'Invalid Date') return `${this.min}~${this.max}`
            if (this.dateMin == 'Invalid Date') return `...~${this.max}`
            if (this.dateMax == 'Invalid Date') return `${this.min}~...`
            return ''
        },
        dateMin: function () {
            return new Date(this.min).getFullYear()
        },
        dateMax: function () {
            return new Date(this.max).getFullYear()
        },
        nowDisabled: function () {
            const year = new Date().getFullYear()
            return year < this.dateMin || year > this.dateMax
        },
        lists: function () {
            let arrs = []
            for (let i = 0; i < this.rowCount; i++) {
                let arr = []
                const max = this.total < this.colCount * (i + 1) ? this.total % this.colCount : this.colCount
                for (let n = 0; n < max; n++) {
                    let value = this.start + i * this.colCount + n
                    arr.push({ value: value, text: value, select: value == this.selectValue, disabled: value < this.dateMin || value > this.dateMax })
                }
                arrs.push(arr)
            }

            return arrs
        },
    },
    mounted () {
        this.start = this.getStart  
    },
    methods: {
        click: function (value) {
            this.selectValue = value
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
            this.getStart = this.formatStart(this.selectValue)
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
