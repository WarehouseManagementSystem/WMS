<template>
  <header id="header" class="d-print-none shadow-sm">
    <div class="col shadow-sm navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand d-inline-block text-truncate" href="#">
        <img src="@/assets/logo.png" width="30" height="30" alt="logo" />
        {{ $t('systemName') }}
        <small class="navbar-text">(bate 0.1)</small>
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item navbar-text dropdown">
          </li>
        </ul>
        <ul class="navbar-nav my-lg-0">
          <li class="nav-item dropdown navbar-text px-1">
              <lang-select class="nav-link"></lang-select>
          </li>
          <li class="nav-item dropdown navbar-text px-1">
              <theme-select class="nav-link"></theme-select>
          </li>
          <li class="nav-item dropdown navbar-text px-1">
              <user-card class="nav-link"></user-card>
          </li>
          <li class="nav-item px-1">
            <a href="https://github.com/WarehouseManagementSystem/WMS" class="nav-link fab fa-github" target="_bank" />
          </li>
          <li class="nav-item px-1">
            <screenfull class="nav-link"></screenfull>
          </li>
        </ul>
      </div>
    </div>
    <div id="nav-tab" class="bg-primary d-flex w-100">
        <dropdown-menu></dropdown-menu>
        <router-link class="btn btn-primary d-inline-flex" to="/" role="button">
          <i class="fas fa-home align-self-center px-1"></i>
          <font class="align-self-center px-1">home</font>
        </router-link>
      <nav-tabs class="d-inline-flex overflow-auto"></nav-tabs>
    </div>
  </header>
</template>

<script>
import LangSelect from "@/components/system/LangSelect/lang-select.vue"
import ThemeSelect from '@/components/system/ThemeSelect/theme-select.vue'
import Screenfull from "@/components/system/Screenfull/screenfull.vue"
import UserCard from '@/components/system/User/user-card.vue'
import DropdownMenu from '@/components/system/DropdownMenu/dropdown-menu.vue'
import NavTabs from '@/components/system/NavTabs/nav-tabs.vue'

export default {
  components: {
    LangSelect,
    ThemeSelect,
    Screenfull,
    UserCard,
    DropdownMenu,
    NavTabs,
  },
};
</script>