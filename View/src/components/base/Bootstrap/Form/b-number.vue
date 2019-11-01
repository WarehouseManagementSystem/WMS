<template>
    <div class="row" @keyup.up="add" @keyup.down="subn">
        <b-button v-if="!readonly && !hideButton" :size="size" class="col-auto" :style="btnstyle" :disabled="subbuttomdisabled" @click="subn" outline value="-" />
        <b-text 
            class="col h-100 px-0" 
            text-align="center" 
            ref="textBox"
            :min="dateMin" 
            :max="dateMax" 
            :step="dateStep" 
            :size="size" 
            :length="length" 
            :info="message" 
            v-model.number="number" 
            :disabled="disabled" 
            :readonly="readonly" 
            v-on="inputListeners"
            v-bind="$attrs" 
            unvalid 
            @click="click($event)" 
            @input="input" 
            @blur="blur($event)" />
        <b-button v-if="!readonly && !hideButton" :size="size" class="col-auto" :style="btnstyle" :disabled="addbuttondisabled" @click="add" outline value="+" />
    </div>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import BButton from '@/components/base/Bootstrap/Button/b-button.vue'
import BText from './b-text'
export default {
    name: 'b-number',
    inheritAttrs: false,
    mixins: [ utilities.mixins.form.base, utilities.mixins.form.readonly, ],
    components: { BButton, BText },
    model: {
        prop: 'value',
        event: 'input',
    },
    data () {
        return {
            number: 0,
            setPrecision: 0,
            btnstyle: {},
            message: '',
        }
    },
    props: {
        min: {
            type: [String, Number],
            default: 0,
            validator: value => !isNaN(value),
        },
        max: {
            type: [String, Number],
            default: 100,
            validator: value => !isNaN(value),
        },
        step: {
            type: [String, Number],
            default: 1,
            validator: value => !isNaN(value),
        },
        value: {
            type: [String, Number],
            default: function (value) { return !isNaN(value) ? Number(value) : Number(this.min) },
            validator: value => !isNaN(value),
        },
        size: utilities.props.size,
        length: [String, Number],
        hideButton: Boolean,
        prompt: Boolean,
        info: String,
    },
    computed: {
        dateStep: function () {
            return this.toNmuber(this.step)
        },
        dateMin: function () {
            return this.toNmuber(this.min)
        },
        dateMax: function () {
            return this.toNmuber(this.max, 100)
        },
        subbuttomdisabled: function () {
            return this.number <= this.dateMin || this.disabled
        },
        addbuttondisabled: function () {
            return this.number >= this.dateMax || this.disabled
        },
        inputListeners: function () {
            var vm = this
            // `Object.assign` 将所有的对象合并为一个新对象
            return Object.assign({},
                // 我们从父级添加所有的监听器
                this.$listeners,
                // 然后我们添加自定义监听器，
                // 或覆写一些监听器的行为
                {
                    // 这里确保组件配合 `v-model` 的工作
                    input: function () {
                        vm.$emit('input', !isNaN(vm.number) ? vm.number : vm.dateMin)
                    }
                }
            )
        },
    },
    mounted () {
        this.getPrecision()
        this.innitNumber()
        this.initInfo()
        this.initButtonHeight()
    },
    methods: {
        initButtonHeight: function () {
            this.$nextTick(function () {
                // 通过 text 的高度确定 button 的高度
                if (this.readonly || this.hideButton) return
                    this.btnstyle = {
                    height: this.$refs.textBox.$refs.text.offsetHeight + 'px'
                }
            })
            
        },
        innitNumber: function () {
            this.number = this.formatNumber(this.toNmuber(this.value, this.dateMin))
        },
        initInfo: function () {
            this.message = this.info || ''
            if (this.prompt) {
                let str = `${this.formatNumber(this.min)}-${this.formatNumber(this.max)},精度: ${this.formatNumber(this.step)}`
                this.message += this.info ? `(${str})` : str
            }
        },
        toNmuber: function (str, n = 0) {
            return Number(str) || n
        },
        getNumberPrecision: function (number) {
            let str =  number.toString().split('.')
            return str.length !== 2 ? 0 : str[1].length
        },
        getPrecision: function () {
            // 返回精度最高的
            this.setPrecision = Math.max(this.getNumberPrecision(this.dateStep), this.getNumberPrecision(this.toNmuber(this.value)))
        },
        formatNumber: function (value) {
            return Number.parseFloat(value).toFixed(this.setPrecision)
        },
        click: function (event) {
            if (this.readonly || this.disabled) return
            if (this.number == 0) event.target.value = ''
        },
        input: function () {
            if (this.number < this.dateMin) this.number = this.dateMin
            if (this.number > this.dateMax) this.number = this.dateMax
            this.number = this.formatNumber(this.number)
            // 配合 v-model
            this.$emit('input', this.number)
        },
        blur: function () {
            if (!event.target.value) event.target.value = this.formatNumber(this.dateMin)
        },
        subn: function () {
            if (this.disabled || this.readonly) return
            this.number = Number(this.number)
            this.number -= this.dateStep
            this.input()
        },
        add: function () {
            if (this.disabled || this.readonly) return
            this.number = Number(this.number)
            this.number += this.dateStep
            this.input()
        },
    },
    watch: {
        value: function (value) {
            this.number = this.toNmuber(value)
        }
    }
}
</script>