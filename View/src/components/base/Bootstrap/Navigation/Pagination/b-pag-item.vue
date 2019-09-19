<template>
    <li class="page-item text-center" :class="{disabled: disabled, active: active}" style="width: 2.5em" :aria-current="active ? 'page' : ''">
        <base-a class="page-link text-center px-1"  :disabled="disabled" hideIcon>
            <slot>{{value}}</slot>
            <span v-if="active" class="sr-only">(current)</span>
        </base-a>
    </li>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import BaseA from '@/components/base/BaseA/base-a.vue'

export default {
    name: 'b-pag-item',
    components: { BaseA, },
    props: {
        value: utilities.props.value,
        disabled: Boolean,
        active: Boolean,
    },
}
</script>