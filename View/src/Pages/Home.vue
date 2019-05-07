<template>
  <div class="h-100 d-block">
    <form class="needs-validation" novalidate>
      <div class="my-1">
        <b-text type="text" placeholder="a" required></b-text>
        <b-text type="email" required></b-text>
        <b-text type="tel" required></b-text>
        <b-text type="phone" required></b-text>
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
  }
}

</script>


