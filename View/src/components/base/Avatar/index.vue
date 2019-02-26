<template>
    <div id="Avatar">
        <img src="@/assets/Avatar.png" width="30" height="30" alt="User Avatar" class="rounded-circle border border-primary">
    </div>
</template>

<script>
export default {
    name: 'Avatar',
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
