<template>
    <div :id="'div-' + guid" :class="dropClass">
        <slot v-if="$slots.trigger[0].tag" name="trigger"></slot>
        <font v-else style="cursor: default;">{{ $slots.trigger[0].text }}</font>
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
        set: utilities.props.set(),
        'menu-set': {
            type: String,
            default: '',
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return ['', 'left', 'right'].includes(value)
            },
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
            return this.menuSet ? this.menuSet : ''
        },
    },
    mounted () {
        const el = document.getElementById('div-' + this.guid) && document.getElementById('div-' + this.guid)
        if (!el) return
        let node = el.firstChild
        if (!node) return
        util.dom.addAttrs(node, 
            {'id': this.guid, 
             'data-toggle': 'dropdown', 
             'aria-haspopup': 'true', 
             'aria-expanded': 'false'})
        node.className += ' dropdown-toggle'
    }
}
</script>
