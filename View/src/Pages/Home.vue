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
        {src: 'https://images.pexels.com/photos/1388069/pexels-photo-1388069.jpeg?cs=srgb&dl=architecture-big-apple-buildings-1388069.jpg&fm=jpg', title: 'a'},
        {src: 'https://images.pexels.com/photos/1236720/pexels-photo-1236720.jpeg?cs=srgb&dl=4k-wallpaper-action-asphalt-1236720.jpg&fm=jpg', title: 'b', isActive: true}
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


