<template>
    <i class="rounded-circle" :class="icon.user" alt="User Avatar" style="wdith: 1.5em; height: 1.5em;" />
</template>

<script>
import config from '@/config/index.js'

export default {
    name: 'avatar',
    computed: {
        icon: function () {
            return config.ui.icon
        },
    }
}
</script>
