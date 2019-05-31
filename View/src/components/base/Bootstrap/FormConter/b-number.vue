<template>
    <div class="form-control" :class="objClass">
        <div class="row" style="margin-top: -7px">
            <b-button v-if="!readonly" class="col-auto" style="margin-right: -15px" :disabled="subbuttomdisabled" @click="subn" outline value="-" />
            <b-text 
                class="col border-0" 
                :border='Boolean(false)'
                text-align="center" 
                type="number" 
                :min="min" 
                :max="max" 
                :step="step" 
                v-model.number="number"
                :disabled="readonly" 
                v-on="inputListeners"
                @click="click($event)" 
                @change="change" 
                @blur="blur($event)"></b-text>
            <b-button v-if="!readonly" class="col-auto" style="margin-left: -15px" :disabled="addbuttondisabled" @click="add" outline value="+" />
        </div>
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
        event: 'change',
    },
    data () {
        return {
            number: 0,
        }
    },
    props: {
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 100,
        },
        step: {
            type: Number,
            default: 1,
        },
        precision: {
            type: Number,
            default: function () {
                return this.getStepPrecision
            },
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return /^[1-9]\d*$/.test(value) && value >= 0
            },
        },
        value: {
            type: [Number, String],
            default: function (value) {
                return value ? value : this.min
            },
        },
    },
    computed: {
        subbuttomdisabled: function () {
            return this.number <= this.min || this.readonly
        },
        addbuttondisabled: function () {
            return this.number >= this.max || this.readonly
        },
        getStepPrecision: function () {
            let str =  this.step.toString().split('.')
            return str.length !== 2 ? 0 : str[1].length
        },
        getPrecision: function () {
            if (this.getStepPrecision > this.precision) {
                console.warn('[Error] [b-number] precision can`t less than step`s precision, Used step`s precision')
                return this.getStepPrecision
            } else {
                return this.precision
            }
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
                    change: function () {
                        vm.$emit('change', vm.number)
                    }
                }
            )
        },
    },
    mounted () {
        this.number = this.formatNumber(this.value)
    },
    methods: {
        formatNumber: function (value) {
            return Number.parseFloat(value).toFixed(this.getPrecision)
        },
        click: function (event) {
            if (this.number == 0) event.target.value = ''
        },
        change: function () {
            if (this.number < this.min) this.number = this.min
            if (this.number > this.max) this.number = this.max
            this.number = this.formatNumber(this.number)
            // 这里确保组件配合 `v-model` 的工作
            this.$emit('change', this.number)
        },
        blur: function () {
            if (!event.target.value) event.target.value = this.formatNumber(this.min)
        },
        subn: function () {
            this.number = Number(this.number)
            this.number -= this.step
            this.change()
        },
        add: function () {
            this.number = Number(this.number)
            this.number += this.step
            this.change()
        },
    },
}
</script>
