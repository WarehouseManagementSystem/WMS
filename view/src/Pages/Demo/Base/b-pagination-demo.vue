<template>
    <div>
        <h2>b-pag</h2>
        <hr>
        <div class="row py-1">
            <font class="col-1">default:</font>
            <b-pag class="col-11" end="25"></b-pag>
        </div>
        <div class="row py-1">
            <font class="col-1">active:</font>
            <b-pag class="col-11" end="25" active="10"></b-pag>
        </div>
        <div class="row py-1">
            <font class="col-1">v-model<br/>{{value}}:</font>
            <b-pag class="col-11" end="25" v-model="value"></b-pag>
        </div>
    </div>
</template>

<script>
import BPag from '@/components/base/Bootstrap/Navigation/Pagination/b-pag.vue'

export default {
    name: 'b-pagination-demo',
    components: { BPag, },
    data () {
        return {
            value: 5,
        }
    },
}
</script>
