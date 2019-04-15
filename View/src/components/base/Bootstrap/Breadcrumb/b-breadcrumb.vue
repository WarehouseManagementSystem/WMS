<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li 
                class="breadcrumb-item" 
                :class="{active: obj.isActive}" 
                :aria-current="obj.isActive ? 'page' : ''" 
                v-for="(obj, index) in content" 
                :key="index">
                <slot><a :href="obj.path">{{obj.name}}</a></slot>
            </li>
        </ol>
    </nav>
</template>
<script>
export default {
    name: 'b-breadcrumb',
    props: {
        content: {
            type: Array,
        },
    },
}
</script>
