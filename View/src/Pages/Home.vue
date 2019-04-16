<template>
  <div class="h-100 d-block">
    <c style="width: 80%; height: 80%" :items="items" control indicators fade></c>
  </div>
</template>

<script>
// @ is an alias to /src
import c from '@/components/base/Bootstrap/Carousel/b-carousel.vue'

export default {
  name: 'HomePage',
  components: {
    c
  },
  data () {
    return {
      items: [
        
      ],
    }
  },
  methods: {
      click: function (str) {
        alert(str)
      }
  }
}

</script>


