<template>
    <a v-show="text" :href="href" class="card-link">{{ text }}</a>
</template>
<script>
export default {
    name: 'b-card-link',
    props: {
        href: {
            type: String,
            default: '#'
        },
        text: {
            type: String,
        },
    },
}
</script>
