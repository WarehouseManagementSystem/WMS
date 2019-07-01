<template>
    <number class="col" :min="min" :max="max" :step="step" hide-button v-model="number"></number>
</template>

<script>
import number from '@/components/base/Bootstrap/FormConter/b-number.vue'
export default {
    name: 'time-base',
    components: { number, },
    model: {
        prop: 'value',
        event: 'change',
    },
    data () {
        return {
            number: this.value,
        }
    },
    props: {
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 59,
        },
        step: {
            type: Number,
            default: 1,
            validator: function (val) {
                return val > 0 && val < 60 && /^[1-9]\d*$/.test(val)
            },
        },
        value: [Number, String],
    },
    watch: {
        number: function (val) {
            this.$emit('change', val)
        },
    }
}
</script>