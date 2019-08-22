<template>
    <div>
        <h2>v-tip('tooltip', 'popover')</h2>
        <hr>
        <div class="row py-1">
            <font class="col-1">default:</font>
            <b-button class="col-auto" v-tip>nothing</b-button>
            <font class="col-1">tooltip:</font>
            <b-button class="col-auto" v-tip:tooltip="text">hover to show tooltip</b-button>
            <input v-model='text' /> {{ text }}
            <font class="col-1">popover:</font>
            <b-button class="col-auto" v-tip:popover="'this is popover'">click to show popover</b-button>
        </div>
        <div class="row py-1">
            <font class="col-1">content:</font>
            <font class="col-1">tooltip:</font>
            <b-button class="col-auto" v-tip:tooltip="{content: 'this is tooltip`s content'}">hover to show tooltip</b-button>
            <font class="col-1">popover:</font>
            <b-button class="col-auto" v-tip:popover="{content: 'this is popover`s content'}">click to show popover</b-button>
        </div>
        <div class="py-1">
            <font class="col-1">placement:</font>
            <div class="col-11">
                <div class="row py-1">
                    <font class="col-1">tooltip:</font>
                    <font class="col-1">top:</font>
                    <b-button class="col-1" v-tip:tooltip.top="{content: 'default placement is top'}">hover</b-button>
                    <font class="col-1">bottom:</font>
                    <b-button class="col-1" v-tip:tooltip.bottom="{content: 'placement is bottom'}">hover</b-button>
                    <font class="col-1">left:</font>
                    <b-button class="col-1" v-tip:tooltip.left="{content: 'placement is left'}">hover</b-button>
                    <font class="col-1">right:</font>
                    <b-button class="col-1" v-tip:tooltip.right="{content: 'placement is right'}">hover</b-button>
                </div>
                <div class="row py-1">
                    <font class="col-1">popover:</font>
                    <font class="col-1">top:</font>
                    <b-button class="col-1" v-tip:popover.top="{content: 'default placement is top'}">click</b-button>
                    <font class="col-1">bottom:</font>
                    <b-button class="col-1" v-tip:popover.bottom="{content: 'placement is bottom'}">click</b-button>
                    <font class="col-1">left:</font>
                    <b-button class="col-1" v-tip:popover.left="{content: 'placement is left'}">click</b-button>
                    <font class="col-1">right:</font>
                    <b-button class="col-1" v-tip:popover.right="{ content: 'placement is right'}">click</b-button>
                </div>
            </div>
        </div>
        <div class="row py-1">
            <font class="col-1">title:</font>
            <font class="col-1">popover(only):</font>
            <b-button class="col-auto" v-tip:popover="{title: 'popover`s title', content: 'this is popover`s content'}">click to show popover</b-button>
        </div>
        <div class="row py-1">
            <font class="col-1">trigger:</font>
            <font class="col-1">popover(only):</font>
            <a tabindex="0" class="btn btn-primary" role="button" v-tip:popover="{trigger: 'focus', content: 'this is popover`s content just for <a>'}">Dismissible popover</a>
        </div>
        <div class="row py-1">
            <font class="col-1">disabled tag:</font>
            <font class="col-1">popover(only):</font>
            <span class="col-auto d-inline-block" v-tip:popover="'disabled popover'">
                <b-button style="pointer-events: none;" disabled>Disabled button</b-button>
            </span>
        </div>
    </div>
</template>

<script>
import BButton from '@/components/base/Bootstrap/Button/b-button.vue'

export default {
    name: 'b-tooltip-demo',
    components: { BButton, },
    data () {
        return {
            text: 'disabled value'
        }
    }
    
}
</script>