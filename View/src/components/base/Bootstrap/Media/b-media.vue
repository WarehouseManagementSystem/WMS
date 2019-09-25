<template>
    <ul class="list-unstyled">
        <template v-for="(item, index) in list" >
            <b-media-item 
                :key="index" 
                class="mb-2" 
                :item="item"  >
            </b-media-item>
        </template>
    </ul>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import BMediaItem from './b-media-item'

export default {
    name: 'b-media',
    components: { BMediaItem, },
    props: {
        list: utilities.props.list,
    },
}
</script>