<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li 
                class="breadcrumb-item" 
                :class="{active: obj.isActive}" 
                :aria-current="obj.isActive ? 'page' : ''" 
                v-for="(obj, index) in content" 
                :key="index">
                <slot><base-a :href="obj.path">{{obj.name}}</base-a></slot>
            </li>
        </ol>
    </nav>
</template>
<script>
import utilities from '@/components/utilities/index.js'

import BaseA from '@/components/base/Content/A/c-a.vue'
export default {
    name: 'b-breadcrumb',
    components: { BaseA, },
    props: {
        content: utilities.props.content,
    },
}
</script>
