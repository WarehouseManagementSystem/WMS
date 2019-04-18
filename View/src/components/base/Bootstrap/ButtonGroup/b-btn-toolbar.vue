<template>
    <div 
        v-if="$slots.default"
        class="btn-toolbar" 
        :role="role" 
        :aria-label="ariaLabel">
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
        ariaLabel: {
            type: String,
            default: 'Toolbar with button groups',
        },
    },
}
</script>
