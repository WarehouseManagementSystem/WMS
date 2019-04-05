<template>
    <span class="sr-only" v-show="$slots.default"><slot></slot></span>
</template>
<script>
export default {
    name: 'b-sr-only',
}
</script>
