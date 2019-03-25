<template>
    <div id="dropdownMenu" @blur="show = false" :model="show" tabindex="0">
        <a id="dropdownMenuButton" class="btn btn-dark d-inline-flex" href="#" role="button" @click="show = !show">
            <i class="fas fa-bars align-self-center px-1"></i>
            <font class="align-self-center px-1"> menu </font>
        </a>
        <transition name="fade">
            <dropdownMenuTooltip id="dropdownMenuTooltip" v-show="show"></dropdownMenuTooltip>
        </transition>
    </div>
</template>

<script>
import dropdownMenuTooltip from './Nav/index.vue'

export default {
    name: 'DropdownMenu',
    data () {
        return {
            show: false,
        }
    },
    components: {
        dropdownMenuTooltip,
    },
    methods: {
    },
    
};
</script>

<style lang="scss">

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>