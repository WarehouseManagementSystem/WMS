<template>
    <div>
        <div v-for="(item, index) in list" :key="index">
            <b-dropdown-header v-if="item.header" :text="item.header"></b-dropdown-header>
            <b-dropdown-divider v-else-if="item.divider" ></b-dropdown-divider>
            <b-dropdown-item-text v-else-if="item.text" :text="item.text"></b-dropdown-item-text>
            <b-dropdown-item 
                v-else-if="item.value" 
                :text="item.value" 
                :href="item.href" 
                :active="select ? select == item.value : item.active" 
                :disabled="disabled || item.disabled" 
                @click.native="$emit('click', $event)" />
        </div>
    </div>
    
</template>

<script>
import utilities from '@/components/utilities/index.js'

import BDropdownHeader from './b-dropdown-header.vue'
import BDropdownItem from './b-dropdown-item.vue'
import BDropdownItemText from './b-dropdown-item-text.vue'
import BDropdownDivider from './b-dropdown-divider.vue'

export default {
    name: 'b-dropdown-menu',
    components: { BDropdownHeader, BDropdownItem, BDropdownItemText, BDropdownDivider },
    props: {
        list: utilities.props.list,
        select: utilities.props.value,
        disabled: utilities.props.disabled,
    },
}
</script>