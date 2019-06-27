<template>
    <div class="row mx-1" style="min-width: 300px">
        <template v-if="hh">
            <time-base class="col" size="2" :min="hhmin" :max="hhmax" :step="step" hide-button v-model="time.hh"></time-base>
        </template>
        <template v-if="hh && mm">
            <font class="col-auto"> : </font>
        </template>
        <template v-if="mm">
            <time-base class="col" size="2" :min="mmmin" :max="mmmax" :step="step" hide-button v-model="time.mm"></time-base>
        </template>
        <template v-if="mm && ss">
            <font class="col-auto"> : </font>
        </template>
        <template v-if="ss">
            <time-base class="col" size="2" :min="ssmin" :max="ssmax" :step="step" hide-button v-model="time.ss"></time-base>
        </template>
    </div>
</template>

<script>
import util from '@/util/index.js'
import timeBase from './time-base'

export default {
    name: 'b-time',
    components: { timeBase, },
    model: {
        props: 'time',
        event: 'change',
    },
    data () {
        return {
            hh: true,
            mm: true,
            ss: true,
            time: {
                hh: 0,
                mm: 0,
                ss: 0,
            },
        }
    },
    props: {
        hhmin: {
            type: Number,
            default: 0,
            validator: function (value) {
                return value < 24
            },
        },
        hhmax: {
            type: Number,
            default: 23,
            validator: function (value) {
                return value < 24
            },
        },
        mmmin: {
            type: Number,
            default: 0,
            validator: function (value) {
                return value < 60
            },
        },
        mmmax: {
            type: Number,
            default: 59,
            validator: function (value) {
                return value < 60
            },
        },
        ssmin: {
            type: Number,
            default: 0,
            validator: function (value) {
                return value < 60
            },
        },
        ssmax: {
            type: Number,
            default: 59,
            validator: function (value) {
                return value < 60
            },
        },
        step: {
            type: Number,
            default: 1,
            validator: function (value) {
                return value > 0 && value < 60 && /^[1-9]\d*$/.test(value)
            },
        },
        type: {
            type: String,
            default: 'hh:mm:ss',
            validator: function (value) {
                return ['hh:mm', 'mm:ss', 'hh:mm:ss'].includes(value)
            },
        },
        value: {
            type: String,
            
        },
    },
    computed: {
        selectValue: function () {
            let date = ''
            if (this.hh) date = util.string.padStart(this.time.hh, 2, '0')
            if (date.toString().length == 0 && this.mm) date = util.string.padStart(this.time.mm, 2, '0')
            if (date.toString().length > 0 && this.mm) date = date + ':' + util.string.padStart(this.time.mm, 2, '0')
            if (date.toString().length == 0 && this.ss) date = util.string.padStart(this.time.ss, 2, '0')
            if (date.toString().length > 0 && this.ss) date = date + ':' + util.string.padStart(this.time.ss, 2, '0')
            else null
            return date
        },
    },
    created () {
        this.hh = this.type.includes('hh')
        this.mm = this.type.includes('mm')
        this.ss = this.type.includes('ss')
        if (!this.value) return
        if (this.hh && this.mm && this.ss) {
            this.time.hh = this.value.substring(0, 2)
            this.time.mm = this.value.substring(3, 5)
            this.time.ss = this.value.substring(6, 8)
        } else if (!this.hh && this.mm && this.ss) {
            this.time.mm = this.value.substring(0, 2)
            this.time.ss = this.value.substring(3, 5)
        } else if (this.hh && this.mm && !this.ss) {
            this.time.hh = this.value.substring(0, 2)
            this.time.mm = this.value.substring(3, 5)
        }
        this.time.hh = this.formatData(this.time.hh, this.hhmin, this.hhmax)
        this.time.mm = this.formatData(this.time.mm, this.mmmin, this.mmmax)
        this.time.ss = this.formatData(this.time.ss, this.ssmin, this.ssmax)
    },
    methods: {
        formatData: function (data, min = 0, max = 59) {
            if (min > max) return
            if (data > max) data = max
            if (data < min) data = min
            return util.string.padStart(data, 2, '0')
        },
    },
    watch: {
        selectValue: function (value) {
            this.$emit('change', value)
        },
    }
}
</script>
