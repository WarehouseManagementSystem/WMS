<template>
    <h6 v-show="$slots.default" class="card-subtitle"><slot></slot></h6>
</template>
<script>
export default {
    mame: 'b-card-subtitle',
}
</script>
