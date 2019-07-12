<template>
    <b-drop-picker :style="style" placeholder="请选择" :value="showValue" :text-color="textColor">
        <div class="row text-center px-1 mx-1 my-2">
            <b-number ref="r" class="col" size="sm" :min='rgbmin' :max='rgbmax' v-model.number='color.r' hideButton :readonly="disabled"></b-number>
            <b-number ref="g" class="col" size="sm" :min='rgbmin' :max='rgbmax' v-model.number='color.g' hideButton :readonly="disabled"></b-number>
            <b-number ref="b" class="col" size="sm" :min='rgbmin' :max='rgbmax' v-model.number='color.b' hideButton :readonly="disabled"></b-number>
            <b-number ref="a" class="col" size="sm" :min='amin' :max='amax' :step='astep' v-model.number='color.a' hideButton :readonly="disabled"></b-number>
        </div>
        <b-range :min='rgbmin' :max='rgbmax' v-model='color.r' :disabled="disabled"></b-range>
        <b-range :min='rgbmin' :max='rgbmax' v-model='color.g' :disabled="disabled"></b-range>
        <b-range :min='rgbmin' :max='rgbmax' v-model='color.b' :disabled="disabled"></b-range>
        <b-range :min='amin' :max='amax' max-value="1" :step='astep' v-model='color.a' :disabled="disabled"></b-range>
    </b-drop-picker>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import BNumber from '@/components/base/Bootstrap/FormConter/b-number.vue'
import BRange from '@/components/base/Bootstrap/FormConter/b-range.vue'
import BDropPicker from '@/components/base/Bootstrap/DropDownPicker/b-dropdownpicker.vue'

export default {
    name: 'b-color',
    components: { BNumber, BRange, BDropPicker, },
    model: {
        prop: 'value',
        event: 'input',
    },
    data () {
        return {
            color: {
                r: 0,
                g: 0,
                b: 0,
                a: 1,
            },
            rgbmin: 0,
            rgbmax: 255,
            amin: 0,
            amax: 1,
            astep: 0.1,
        }
    },
    props: {
        value: Object,
        disabled: utilities.props.disabled,
    },
    computed: {
        style: function () {
            return {
                background: this.showValue
            }
        },
        textColor: function () {
            return (this.color.r < 200 || (this.color.g < 200 && this.color.b < 200)) ? 'white' : 'dark'
        },
        showValue: function () {
            return `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`
        },
    },
    mounted () {
        this.color.r = Number(this.value.r) || 0
        this.color.g = Number(this.value.g) || 0
        this.color.b = Number(this.value.b) || 0
        this.color.a = Number(this.value.a) || 1
    },
    watch: {
        color: {
            handler: function (value) {
                this.$emit('input', {r: value.r, g: value.g, b: value.b, a: value.a})
            },
            deep: true
        }
    }
}
</script>
