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
    <div class="nav navbar-dark nav-tabs bg-dark" id="nav-tab" role="tablist">
      <!-- <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-dark text-white rounded-0 overflow-hidden py-1 mb-1">
          <li class="breadcrumb-item"><a class="text-reset text-decoration-none" href="#">Home</a></li>
          <li class="breadcrumb-item" aria-current="page">Library</li>
        </ol>
      </nav> -->
        <DropdownMenu></DropdownMenu>
        <a class="btn btn-dark" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
          home
        </a>
        <a class="nav-item nav-link border-0 active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
          Home
          <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </a>
        <a class="nav-item nav-link border-0" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">
          Profile
           <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </a>
        <a class="nav-item nav-link border-0" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">
          Contact
           <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </a>
    </div>
  </header>
</template>

<script>
import LangSelect from "@/components/base/LangSelect/index.vue";
import Screenfull from "@/components/base/Screenfull/index.vue";
import UserCard from '@/components/user/UserCard/index.vue';
import DropdownMenu from '@/components/system/DropdownMenu/index.vue';

export default {
  components: {
    LangSelect,
    Screenfull,
    UserCard,
    DropdownMenu,
  },
  
};
</script>