<template>
    <small v-if="info" class="form-text text-muted">{{ info }}</small>
</template>
<script>
export default {
    name: 'b-form-help',
    props: {
        info: {
            type: String,  
        },
    },
}
</script>
