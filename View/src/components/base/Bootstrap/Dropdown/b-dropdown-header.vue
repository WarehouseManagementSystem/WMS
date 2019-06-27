<template>
    <h6 class="dropdown-header">{{ text }}</h6>
</template>
<script>
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-dropdown-header',
    props: {
        text: utilities.props.text,
    },
}
</script>
