<template>
  <div id="app" class="mx-auto min-vw-100">
    <template v-if="show">
      <!-- Load Plugin Page -->
      <router-view></router-view>
    </template>
    <template v-else>
      <main-header></main-header>
      <main-content></main-content>
      <main-footer></main-footer>
    </template>
  </div>
</template>

<script>
// 资源文件
// bootstrap
import 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// 字体图标
import '@fortawesome/fontawesome-free/css/all.min.css'

import MainHeader from "@/components/layout/MainHeader.vue";
import MainContent from "@/components/layout/MainContent.vue";
import MainFooter from "@/components/layout/MainFooter.vue";

export default {
  components: {
    MainHeader,
    MainContent,
    MainFooter
  },
  computed: {
    show: function () {
      return this.$route.fullPath.includes('/Plugin-')
    },
  },
};
</script>
