<template>
    <base-a v-if="href" class="dropdown-item" :class="{active: active,}" :aria-selected="active" :disabled="disabled" :href="href" hideIcon>
        <slot>{{ text }}</slot>
        <b-info :info="info" :textColor="active ? 'light' : 'muted'" />
    </base-a>
    <button v-else class="dropdown-item" :class="{active: active,}" :aria-selected="active" :disabled="disabled" :aria-disabled="disabled"  type="button">
        <slot>{{ text }}</slot>
        <b-info :info="info" :textColor="active ? 'light' : 'muted'" />
    </button>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import BaseA from '@/components/base/Content/A/c-a.vue'
import BInfo from '@/components/base/Bootstrap/Form/Other/b-form-info.vue'

export default {
    name: 'b-dropdown-item',
    components: { BaseA, BInfo, },
    props: {
        href: utilities.props.href,
        text: utilities.props.text,
        info: utilities.props.text,
        active: utilities.props.active,
        disabled: utilities.props.disabled,
    },
}
</script>
