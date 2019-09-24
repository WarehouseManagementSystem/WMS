<template>
    <div class="Form">
        <h2>b-button</h2>
        b-button 中的属性在 b-reset b-submit 中是通用的
        <hr>
        <div class="row py-1">
            <font class="col-1">default:</font>
            <font class="mx-1">button:</font>
            <b-button />
            <font class="mx-1">a:</font>
            <b-button href="#" />
        </div>
        <div class="row py-1">
            <font class="col-1">active:</font>
            <b-button active />
        </div>
        <div class="row py-1">
            <font class="col-1">disabled:</font>
            <b-button disabled />
        </div>
        <div class="row py-1">
            <font class="col-1">value:</font>
            <b-button value="button text" />
        </div>
        <div class="row py-1">
            <font class="col-1">outline:</font>
            <b-button value="button text" outline />
        </div>
        <div class="row py-1">
            <font class="col-1">block:</font>
            <b-button class="col-10" value="button text" block />
        </div>
        <div class="row py-1">
            <font class="col-1">size:</font>
            <font class="mx-1">default:</font>
            <b-button value="text" />
            <font class="mx-1">lg:</font>
            <b-button value="lg size" size="lg" />
            <font class="mx-1">sm:</font>
            <b-button value="sm size" size="sm" />
        </div>
        <div class="row my-1">
            <font class="col-1">color:</font>
            <div class="col-11">
                <font class="col-1">default:</font>
                <b-button v-for="item in colors" :key="'default-' + item" class="m-1" :color="item">{{ item }}</b-button>
                <br/>
                <font class="col-1">outline:</font>
                <b-button v-for="item in colors" :key="'outline-' + item" class="m-1" :color="item" outline>{{ item }}</b-button>
            </div>
        </div>
        <h2>b-reset</h2>
        <font class=" text-danger">不建议使用 使用 v-model 绑定数据的控件均不能正确响应 b-reset</font>
        <hr>
        <div class="row py-1">
            <font class="col-1">default:</font>
            <b-reset />
        </div>
        <h2>b-submit</h2>
        <hr>
        <div class="row py-1">
            <font class="col-1">default:</font>
            <b-submit />
        </div>
        <h2>button group</h2>
        <hr>
        <div class="row py-1">
            <font class="col-1">default:</font>
            <b-button-group>
                <b-button value="button text" />
                <b-button value="button text" />
                <b-button value="button text" />
            </b-button-group>
        </div>
        <div class="row py-1">
            <font class="col-1">vertical:</font>
            <b-button-group vertical>
                <b-button value="button text" />
                <b-button value="button text" />
                <b-button value="button text" />
            </b-button-group>
        </div>
        <div class="row py-1">
            <font class="col-1">size:</font>
            <font class="mx-1">default:</font>
            <b-button-group>
                <b-button value="button text" />
                <b-button value="button text" />
                <b-button value="button text" />
            </b-button-group>
            <font class="mx-1">lg:</font>
            <b-button-group size="lg">
                <b-button value="button text" />
                <b-button value="button text" />
                <b-button value="button text" />
            </b-button-group>
            <font class="mx-1">sm:</font>
            <b-button-group size="sm">
                <b-button value="button text" />
                <b-button value="button text" />
                <b-button value="button text" />
            </b-button-group>
        </div>
        <h2>button toolbar</h2>
        <hr>
        <b-button-toolbar>
            <b-button-group class="mr-2">
                <b-button value="button text" />
                <b-button value="button text" />
                <b-button value="button text" />
            </b-button-group>
            <b-button-group size="lg">
                <b-button value="button text" />
                <b-button value="button text" />
                <b-button value="button text" />
            </b-button-group>
        </b-button-toolbar>
    </div>
</template>

<script>
import variables from '@/components/utilities/variables.js'

import BButton from '@/components/base/Bootstrap/Form/Button/b-button.vue'
import BReset from '@/components/base/Bootstrap/Form/Button/b-reset.vue'
import BSubmit from '@/components/base/Bootstrap/Form/Button/b-submit.vue'

import BButtonGroup from '@/components/base/Bootstrap/ButtonGroup/b-button-group.vue'
import BButtonToolbar from '@/components/base/Bootstrap/ButtonGroup/b-btn-toolbar.vue'

export default {
    name: 'b-button-demo',
    components: { BButton, BReset, BSubmit, BButtonGroup, BButtonToolbar, },
    data () {
        return {
            colors: variables.base.color.bg,
            BTextValue: 'BTextValue',
            list: [
                { value: 'value1', text: "text1", },
                { value: 'value2', text: "text2", },
                { value: 'value3', text: "text3", },
                { value: 'value4', text: "text4", },
                { value: 'value5', text: "text5", },
                { value: 'value6', text: "disabled", disabled: true},
            ],
        }
    }
}
</script>