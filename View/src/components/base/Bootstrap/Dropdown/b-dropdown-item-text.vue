<template>
    <span class="dropdown-item-text">{{ text }}</span>
</template>
<script>
import utilities from '@/components/base/Bootstrap/utilities/index.js'

export default {
    name: 'b-dropdown-item-text',
    props: {
        text: utilities.props.text(),
    },
}
</script>
