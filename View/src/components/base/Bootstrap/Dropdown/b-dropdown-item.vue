<template>
    <a v-if="showA" class="dropdown-item" :class="{active: active}" :aria-selected="active" :disabled="disabled" :aria-disabled="disabled" :href="href">{{ text }}</a>
    <button v-else class="dropdown-item" :class="{active: active}" :aria-selected="active" :disabled="disabled" :aria-disabled="disabled" type="button">{{ text }}</button>
</template>
<script>
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-dropdown-item',
    props: {
        href: utilities.props.href,
        text: utilities.props.text,
        active: utilities.props.active,
        disabled: utilities.props.disabled,
    },
    computed: {
        showA: function () {
            return this.href != utilities.props.href.default
        }
    }
}
</script>
