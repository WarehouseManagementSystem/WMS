<template>
    <ul class="nav"
        :class="objClass">
        <slot v-if="$slots.default"></slot>
        <template v-else v-for="(item, index) in list">
            <nav-item-dropdown
                v-if="item.dropdown"
                :key="index" 
                :list="item.list" 
                :text="item.text" />
            <nav-item 
                v-else 
                :key="index" 
                :text="item.text" 
                :href="item.href" 
                :disabled="item.disabled" 
                :active="select ? select == item.text : item.active" />
        </template>
    </ul>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import NavItem from './b-nav-item'
import NavItemDropdown from './b-nav-item-dropdown'

export default {
    name: 'b-nav',
    components: { NavItem, NavItemDropdown, },
    props: {
        list: utilities.props.list,
        select: utilities.props.text,
        set: utilities.props.justify,
        column: Boolean,
        tabs: Boolean,
        pills: Boolean,
        fill: Boolean,
        justified: Boolean,
    },
    computed: {
        objClass: function () {
            let c = ''
            if (this.set) c += ` justify-content-${this.set} `
            if (this.column) c += ' flex-column '
            if (this.tabs) c += ' nav-tabs '
            if (this.pills) c += ' nav-pills '
            if (this.fill) c += ' nav-fill '
            if (this.justified) c += ' nav-justified '
            return c
        },
    }
}
</script>