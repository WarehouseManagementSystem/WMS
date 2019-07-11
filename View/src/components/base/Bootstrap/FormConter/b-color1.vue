<template>
    <b-drop-picker :style="style" placeholder="请选择" :value="value" :text-color="textColor">
        <div class="row text-center px-1 mx-1 my-2">
            <b-number class="col" size="sm" :min='rgbmin' :max='rgbmax' v-model.number='color.r' hideButton></b-number>
            <b-number class="col" size="sm" :min='rgbmin' :max='rgbmax' v-model.number='color.g' hideButton></b-number>
            <b-number class="col" size="sm" :min='rgbmin' :max='rgbmax' v-model.number='color.b' hideButton></b-number>
            <b-number class="col" size="sm" :min='amin' :max='amax' :step='astep' v-model.number='color.a' hideButton></b-number>
        </div>
        <b-range :min='rgbmin' :max='rgbmax' v-model='color.r'></b-range>
        <b-range :min='rgbmin' :max='rgbmax' v-model='color.g'></b-range>
        <b-range :min='rgbmin' :max='rgbmax' v-model='color.b'></b-range>
        <b-range :min='amin' :max='amax' max-value="1" :step='astep' v-model='color.a'></b-range>
    </b-drop-picker>
</template>

<script>
import BNumber from '@/components/base/Bootstrap/FormConter/b-number.vue'
import BRange from '@/components/base/Bootstrap/FormConter/b-range.vue'
import BDropPicker from '@/components/base/Bootstrap/DropDownPicker/b-dropdownpicker.vue'

export default {
    name: 'b-color',
    components: { BNumber, BRange, BDropPicker, },
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
    computed: {
        style: function () {
            return {
                background: this.value
            }
        },
        textColor: function () {
            return (this.color.r < 200 || (this.color.g < 200 && this.color.b < 200)) ? 'white' : 'dark'
        },
        value: function () {
            return `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`
        },
    }
}
</script>
