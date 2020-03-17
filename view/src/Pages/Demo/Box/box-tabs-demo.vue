<template>
    <div>
        <h2>box-tabs</h2>
        <div>
            box-tab-list 的使用请参考 <a href="Demo-Base-b-nav">b-nav</a>
            <br />
            请勿加入 dropdown，这会对辅助技术用户不友好
        </div>
        <hr>
        <box-tab-list :list="list" />
        <box-tab-content>
            <box-tab-pane id="one" active>one</box-tab-pane>
            <box-tab-pane id="two">two</box-tab-pane>
            <box-tab-pane id="three">three</box-tab-pane>
        </box-tab-content>
        <hr>
        <div class="row mx-1">
            <box-tab-list class="col-2" column pills justified :list="list2" />
            <box-tab-content class="col-10">
                <box-tab-pane id="one2" active>one</box-tab-pane>
                <box-tab-pane id="two2">two</box-tab-pane>
                <box-tab-pane id="three2">three</box-tab-pane>
            </box-tab-content>
        </div>
        
    </div>
</template>

<script>
import BoxTabList from '@/components/Box/Tabs/box-tab-list.vue'
import BoxTabContent from '@/components/Box/Tabs/box-tab-content.vue'
import BoxTabPane from '@/components/Box/Tabs/box-tab-pane.vue';

export default {
    name: 'box-tabs-demo',
    components: { BoxTabList, BoxTabContent, BoxTabPane, },
    data () {
        return {
            list: [
                {text: 'one', href: '#one', active: true,},
                {text: 'two', href: '#two', active: false,},
                {text: 'three', href: '#three', active: false,},
            ],
            list2: [
                {text: 'one', href: '#one2', active: true,},
                {text: 'two', href: '#two2', active: false,},
                {text: 'three', href: '#three2', active: false,},
            ],
        }
    }
}
</script>