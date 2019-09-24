<template>
    <div>
        <h2>base-a</h2>
        <pre>
    请勿滥用 base-a 或 a 标签，应只用于以下用途：
        1. 导航
        2. 定位
        3. 页面跳转
        4. 链接
    href 属性为必填，如若发现没有可用的 href 值则很可能出现了 base-a 的滥用，请考虑使用其它控件/标签，
    除定位到顶部，其它用途请不要使用 ‘#’、‘#top’ 作为 href 的值，这仍然是滥用行为，请严格按照以上用途使用
        </pre>
        <hr>
        <div class="row py-1">
            <font class="col-1">default</font>
            <base-a href="#">text</base-a>
        </div>
        <div class="row py-1">
            <font class="col-1">disabled</font>
            <base-a href="#" disabled>text</base-a>
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
                    <base-a class="px-1" ></base-a>
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