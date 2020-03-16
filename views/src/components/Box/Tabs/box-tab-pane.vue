<template>
    <div v-if="$slots.default" class="tab-pane fade overflow-auto" :class="{'show active': active}" role="tabpanel"><slot></slot></div>
</template>

<script>
export default {
    name: 'box-tab-pane',
    props: {
        active: Boolean,
    },
}
</script>