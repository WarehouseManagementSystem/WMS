<template>
    <div class="accordion">
        <box-accordion 
            v-for="(item, index) in list" 
            :key="index" 
            :title="item.title" 
            :content="item.content" 
            :control="item.control" 
            :show="item.show" 
            :parent="parent" 
        />
    </div>
    
</template>

<script>
import utilities from '@/components/utilities/index.js'

import BoxAccordion from './box-accordion'

export default {
    name: 'box-accordion-list',
    components: { BoxAccordion },
    props: {
        list: utilities.props.list,
        parent: String,
    },
}
</script>