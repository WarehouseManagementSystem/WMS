<template>
    <div id="dropdownMenu" style="cursor: default;" class="border-0" @blur="show = false" tabindex="0" contenteditable :model="show">
        <a id="dropdownMenuButton" class="btn btn-dark d-inline-flex" style="cursor: default;" href="#" role="button" @click="show = !show">
            <i class="fas fa-bars align-self-center px-1"></i>
            <font class="align-self-center px-1">menu</font>
        </a>
        <transition name="fade">
            <dropdown-menu-tooltip id="dropdownMenuTooltip" v-show="show"></dropdown-menu-tooltip>
        </transition>
    </div>
</template>

<script>
import DropdownMenuTooltip from './Nav/nav.vue'

export default {
    name: 'dropdown-menu',
    data () {
        return {
            show: false,
        }
    },
    components: {
        DropdownMenuTooltip,
    },
}
</script>

<style lang="scss">

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>