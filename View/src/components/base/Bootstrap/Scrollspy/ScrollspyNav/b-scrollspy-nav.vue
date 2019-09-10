<template>
    <b-nav 
        class="overflow-auto" 
        tabs 
        :column="column" >
        <b-nav-item
            v-for="(item, index) in list" 
            :key="index" 
            :href="item.href" 
            :text="item.text" >
            <b-scrollspy-nav 
                v-if="item.children"
                class="overflow-auto" 
                tabs 
                :column="column" 
                :list="item.children" />
        </b-nav-item>
    </b-nav>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import BNav from '@/components/base/Bootstrap/Navigation/Nav/b-nav.vue'
import BNavItem from '@/components/base/Bootstrap/Navigation/Nav/b-nav-item.vue'

export default {
    name: 'b-scrollspy-nav',
    components: { BScrollspyNav: () => import('./b-scrollspy-nav'), BNav, BNavItem, },
    props: {
        column: Boolean,
        list: utilities.props.list,
    },
}
</script>