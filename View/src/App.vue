<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">{{ $t("nav.Home") }}</router-link> |
      <router-link to="/about">{{ $t("nav.About") }}</router-link>
      <lang></lang>
    </div>
    <router-view/>
  </div>
</template>

<script>
import lang from '@/components/base/lang.vue'

export default {
  components: {
		lang,
	},
}
</script>


<style lang="scss">

/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
} */
</style>