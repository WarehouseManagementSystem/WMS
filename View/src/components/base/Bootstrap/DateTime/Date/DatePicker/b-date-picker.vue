<template>
    <picker :placeholder="fillPlaceholder" :value="showValue" :info="info" :show="show" show-footer :disabled="disabled" @showOrHide="showOrHide">
        <template #icon>
            <i class="far fa-calendar-alt col-auto"></i>
        </template>
        <template v-if="show">
            <year-picker v-if="pickertType === 'year'" style="min-width: 18em" v-model="selectValue" :min="dateMin" :max="dateMax" :hideHeader="hideHeader" :disabled="disabled" @year2Month="year2Month"></year-picker>
            <month-picker v-if="pickertType === 'month'" style="min-width: 10em" v-model="selectValue" :min="dateMin" :max="dateMax" :hideHeader="hideHeader" :disabled="disabled" @month2Year="month2Year" @month2Date="month2Date"></month-picker>
            <date-picker v-if="pickertType === 'date'" style="min-width: 22em" v-model="selectValue" :min="dateMin" :max="dateMax" :hideHeader="hideHeader" :disabled="disabled" @date2Month="date2Month" @dateChecked="show = false" ></date-picker>
        </template>
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
        status: {
            type: Number,
            default: 0,
            validator: function (value) {
                return [0, 1,].includes(value)
            },
        },
        min: [String, Date, ],
        max: [String, Date, ],
        placeholder: utilities.props.value,
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
        hideHeader: function () {
            debugger
            return this.status !== 0
        },
        dateMin: function () {
            let time = this.min
            if (this.status !== 0) {
                debugger
                switch (this.type) {
                    case 'month':
                        time = '1970-' + this.min
                        break;
                    case 'date':
                        time = '1970-01-' + this.min
                        break;
                }
            }
            return new Date(time)
        },
        dateMax: function () {
           let time = this.max
            if (this.status !== 0) {
                switch (this.type) {
                    case 'month':
                        time = '1970-' + this.max
                        break;
                    case 'date':
                        time = '1970-01-' + this.max
                        break;
                }
            }
            return new Date(time)
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
        let v = this.value && this.value.toString().length < 7 ? this.value + '-01' : this.value
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
                    return this.status === 0 
                        ? `${value.getFullYear()}-${util.string.padStart(Number(value.getMonth() + 1), 2, '0')}`
                        : `${util.string.padStart(Number(value.getMonth() + 1), 2, '0')}`
                case 'date':
                    return this.status === 0 
                        ? `${value.getFullYear()}-${util.string.padStart(Number(value.getMonth() + 1), 2, '0')}-${util.string.padStart(value.getDate(), 2, '0')}`
                        : `${util.string.padStart(value.getDate(), 2, '0')}`
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
