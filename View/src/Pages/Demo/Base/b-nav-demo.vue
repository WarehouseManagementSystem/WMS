<template>
    <div>
        <h2>b-nav</h2>
        <hr>
        <div class="row py-1">
            <font class="col-1">default:</font>
            <b-nav class="col-11" :list="list"></b-nav>
        </div>
        <div class="row py-1">
            <font class="col-1">nav width dropdown:</font>
            <b-nav class="col-11" :list="listd"></b-nav>
        </div>
        <div class="row py-1">
            <font class="col-1">set:</font>
            <div class="col-11">
                <div class="row py-1">
                    <font class="col-1">set:start</font>
                    <b-nav class="col-11" :list="list" set="start"></b-nav>
                </div>
                <div class="row py-1">
                    <font class="col-1">set:center</font>
                    <b-nav class="col-11" :list="list" set="center"></b-nav>
                </div>
                <div class="row py-1">
                    <font class="col-1">set:end</font>
                    <b-nav class="col-11" :list="list" set="end"></b-nav>
                </div>
            </div>
        </div>
        <div class="row py-1">
            <font class="col-1">column:</font>
            <b-nav class="col-11" :list="list" column></b-nav>
        </div>
        <div class="row py-1">
            <font class="col-1">column width dropdown:</font>
            <b-nav class="col-11" :list="listd" column></b-nav>
        </div>
        <div class="row py-1">
            <font class="col-1">tabs:</font>
            <b-nav class="col-11" :list="list" tabs></b-nav>
        </div>
        <div class="row py-1">
            <font class="col-1">pills:</font>
            <b-nav class="col-11" :list="list" pills></b-nav>
        </div>
        <div class="row py-1">
            <font class="col-1">select(text1):</font>
            <b-nav class="col-11" :list="list" select="text1" pills></b-nav>
        </div>
        <div class="row py-1">
            <font class="col-1">fill:</font>
            <b-nav class="col-11" :list="list2" tabs fill></b-nav>
        </div>
        <div class="row py-1">
            <font class="col-1">justified:</font>
            <b-nav class="col-11" :list="list2" tabs justified></b-nav>
        </div>
    </div>
</template>

<script>
import BNav from '@/components/base/Bootstrap/Navigation/Nav/b-nav.vue'

export default {
    name: 'b-nav-demo',
    components: { BNav,},
    data () {
        return {
            list: [
                {text: 'text1'},
                {text: 'text2', },
                {text: 'active href', href: "#", active: true,},
                {text: 'disabled text', disabled: true,},
            ],
            list2: [
                {text: 'text1'},
                {text: 'text2', },
                {text: 'toooooooooooooooooooooooo loooooooooooooooooooooooog', href: "#", },
            ],
            listd: [
                {text: 'text1'},
                {text: 'text2', },
                {text: 'active href', href: "#", active: true,},
                {text: 'disabled text', disabled: true,},
                { dropdown: true, text: 'dropdown text', list: [
                    { header: 'header text', divider: true,  text: "text", value: 'value', },
                    { divider: true, text: "text", value: 'value', },
                    { text: "text", value: 'value', },
                    { value: 'value', },
                    { value: 'href value', href: "#" },
                    { value: 'active value', active: true,},
                    { value: 'disabled value', disabled: true,},],
                },
            ],
        }
    },
}
</script>