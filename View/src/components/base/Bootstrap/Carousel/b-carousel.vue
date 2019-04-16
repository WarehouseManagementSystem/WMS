<template v-if="items && items.length > 0" >
    <div id="carouselCaptions" class="carousel slide" :class="{'carousel-fade': fade}" data-ride="carousel">
        <ol v-if="indicators" class="carousel-indicators">
            <li 
                v-for="(item, index) in items" 
                :key="index" 
                :data-slide-to="index" 
                :class="{active: activeIndex == index}" 
                data-target="#carouselCaptions" 
                @click="activeIndex = index"></li>
        </ol>
        <div class="carousel-inner">
            <item 
                v-for="(item, index) in items" 
                :key="index" :item="item" 
                :data-interval="interval" 
                :class="{active: activeIndex == index}"></item>
        </div>
        <template v-if="control">
            <a class="carousel-control-prev" href="#carouselCaptions" role="button" data-slide="prev" 
                @click="activeIndex < items.length - 1 ? activeIndex++ : 0">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <sr-message>Previous</sr-message>
            </a>
            <a class="carousel-control-next" href="#carouselCaptions" role="button" data-slide="next" 
                @click="activeIndex > 0 ? activeIndex-- : items.length - 1">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <sr-message>Next</sr-message>
            </a>
        </template>
    </div>
</template>
<script>
import item from './b-carousel-item'
import SrMessage from '@/components/base/Bootstrap/SrOney/b-sr-only.vue'

export default {
    name: 'b-carousel',
    components: {
        item,
        SrMessage,
    },
    data () {
        return {
            activeIndex: 0,
        }
    },
    props: {
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
        items: {
            type: Array,
        },
    },
}
</script>
