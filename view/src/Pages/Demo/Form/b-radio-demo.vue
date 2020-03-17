<template>
    <div class="Form">
        <h2>b-radio</h2>
        <hr>
        <div class="row">
            <font class="col-1">default:</font>
            <b-radio class="col-11"></b-radio>
        </div>
        <div class="row">
            <font class="col-1">checked:</font>
            <b-radio class="col-11" :checked="Boolean(true)"></b-radio>
        </div>
        <div class="row">
            <font class="col-1">disabled:</font>
            <b-radio class="col-11" disabled></b-radio>
        </div>
        <div class="row">
            <font class="col-1">value:</font>
            <b-radio class="col-11" value="value"></b-radio>
        </div>
        <div class="row">
            <font class="col-1">label:</font>
            <b-radio class="col-11" label="label text"></b-radio>
        </div>
        <div class="row">
            <font class="col-1">inline:</font>
            <b-radio class="col-auto" label="radio1" inline></b-radio>
            <b-radio class="col-auto" label="radio2" inline></b-radio>
            <b-radio class="col-auto" label="radio3" inline></b-radio>
            <b-radio class="col-auto" label="radio4" inline></b-radio>
        </div>
        <div class="row">
            <font class="col-1">name:</font>
            <b-radio class="col-auto" label="radio1" name="inline-radio"></b-radio>
            <b-radio class="col-auto" label="radio2" name="inline-radio"></b-radio>
            <b-radio class="col-auto" label="radio3" name="inline-radio"></b-radio>
            <b-radio class="col-auto" label="radio4" name="inline-radio"></b-radio>
        </div>
        <div class="row">
            <font class="col-1">info:</font>
            <b-radio class="col-11" label="label text" info="a radio help info"></b-radio>
        </div>
        <div class="row">
            <font class="col-1">v-model:<br />({{ checked }})</font>
            <b-radio class="col-auto" v-model="checked" value="one" label="one" name="v-model-radio"></b-radio>
            <b-radio class="col-auto" v-model="checked" value="two" label="two" name="v-model-radio"></b-radio>
        </div>
        <hr>
        <h2>b-radio-group</h2>
        <hr>
        <div class="row">
            <font class="col-1">default:</font>
            <b-radio-group class="col-11" :list="list" name="group-default"></b-radio-group>
        </div>
        <div class="row">
            <font class="col-1">value:</font>
            <b-radio-group class="col-11" :list="list" name="group-value" :value="value"></b-radio-group>
        </div>
        <div class="row">
            <font class="col-1">disabled:</font>
            <b-radio-group class="col-11" :list="list" name="group-disabled" disabled inline></b-radio-group>
        </div>
        <div class="row">
            <font class="col-1">inline:</font>
            <b-radio-group class="col-11" :list="list" name="group-inline" inline></b-radio-group>
        </div>
        <div class="row">
            <font class="col-1">info:</font>
            <b-radio-group class="col-11" :list="list" name="group-info" info="info message" inline></b-radio-group>
        </div>
        <div class="row">
            <font class="col-1">v-model:<br/>({{value}})</font>
            <b-radio-group class="col-11" :list="list" name="group-v-model" v-model="value" inline></b-radio-group>
        </div>
        <div class="row">
            <font class="col-1">required:</font>
            <b-radio-group class="col-11" :list="list" name="group-required" required></b-radio-group>
        </div>
        <div class="row">
            <font class="col-1">success<br />error:</font>
            <b-radio-group class="col-11" :list="list" name="group-valide-one" required invalidInfo="error" validInfo="success"></b-radio-group>
        </div>
        <div class="row">
            <font class="col-1">success<br />error(2):</font>
            <b-radio-group class="col-11" :list="list" name="group-valide-two" required>
                <template #invalid>
                    you can add anlything invalidInfo or DOM
                </template>
                <template #valid>
                    you can add anlything validInfo or DOM
                </template>
            </b-radio-group>
        </div>
        <!-- <hr>
        <h2>b-radio-button-group</h2>
        <hr>
        <div class="row">
            <font class="col-1">default:</font>
            <b-radio-button-group name="default-button-group" :list="buttongrouplist"></b-radio-button-group>
        </div>
        <div class="row">
            <font class="col-1">disabled:</font>
            <b-radio-button-group name="disabled-button-group" :list="buttongrouplist" disabled></b-radio-button-group>
        </div>
        <div class="row">
            <font class="col-1">value:</font>
            <b-radio-button-group name="value-button-group" :list="buttongrouplist" value="value1"></b-radio-button-group>
        </div>
        <div class="row">
            <font class="col-1">info:</font>
            <b-radio-button-group name="info-button-group" :list="buttongrouplist" info="button group info"></b-radio-button-group>
        </div>
        <div class="row">
            <font class="col-1">v-model:<br/>({{buttongroupvalue}})</font>
            <b-radio-button-group name="v-model-button-group" :list="buttongrouplist" v-model="buttongroupvalue"></b-radio-button-group>
        </div> -->
    </div>
</template>

<script>
import BRadio from '@/components/base/Bootstrap/Form/Radio/b-radio.vue'
import BRadioGroup from '@/components/base/Bootstrap/Form/Radio/b-radio-group.vue'
// import BRadioButtonGroup from '@/components/base/Bootstrap/Form/Radio/b-radio-button-group.vue'

export default {
    name: 'b-radio-demo',
    components: { BRadio, BRadioGroup, },
    data () {
        return {
            checked: 'one',
            list: [
                {value: 'value1', label: 'value1'},
                {value: 'value2', label: 'value2'},
                {value: 'disabled radio', label: 'disabled radio', disabled: true},
            ],
            value: 'value2',
            buttongrouplist: [
                {value: 'value1', label: 'value1', },
                {value: 'value2', label: 'value2', },
                {value: 'value3', label: 'value3', },
                {value: 'value4', label: 'value4', disabled: true},
            ],
            buttongroupvalue: 'value2',
        }
    },
}
</script>
