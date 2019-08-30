<template>
    <div v-show="$slots.default" class="card-body"><slot></slot></div>
</template>

<script>
export default {
    name: 'b-card-body'
}
</script>