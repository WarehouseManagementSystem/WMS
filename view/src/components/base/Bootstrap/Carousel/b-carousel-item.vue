<template>
    <div class="carousel-item">
        <img :src="imgSrc" class="d-block w-100" :alt="item.alt">
        <div v-if="item.title || item.context" class="carousel-caption d-none d-md-block">
          <h5>{{ item.title }}</h5>
          <p>{{ item.context }}</p>
        </div>
    </div>
</template>
<script>
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-carousel-item',
    props: {
        item: utilities.props.item,
    },
    computed: {
        imgSrc: function () {
            return this.item.src ? this.item.src : ''
        },
    },
}
</script>
