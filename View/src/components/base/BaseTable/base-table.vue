<template>
    <div>
        <template v-if="heros && heros.length > 0">
            
        </template>
         <template v-else>
            无相关数据
        </template>
    </div>
</template>

<script>
export default {
    name: 'base-table',
    props: {
        heros: {
            type: Array,
        },
        colunms: {
            type: Array,
        },
        config: {
            type: Array,
        },
    },
}
</script>

