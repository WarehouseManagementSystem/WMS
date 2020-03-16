<template>
    <li class="page-item text-center" :class="{disabled: disabled, active: active}" style="width: 2.5em" :aria-current="active ? 'page' : ''">
        <span class="page-link text-center px-1"  :disabled="disabled">
            <slot>{{value}}</slot>
            <span v-if="active" class="sr-only">(current)</span>
        </span>
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