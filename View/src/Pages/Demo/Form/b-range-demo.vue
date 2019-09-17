<template>
    <div class="Form">
        <h2>b-range</h2>
        <hr>
        <div class="row">
            <font class="col-1">default:</font>
            <b-range class="col-11" ></b-range>
        </div>
        <div class="row">
            <font class="col-1">value:</font>
            <b-range class="col-11" value="15"></b-range>
        </div>
        <div class="row">
            <font class="col-1">hideValue:</font>
            <b-range class="col-11" hideValue></b-range>
        </div>
        <div class="row">
            <font class="col-1">info:</font>
            <b-range class="col-11" info="info text"></b-range>
        </div>
        <div class="row">
            <font class="col-1">prompt:</font>
            <b-range class="col-11" info="info text" prompt></b-range>
        </div>
        <div class="row">
            <font class="col-1">disabled:</font>
            <b-range class="col-11" disabled></b-range>
        </div>
        <div class="row">
            <font class="col-1">min-value<br />max-value:</font>
            <b-range class="col-11" min-value="min value" max-value="max value"></b-range>
        </div>
        <div class="row">
            <font class="col-1">min<br />max<br />step:</font>
            <b-range class="col-11" min="-10" max="10" step="5"></b-range>
        </div>
        <div class="row">
            <font class="col-1">v-model<br />{{ value }}:</font>
            <b-range class="col-11" v-model.number="value"></b-range>
        </div>
    </div>
</template>

<script>
import BRange from '@/components/base/Bootstrap/Form/b-range.vue'

export default {
    name: 'b-range-demo',
    components: { BRange, },
    data () {
        return {
            value: 20,
        }
    },
}
</script>
