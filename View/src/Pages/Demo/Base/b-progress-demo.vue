<template>
    <div>
        <h2>b-progress</h2>
        <hr>
        <div class="row py-1">
            <font class="col-1">default:</font>
            <font class="col-1">one:</font>
            <b-progress class="col-4"></b-progress>
            <font class="col-1">list:</font>
            <b-progress class="col-4" :list="list0"></b-progress>
        </div>
        <div class="row py-1">
            <font class="col-1">value:</font>
            <font class="col-1">one:</font>
            <b-progress class="col-4" value="80"></b-progress>
            <font class="col-1">list:</font>
            <b-progress class="col-4" :list="list"></b-progress>
        </div>
        <div class="row py-1">
            <font class="col-1">striped:</font>
            <font class="col-1">one:</font>
            <b-progress class="col-4" value="80" striped></b-progress>
            <font class="col-1">list:</font>
            <b-progress class="col-4" :list="list" striped></b-progress>
        </div>
        <div class="row py-1">
            <font class="col-1">animated:</font>
            <font class="col-1">one:</font>
            <b-progress class="col-4" value="80" striped animated></b-progress>
            <font class="col-1">list:</font>
            <b-progress class="col-4" :list="list" animated></b-progress>
        </div>
        <div class="row py-1">
            <font class="col-1">show-value:</font>
            <font class="col-1">one:</font>
            <b-progress class="col-4" value="5" show-value></b-progress>
            <font class="col-1">list:</font>
            <b-progress class="col-4" :list="list" show-value></b-progress>
        </div>
        <div class="row py-1">
            <font class="col-1">info:</font>
            <font class="col-1">one:</font>
            <b-progress class="col-4" value="80" info="info text"></b-progress>
            <font class="col-1">list:</font>
            <b-progress class="col-4" :list="list" info="info text"></b-progress>
        </div>
        <div class="row py-1">
            <font class="col-1">color:</font>
            <div class="col-11">
                <template v-for="item in colors">{{ item }}: <b-progress :key="item" class="py-1" :color="item" value="100"></b-progress></template>
            </div>
        </div>
    </div>
</template>

<script>
import variables from '@/components/utilities/variables.js'

import BProgress from '@/components/base/Bootstrap/Progress/b-progress.vue'

export default {
    name: 'b-progress-demo',
    components: { BProgress, },
    data () {
        return {
            colors: variables.base.color.bg,
            list0: [
                {value: 0},
                {color: 'info', value: 0},
                {color: 'danger', value: 0, },
                {color: 'info', value: 0, showValue: true },
            ],
            list: [
                {value: 10},
                {color: 'info', value: 10},
                {color: 'danger', value: 10, },
                {color: 'info', value: 10, showValue: true },
            ],
            value: 80,
        }
    }
}
</script>