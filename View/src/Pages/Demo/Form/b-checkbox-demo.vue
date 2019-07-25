
<template>
    <div class="Form">
        <h2>b-checkbox</h2>
        <hr>
        <div class="row">
            <font class="col-1">default:</font>
            <b-checkbox class="col-11"></b-checkbox>
        </div>
        <div class="row">
            <font class="col-1">checked:</font>
            <b-checkbox class="col-11" :checked="Boolean(true)"></b-checkbox>
        </div>
        <div class="row">
            <font class="col-1">disabled:</font>
            <b-checkbox class="col-11" disabled></b-checkbox>
        </div>
         <div class="row">
            <font class="col-1">indeterminate:</font>
            <b-checkbox class="col-11" indeterminate="1" label="0: unchecked, > 0: some checked"></b-checkbox>
        </div>
        <div class="row">
            <font class="col-1">value:</font>
            <b-checkbox class="col-11" value="value"></b-checkbox>
        </div>
        <div class="row">
            <font class="col-1">label:</font>
            <b-checkbox class="col-11" label="label text"></b-checkbox>
        </div>
        <div class="row">
            <font class="col-1">inline:</font>
            <b-checkbox class="col-auto" label="checkbox1" inline></b-checkbox>
            <b-checkbox class="col-auto" label="checkbox2" inline></b-checkbox>
            <b-checkbox class="col-auto" label="checkbox3" inline></b-checkbox>
            <b-checkbox class="col-auto" label="checkbox4" inline></b-checkbox>
        </div>
        <div class="row">
            <font class="col-1">name:</font>
            <b-checkbox class="col-auto" label="checkbox1" name="inline-checkbox"></b-checkbox>
            <b-checkbox class="col-auto" label="checkbox2" name="inline-checkbox"></b-checkbox>
            <b-checkbox class="col-auto" label="checkbox3" name="inline-checkbox"></b-checkbox>
            <b-checkbox class="col-auto" label="checkbox4" name="inline-checkbox"></b-checkbox>
        </div>
        <div class="row">
            <font class="col-1">info:</font>
            <b-checkbox class="col-11" label="label text" info="a checkbox help info" inline></b-checkbox>
        </div>
        <div class="row">
            <font class="col-1">v-model:<br />({{ checked }})</font>
            <b-checkbox class="col-auto" v-model="checked" value="one" label="one" name="v-model-checkbox"></b-checkbox>
        </div>
        <div class="row">
            <font class="col-1">required:</font>
            <b-checkbox class="col-11" label="required checkbox" required></b-checkbox>
        </div>
        <div class="row">
            <font class="col-1">success<br />error:</font>
            <b-checkbox class="col-11" label="required checkbox" invalidInfo="error" validInfo="success" required></b-checkbox>
        </div>
        <div class="row">
            <font class="col-1">success<br />error(2):</font>
            <b-checkbox class="col-11" label="required checkbox" required>
                <template #invalid-info>
                    you can add anlything invalidInfo or DOM
                </template>
                <template #valid-info>
                    you can add anlything validInfo or DOM
                </template>
            </b-checkbox>
        </div>
        <h2>b-checkbox-group</h2>
        <hr>
        <div class="row">
            <font class="col-1">default:</font>
            <b-checkbox-group class="col-11" :list="list"></b-checkbox-group>
        </div>
        <div class="row">
            <font class="col-1">values:</font>
            <b-checkbox-group class="col-11" :list="list" :values="values"></b-checkbox-group>
        </div>
        <div class="row">
            <font class="col-1">disabled:</font>
            <b-checkbox-group class="col-11" :list="list" :values="values" disabled></b-checkbox-group>
        </div>
        <div class="row">
            <font class="col-1">inline:</font>
            <b-checkbox-group class="col-11" :list="list" :values="values" inline></b-checkbox-group>
        </div>
        <div class="row">
            <font class="col-1">info:</font>
            <b-checkbox-group class="col-11" :list="list" :values="values" info="checkbox group info" inline></b-checkbox-group>
        </div>
        <div class="row">
            <font class="col-1">v-model:<br/>({{values}})</font>
            <b-checkbox-group class="col-11" :list="list" name="checkbox-v-model" v-model="values" inline></b-checkbox-group>
        </div>
        <div class="row">
            <font class="col-1">required:</font>
            <b-checkbox-group class="col-11" :list="list" name="group-required" required></b-checkbox-group>
        </div>
        <div class="row">
            <font class="col-1">success<br />error:</font>
            <b-checkbox-group class="col-11" :list="list" name="group-valide-one" required invalidInfo="error" validInfo="success"></b-checkbox-group>
        </div>
        <div class="row">
            <font class="col-1">success<br />error(2):</font>
            <b-checkbox-group class="col-11" :list="list" name="group-valide-two" required>
                <template #invalid-info>
                    you can add anlything invalidInfo or DOM
                </template>
                <template #valid-info>
                    you can add anlything validInfo or DOM
                </template>
            </b-checkbox-group>
        </div>
    </div>
</template>

<script>
import BCheckbox from '@/components/base/Bootstrap/Form/CheckBox/b-checkbox.vue'
import BCheckboxGroup from '@/components/base/Bootstrap/Form/CheckBox/b-checkbox-group.vue'

export default {
    name: 'b-checkbox-demo',
    components: { BCheckbox, BCheckboxGroup, },
    data () {
        return {
            checked: true,
            list: [
                {value: 'value1', label: 'value1'},
                {value: 'value2', label: 'value2'},
                {value: 'disabled radio', label: 'disabled checkbox', disabled: true},
            ],
            values: ['value2'],
        }
    }
}
</script>

