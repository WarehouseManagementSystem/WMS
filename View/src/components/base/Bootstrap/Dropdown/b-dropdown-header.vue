<template>
    <h6 class="dropdown-header">{{ text }}</h6>
</template>
<script>
export default {
    name: 'b-dropdown-header',
    props: {
        text: {
            type: String,
        },
    },
}
</script>
