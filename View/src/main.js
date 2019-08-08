// http
import '@/http'
// vue
import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import store from '@/store'
// 第三方库
import i18n from '@/lang/index.js'
// 资源文件
import '@/assets/icon/fontawesome/css/all.css'
import '@/util/index'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created() {
    // 解决 github / gitlab 页面的 vue.js history 模式，
    // 单页应用刷新页面 返回 404 的问题
    if (sessionStorage.redirect) {
      const redirect = sessionStorage.redirect
      delete sessionStorage.redirect
      this.$router.push(redirect)
    }
  }
}).$mount('#app')
