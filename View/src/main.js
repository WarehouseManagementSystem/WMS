import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
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
  render: h => h(App)
}).$mount('#app')
