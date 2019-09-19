<template>
    <ul class="list-unstyled">
        <template v-for="(item, index) in list" >
            <b-media-item 
                :key="index" 
                class="mb-2" 
                :title="item.title" 
                :href="item.href" 
                :icon="item.icon" 
                :content="item.content" >
                <template v-if="item.children && item.children.length && item.children.length > 0">
                    <br />
                     <a class="stretched-link" @click="show = !show">
                         <font>{{show ? 'Hide' : 'Show More'}}</font>
                    </a>
                    <b-media v-if="show" :list="item.children" />
                    <hr v-if="show" />
                </template>
            </b-media-item>
        </template>
    </ul>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import BMediaItem from './b-media-item'

export default {
    name: 'b-media',
    components: { BMediaItem, BMedia: () => import('./b-media')},
    data () {
        return {
            show: false,
        }
    },
    props: {
        list: utilities.props.list,
    },
}
</script>