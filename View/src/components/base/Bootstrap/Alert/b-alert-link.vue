<template>
    <a :href="href" class="alert-link"><slot></slot></a>
</template>
<script>
export default {
    name: 'b-alert-link',
    props: {
        href: {
            type: String,
            default: '#',
        },
    },
}
</script>
