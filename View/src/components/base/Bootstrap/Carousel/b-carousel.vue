<template v-if="content && content.length > 0" >
    <div :id="guid" class="carousel slide" :class="{'carousel-fade': fade}" data-ride="carousel">
        <ol v-if="indicators" class="carousel-indicators">
            <li 
                v-for="(item, index) in content" 
                :key="index" 
                :data-slide-to="index" 
                :class="{active: activeIndex == index}" 
                :data-target="'#' + guid" 
                @click="activeIndex = index"></li>
        </ol>
        <div class="carousel-inner">
            <item 
                v-for="(item, index) in content" 
                :key="index" :item="item" 
                :data-interval="interval" 
                :class="{active: activeIndex == index}"></item>
        </div>
        <template v-if="control">
            <a class="carousel-control-prev" :href="'#' + guid" role="button" data-slide="prev" 
                @click="activeIndex < content.length - 1 ? activeIndex++ : 0">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <sr-message>Previous</sr-message>
            </a>
            <a class="carousel-control-next" :href="'#' + guid" role="button" data-slide="next" 
                @click="activeIndex > 0 ? activeIndex-- : content.length - 1">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <sr-message>Next</sr-message>
            </a>
        </template>
    </div>
</template>
<script>

import item from './b-carousel-item'
import srMessage from '@/components/base/Bootstrap/SrOney/b-sr-only.vue'
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-carousel',
    components: {
        item,
        srMessage,
    },
    data () {
        return {
            activeIndex: 0,
        }
    },
    props: {
        content: utilities.props.content,
        indicators: {
            type: Boolean,
            default: false,
        },
        control: {
            type: Boolean,
            default: false,
        },
        fade: {
            type: Boolean,
            default: false,
        },
        interval: {
            type: Number,
        },
    },
    computed: {
        guid: function () {
            return 'carouselCaptions-'+ util.random.getRandomString()
        },
    },
}
</script>
