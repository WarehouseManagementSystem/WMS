<template>
    <a v-show="text" :href="href" class="card-link">{{ text }}</a>
</template>
<script>
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-card-link',
    props: {
        href: utilities.props.href(),
        text: utilities.props.text(),
    },
}
</script>
