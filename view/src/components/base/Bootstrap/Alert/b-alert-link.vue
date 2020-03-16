<template>
    <base-a :href="href" class="alert-link"><slot></slot></base-a>
</template>
<script>
import utilities from '@/components/utilities/index.js'

import BaseA from '@/components/base/Content/A/c-a.vue'
export default {
    name: 'b-alert-link',
    components: { BaseA, },
    props: {
        href: utilities.props.href,
    },
}
</script>
