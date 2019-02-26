import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import i18n from '@/lang/index.js'
import jQuery from 'jquery'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@/custom.scss'

Vue.config.productionTip = false

jQuery(function () {
  jQuery('[data-toggle="popover"]').popover()
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
