<template>
    <div>
        <h2>base-a</h2>
        <hr>
        <div class="row py-1">
            <font class="col-1">default</font>
            <base-a>text</base-a>
        </div>
        <div class="row py-1">
            <font class="col-1">disabled</font>
            <base-a disabled>text</base-a>
        </div>
        <div class="row py-1">
            <font class="col-1">href</font>
            <div class="col-11">
                <div class="row">
                    <font class="col-2">tel: </font>
                    <base-a href="tel:15872955525"></base-a>
                </div>
                <div class="row">
                    <font class="col-2">sms: </font>
                    <base-a href="sms:15872955525"></base-a>
                </div>
                <div class="row">
                    <font class="col-2">mailto: </font>
                    <base-a href="mailto:2900910740@qq.com"></base-a>
                </div>
                <div class="row">
                    <font class="col-2">link: </font>
                    <base-a class="px-1" href="http://www.bing.com" text="Bing"></base-a>
                    <base-a class="px-1" href="b-About"></base-a>
                </div>
                <div class="row">
                    <font class="col-2">Anchor point: </font>
                    <base-a class="px-1" href="#"></base-a>
                    <base-a class="px-1" href="#top"></base-a>
                    <base-a class="px-1" href="#1-1"></base-a>
                </div>
            </div>
        </div>
        <div class="row py-1">
            <font class="col-1">download</font>
            <base-a href="b-About" download="b-About.vue"></base-a>
        </div>
        <div class="row py-1">
            <font class="col-1">hideIcon</font>
            <base-a href="http://www.bing.com" text="Bing" hideIcon></base-a>
        </div>
        <div class="row py-1">
            <font class="col-1">icon</font>
            <base-a text="text" icon="fas fa-info"></base-a>
        </div>
    </div>
</template>

<script>
import BaseA from '@/components/base/BaseA/base-a.vue'

export default {
    name: 'base-a-demo',
    components: { BaseA, },
}
</script>