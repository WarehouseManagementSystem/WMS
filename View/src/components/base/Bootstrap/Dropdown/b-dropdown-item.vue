<template>
    <a v-if="href" class="dropdown-item" :class="{active: active}" :disabled="disabled" :href="href">{{ text }}</a>
    <button v-else class="dropdown-item" :class="{active: active}" :disabled="disabled" type="button">{{ text }}</button>
</template>
<script>
export default {
    name: 'b-dropdown-item',
    props: {
        href: {
            type: String,
        },
        text: {
            type: String,
        },
        active: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
}
</script>
