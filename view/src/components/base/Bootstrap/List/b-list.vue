<template>
    <ul class="list-group" 
        :class="{'list-group-flush': flush, 'list-group-horizontal': inline, }">
        <slot v-if="$slots.default"></slot>
        <list-items 
            v-else 
            v-for="(item, index) in list" 
            :key="index" 
            :class="{'flex-fill': fill}"
            :text="item.text" 
            :href="item.href" 
            :srMessage="item.srMessage" 
            :color="item.color || color" 
            :disabled="disabled || item.disabled" 
            :active="select ? select == item.text : item.active" 
        />
    </ul>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import listItems from './b-list-item'

export default {
    name: 'b-list',
    components: { listItems, },
    props: {
        list: utilities.props.list,
        color: {
            ...utilities.props.color,
            default: 'white',
        },
        select: [String, Number,],
        disabled: utilities.props.disabled,
        flush: Boolean,
        inline: Boolean,
        fill: Boolean,
    },
}
</script>

