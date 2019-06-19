<template>
    <base-button class="rounded-pill text-monospace bg-white my-1" :class="objClass" :disabled="disabled" @click="$emit('click', value)" :value="value">{{ text }}</base-button>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import BaseButton from '@/components/base/Bootstrap/Button/b-button.vue'

export default {
    name: 'b-dropdownpicker-item',
    components: { BaseButton },
    props: {
        value: utilities.props.value,
        text: utilities.props.value,
        select: utilities.props.active,
        disabled: utilities.props.disabled,
        colCount: {
            type: Number,
        },
    },
    computed: {
        objClass: function () {
            const s = this.select ? 'border border-primary text-primary' : 'border-0 text-body'
            const c = 12 % this.colCount == 0 ? `col-${12 / this.colCount}` : 'col-auto'
            return s + ' ' + c
        },
    },
}
</script>

<style>

</style>
