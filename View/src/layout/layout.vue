<template>
  <div id="layout">
    <main-header></main-header>
    <main-nav></main-nav>
    <mainc-content></mainc-content>
    <main-footer></main-footer>
  </div>
</template>

<script>
import MainHeader from "@/components/base/layout/MainHeader.vue";
import MainNav from "@/components/base/layout/MainNav.vue";
import MaincContent from "@/components/base/layout/MainContent.vue";
import MainFooter from "@/components/base/layout/MainFooter.vue";

export default {
  components: {
    MainHeader,
    MainNav,
    MaincContent,
    MainFooter
  }
};
</script>
