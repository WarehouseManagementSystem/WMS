<template>
    <span class="row text-center ">
        <item class="text-center " v-for="(item, index) in items" :key="index" :value="item.value" :text="item.text" :select="item.select" :disabled="item.disabled || disabled" :colCount="colCount" @click="click"></item>
    </span>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import item from './b-dropdownpicker-item'

export default {
    name: 'b-dropdownpicker-row',
    components: { item, },
    props: {
        items: utilities.props.list,
        disabled: utilities.props.disabled,
        colCount: Number,
    },
    methods: {
        click: function (value) {
            this.$emit('click', value)
        }
    },
}
</script>
