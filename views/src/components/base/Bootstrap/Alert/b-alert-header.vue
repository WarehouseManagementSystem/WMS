<template>
    <h4 class="alert-heading" v-show="$slots.default"><slot></slot></h4>
</template>
<script>
export default {
    name: 'b-alert-header',
}
</script>
