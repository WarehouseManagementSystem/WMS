<template>
    <a :href="href" class="alert-link"><slot></slot></a>
</template>
<script>
import utilities from '@/components/base/Bootstrap/utilities/index.js'
export default {
    name: 'b-alert-link',
    props: {
        href: utilities.props.href(),
    },
}
</script>
