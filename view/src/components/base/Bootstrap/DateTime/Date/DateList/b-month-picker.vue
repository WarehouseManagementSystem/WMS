<template>
    <b-date-picker type="month" :status="Number(1)" :min="min" :max="max" :placeholder="placeholder" :disabled="disabled" v-model="selectValue" />
</template>

<script>
import utilities from '@/components/utilities/index.js'

import BDatePicker from '@/components/base/Bootstrap/DateTime/Date/DatePicker/b-date-picker.vue'

export default {
    name: 'b-year-picker',
    components: { BDatePicker, },
    model: {
        prop: 'value',
        event: 'change'
    },
    data () {
        return {
            selectValue: this.value
        }
    },
    props: {
        value: utilities.props.value,
        min: String,
        max: String,
        placeholder: utilities.props.value,
        disabled: utilities.props.disabled,
    },
    watch: {
        selectValue: function (val) {
            // 配合 v-model 工作
            this.$emit('change', val)
        },
    },
}
</script>