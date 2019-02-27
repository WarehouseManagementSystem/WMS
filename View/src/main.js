import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import i18n from '@/lang/index.js'
import '@/assets/icon/fontawesome/css/all.css'
import '@/util/index'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
