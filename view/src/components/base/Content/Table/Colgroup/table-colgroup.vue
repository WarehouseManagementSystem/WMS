<template>
    <colgroup>
        <col 
            v-for="(item, index) in colgroup" 
            :key="index" 
            :class="item.class" 
            :style="item.style" >
    </colgroup>
</template>

<script>
import utilities from '@/components/utilities/index.js'

export default {
    name: 'table-colgroup',
    props: {
        colgroup: utilities.props.list,
    },
}
</script>