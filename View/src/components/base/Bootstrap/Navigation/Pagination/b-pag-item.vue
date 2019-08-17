<template>
    <li class="page-item" :class="{disabled: disabled, active: active}" :aria-current="active ? 'page' : ''">
        <a class="page-link" href="#" :tabindex="disabled ? -1 : ''" :aria-disabled="disabled">
            <slot>{{ value }}</slot>
            <span v-if="active" class="sr-only">(current)</span>
        </a>
    </li>
</template>

<script>
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-pag-item',
    props: {
        value: utilities.props.value,
        disabled: Boolean,
        active: Boolean,
    },
}
</script>