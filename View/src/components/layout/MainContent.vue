<template>
  <main id="content" class="position-absolute" style="top: 100px; right: 0px; bottom: 56px; left: 0px;">
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <transition name="component-fade" mode="out-in">
      <div class="border rounded px-1 py-1 m-1">
        <router-view></router-view>
      </div>
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