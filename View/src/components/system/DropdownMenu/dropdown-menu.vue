<template>
    <div id="dropdownMenu" style="cursor: default;" class="border-0" :model="show">
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
    methods: {
        bindHindeEvents: function () {
            document.body.addEventListener('mousedown', this.hindeMenu )
            document.body.addEventListener('mousewheel', this.hindeMenu )
        },
        unbindHindeEvents: function () {
            document.body.removeEventListener('mousedown', this.hindeMenu )
            document.body.removeEventListener('mousewheel', this.hindeMenu )
        },
        hindeMenu: function (event) {
            const e = event.target
            // 判断鼠标点击位置是否在菜单内，如果是则不隐藏，如果不是则隐藏
            this.isChildById(e, 'dropdownMenuTooltip')
                
        },
        isChildById: function (e, id) {
            if (!(e || e.nodeName) || ['#document', 'HTML', 'BODY'].includes(e.nodeName)) 
                return this.show = false
            e = e.parentNode
            if (e.id && e.id == id) return
            this.isChildById(e, id)
        },
    },
    watch: {
        show: function (newValue) {
            newValue ? this.bindHindeEvents() : this.unbindHindeEvents()
        }
    }
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