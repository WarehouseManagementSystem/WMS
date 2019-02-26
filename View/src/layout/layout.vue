<template>
  <div id="layout">
    <main-header></main-header>
    <main-content></main-content>
    <main-footer></main-footer>
  </div>
</template>

<script>
import MainHeader from "@/components/layout/MainHeader.vue";
import MainContent from "@/components/layout/MainContent.vue";
import MainFooter from "@/components/layout/MainFooter.vue";

export default {
  components: {
    MainHeader,
    MainContent,
    MainFooter
  }
};
</script>
