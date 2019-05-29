<template>
    <div :id="'div-' + guid" :class="dropClass" ref="divDropdown">
        <div class="row">
            <span class="col align-middle">
                <slot v-if="Object.keys($scopedSlots).includes('trigger')" name="trigger"></slot>
                <font v-else style="cursor: default;">{{ trigger }}</font>
            </span>
            <i v-if="!hideToggle" class="fas fa-caret-down col-auto align-middle"></i>
        </div>
        <div class="dropdown-menu" :class="menuClass" :aria-labelledby="guid">
            <slot name="menu"></slot>
        </div>
    </div>
</template>
<script>
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-dropdown',
    props: {
        set: utilities.props.set,
        trigger: utilities.props.text,
        'hide-toggle':{
            type: Boolean,
            default: false,
        },
        'menu-set': {
            type: String,
            default: '',
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return ['', 'left', 'right'].includes(value)
            },
        },
        'menu-weight': {
            type: Boolean,
            default: false,
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
                    ${this.menuWeight ? 'w-100' : ''} `
        },
    },
    mounted () {
        const el = this.$refs.divDropdown
        if (!el) return
        //let node = el.firstChild
        let node = el
        if (!node) return
        util.dom.addAttrs(node, 
            {'id': this.guid, 
             'data-toggle': 'dropdown', 
             'aria-haspopup': 'true', 
             'aria-expanded': 'false'})
    }
}
</script>
