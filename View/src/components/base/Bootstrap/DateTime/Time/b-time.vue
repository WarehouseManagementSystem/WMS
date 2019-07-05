<template>
    <b-text ref="text" v-model="time" @click="click($event)" @input="input" v-on:keyup.left="left" v-on:keyup.right="right"></b-text>
</template>

<script>
import util from '@/util/index.js'

import BText from '@/components/base/Bootstrap/FormConter/b-text.vue'

export default {
    name: 'b-time',
    components: { BText },
    model: {
        prop: 'value',
        event: 'change'
    },
    data () {
        return {
            time: '',
            date: {
                hh: 0,
                mm: 0,
                ss: 0,
            },
        }
    },
    props: {
        type: {
            type: String,
            default: 'hh:mm:ss',
            validator: function (value) {
                return ['hh', 'mm', 'ss', 'hh:mm', 'mm:ss', 'hh:mm:ss'].includes(value)
            },
        },
        value: String,
        min: String,
        max: String,
    },
    computed: {
        now: function () {
            return new Date()
        },
        types: function () {
            let types = this.type.split(':')
            return {
                hh: types.includes('hh'),
                mm: types.includes('mm'),
                ss: types.includes('ss'),
            }
        },
        dateMin: function () {
            return new Date('1970-01-01T' + this.min)
        },
        dateMax: function () {
            return new Date('1970-01-01T' + this.max)
        },
        selectArea: function () {
            let strs = this.time.split(':')
            let str0 = strs[0] ? strs[0].length : 0
            let str1 = strs[1] ? strs[1].length : 0
            return {
                one: {start: 0, end: str0},
                two: {start: str0 + 1, end: str0 + 1 + str1},
                three: {start: str0 + 1 + str1 + 1},
            }
        },
        info: function () {
            if (this.dateMin.toString() == 'Invalid Date' && this.dateMax.toString() == 'Invalid Date') return ``
            else if (this.dateMin.toString() != 'Invalid Date' && this.dateMax.toString() != 'Invalid Date') return `${this.min}~${this.max}`
            else if (this.dateMin.toString() == 'Invalid Date') return `...~${this.max}`
            else if (this.dateMax.toString() == 'Invalid Date') return `${this.min}~...`
            return ''
        },
    },
    mounted () {
        debugger
        this.time = this.value
        let d = new Date('1970-01-01T' + this.time.split(':').map((e) => util.string.padStart(e, 2, '0')).join(':'))
        d = d.toString() == 'Invalid Date' ? this.now : d
        this.date.hh = d.getHours()
        this.date.mm = d.getMinutes()
        this.date.ss = d.getSeconds()
        this.showValue()
    },
    methods: {
        showValue: function () {
            this.time = ''
            if (this.types.hh) this.time = this.format(this.time, this.date.hh)
            if (this.types.mm) this.time += this.format(this.time, this.date.mm)
            if (this.types.ss) this.time += this.format(this.time, this.date.ss)
        },
        format: function (value, call) {
            let s = value.length > 0 ? ':' : ''
            return s + util.string.padStart(call, 2, '0')
        },
        formatData: function (value, type) {
            if (value < 0) value = 0
            if (value > 59) value = 59
            if (type == 'hh') {
                if (value > 23) value = 23
                let dateMinHours = this.dateMin.getHours(), dateMaxHours = this.dateMax.getHours()
                if (value < dateMinHours) value = dateMinHours
                if (value > dateMaxHours) value = dateMaxHours
            } else if (type == 'mm') {
                let dateMinMinutes = this.dateMin.getMinutes(), dateMaxMinutes = this.dateMin.getMinutes()
                if (value < dateMinMinutes) value = dateMinMinutes
                if (value > dateMaxMinutes) value = dateMaxMinutes
            } else if (type == 'ss') {
                let dateMinSeconds = this.dateMin.getSeconds(), dateMaxSeconds = this.dateMin.getSeconds()
                if (value < dateMinSeconds) value = dateMinSeconds
                if (value > dateMaxSeconds) value = dateMaxSeconds
            }
            return value
        },
        setSelectArea: function (element, start = 0) {
            if (start < 0) return
            if (start <= this.selectArea.one.end) {
                util.document.setCursorPos(element, this.selectArea.one.start, this.selectArea.one.end)
            } else if (start >= this.selectArea.two.start && start <= this.selectArea.two.end) {
                util.document.setCursorPos(element, this.selectArea.two.start, this.selectArea.two.end)
            } else if (start >= this.selectArea.three.start) {
                util.document.setCursorPos(element, this.selectArea.three.start, this.value.length)
            }
        },
        setSelectAreaStart: function (element, type = 'left') {
            let { selectionStart } = event.target
            let start = selectionStart || 0
            if (selectionStart <= this.selectArea.one.end) {
                start = type == 'left' ? start : this.selectArea.two.start
            } else if (selectionStart >= this.selectArea.two.start && selectionStart <= this.selectArea.two.end) {
                start = type == 'left' ? this.selectArea.one.start : this.selectArea.three.start
            } else if (selectionStart >= this.selectArea.three.start) {
                start = type == 'left' ? this.selectArea.two.start : start
            }
            this.setSelectArea(event.target, start)
        },
        click: function (event) {
            let { selectionStart } = event.target
            this.setSelectArea(event.target, selectionStart)
        },
        input: function () {
            var timer = setTimeout((vm = this) => {
                let { value, selectionStart } = vm.$el.children[0]
                vm.time = value.split(':').map((e) => util.string.padStart(e, 2, '0')).join(':')
                let start = selectionStart // 记录下一个选择区域的起始点
                // 输入非法时返回
                if (new Date('1970-01-01T' + vm.time).toString() == 'Invalid Date') { 
                    vm.showValue() // 输入非法时，撤销修改
                    vm.setSelectArea(vm.$el.children[0], start) // 输入非法时，重新选择该区域，以便再次修改
                    return 
                }
                let type, str
                if (selectionStart <= vm.selectArea.one.end) {
                    if (vm.types.hh) type = 'hh'
                    else if (vm.types.mm) type = 'mm'
                    else type = 'ss'
                    str = vm.time.substring(vm.selectArea.one.start, vm.selectArea.one.end)
                    vm.date.hh = vm.formatData(str, type)
                    start = vm.selectArea.two.start
                } else if (selectionStart >= vm.selectArea.two.start && selectionStart <= vm.selectArea.two.end) {
                    if (vm.types.hh) type = 'mm'
                    else type = 'ss'
                    str = vm.time.substring(vm.selectArea.two.start, vm.selectArea.two.end)
                    vm.date.mm = vm.formatData(str, type)
                    start = vm.selectArea.three.start
                } else if (selectionStart > vm.selectArea.three.start) {
                    type = 'ss'
                    str = vm.time.substring(vm.selectArea.three.start)
                    vm.date.ss = vm.formatData(str, type)
                    start = -1 // 表示不再选择
                }
                vm.$el.children[0].value = vm.time
                vm.setSelectArea(vm.$el.children[0], start)
            }, 500)
            if (timer !== null) timer = null
            // 配合 v-model
            this.$emit('change', this.time)
        },
        left: function () {
            this.setSelectAreaStart(event.target, 'left')
        },
        right: function () {
            this.setSelectAreaStart(event.target, 'right')
        }
    }
}
</script>
