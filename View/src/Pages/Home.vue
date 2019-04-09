<template>
  <div class="h-100 d-block">
    <bd :content="content"></bd>
  </div>
</template>

<script>
// @ is an alias to /src
import bd from '@/components/base/Bootstrap/Breadcrumb/b-breadcrumb.vue'
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
      
  }
}

</script>


