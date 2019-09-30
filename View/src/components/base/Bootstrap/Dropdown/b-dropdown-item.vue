<template>
    <base-a v-if="href" class="dropdown-item" :class="{active: active}" :aria-selected="active" :disabled="disabled" :href="href" :text="text" hideIcon/>
    <button v-else class="dropdown-item" :class="{active: active}" :aria-selected="active" :disabled="disabled" :aria-disabled="disabled" type="button">{{ text }}</button>
</template>
<script>
import utilities from '@/components/utilities/index.js'

import BaseA from '@/components/base/Content/A/c-a.vue'
export default {
    name: 'b-dropdown-item',
    components: { BaseA, },
    props: {
        href: utilities.props.href,
        text: utilities.props.text,
        active: utilities.props.active,
        disabled: utilities.props.disabled,
    },
}
</script>
