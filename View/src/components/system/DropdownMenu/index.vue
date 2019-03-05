<template>
    <div id="dropdownMenu">
        <a id="dropdownMenuButton" class="btn btn-dark" href="#" @click="showMenu">
            <i class="fas fa-bars"></i>
            <font> menu </font>
        </a>
        <transition name="fade">
            <dropdownMenuTooltip id="dropdownMenuT" v-show="show"></dropdownMenuTooltip>
        </transition>
    </div>
</template>

<script>
import dropdownMenuTooltip from '@/components/base/Nav/index.vue'

export default {
    name: 'dropdownMenu',
    data () {
        return {
            show: false,
            blurred: false,
        }
    },
    components: {
        dropdownMenuTooltip,
    },
    methods: {
        showMenu: function () {
            this.show = !this.show
        }
    },
    template: "#dropdownMenuT"
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