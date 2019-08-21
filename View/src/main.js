// vue
import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import store from '@/store'
import '@/components/utilities/directives.js'
// 资源文件
import '@/assets/icon/fontawesome/css/all.css'
// 第三方库
import i18n from '@/lang/index.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created() {
    // ========================================
    // 解决 github / gitlab 页面的 vue.js history 模式，单页应用刷新页面 返回 404 的问题
    // https://stackoverflow.com/questions/47677220/vuejs-history-mode-with-github-gitlab-pages
    // Credits:
    // - https://stackoverflow.com/a/50259501
    // - https://stackoverflow.com/a/50247140
    // ========================================
    if (sessionStorage.redirect) {
      const redirect = sessionStorage.redirect
      delete sessionStorage.redirect
      this.$router.push(redirect)
    }
  }
}).$mount('#app')
