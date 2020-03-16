<template>
    <div class="px-1">
        <h2>b-list</h2>
        <hr>
        <div class="row py-1">
            <font class="col-1">default:</font>
            <b-list class="col-11" :list="list"></b-list>
        </div>
        <div class="row py-1">
            <font class="col-1">disabled:</font>
            <b-list class="col-11" :list="list" disabled></b-list>
        </div>
        <div class="row py-1">
            <font class="col-1">select:</font>
            <b-list class="col-11" :list="list2" select="text1"></b-list>
        </div>
        <div class="row py-1">
            <font class="col-1">flush:</font>
            <b-list class="col-11" :list="list3" flush></b-list>
        </div>
        <div class="row py-1">
            <font class="col-1">inline:</font>
            <b-list class="col-11" :list="list4" inline></b-list>
        </div>
        <div class="row py-1">
            <font class="col-1">inline<br />fill:</font>
            <b-list class="col-11" :list="list4" inline fill></b-list>
        </div>
        <div class="row py-1">
            <font class="col-1">solt:</font>
            <b-list class="col-11">
                <b-list-item>
                    no 'd-flex justify-content-between align-items-center 'class
                    <span class="badge badge-primary badge-pill">14</span>
                </b-list-item>
                 <b-list-item class="d-flex justify-content-between align-items-center">
                    add `d-flex justify-content-between align-items-center` class
                    <span class="badge badge-primary badge-pill">14</span>
                </b-list-item>
                <b-list-item>
                    <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">List group item heading</h5>
                    <small>5 days ago</small>
                    </div>
                    <p class="mb-1">More difficult DOM you can add in</p>
                    <small>More text...</small>
                </b-list-item>
            </b-list>
        </div>
        <div class="row py-1">
            <font class="col-1">color:</font>
            <b-list class="col-11">
                <b-list-item v-for="item in colors" :key="item" :color="item">{{ item }}</b-list-item>
            </b-list>
        </div>
    </div>
</template>

<script>
import variables from '@/components/utilities/variables.js'

import BList from '@/components/base/Bootstrap/List/b-list.vue'
import BListItem from '@/components/base/Bootstrap/List/b-list-item.vue'

export default {
    name: 'b-list-demo',
    components: { BList, BListItem, },
    data () {
        return {
            colors: variables.base.color.bg,
            list: [
                {text: 'text1'},
                {text: 'text2', active: true,},
                {text: 'text3', disabled: true,},
                {text: 'href1', href: "#"},
                {text: 'href2', href: "#", active: true,},
                {text: 'href3', href: "#", disabled: true,},
            ],
            list2: [
                {text: 'text1'},
                {text: 'text2', active: true,},
                {text: 'href1', href: "#"},
                {text: 'href2', href: "#", active: true,},
            ],
            list3: [
                {text: 'text1'},
                {text: 'href1', href: "#"},
            ],
            list4: [
                {text: 'text1'},
                {text: 'toooooooooooooo loooooong'},
            ],
        }
    }
}
</script>

