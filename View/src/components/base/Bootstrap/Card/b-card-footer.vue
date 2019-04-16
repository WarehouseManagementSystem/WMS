<template>
    <div v-show="$slots.default" class="card-footer"><slot></slot></div>
</template>
<script>
export default {
    name: 'b-card-footer',
}
</script>
