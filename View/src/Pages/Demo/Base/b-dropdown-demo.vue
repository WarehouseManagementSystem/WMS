<template>
    <div class="Form">
        <h2>b-dropdown</h2>
        <hr>
        <div class="row">
            <font class="col-1">default:</font>
            <b-dropdown class="col-auto" :list="list2" ></b-dropdown>
        </div>
        <div class="row">
            <font class="col-1">disabled:</font>
            <b-dropdown class="col-auto" :list="list2" disabled></b-dropdown>
        </div>
        <div class="row">
            <font class="col-1">select:</font>
            <b-dropdown class="col-auto" :list="list2" select="value"></b-dropdown>
        </div>
        <div class="row">
            <font class="col-1">slot:</font>
            <b-dropdown class="col-auto">
                <b-dropdown-header text="header text"></b-dropdown-header>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item-text text="text"></b-dropdown-item-text>
                <b-dropdown-item text="item text"></b-dropdown-item>
                <b-dropdown-item text="active text" active></b-dropdown-item>
                <b-dropdown-item text="disabled text" disabled></b-dropdown-item>
                <b-dropdown-item text="href text" href="#"></b-dropdown-item>
            </b-dropdown>
        </div>
        <div class="row">
            <font class="col-1">trigger:</font>
            <b-dropdown class="col-auto" trigger="trigger text">
                <b-dropdown-item text="item text"></b-dropdown-item>
            </b-dropdown>
        </div>
        <div class="row">
            <font class="col-1">trigger(2):</font>
            <b-dropdown class="col-auto">
                <template #trigger>
                    you can add anlything text or DOM
                </template>
                <b-dropdown-item text="item text"></b-dropdown-item>
            </b-dropdown>
        </div>
        <div class="row">
            <font class="col-1">hide-toggle:</font>
            <b-dropdown class="col-auto" hide-toggle>
                <b-dropdown-item text="item text"></b-dropdown-item>
            </b-dropdown>
        </div>
        <div class="row">
            <font class="col-1">menu-weight:</font>
            <b-dropdown class="col-11" menu-weight>
                <b-dropdown-item text="item text"></b-dropdown-item>
            </b-dropdown>
        </div>
        <h2>b-dropdownlist</h2>
        <hr>
        <div class="row">
            <font class="col-1">default:</font>
            <b-dropdiwnlist class="col-11"></b-dropdiwnlist>
        </div>
        <div class="row">
            <font class="col-1">hide-null:</font>
            <b-dropdiwnlist class="col-11" hide-null></b-dropdiwnlist>
        </div>
        <div class="row">
            <font class="col-1">disabled:</font>
            <b-dropdiwnlist class="col-11" disabled></b-dropdiwnlist>
        </div>
        <div class="row">
            <font class="col-1">list:</font>
            <b-dropdiwnlist class="col-11" :list="list"></b-dropdiwnlist>
        </div>
        <div class="row">
            <font class="col-1">search:</font>
            <b-dropdiwnlist class="col-11" :list="list" search></b-dropdiwnlist>
        </div>
        <div class="row">
            <font class="col-1">value:</font>
            <b-dropdiwnlist class="col-11" :list="list" value="value1"></b-dropdiwnlist>
        </div>
        <div class="row">
            <font class="col-1">row:</font>
            <b-dropdiwnlist class="col-11" :list="list" value="value5" row="3"></b-dropdiwnlist>
        </div>
        <div class="row">
            <font class="col-1">v-model<br />{{ value1 }}:</font>
            <b-dropdiwnlist class="col-11" :list="list" v-model="value1"></b-dropdiwnlist>
        </div>
        <div class="row">
            <font class="col-1">info:</font>
            <b-dropdiwnlist class="col-11" :list="list" info="info text"></b-dropdiwnlist>
        </div>
        <div class="row">
            <font class="col-1">required:</font>
            <b-dropdiwnlist class="col-11" :list="list" required></b-dropdiwnlist>
        </div>
        <div class="row">
            <font class="col-1">success<br />error:</font>
            <b-dropdiwnlist class="col-11" :list="list" invalidInfo="error" validInfo="success" required></b-dropdiwnlist>
        </div>
        <div class="row">
            <font class="col-1">success<br />error(2):</font>
            <b-dropdiwnlist class="col-11" :list="list" required>
                <template #invalid>
                    you can add anlything invalidInfo or DOM
                </template>
                <template #valid>
                    you can add anlything validInfo or DOM
                </template>
            </b-dropdiwnlist>
        </div>
    </div>
</template>

<script>
import BDropdown from '@/components/base/Bootstrap/Dropdown/b-dropdown.vue'
import BDropdownHeader from '@/components/base/Bootstrap/Dropdown/b-dropdown-header.vue'
import BDropdownItem from '@/components/base/Bootstrap/Dropdown/b-dropdown-item.vue'
import BDropdownItemText from '@/components/base/Bootstrap/Dropdown/b-dropdown-item-text.vue'
import BDropdownDivider from '@/components/base/Bootstrap/Dropdown/b-dropdown-divider.vue'

import BDropdiwnlist from '@/components/base/Bootstrap/Dropdownlist/b-dropdownlist.vue'

export default {
    name: 'b-dropdown-demo',
    components: { BDropdown, BDropdownHeader, BDropdownItem, BDropdownItemText, BDropdownDivider, BDropdiwnlist, },
    data () {
        return {
            list: [
                { value: 'value1', text: "text1", },
                { value: 'value2', text: "text2", },
                { value: 'value3', text: "text3", },
                { value: 'value4', text: "text4", },
                { value: 'value5', text: "text5", },
                { value: 'value6', text: "disabled", disabled: true},
            ],
            list2: [
                { header: 'header text', divider: true,  text: "text", item: 'item', },
                { divider: true, text: "text", item: 'item', },
                { text: "text", item: 'item', },
                { value: 'value', },
                { value: 'a item', href: "#" },
                { value: 'btuuon active item', active: true,},
                { value: 'btuuon disabled item', disabled: true,},
                { value: 'a active', href: "#", active: true, },
                { value: 'a disabled', href: "#", disabled: true, },
            ],
            value1: 'value1',
        }
    },
}
</script>
