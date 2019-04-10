<template>
  <div class="h-100 d-block">
    <bd :type="'submit'" :active="true" :variant="'dark'" @submit="click('submit')"></bd>
    <bd :type="'button'" @click="click('reset')"></bd>
  </div>
</template>

<script>
// @ is an alias to /src
import bd from '@/components/base/Bootstrap/Button/b-button.vue'
export default {
  name: 'HomePage',
  components: {
    bd
  },
  data () {
    return {
      content: [
        {path: 'a', name: 'a'},
        {path: 'b', name: 'b', isActive: true}
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


