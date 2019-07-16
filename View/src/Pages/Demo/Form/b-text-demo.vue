<template>
    <div class="Form">
        <h2>b-text</h2>
        <hr>
        <h3>type: text(default)</h3>
        <hr>
        <div class="row">
            <font class="col-1">default:</font>
            <b-text class="col-11" value="default text"></b-text>
        </div>
        <div class="row">
            <font class="col-1">readonly:</font>
            <b-text class="col-11" value="readonly text" readonly></b-text>
        </div>
        <div class="row">
            <font class="col-1">disabled:</font>
            <b-text class="col-11" value="disabled text" disabled></b-text>
        </div>
        <div class="row">
            <font class="col-1">placeholder:</font>
            <b-text class="col-11" placeholder="placeholder text"></b-text>
        </div>
        <div class="row">
            <font class="col-1">size(sm):</font>
            <b-text class="col-11" value="sm size" size="sm"></b-text>
        </div>
        <div class="row">
            <font class="col-1">size(lg):</font>
            <b-text class="col-11" value="lg size" size="lg"></b-text>
        </div>
        <div class="row">
            <font class="col-1">length:</font>
            <b-text class="col-auto" value="10 length" :length="10"></b-text>
        </div>
        <div class="row">
            <font class="col-1" for="info">info:</font>
            <b-text class="col-11" info="info" id="info"></b-text>
        </div>
        <div class="row">
            <font class="col-1">icon:</font>
            <b-text class="col-11" icon="fas fa-user-circle" placeholder="don`t use icon and hideIcon together，icon will be ignore"></b-text>
        </div>
        <div class="row">
            <font class="col-1">hideIcon:</font>
            <b-text type='phone' class="col-11" placeholder="hideIcon just use in 'password', 'search', 'email', 'url', 'ip', 'tel', 'phone'" hideIcon></b-text>
        </div>
        <div class="row">
            <font class="col-1">v-model:<br />({{ BTextValue }})</font>
            <b-text class="col-11" v-model="BTextValue"></b-text>
        </div>
        <div class="row">
            <font class="col-1">required:</font>
            <b-text class="col-11" required placeholder="required text"></b-text>
        </div>
        <div class="row">
            <font class="col-1">minlength<br />maxlength:</font>
            <b-text class="col-11" minlength="5" maxlength="10" placeholder="只能输入5-10 个字符" ></b-text>
        </div>
        <div class="row">
            <font class="col-1">pattern:</font>
            <b-text class="col-11" pattern="/^1[0-9]{10}$/" placeholder="请输入手机号" ></b-text>
        </div>
        <div class="row">
            <font class="col-1">success<br />error:</font>
            <b-text class="col-11" pattern="/^1[0-9]{10}$/" placeholder="请输入手机号" invalidInfo="error" validInfo="success"></b-text>
        </div>
        <div class="row">
            <font class="col-1">success<br />error(2):</font>
            <b-text class="col-11" pattern="/^1[0-9]{10}$/" placeholder="请输入手机号">
                <template #invalid-info>
                    you can add anlything invalidInfo or DOM
                </template>
                <template #valid-info>
                    you can add anlything validInfo or DOM
                </template>
            </b-text>
        </div>
        <h3>other type</h3>
        <hr>
        <div class="row">
            <font class="col-1">password:</font>
            <b-text type='password' class="col-11" ></b-text>
        </div>
        <div class="row">
            <font class="col-1">search:</font>
            <b-text type='search' class="col-11" ></b-text>
        </div>
        <div class="row">
            <font class="col-1">email:</font>
            <b-text type='email' class="col-11"></b-text>
        </div>
        <div class="row">
            <font class="col-1">url:</font>
            <b-text type='url' class="col-11" ></b-text>
        </div>
        <div class="row">
            <font class="col-1">ip:</font>
            <b-text type='ip' class="col-11" ></b-text>
        </div>
        <div class="row">
            <font class="col-1">tel:</font>
            <b-text type='tel' class="col-11" ></b-text>
        </div>
        <div class="row">
            <font class="col-1">phone:</font>
            <b-text type='phone' class="col-11" ></b-text>
        </div>
        <hr>
    </div>
</template>

<script>
import BText from '@/components/base/Bootstrap/Form/b-text.vue'

export default {
    name: 'b-text-demo',
    components: {
        BText,
    },
    data () {
        return {
            BTextValue: 'BTextValue'
        }
    }
}
</script>

