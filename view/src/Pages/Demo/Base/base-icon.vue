<template>
    <div class="mx-2">
        <h2>Icon</h2>
        参考链接：<base-a class="px-1" href="https://fontawesome.com" text="fontawesome"></base-a>
        <hr>
        <div class="row">
            <div v-for="(value, key) in icon" :key="key" class="rounded border text-center bg-light m-2 p-1">
                <i :class="value" style="font-size: 2em; width: 3em;" />
                <p class="text-wrap m-0">{{ key }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import config from '@/config/index.js'

import BaseA from '@/components/base/Content/A/c-a.vue'

export default {
    name: 'base-icon',
    components: { BaseA, },
    computed: {
        icon: function () {
            return config.ui.icon
        },
    }
}
</script>