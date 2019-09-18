<template>
​   <picture>
        <source v-for="(img, index) in img-list" :key="index" :srcset="img.src" :media="img.media" :type="img.type">
        <img :src="imgSrc" class="img-fluid img-thumbnail" :alt="alt">
    </picture>
</template>
<script>
export default {
    name: 'base-image',
    props: {
        src: {
            type: String,
        },
        alt: {
            type: String,
        },
        imgList: {
            type: Array,
        },
    },
    computed: {
        imgSrc: function () {
            if (this.src) return this.src
            const src = this.imgList[this.imgList.length].src
            return src ? src : ''
        },
    },
}
</script>
