<template>
    <li class="nav-item">
        <a class="nav-link" :class="objClass" :href="href" :tabindex="disabled ? -1 : ''" aria-disabled="true"><slot>{{ text }}</slot></a>
    </li>
</template>

<script>
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-nav-item',
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