<template>
    <span class="dropdown-item-text">
        <slot>{{ text }}</slot>
        <b-info :info="info" />
    </span>
</template>
<script>
import utilities from '@/components/utilities/index.js'

import BInfo from '@/components/base/Bootstrap/Form/Other/b-form-info.vue'

export default {
    name: 'b-dropdown-item-text',
    components: { BInfo, },
    props: {
        text: utilities.props.text,
        info: utilities.props.text,
    },
}
</script>
