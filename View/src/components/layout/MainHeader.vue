<template>
  <header id="header">
    <div class="col shadow-sm navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand d-inline-block text-truncate" href="#">
        <img src="@/assets/logo.png" width="30" height="30" alt="logo" />
        {{ $t('systemName') }}
         <small class="text-muted">(bate 0.1)</small>
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
              <lang-select></lang-select>
          </li>
          <li class="nav-item navbar-text">
            <Screenfull></Screenfull>
          </li>
        </ul>
        <ul class="navbar-nav my-2 my-lg-0">
            <li class="nav-item dropdown">
              <user-card></user-card>
          </li> 
        </ul>
      </div>
    </div>
    <div id="nav-tab" class="bg-dark d-flex w-100">
      <DropdownMenu></DropdownMenu>
      <router-link class="btn btn-dark d-inline-flex" to="/" role="button">
        <i class="fas fa-home align-self-center"></i>
        <font class="align-self-center"> home </font>
      </router-link>
      <NavTabs class="d-inline-flex overflow-auto"></NavTabs>
    </div>
  </header>
</template>

<script>
import LangSelect from "@/components/base/LangSelect/index.vue";
import Screenfull from "@/components/base/Screenfull/index.vue";
import UserCard from '@/components/user/UserCard/index.vue';
import DropdownMenu from '@/components/system/DropdownMenu/index.vue';
import NavTabs from '@/components/system/NavTabs/index.vue'

export default {
  components: {
    LangSelect,
    Screenfull,
    UserCard,
    DropdownMenu,
    NavTabs,
  },
};
</script>