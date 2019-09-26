<template>
    <transition name="out-in-fade" mode="out-in">
        <slot></slot>
    </transition>
</template>

<script>
export default {
    name: 'tran-out-in',
}
</script>
<style>
.out-in-fade-enter-active, .out-in-fade-leave-active {
  transition: opacity .3s ease;
}
.out-in-fade-enter, .out-in-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>