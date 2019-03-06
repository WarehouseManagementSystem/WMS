<template>
    <div id="dropdownMenu" @blur="showMenu" tabindex="-1">
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
    directives: {
        'onblur' (el) {
            let dropdownMenuT = el.getElementById('dropdownMenuT')
            dropdownMenuT.onblur = function () {
                // 如果要对节点的数据进行更改,且更改要映射到页面上,则更改可在vnode.context上进行,这样,改完之后,改变就会映射到页面
                this.show = !this.show
            }
        }
    }
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