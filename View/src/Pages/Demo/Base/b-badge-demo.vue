<template>
    <div>
        <h2>b-badge</h2>
        <hr>
        <div class="row my-1">
            <font class="col-1">default</font>
            <font class="mx-1">span:</font>
            <b-badge />
            <font class="mx-1">a:</font>
            <b-badge href="#" />
        </div>
        <div class="row my-1">
            <font class="col-1">slot</font>
            <font class="mx-1">span:</font>
            <b-badge>text</b-badge>
            <font class="mx-1">a:</font>
            <b-badge href="#">text</b-badge>
        </div>
        <div class="row my-1">
            <font class="col-1">pill</font>
            <font class="mx-1">span:</font>
            <b-badge pill>text</b-badge>
            <font class="mx-1">a:</font>
            <b-badge href="#" pill>text</b-badge>
        </div>
        <div class="row my-1">
            <font class="col-1">color</font>
            <div class="col-11">
                <b-badge v-for="item in colors" :key="item" class="m-1" :color="item"></b-badge>
                <br/>
                <b-badge v-for="item in colors" :key="item" class="m-1" :color="item">{{item}}</b-badge>
            </div>
        </div>
    </div>
</template>

<script>
import variables from '@/components/utilities/variables.js'

import BBadge from '@/components/base/Bootstrap/Badge/b-badge.vue'

export default {
    name: 'b-badge-demo',
    components: { BBadge, },
    data () {
        return {
            colors: variables.base.color.bg,
        }
    }
}
</script>