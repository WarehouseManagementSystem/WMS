<template>
    <base-a v-if="href" :href="href" class="list-group-item list-group-item-action" :class="objClass" :disabled="disabled"><slot>{{ text }}</slot><sr-message>{{ srMessage || color }}</sr-message></base-a>
    <li v-else class="list-group-item text-truncate" :class="objClass" :aria-disabled="disabled"><slot>{{ text }}</slot><sr-message>{{ srMessage }}</sr-message></li>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import BaseA from '@/components/base/BaseA/base-a.vue'

import srMessage from '@/components/base/Bootstrap/SrOney/b-sr-only.vue'

export default {
    name: 'b-list-item',
    components: { BaseA, srMessage, },
    props: {
        href: utilities.props.href,
        text: utilities.props.text,
        color: {
            ...utilities.props.color,
            default: 'white',
        },
        active: utilities.props.active,
        disabled: utilities.props.disabled,
        srMessage: utilities.props.srMessage,
    },
    computed: {
        objClass: function () {
            let c = ' '
            c += this.color ? ` list-group-item-${this.color} ` : ' '
            c += this.active ? ' active ' : ' '
            return c
        },
    },
}
</script>

