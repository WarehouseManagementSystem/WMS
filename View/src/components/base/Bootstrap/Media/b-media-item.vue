<template>
    <li class="media">
        <slot name="icon"><i class="mt-2 mr-3 align-self-start" :class="icon"></i></slot>
        <div class="media-body">
            <h5 v-if="!href" class="my-1">{{ title }}</h5>
            <h5 v-else class="my-1"><a class="text-secondary" :href="href">{{ title }}</a></h5>
            {{ content }}
            <slot></slot>
        </div>
    </li>
</template>

<script>
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-media-item',
    props: {
        title: utilities.props.value,
        href: utilities.props.href,
        icon: utilities.props.value,
        content: utilities.props.value,
    }
}
</script>