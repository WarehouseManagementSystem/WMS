<template>
    <div>
        <h2>b-toast</h2>
        <hr>
        <div class="row py-1">
            <font class="col-1">default</font>
            <b-toast class="col-11" content="content text"></b-toast>
        </div>
        <div class="row py-1">
            <font class="col-1">delay</font>
            <b-toast class="col-10" content="delay : 自动关闭时间（ms), 默认 10000ms（10s）"></b-toast>
        </div>
        <div class="row py-1">
            <font class="col-1">autohide</font>
            <b-toast class="col-10" content="autohide true : 不自动关闭" autohide></b-toast>
        </div>
        <div class="row py-1">
            <font class="col-1">title</font>
            <b-toast class="col-11" autohide content="content text" title='title text'></b-toast>
        </div>
        <div class="row py-1">
            <font class="col-1">icon</font>
            <b-toast class="col-11" autohide title='title text' icon="fas fa-envelope">
                icon='fas fa-envelope'<br />
                参考： <base-a href="https://fontawesome.com" target="_blank">https://fontawesome.com</base-a>
            </b-toast>
        </div>
        <div class="row py-1">
            <font class="col-1">href</font>
            <b-toast class="col-11" autohide content="content text" title='title text'  href="/b-About"></b-toast>
        </div>
        <div class="row py-1">
            <font class="col-1">time</font>
            <b-toast class="col-11" autohide content="content text" title='title text'  time="2018-01"></b-toast>
        </div>
        <div class="row py-1">
            <font class="col-1">slot</font>
            <b-toast class="col-11" autohide title='title text'>
                you can add any string or DOM
            </b-toast>
        </div>
        <div class="row py-1">
            <font class="col-1">status</font>
            <div class="col-11">
                <div class="row">
                    <font class="col-4">system</font>
                    <font class="col-4">info</font>
                    <font class="col-4">success</font>
                </div>
                <div class="row">
                    <b-toast class="col-4" autohide status="system" content="content text"></b-toast>
                    <b-toast class="col-4" autohide status="info" content="content text"></b-toast>
                    <b-toast class="col-4" autohide status="success" content="content text"></b-toast>
                </div>
                <div class="row">
                    <font class="col-3">issue</font>
                    <font class="col-3">warning</font>
                    <font class="col-3">error</font>
                    <font class="col-3">danger</font>
                </div>
                <div class="row">
                    <b-toast class="col-3" autohide status="issue" content="content text"></b-toast>
                    <b-toast class="col-3" autohide status="warning" content="content text"></b-toast>
                    <b-toast class="col-3" autohide status="error" content="content text"></b-toast>
                    <b-toast class="col-3" autohide status="danger" content="content text"></b-toast>
                </div>
            </div>
        </div>
        <b-toasts :list="list" style="top: 50px; right: 50px;"></b-toasts>
    </div>
</template>

<script>
import BToast from '@/components/base/Bootstrap/toast/b-toast.vue'
import BToasts from '@/components/base/Bootstrap/toast/b-toasts.vue'
import BaseA from '@/components/base/BaseA/base-a.vue'

export default {
    name: 'b-toast-demo',
    components: { BToast, BToasts, BaseA,},
    data () {
        return {
            list: [
                { autohide: true, content: 'content text', status: 'system' },
                { autohide: true, content: 'content text', status: 'info' },
                { autohide: true, content: 'content text', status: 'success' },
                { autohide: true, content: 'content text', status: 'issue' },
                { autohide: true, content: 'content text', status: 'warning' },
                { autohide: true, content: 'content text', status: 'error' },
                { autohide: true, content: 'content text', status: 'danger' },
            ],
        }
    }
}
</script>