<template>
    <div class="progress-bar" :class="obbjClass" role="progressbar" :style="`width: ${value}%`" :aria-valuenow="value" :aria-valuemin="min" :aria-valuemax="max">{{ showValue ? `${value}%` : '' }}</div>
</template>

<script>
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-progress-bar',
    props: {
        value: {
            type: [Number, String],
            default: 0,
            validator: function (val) {
                return !isNaN(val) && val >= 0 && val <= 100
            }
        },
        min: {
            type: [Number, String],
            default: 0,
            validator: function (val) {
                return !isNaN(val) && val >= 0 && val <= 100
            }
        },
        max: {
            type: [Number, String],
            default: 100,
            validator: function (val) {
                return !isNaN(val) && val >= 0 && val <= 100
            }
        },
        color: utilities.props.color,
        showValue: Boolean,
        striped: Boolean,
        animated: Boolean,
    },
    computed: {
        obbjClass: function () {
            let c = `bg-${this.color}`
            if (this.striped) c += ' progress-bar-striped '
            if (this.animated) c += ' progress-bar-animated '
            
            return c
        },
    }
}
</script>