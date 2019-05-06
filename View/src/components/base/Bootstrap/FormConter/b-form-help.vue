<template>
    <small v-show="message" class="form-text text-muted">{{ message }}</small>
</template>
<script>
export default {
    name: 'b-form-help',
    props: {
        message: {
            type: String,  
        },
    },
}
</script>
