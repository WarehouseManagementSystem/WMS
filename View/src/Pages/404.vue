<template>
  <div class="404">
    <h1>404 not find</h1>
    <strong>Sorry, something went wrong.</strong>
    <pre></pre>
    <p>
      <button type="button" class="btn btn-link" @click="goBack">
         <i class="fas fa-long-arrow-alt-left"></i>
        <font> 返回上一页 </font>
      </button>
    </p>
    <p>
      <router-link to="/" class="btn btn-link" role="button">
        <i class="fas fa-home"></i>
        <font> 返回主页 </font>
      </router-link>
    </p>
  </div>
</template>

<script>
export default {
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}
</script>
