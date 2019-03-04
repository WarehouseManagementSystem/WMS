<template>
    <div @blur="showMenu()">
        <a id="dropdownMenuButton" class="btn btn-dark" href="#" @click="showMenu()">
            <i class="fas fa-bars"></i>
            <font> menu </font>
        </a>
        <transition name="fade">
            <dropdownMenuTooltip id="popover-content-dropdownMenuButton" v-show="show" @blur="showMenu()"></dropdownMenuTooltip>
        </transition>
    </div>
</template>

<script>
import dropdownMenuTooltip from '@/components/base/Nav/index.vue'

export default {
    name: 'dropdownMenuButton',
    data () {
        return {
            show: false,
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
};
</script>

<style lang="scss">
#popover-content-dropdownMenuButton {
    position: absolute;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>