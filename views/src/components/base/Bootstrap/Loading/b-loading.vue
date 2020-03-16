<template>
    <div :class="objClass" role="status">
        <span class="sr-only">Loading...</span>
    </div>
</template>

<script>
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-loading',
    mixins: [utilities.mixins.loading,]
}
</script>