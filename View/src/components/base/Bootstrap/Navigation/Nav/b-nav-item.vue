<template>
    <li class="nav-item">
        <base-a class="nav-link text-truncate" :class="objClass" v-bind="$attrs" :href="href" :diabled="diabled"><slot>{{ text }}</slot></base-a>
    </li>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import BaseA from '@/components/base/BaseA/base-a.vue'

export default {
    name: 'b-nav-item',
    inheritAttrs: false,
    components: { BaseA, },
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