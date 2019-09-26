<template>
    <div>
        <h2>b-alert</h2>
        <hr>
        <div class="row my-5">
            <font class="col-1">default</font>
            <b-alert show>default Alert</b-alert>
        </div>
        <div class="row my-5">
            <font class="col-1">dismissible</font>
            <b-alert show dismissible>dismissible Alert</b-alert>
        </div>
        <div class="row my-5">
            <font class="col-1">countDownDisdismis</font>
            <b-alert show countDownDisdismis>countDownDisdismis Alert</b-alert>
        </div>
        <div class="row my-5">
            <font class="col-1">countDownSec</font>
            <b-alert show countDownSec="10">countDownSec Alert</b-alert>
        </div>
        <div class="row my-5">
            <font class="col-1">position</font>
            <b-radio-group name="position" :list="list" v-model="position" />
            <b-alert :position="position" show>{{ position }}</b-alert>
        </div>
        <div class="row my-5">
            <font class="col-1">link</font>
            <b-alert show><b-alert-link href="#">alert link</b-alert-link></b-alert>
        </div>
        <div class="row my-5">
            <font class="col-1">header and footer</font>
            <b-alert show>
                <template #header>header text</template>
                info
                <template #footer>footer text</template>
            </b-alert>
        </div>
        <h2>color</h2>
        <hr>
        <div class="row my-5" v-for="color in colors" :key="color">
            <font class="col-1">{{color}}</font>
            <b-alert :color="color" show>{{ color }}</b-alert>
        </div>
    </div>
</template>

<script>
import BAlert from '@/components/base/Bootstrap/Alert/b-alert.vue'
import BAlertLink from '@/components/base/Bootstrap/Alert/b-alert-link.vue'

import BRadioGroup from '@/components/base/Bootstrap/Form/Radio/b-radio-group.vue'

import variables from '@/components/utilities/variables.js'
export default {
    name: 'b-alert-demo',
    components: { BAlert, BAlertLink, BRadioGroup, },
    data () {
        return {
            position: 'top-center',
            list: variables.base.position.default.map(e => {return {value: e, label: e}}),
            colors: variables.base.color.bg,
        }
    }
}
</script>