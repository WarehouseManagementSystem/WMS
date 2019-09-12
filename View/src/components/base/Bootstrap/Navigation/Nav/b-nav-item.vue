<template>
    <li class="nav-item">
        <a class="nav-link text-truncate" :class="objClass" v-bind="$attrs" :href="href" :tabindex="disabled ? -1 : ''" :aria-disabled="disabled"><slot>{{ text }}</slot></a>
    </li>
</template>

<script>
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-nav-item',
    inheritAttrs: false,
    props: {
        href: utilities.props.href,
        text: utilities.props.text,
        active: utilities.props.active,
        disabled: utilities.props.disabled,
    },
    computed: {
        objClass: function () {
            let c = ' '
            c += this.active ? ' active ' : ' '
            c += this.disabled ? ' disabled ' : ' '
            return c
        },
    },
}
</script>