<template>
    <span class="dropdown-item-text">{{ text }}</span>
</template>
<script>
export default {
    name: 'b-dropdown-item-text',
    props: {
        text: {
            type: String,
        },
    },
}
</script>
