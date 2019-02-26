<template>
  <nav id="nav">
    <ul class="nav flex-column">
      <li class="nav-item">
        <router-link class="nav-link" to="/">{{ $t("nav.Home") }}</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/about">{{ $t("nav.About") }}</router-link>
      </li>
    </ul>
  </nav>
</template>