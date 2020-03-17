<template>
    <div 
        v-if="$slots.default"
        class="btn-toolbar" 
        role="toolbar" >
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'b-btn-toolbar',
}
</script>
