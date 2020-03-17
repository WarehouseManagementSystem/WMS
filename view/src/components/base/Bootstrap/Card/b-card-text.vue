<template>
    <p v-show="$slots.default" class="card-text"><slot></slot></p>
</template>
<script>
export default {
    name: 'b-card-text',
}
</script>
