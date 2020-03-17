<template>
  <main id="main-content">
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    
    <div class="rounded p-1 m-1">
      <transition name="component-fade" mode="out-in">
        <router-view style="min-height: 1000px"></router-view>
      </transition>
    </div>
   
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