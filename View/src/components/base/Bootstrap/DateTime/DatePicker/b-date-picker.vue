<template>
    <picker :placeholder="fillPlaceholder" :value="selectValue" :info="info" :disabled="disabled">
        <template #icon>
            <i class="far fa-calendar-alt col-auto"></i>
        </template>
        <year-picker v-if="pickertType === 'year'" v-model="selectValue" :min="dateMin" :max="dateMax" :disabled="disabled" @year2Month="year2Month"></year-picker>
        <month-picker v-if="pickertType === 'month'" v-model="selectValue" :min="dateMin" :max="dateMax" :disabled="disabled" @month2Year="month2Year"></month-picker>
    </picker>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import picker from '@/components/base/Bootstrap/DropDownPicker/b-dropdownpicker.vue'
import yearPicker from './date-year-picker.vue'
import monthPicker from './date-month-picker'

export default {
    name: 'b-date-picker',
    components: { picker, yearPicker, monthPicker, },
    model: {
        prop: 'value',
        event: 'change'
    },
    data () {
        return {
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
                    default:
                        return 'error'
                }
            }
        },
        dateMin: function () {
            return new Date(this.min)
        },
        dateMax: function () {
            return new Date(this.max)
        },
        info: function () {
            if (this.dateMin == 'Invalid Date' && this.max == 'Invalid Date') return ``
            if (this.dateMin.toString() != 'Invalid Date' && this.max.toString() != 'Invalid Date') return `${this.min}~${this.max}`
            if (this.dateMin == 'Invalid Date') return `...~${this.max}`
            if (this.dateMax == 'Invalid Date') return `${this.min}~...`
            return ''
        },
    },
    mounted () {
        this.pickertType = this.type
        let v = this.value.toString().length < 7 ? this.value + '-1' : this.value
        this.date = !isNaN(Date.parse(v)) ? new Date(v) : new Date()
        this.selectValue = this.date
    },
    methods: {
        month2Year: function (value) {
            let d = new Date(value)
            this.date.setFullYear(d.getFullYear())
            this.date.setMonth(d.getMonth())
            this.selectValue = this.date
            this.pickertType = 'year'
        },
        year2Month: function (value) {
            if (this.pickertType == this.type) return
            this.date.setFullYear(value)
            this.selectValue = this.date
            this.pickertType = 'month'
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
