<template>
    <div class="Form">
        <h2>b-textarea</h2>
        <hr>
        <div class="row">
            <font class="col-1">default:</font>
            <b-textarea class="col-11" value="default text"></b-textarea>
        </div>
        <div class="row">
            <font class="col-1">readonly:</font>
            <b-textarea class="col-11" value="readonly text" readonly></b-textarea>
        </div>
        <div class="row">
            <font class="col-1">disabled:</font>
            <b-textarea class="col-11" value="disabled text" disabled></b-textarea>
        </div>
        <div class="row">
            <font class="col-1">placeholder:</font>
            <b-textarea class="col-11" placeholder="placeholder text"></b-textarea>
        </div>
        <div class="row">
            <font class="col-1">cols:</font>
            <b-textarea class="col-auto" value="cols 10" cols="10"></b-textarea>
        </div>
        <div class="row">
            <font class="col-1">rows:</font>
            <b-textarea class="col-11" value="rows 2" rows="2"></b-textarea>
        </div>
        <div class="row">
            <font class="col-1">prompt:</font>
            <b-textarea class="col-11" prompt></b-textarea>
        </div>
        <div class="row">
            <font class="col-1">info:</font>
            <b-textarea class="col-11" info="info text"></b-textarea>
        </div>
        <div class="row">
            <font class="col-1">prompt<br />info:</font>
            <b-textarea class="col-11" info="info text" prompt></b-textarea>
        </div>
        <div class="row">
            <font class="col-1" >resize:</font>
            <b-textarea class="col-11" resize></b-textarea>
        </div>
        
        <div class="row">
            <font class="col-1">v-model:<br />({{ BTextValue }})</font>
            <b-textarea class="col-11" v-model="BTextValue"></b-textarea>
        </div>
        <div class="row">
            <font class="col-1">required:</font>
            <b-textarea class="col-11" required placeholder="required text"></b-textarea>
        </div>
        <div class="row">
            <font class="col-1">minlength<br />maxlength:</font>
            <b-textarea class="col-11" minlength="5" maxlength="10" placeholder="只能输入5-10 个字符" ></b-textarea>
        </div>
        <div class="row">
            <font class="col-1">pattern<br />(different with b-text):</font>
            <b-textarea class="col-11" :pattern="new RegExp(/^1[0-9]{10}$/)" placeholder="请输入手机号" ></b-textarea>
        </div>
        <div class="row">
            <font class="col-1">success<br />error:</font>
            <b-textarea class="col-11" :pattern="new RegExp(/^1[0-9]{10}$/)" placeholder="请输入手机号" invalidInfo="error" validInfo="success"></b-textarea>
        </div>
        <div class="row">
            <font class="col-1">success<br />error(2):</font>
            <b-textarea class="col-11" :pattern="new RegExp(/^1[0-9]{10}$/)" placeholder="请输入手机号">
                <template #invalid>
                    you can add anlything invalidInfo or DOM
                </template>
                <template #valid>
                    you can add anlything validInfo or DOM
                </template>
            </b-textarea>
        </div>
    </div> 
</template>

<script>
import BTextarea from '@/components/base/Bootstrap/Form/b-textarea.vue'

export default {
    name: 'b-teatarea-demo',
    components: { BTextarea, },
    data () {
        return {
            BTextValue: 'BTextValue',
        }
    },
}
</script>
