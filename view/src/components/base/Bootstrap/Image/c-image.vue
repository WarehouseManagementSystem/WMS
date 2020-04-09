<template>
    <picture>
        <source v-for="(img, index) in imgList" :key="index" :srcset="img.src || img.srcset" :sizes="img.sizes" :media="!img.sizes ? img.media : ''" :type="img.type">
        <img ref="img" class="img-fluid img-thumbnail p-0" v-lazy="lazyLoad" :src="imgSrc" :alt="alt" :style="objStyle">
    </picture>
</template>

<script>
/*
  图片 API
  https://www.cnblogs.com/lgqrlchinese/p/11386857.html
*/
export default {
  name: 'c-image',
  data() {
    return {
      imgList: [],
      imgSrc: null,
    }
  },
  props: {
    src: String,
    alt: String,
    list: Array,
  },
  computed: {
    backgroundcolor: function () {
      let r = this.random(255)
      let g = this.random(255)
      let b = this.random(255)
      let a = 1
      return `background-color: rgba(${r}, ${g}, ${b}, ${a})`
    },
    objStyle: function () {
      return this.backgroundcolor
    },
  },
  mounted () {
  },
  methods: {
    random: function (max) {
      return Math.floor(Math.random() * Math.floor(max))
    },
    lazyLoad: function () {
      this.imgList = this.list
      this.imgSrc = this.src
    }
  },
}
</script>
