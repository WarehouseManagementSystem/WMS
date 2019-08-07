<template>
    <div :id="'div-' + guid" class="py-0 px-1" :class="dropClass" ref="divDropdown">
        <div class="row" @click="click">
            <span class="col align-middle" style="line-height: 2em" >
                <slot v-if="Object.keys($scopedSlots).includes('trigger')" name="trigger"></slot>
                <font v-else style="cursor: default;">{{ trigger }}</font>
            </span>
            <i v-if="!hideToggle" class="fas fa-caret-down col-auto align-middle" style="line-height: 2em"></i>
        </div>
        <tran-drop>
            <div ref="menu" class="dropdown-menu overflow-auto shadow-sm" :class="menuClass" :style="{'max-height': menuHeight}" :aria-labelledby="guid">
                <slot></slot>
            </div>
        </tran-drop>
    </div>
</template>
<script>
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

import tranDrop from '@/components/transition/tran-drop.vue'

export default {
    name: 'b-dropdown',
    components: { tranDrop, },
    data () {
        return {
            menuStyle: 0,
        }
    },
    props: {
        set: utilities.props.set,
        trigger: {
            ...utilities.props.text,
            default: '<Pleace select...>',
        },
        'hide-toggle': Boolean,
        'menu-set': {
            type: String,
            default: '',
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return ['', 'left', 'right'].includes(value)
            },
        },
        'menu-Width': Boolean,
        'menu-height': String,
        scroll: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        guid: function () {
            return 'dropdown-'+ util.random.getRandomString()
        },
        dropClass: function () {
            return this.set == 'up' ? 'drop' : 'drop' + this.set
        },
        menuClass: function () {
            return `${this.menuSet ? this.menuSet : ''} 
                    ${this.menuWidth ? 'w-100' : ''} `
        },
    },
    mounted () {
        const el = this.$refs.divDropdown
        if (!el) return
        let node = el
        if (!node) return
        util.dom.addAttrs(node, 
            {'id': this.guid, 
             'data-toggle': 'dropdown', 
             'aria-haspopup': 'true', 
             'aria-expanded': 'false'})
    },
    methods: {
        click: function () {
            let { $refs, scroll } = this
            // 使用延时以等待 menu 显示后设置 scrollTop ,否则无效
            setTimeout(() => $refs.menu.scrollTop = scroll, 100);
        },
    },
}
</script>
