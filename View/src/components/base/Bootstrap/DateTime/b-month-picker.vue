<template>
    <picker placeholder="YYYY-MM" :value="selectValue" :info="info" :disabled="disabled" :hide="hide">
        <template #icon>
            <i class="far fa-calendar-alt col-auto"></i>
        </template>
        <header>
            <font class="row text-center mx-1">
                <base-button class="col font-weight-bold border-0 bg-white text-body h5" style="height: 2.5em" :value="hearderText" @click.stop=""></base-button>
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
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

import picker from '@/components/base/Bootstrap/DropDownPicker/b-dropdownpicker.vue'
import pickerRow from '@/components/base/Bootstrap/DropDownPicker/b-dropdownpicker-row.vue'
import BaseButton from '@/components/base/Bootstrap/Button/b-button.vue'

export default {
    name: 'b-month-picker',
    components: { picker, pickerRow, BaseButton, },
    model: {
        prop: 'value',
        event: 'change'
    },
    data () {
        return {
            hide: false,
            total: 12,
            colCount: 3,
            pickertType: 'month',
            selectValue: null,
            year: null,
            month: null,
        }
    },
    props: {
        value: {
            type: [String, Date, ],
            default: () => new Date(new Date().getFullYear() + '-' + util.string.padStart(new Date().getMonth()) , 2)
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
        rowCount: function () { 
            return Math.ceil(this.total / this.colCount)
        },
        hearderText: function () {
            return this.year
        },
        info: function () {
            if (this.dateMin == 'Invalid Date' && this.dateMax == 'Invalid Date') return ``
            if (this.dateMin.toString() != 'Invalid Date' && this.max.toString() != 'Invalid Date') return `${this.min}~${this.max}`
            if (this.dateMin == 'Invalid Date') return `...~${this.max}`
            if (this.dateMax == 'Invalid Date') return `${this.min}~...`
            return ''
        },
        dateMin: function () {
            return new Date(this.min)
        },
        dateMax: function () {
            return new Date(this.max)
        },
        nowDisabled: function () {
            let d = new Date()
            return d < this.dateMin || d > this.dateMax
        },
        lists: function () {
            if (!this.year || isNaN*(this.year)) return
            let arrs = []
            for (let i = 0; i < this.rowCount; i++) {
                let arr = []
                const max = this.total < this.colCount * (i + 1) ? this.total % this.colCount : this.colCount
                const selectYear = new Date(this.selectValue).getFullYear()
                for (let n = 0; n < max; n++) {
                    let value = 0 + i * this.colCount + n
                    let date = new Date(this.formatMonth(this.year, value))
                    arr.push({ value: value, text: util.string.padStart(value + 1, 2), select: value == new Date(this.selectValue).getMonth() && selectYear == this.year, disabled: date < this.dateMin || date > this.dateMax })
                }
                arrs.push(arr)
            }
            
            return arrs
        },
    },
    mounted () {
        let d = !isNaN(new Date(this.value).getFullYear()) ? new Date(this.value) : new Date()
        this.year = d.getFullYear()
        this.month = d.getMonth()
        this.selectValue = this.formatMonth(this.year, this.month)
    },
    methods: {
        click: function (value) {
            this.selectValue = this.formatMonth(this.year, value)
        },
        forward: function () {
            this.year -= 1
        },
        checknow: function () {
            let d = new Date()
            this.year = d.getFullYear()
            this.month = d.getMonth()
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