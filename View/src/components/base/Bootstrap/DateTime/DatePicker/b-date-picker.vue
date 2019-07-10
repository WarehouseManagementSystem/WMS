<template>
    <picker :placeholder="fillPlaceholder" :value="showValue" :info="info" :show="show" show-footer :disabled="disabled" @showOrHide="showOrHide">
        <template #icon>
            <i class="far fa-calendar-alt col-auto"></i>
        </template>
        <year-picker v-if="pickertType === 'year'" v-model="selectValue" :min="dateMin" :max="dateMax" :disabled="disabled" @year2Month="year2Month"></year-picker>
        <month-picker v-if="pickertType === 'month'" v-model="selectValue" :min="dateMin" :max="dateMax" :disabled="disabled" @month2Year="month2Year" @month2Date="month2Date"></month-picker>
        <date-picker v-if="pickertType === 'date'" v-model="selectValue" :min="dateMin" :max="dateMax" :disabled="disabled" @date2Month="date2Month" @dateChecked="show = false" ></date-picker>
    </picker>
</template>

<script>
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

import picker from '@/components/base/Bootstrap/DropDownPicker/b-dropdownpicker.vue'
import yearPicker from './date-year-picker'
import monthPicker from './date-month-picker'
import datePicker from './date-date-picker'

export default {
    name: 'b-date-picker',
    components: { picker, yearPicker, monthPicker, datePicker, },
    model: {
        prop: 'value',
        event: 'change'
    },
    data () {
        return {
            show: null,
            date: null,
            pickertType: '',
            selectValue: null,
        }
    },
    props: {
        type: {
            type: String,
            default: 'date',
            validator: function (value) {
                return ['year', 'month', 'date', ].includes(value)
            },
        },
        value: {
            type: [String, Number, Date, ],
            default: () => new Date(),
        },
        placeholder: utilities.props.value,
        min: [String, Date, ],
        max: [String, Date, ],
        disabled: utilities.props.disabled,
    },
    computed: {
        fillPlaceholder: function () {
            if (this.placeholder) return this.placeholder
            else {
                switch (this.type) {
                    case 'year':
                        return 'yyyy'
                    case 'month':
                        return 'yyyy-MM'
                    case 'date':
                        return 'yyyy-MM:dd'
                    default: 
                        return 'error'
                }
            }
        },
        showValue: function () {
            return this.formatDate(this.selectValue)
        },
        canHide: function () {
            return this.type == this.pickertType
        },
        dateMin: function () {
            return new Date(this.min)
        },
        dateMax: function () {
            return new Date(this.max)
        },
        info: function () {
            if (this.dateMin.toString() == 'Invalid Date' && this.dateMax.toString() == 'Invalid Date') return ``
            else if (this.dateMin.toString() != 'Invalid Date' && this.dateMax.toString() != 'Invalid Date') return `${this.formatDate(this.dateMin)}~${this.formatDate(this.dateMax)}`
            else if (this.dateMin.toString() == 'Invalid Date') return `...~${this.formatDate(this.dateMax)}`
            else if (this.dateMax.toString() == 'Invalid Date') return `${this.formatDate(this.dateMin)}~...`
            return ''
        },
    },
    mounted () {
        this.pickertType = this.type
        let v = this.value.toString().length < 7 ? this.value + '-01' : this.value
        this.date = !isNaN(Date.parse(v)) ? new Date(v) : new Date()
        this.selectValue = this.date
    },
    methods: {
        formatDate: function (value) {
            if (!value) return
            value = new Date(value.toString().length < 7 ? value + '-' + (this.type == 'year' ? '01' : util.string.padStart(Number(this.date.getMonth() + 1), 2, '0')) : value)
            if (value == 'Invalid Date') return
            
            switch (this.type) {
                case 'year':
                    return value.getFullYear()
                case 'month':
                    return `${value.getFullYear()}-${util.string.padStart(Number(value.getMonth() + 1), 2, '0')}`
                case 'date':
                    return `${value.getFullYear()}-${util.string.padStart(Number(value.getMonth() + 1), 2, '0')}-${util.string.padStart(value.getDate(), 2, '0')}`
            }
        },
        month2Year: function (value) {
            let d = new Date(value)
            this.date.setFullYear(d.getFullYear())
            this.date.setMonth(d.getMonth())
            this.selectValue = this.date
            this.pickertType = 'year'
        },
        year2Month: function (value) {
            if (this.canHide) {
                this.show = false
                return
            }
            this.date.setFullYear(value)
            this.selectValue = this.date
            this.pickertType = 'month'
        },
        date2Month: function (value) {
            let d = new Date(value)
            this.date.setFullYear(d.getFullYear())
            this.date.setMonth(d.getMonth())
            this.date.setDate(d.getDate())
            this.selectValue = this.date
            this.pickertType = 'month'
        },
        month2Date: function (value) {
            if (this.canHide) {
                this.show = false
                return
            }
            let d = new Date(value)
            this.date.setFullYear(d.getFullYear())
            this.date.setMonth(d.getMonth())
            this.selectValue = this.date
            this.pickertType = 'date'
        },
        showOrHide: function (value) {
            this.show = value
        },
    },
    watch: {
        selectValue: function () {
            // 配合 v-model 工作
            this.$emit('change', this.showValue)
        },
    },
}
</script>
