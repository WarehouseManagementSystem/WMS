<template>
    <div class="Form">
        <h2>b-switch</h2>
        <hr>
        <div class="row">
            <font class="col-1">default:</font>
            <b-switch class="col-11" ></b-switch>
        </div>
        <div class="row">
            <font class="col-1">text:</font>
            <b-switch class="col-11" text="switch text" ></b-switch>
        </div>
        <div class="row">
            <font class="col-1">checked:</font>
            <b-switch class="col-11" text="switch checked" checked></b-switch>
        </div>
        <div class="row">
            <font class="col-1">disabled:</font>
            <b-switch class="col-11" text="switch disabled" disabled></b-switch>
        </div>
        <div class="row">
            <font class="col-1">info:</font>
            <b-switch class="col-11" text="switch text" info="info text"></b-switch>
        </div>
        <div class="row">
            <font class="col-1">v-model<br />{{ checked }}:</font>
            <b-switch class="col-11" text="switch text" v-model="checked"></b-switch>
        </div>
    </div>
</template>

<script>
import BSwitch from '@/components/base/Bootstrap/Form/b-switch.vue'

export default {
    name: 'b-switch-demo',
    components: { BSwitch, },
    data () {
        return {
            checked: true,
        }
    },
}
</script>
