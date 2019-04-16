
<template>
    <img :src="src" :class="isTop" :alt="alt">
</template>
<script>
export default {
    name: 'b-card-image',
    props: {
        src: {
            type: String,
        },
        top: {
            type: Boolean,
            default: true,
        },
        alt: {
            type: String,
        },
    },
    computed: {
        isTop: function () {
            this.top ? 'card-img-top' : 'card-img'
        }
    }
}
</script>
