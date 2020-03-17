<template>
    <a class="navbar-brand" :href="href">
        <slot>{{ text }}</slot>
    </a>
</template>

<script>
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-navbar-brand',
    props: {
        href: utilities.props.href,
        text: utilities.props.text,
    },
}
</script>