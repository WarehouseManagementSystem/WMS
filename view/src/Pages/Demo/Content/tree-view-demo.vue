<template>
    <tree-view :list="list" status="1" v-model="selected" />
</template>

<script>
import TreeView from '@/components/base/Content/TreeView/tree-view.vue'

export default {
    name: 'tree-view-demo',
    components: { TreeView, },
    data () {
        return {
            selected: {},
            list: [
                { label: '1-a', value: '1-a', open: true,
                children: [
                    { label: '2-a', value: '2-a', },
                    { label: '2-b', value: '2-b', disabled: true},
                    { label: '2-c', value: '2-c', },
                    { label: '2-d', value: '2-d', },
                ],},
                { label: '1-b', value: '1-b', 
                children: [
                    { label: '3-a', value: '3-a', },
                    { label: '3-b', value: '3-b', 
                    children: [
                        { label: '3-1-0a', value: '3-1-0a', },
                        { label: '3-1-0b', value: '3-1-0b', },
                        { label: '3-1-0c', value: '3-1-0c', },
                        { label: '3-1-0d', value: '3-1-0d', },
                        { label: '3-1-0f', value: '3-1-0f', },
                        { label: '3-1-0g', value: '3-1-0g', },
                        { label: '3-1-0h', value: '3-1-0h', },
                        { label: '3-1-0i', value: '3-1-0i', },
                        { label: '3-1-0j', value: '3-1-0j', },
                        { label: '3-1-0k', value: '3-1-0k', },
                    ]},
                    { label: '4-b', value: '4-b', 
                    children: [
                        { label: '4-1-a', value: '4-1-a', },
                        { label: '4-1-b', value: '4-1-b', },
                        { label: '4-1-c', value: '4-1-c', },
                        { label: '4-1-d', value: '4-1-d', },
                    ]},
                ]},
            ],
            list2: [
                { label: '1-a', value: '1-a', inline: true,
                children: [
                    { label: '2-a', value: '2-a', },
                    { label: '2-b', value: '2-b', },
                    { label: '2-c', value: '2-c', },
                    { label: '2-d', value: '2-d', },
                ],},
                { label: '1-b', value: '1-b', 
                children: [
                    { label: '3-a', value: '3-a', },
                    { label: '3-b', value: '3-b', 
                    children: [
                    { label: '3-1-a', value: '3-1-a', },
                    { label: '3-1-b', value: '3-1-b', },
                    { label: '3-1-c', value: '3-1-c', },
                    { label: '3-1-d', value: '3-1-d', },
                ]},
                    { label: '3-c', value: '3-c', },
                    { label: '3-d', value: '3-d', },
                ]},
                { label: '1-c', value: '1-c', },
                { label: '1-d', value: '1-d', children: [
                    { label: '4-a', value: '4-a', },
                    { label: '4-b', value: '4-b', },
                    { label: '4-c', value: '4-c', },
                    { label: '4-d', value: '4-d', },
                ]},
            ],
        }
    }
}
</script>