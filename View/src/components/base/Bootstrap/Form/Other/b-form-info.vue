<template>
    <small v-if="info" class="form-text" :class="'text-' + textColor">{{ info }}</small>
</template>
<script>
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-form-info',
    props: {
        info: utilities.props.value,
        textColor: {
            ...utilities.props.textColor,
            default: 'muted',
        },
    },
}
</script>
