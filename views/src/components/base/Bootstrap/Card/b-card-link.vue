<template>
    <base-a :href="href" class="card-link"><slot>{{ text }}</slot></base-a>
</template>
<script>
import utilities from '@/components/utilities/index.js'

import BaseA from '@/components/base/Content/A/c-a.vue'

export default {
    name: 'b-card-link',
    components: { BaseA, },
    props: {
        href: utilities.props.href,
        text: utilities.props.text,
    },
}
</script>
