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
                return ['hh:mm', 'hh:mm:ss'].includes(value)
            },
        },
        value: String,
        min: {
            type: String,
            default: '00:00:00',
            validator: function (value) {
                return new Date(...[1970, 1, 1, ...value.split(':')]).toString() !== 'Invalid Date'
            },
        },
        max: {
            type: String,
            default: '23:59:59',
            validator: function (value) {
                return new Date(...[1970, 1, 1, ...value.split(':')]).toString() !== 'Invalid Date'
            },
        },
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
            return this.string2Date(this.min)
        },
        dateMax: function () {
            return this.string2Date(this.max)
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
    },
    mounted () {
        let d = this.string2Date(this.value)
        d = d.toString() == 'Invalid Date' ? this.now : d
        this.Date2date(this.formatData(d))
        this.showValue()
    },
    methods: {
        showValue: function () {
            this.time = ''
            if (this.types.hh) this.time = this.formatValue(this.time, this.date.hh)
            if (this.types.mm) this.time += this.formatValue(this.time, this.date.mm)
            if (this.types.ss) this.time += this.formatValue(this.time, this.date.ss)
        },
        formatValue: function (value, call) {
            let s = value.length > 0 ? ':' : ''
            return s + util.string.padStart(call, 2, '0')
        },
        formatData: function (value) {
            value < this.dateMin 
                ? this.Date2date(this.dateMin)
                : value > this.dateMax
                    ? this.Date2date(this.dateMax)
                    : this.Date2date(value)
            
        },
        string2Date: function (str) {
            return new Date(...[1970, 1, 1, ...str.split(':')])
        },
        Date2date: function (d) {
            this.date.hh = d.getHours()
            this.date.mm = d.getMinutes()
            this.date.ss = d.getSeconds()
        }, // 将 Date 类型数据转换成 date 变量，以便显示
        setSelectArea: function (element, start = 0) {
            if (start < 0) return
            if (start <= this.selectArea.one.end) {
                util.document.setCursorPos(element, this.selectArea.one.start, this.selectArea.one.end)
            } else if (start >= this.selectArea.two.start && start <= this.selectArea.two.end) {
                util.document.setCursorPos(element, this.selectArea.two.start, this.selectArea.two.end)
            } else if (start >= this.selectArea.three.start) {
                util.document.setCursorPos(element, this.selectArea.three.start, element.value.length)
            }
        },
        setSelectAreaStart: function (element, type = 'left') {
            let { selectionStart } = element
            let start = selectionStart || 0
            if (selectionStart <= this.selectArea.one.end) {
                start = type == 'left' ? start : this.selectArea.two.start
            } else if (selectionStart >= this.selectArea.two.start && selectionStart <= this.selectArea.two.end) {
                start = type == 'left' ? this.selectArea.one.start : this.selectArea.three.start
            } else if (selectionStart >= this.selectArea.three.start) {
                start = type == 'left' ? this.selectArea.two.start : start
            }
            return start
        },
        click: function (event) {
            this.setSelectArea(event.target, event.target.selectionStart)
        },
        input: function () {
            var timer = setTimeout((vm = this) => {
                let { value, selectionStart, selectionEnd } = vm.$el.children[0]
                if (selectionStart !== selectionEnd) return

                let d = this.string2Date(value)
                let start = selectionStart // 记录下一个选择区域的起始点

                if (d.toString() !== 'Invalid Date') { 
                    if (selectionStart <= vm.selectArea.one.end) {
                        start = vm.selectArea.two.start
                    } else if (selectionStart >= vm.selectArea.two.start && selectionStart <= vm.selectArea.two.end) {
                        start = vm.selectArea.three.start
                    } else if (selectionStart > vm.selectArea.three.start) {
                        start = -1 // 表示不再选择
                    }
                    vm.formatData(d)
                } else {
                    // 输入非法时修正 start，以正确创建选择区域
                    // 当分段字符数超过 2 时会导致选择区域错误
                    let str = value.split(':').map((e) => util.string.padStart(e, 2, '0')).find(function(element) {
                        return element.toString().length > 2;
                    });
                    if (str) start = start - (str.toString().length - 2)
                }

                vm.showValue()
                vm.$el.children[0].value = vm.time
                vm.setSelectArea(vm.$el.children[0], start)
                
                // 配合 v-model
                this.$emit('change', vm.time)
            }, 500)
            if (timer !== null) timer = null
        },
        left: function () {
            let start = this.setSelectAreaStart(event.target, 'left')
            this.setSelectArea(event.target, start)
        },
        right: function () {
            let start = this.setSelectAreaStart(event.target, 'right')
            this.setSelectArea(event.target, start)
        }
    }
}
</script>
