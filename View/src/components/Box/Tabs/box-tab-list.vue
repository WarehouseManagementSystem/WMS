<template>
    <b-nav class="nav-tabs" role="tablist" :column="column" :pills="pills" :fill="fill" :justified="justified" >
        <slot>
            <b-nav-item 
                v-for="(item, index) in list" 
                :key="index" 
                role="tab" 
                :text="item.text" 
                :href="item.href" 
                :active="item.active"
                :disabled="item.disabled" 
                :aria-selected="item.active" 
                :data-toggle="pills ? 'pill' : 'tab'" 
                :aria-controls="item.href.split('#')[0] || null"  />
        </slot>
    </b-nav>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import BNav from '@/components/base/Bootstrap/Navigation/Nav/b-nav.vue'
import BNavItem from '@/components/base/Bootstrap/Navigation/Nav/b-nav-item.vue'

export default {
    name: 'box-tab-list',
    components: { BNav, BNavItem, },
    props: {
        list: utilities.props.list,
        column: Boolean,
        pills: Boolean,
        fill: Boolean,
        justified: Boolean,
    },
}
</script>