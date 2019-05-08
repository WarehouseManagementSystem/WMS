<template>
  <div class="h-100 d-block">
    <form class="needs-validation">
      <div class="my-1">
        <b-text type="text" @invalid="change"></b-text>
        <b-text type="email" required></b-text>
        <b-text type="tel" ></b-text>
        <b-text type="phone" minlength="5"></b-text>
        <b-text type="url" required></b-text>
      </div>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

import BText from '@/components/base/Bootstrap/FormConter/b-text.vue'

export default {
  name: 'HomePage',
  components: {
    BText,
  },
  data () {
    return {
      
    }
  },
  methods: {
    change: function($event, type) {
      console.log( event)
      console.log('type:' + type)
    }
  }
}

</script>


