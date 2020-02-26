// vue
import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import store from '@/store'
// 资源文件
// bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// 字体图标
import '@fortawesome/fontawesome-free/css/all.min.css'
// vue directives
import '@/components/utilities/directives.js'
// 第三方库
import i18n from '@/lang/index.js'
/********************/
// Plugin
import theme from '@/Plugin/themes'
// use Plugins
Vue.use(theme)

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
    // 如果存在 theme 即用户修改过主题，则在加载时调用
    if (localStorage.theme) this.$theme.setTheme()
  }
}).$mount('#app')
