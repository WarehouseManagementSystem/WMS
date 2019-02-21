<template>
  <div id="header" class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark d-print">
    <a class="navbar-brand" href="#">
      <img src="./../../assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="logo">
      {{ $t('systemName') }}
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item navbar-text dropdown">
        </li>
      </ul>
      <ul class="navbar-nav my-2 my-lg-0">
        <li class="nav-item dropdown">
          <lang-select data-toggle="tooltip" data-placement="bottom" title='selectLanguage'></lang-select>
        </li>
        <li class="navbar-text nav-item">
          <Screenfull data-toggle="tooltip" data-placement="bottom" title='screenfull'></Screenfull>
        </li>
        <!-- <li class="navbar-text nav-item">
          <strong>{{ new Date() }}</strong>
        </li>  -->
      </ul>


    </div>
  </div>
</template>

<script>
import LangSelect from "@/components/base/LangSelect/index.vue";
import Screenfull from "@/components/base/Screenfull/index.vue";

export default {
  components: {
    LangSelect,
    Screenfull,
  },
  data () {
    return {
      selectLanguage: this.$t('tips.selectLanguage'),
      screenfull: this.$t('tips.screenfull'),
    }
  }
};
</script>