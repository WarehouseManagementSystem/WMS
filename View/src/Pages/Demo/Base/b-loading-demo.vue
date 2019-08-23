<template>
    <div>
        <h2>b-loading</h2>
        <hr>
        <div class="row py-1">
            <font class="col-1">default:</font>
            <b-loading></b-loading>
        </div>
        <div class="row py-1">
            <font class="col-1">status:</font>
            <font class="col-1">border<br />(default):</font>
            <b-loading status='border'></b-loading>
            <font class="col-1">grow:</font>
            <b-loading status='grow'></b-loading>
        </div>
        <div class="row py-1">
            <font class="col-1">size:</font>
            <font class="col-1">(default):</font>
            <b-loading></b-loading>
            <font class="col-1">sm:</font>
            <b-loading size='sm'></b-loading>
        </div>
        <div class="row py-1">
            <font class="col-1">color:</font>
            <div class="col-11">
                <div class="row">
                    <div class="col-1">
                        <b-loading color='primary'></b-loading>
                        <b-loading color='primary' status='grow'></b-loading>
                    </div>
                    <div class="col-1">
                        <b-loading color='secondary'></b-loading>
                        <b-loading color='secondary' status='grow'></b-loading>
                    </div>
                    <div class="col-1">
                        <b-loading color='success'></b-loading>
                        <b-loading color='success' status='grow'></b-loading>
                    </div>
                    <div class="col-1">
                        <b-loading color='danger'></b-loading>
                        <b-loading color='danger' status='grow'></b-loading>
                    </div>
                    <div class="col-1">
                        <b-loading color='warning'></b-loading>
                        <b-loading color='warning' status='grow'></b-loading>
                    </div>
                    <div class="col-1">
                        <b-loading color='info'></b-loading>
                        <b-loading color='info' status='grow'></b-loading>
                    </div>
                    <div class="col-1">
                        <b-loading color='light'></b-loading>
                        <b-loading color='light' status='grow'></b-loading>
                    </div>
                    <div class="col-1">
                        <b-loading color='dark'></b-loading>
                        <b-loading color='dark' status='grow'></b-loading>
                    </div>
                </div>
                <div class="row">
                     <font class="col-1">primary</font>
                     <font class="col-1">secondary</font>
                     <font class="col-1">success</font>
                     <font class="col-1">danger</font>
                     <font class="col-1">warning</font>
                     <font class="col-1">info</font>
                     <font class="col-1">light</font>
                     <font class="col-1">dark</font>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BLoading from "@/components/base/Bootstrap/Loading/b-loading.vue"

export default {
    name: 'b-loading-demo',
    components: { BLoading, },
}
</script>