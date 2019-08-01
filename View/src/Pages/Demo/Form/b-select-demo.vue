<template>
    <div class="Form">
        <h2>b-select</h2>
        <hr>
        <div class="row">
            <font class="col-1">default:</font>
            <b-select class="col-5" :list="list"></b-select>
            <b-select class="col-5" :list="list" multiple></b-select>
        </div>
        <div class="row">
            <font class="col-1">value:</font>
            <b-select class="col-5" :list="list" value="option1" ></b-select>
            <b-select class="col-5" :list="list" :value="value" multiple></b-select>
        </div>
        <div class="row">
            <font class="col-1">disabled:</font>
            <b-select class="col-5" disabled></b-select>
            <b-select class="col-5" :list="list" disabled multiple></b-select>
        </div>
        <div class="row">
            <font class="col-1">info:</font>
            <b-select class="col-5" :list="list" info="info text" ></b-select>
            <b-select class="col-5" :list="list" info="info text" multiple></b-select>
        </div>
        <div class="row">
            <font class="col-1">row:</font>
            <b-select class="col-11" :list="list2" row="5" multiple></b-select>
        </div>
        <div class="row">
            <font class="col-1">size(lg):</font>
            <b-select class="col-5" :list="list" size="lg" ></b-select>
            <b-select class="col-5" :list="list" size="lg" multiple></b-select>
        </div>
        <div class="row">
            <font class="col-1">size(sm):</font>
            <b-select class="col-5" :list="list" size="sm" ></b-select>
            <b-select class="col-5" :list="list" size="sm" multiple></b-select>
        </div>
        <div class="row">
            <font class="col-1">v-model:</font>
            <b-select class="col-5" :list="list" v-model="value1" :info="'selected: ' + value1"></b-select>
            <b-select class="col-5" :list="list" v-model="value" :info="'selected: ' + value" multiple></b-select>
        </div>
        <div class="row">
            <font class="col-1">required:</font>
            <b-select class="col-5" :list="list" required></b-select>
            <b-select class="col-5" :list="list" required multiple></b-select>
        </div>
        <div class="row">
            <font class="col-1">success<br />error:</font>
            <b-select class="col-5" :list="list" invalidInfo="error" validInfo="success" required></b-select>
            <b-select class="col-5" :list="list" invalidInfo="error" validInfo="success" required multiple></b-select>
        </div>
        <div class="row">
            <font class="col-1">success<br />error(2):</font>
            <b-select class="col-5" :list="list" required>
                <template #invalid-info>
                    you can add anlything invalidInfo or DOM
                </template>
                <template #valid-info>
                    you can add anlything validInfo or DOM
                </template>
            </b-select>
            <b-select class="col-5" :list="list" required multiple>
                <template #invalid-info>
                    you can add anlything invalidInfo or DOM
                </template>
                <template #valid-info>
                    you can add anlything validInfo or DOM
                </template>
            </b-select>
        </div>
    </div>
</template>

<script>
import BSelect from '@/components/base/Bootstrap/Form/b-select.vue'

export default {
    name: 'b-select-demo',
    components: { BSelect, },
    data () {
        return {
            list: [
                {value: 'option1', label: 'option1'},
                {value: 'option2', label: 'option2'},
                {value: 'disabled option', label: 'disabled option', disabled: true},
            ],
            list2: [
                {value: 'option1', label: 'option1'},
                {value: 'option2', label: 'option2'},
                {value: 'option3', label: 'option3'},
                {value: 'option4', label: 'option4'},
                {value: 'option5', label: 'option5'},
                {value: 'option6', label: 'option6'},
                {value: 'option7', label: 'option7'},
                {value: 'disabled option', label: 'disabled option', disabled: true},
            ],
            value: ['option1', 'option2'],
            value1: 'option1'
        }
    },
}
</script>

