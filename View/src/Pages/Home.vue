<template>
  <div class="h-100 d-block">
    <form class="needs-validation">
      <div class="my-1">
        <b-text type="text" minlength="5">
          <template #invalid-info>
            error
          </template>
          <template #valid-info>
            success
          </template>
        </b-text>
        <b-text type="search"></b-text>
        <b-text type="password"></b-text>
        <b-text type="email" required></b-text>
        <b-text type="tel"></b-text>
        <b-text type="phone"></b-text>
        <b-text type="url" required></b-text>
        <b-textarea invalid-info="success"></b-textarea>
      </div>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

import BText from '@/components/base/Bootstrap/FormConter/b-text.vue'
import BTextarea from '@/components/base/Bootstrap/FormConter/b-textarea.vue'

export default {
  name: 'HomePage',
  components: {
    BText,
    BTextarea,
  },
  data () {
    return {
      
    }
  },
  methods: {
  }
}

</script>


