<template>
    <small v-if="info" class="form-text text-muted">{{ info }}</small>
</template>
<script>
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-form-help',
    props: {
        info: utilities.props.value,
    },
}
</script>
