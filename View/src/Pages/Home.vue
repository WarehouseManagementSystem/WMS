<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!-- <tree></tree> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
// import tree from '@/components/base/Tree/index.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    // tree,
  }
}

</script>


