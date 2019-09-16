<template>
    <div class="Form">
        <h2>b-number</h2>
        <hr>
        
        <div class="row">
            <font class="col-1">int:</font>
            <b-number class="col-11"></b-number>
        </div>
         <div class="row">
            <font class="col-1">float:</font>
            <b-number class="col-11" value="0.5"></b-number>
        </div>
        <div class="row">
            <font class="col-1">step:</font>
            <b-number class="col-11" value="0.5" step="0.1" ></b-number>
        </div>
        <div class="row">
            <font class="col-1">readonly:</font>
            <b-number class="col-11" readonly></b-number>
        </div>
        <div class="row">
            <font class="col-1">disabled:</font>
            <b-number class="col-11" disabled></b-number>
        </div>
        <div class="row">
            <font class="col-1">placeholder:</font>
            <b-number class="col-11" placeholder="placeholder text"></b-number>
        </div>
        <div class="row">
            <font class="col-1">hideButton:</font>
            <b-number class="col-11" placeholder="hidebutton text" hideButton></b-number>
        </div>
        <div class="row">
            <font class="col-1">size(lg):</font>
            <b-number class="col-11" size="lg"></b-number>
        </div>
        <div class="row">
            <font class="col-1">size(sm):</font>
            <b-number class="col-11" size="sm"></b-number>
        </div>
        <div class="row">
            <font class="col-1">info:</font>
            <b-number class="col-11" info="info text"></b-number>
        </div>
        <div class="row">
            <font class="col-1">prompt:</font>
            <b-number class="col-11" prompt></b-number>
        </div>
        <div class="row">
            <font class="col-1">info<br/>prompt:</font>
            <b-number class="col-11" info="info text" step="0.1" prompt></b-number>
        </div>
        <div class="row">
            <font class="col-1">v-model:<br />({{ number }})</font>
            <b-number class="col-11" v-model.number="number" ></b-number>
        </div>
        <div class="row">
            <font class="col-1">min<br />max:</font>
            <b-number class="col-11" min="5" max="10" placeholder="只能输入 5-10 之间的数" ></b-number>
        </div>
    </div>
</template>

<script>
import BNumber from '@/components/base/Bootstrap/Form/b-number.vue'

export default {
    name: 'b-number-demo',
    components: { BNumber },
    data () {
        return {
            number: 10,
        }
    }
}
</script>

<style>

</style>
