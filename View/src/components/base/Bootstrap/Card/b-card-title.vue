<template>
    <h5 v-show="$slots.default" class="card-title"><slot></slot></h5>
</template>
<script>
export default {
    mame: 'b-card-title',
}
</script>
