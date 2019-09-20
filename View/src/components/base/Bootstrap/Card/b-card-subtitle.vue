<template>
    <h6 v-show="$slots.default" class="card-subtitle text-muted"><slot></slot></h6>
</template>
<script>
export default {
    mame: 'b-card-subtitle',
}
</script>
