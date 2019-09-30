<template>
    <button 
        v-if="!href"
        class="btn" 
        :class="objClass" 
        :disabled="disabled" 
        :aria-pressed="active" 
        :aria-disabled="disabled"
        data-toggle="button" >
        <slot>{{ value | worldUpperCase | firstUpperCase }}</slot>
        <sr-message>{{ fillsrMessage }}</sr-message>
    </button>
    <base-a 
        v-else
        class="btn" 
        :class="objClass" 
        :href="href" 
        :active="active" 
        :aria-pressed="active" 
        :disabled="disabled" 
        data-toggle="button" 
        role="button" >
        <slot>{{ value | worldUpperCase | firstUpperCase }}</slot>
        <sr-message>{{ fillsrMessage }}</sr-message>
    </base-a>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import BaseA from '@/components/base/Content/A/c-a.vue'
import srMessage from '@/components/base/Bootstrap/SrOney/b-sr-only.vue'

export default {
    name: 'b-button',
    components: { BaseA, srMessage, },
    mixins: [ utilities.mixins.form.btn, ],
}
</script>