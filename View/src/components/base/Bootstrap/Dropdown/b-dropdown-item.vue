<template>
    <a v-if="href" class="dropdown-item" :class="{active: active}" :disabled="disabled" :href="href">{{ text }}</a>
    <button v-else class="dropdown-item" :class="{active: active}" :disabled="disabled" type="button">{{ text }}</button>
</template>
<script>
import utilities from '@/components/base/Bootstrap/utilities/index.js'

export default {
    name: 'b-dropdown-item',
    props: {
        href: utilities.props.href(),
        text: utilities.props.text(),
        active: utilities.props.active(),
        disabled: utilities.props.disabled(),
    },
}
</script>
