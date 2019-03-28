<template>
  <main id="content" class="rounded border p-1 m-1" style="position: absolute; top: 100px; right: 0px; bottom: 56px; left: 0px;">
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </main>
</template>

<style>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>