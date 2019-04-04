<template>
    <div v-show="$slots.default">
        <hr>
        <p class="mb-0"><slot></slot></p>
    </div>
</template>
<script>
export default {
    name: 'b-alert-footer',
    data () {
        return {
            show: true,
        }
    },
}
</script>

