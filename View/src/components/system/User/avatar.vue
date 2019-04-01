<template>
    <img src="@/assets/Avatar.png" :width="width" :height="height" alt="User Avatar" class="rounded-circle border border-primary">
</template>

<script>
export default {
    name: 'avatar',
    props: {
        width: {
            type: Number,
            default: 30
        },
         height: {
            type: Number,
            default: 30
        },
    },
}
</script>
