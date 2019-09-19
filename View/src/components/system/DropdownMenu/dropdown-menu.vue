<template>
    <div id="dropdownMenu" style="cursor: default;" class="border-0" :model="show">
        <button id="dropdownMenuButton" class="btn btn-dark d-inline-flex" style="cursor: default;"  role="button" @click="show = !show">
            <i class="fas fa-bars align-self-center px-1"></i>
            <font class="align-self-center px-1">menu</font>
        </button>
        <tran-drop>
            <dropdown-menu-tooltip id="dropdownMenuTooltip" v-show="show"></dropdown-menu-tooltip>
        </tran-drop>
    </div>
</template>

<script>
import DropdownMenuTooltip from './Nav/nav.vue'
import tranDrop from '@/components/transition/tran-drop.vue'

export default {
    name: 'dropdown-menu',
    components: { DropdownMenuTooltip, tranDrop },
    data () {
        return {
            show: false,
        }
    },
    methods: {
        bindHindeEvents: function () {
            document.addEventListener('mousedown', this.hindeMenu )
            document.addEventListener('mousewheel', this.hindeMenu )
        },
        unbindHindeEvents: function () {
            document.removeEventListener('mousedown', this.hindeMenu )
            document.removeEventListener('mousewheel', this.hindeMenu )
        },
        hindeMenu: function (event) {
            const e = event.target
            // 判断鼠标点击位置是否在菜单内，如果是则不隐藏，如果不是则隐藏
            this.isChildById(e, 'dropdownMenu')
            
        },
        isChildById: function (e, id) {
            if (!(e || e.nodeName) || ['#document', 'HTML', 'BODY'].includes(e.nodeName)) return this.show = false
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
