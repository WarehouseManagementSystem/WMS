<template>
    <div v-if="show" class="popover fade" :class="objClass" role="tooltip" :x-placement="set" style="position: absolute; top: 0px; left: 0px; will-change: transform;" :style="{transform: `translate3d(${left}px, ${top}px, 0px)`}">
        <div class="arrow" :style="arrowStyle"></div>
        <div ref="header" class="popover-header"><slot v-if="title && $solts.header" name="header"><h6 class="m-0 p-0">{{title}}</h6></slot></div>
        <div ref="body" class="popover-body"><slot>{{content}}</slot></div>
    </div>  
</template>

<script>
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-popover',
    data () {
        return {
            arrowStyle: [],
        }
    },
    props: {
        show: Boolean,
        set: {
            type: String,
            default: 'right',
            validator: function (val) {
                return ['top', 'bottom', 'left', 'right'].includes(val)
            },
        },
        top: [String, Number],
        left: [String, Number],
        title: utilities.props.value,
        content: utilities.props.content,
    },
    computed: {
        objClass: function () {
            let c = ''
            if (this.show) c += ' show '
            if (this.set) c += ` bs-popover-${this.set} `
            return c
        },
    },
    mounted: function () {
        let setX = !['top', 'bottom'].includes(this.set)
        this.arrowStyle = setX ? {top: `${(this.$refs.header.offsetHeight + this.$refs.body.offsetHeight) / 2 - 13}px`} : {left: `${this.$refs.body.offsetWidth / 2 - 13}px`}
    }
}
</script>