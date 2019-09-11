<template>
    <div class="w-100">
        <b-nav 
            pills 
            :column="column" 
            v-for="(item, index) in list" 
            :key="index">
            <b-nav-item 
                class="w-100" 
                :href="item.href" 
                :text="item.text" />
            <li 
                v-if="item.children && item.children.length && item.children.length > 0" 
                class="nav-item w-100">    
                <b-scrollspy-nav-item 
                    class="pl-2"
                    :list="item.children" />
            </li>
        </b-nav>
    </div>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import BNav from '@/components/base/Bootstrap/Navigation/Nav/b-nav.vue'
import BNavItem from '@/components/base/Bootstrap/Navigation/Nav/b-nav-item.vue'

export default {
    name: 'b-scrollspy-nav-item',
    components: { BScrollspyNavItem: () => import('./b-scrollspy-nav-item'), BNav, BNavItem, },
    props: {
        column: Boolean,
        list: utilities.props.list,
    },
}
</script>