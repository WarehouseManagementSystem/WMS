<template>
    <div 
        v-if="$slots.default"
        class="btn-toolbar" 
        :role="role" 
        :aria-label="AriaLabel">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'b-btn-toolbar',
    props: {
        role: {
            type: String,
            default: 'toolbar',
        },
        AriaLabel: {
            type: String,
            default: 'Toolbar with button groups',
        },
    },
}
</script>
