<template>
    <b-pag :end="Number(15)"></b-pag>
</template>

<script>
import BPag from '@/components/base/Bootstrap/Navigation/Pagination/b-pag.vue'

export default {
    name: 'b-pagination-demo',
    components: { BPag, },
}
</script>