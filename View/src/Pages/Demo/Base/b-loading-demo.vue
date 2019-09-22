<template>
    <div>
        <h2>b-loading</h2>
        <hr>
        <div class="row py-1">
            <font class="col-1">default:</font>
            <b-loading></b-loading>
        </div>
        <div class="row py-1">
            <font class="col-1">status:</font>
            <font class="col-1">border<br />(default):</font>
            <b-loading status='border'></b-loading>
            <font class="col-1">grow:</font>
            <b-loading status='grow'></b-loading>
        </div>
        <div class="row py-1">
            <font class="col-1">size:</font>
            <font class="col-1">(default):</font>
            <b-loading></b-loading>
            <font class="col-1">sm:</font>
            <b-loading size='sm'></b-loading>
        </div>
        <div class="row py-1">
            <font class="col-1">color:</font>
            <div class="col-11">
                <div class="row">
                    <div class="col-1" v-for="item in colors" :key="item">
                        <b-loading :color="item"></b-loading>
                        <b-loading :color="item" status='grow'></b-loading>
                    </div>
                </div>
                <div class="row">
                    <font v-for="item in colors" :key="item" class="col-1">{{ item }}</font>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import variables from '@/components/utilities/variables.js'

import BLoading from "@/components/base/Bootstrap/Loading/b-loading.vue"

export default {
    name: 'b-loading-demo',
    components: { BLoading, },
    data () {
        return {
            colors: variables.base.color.bg,
        }
    }
}
</script>