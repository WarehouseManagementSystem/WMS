<template>
    <div id="dropdownMenu" @blur="show = false" tabindex="-1">
        <a id="dropdownMenuButton" class="btn btn-dark d-block" href="#" role="button" @click="show = !show">
            <i class="fas fa-bars"></i>
            <!-- <font> menu </font> -->
        </a>
        <transition name="fade">
            <dropdownMenuTooltip id="dropdownMenuT" v-show="show"></dropdownMenuTooltip>
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