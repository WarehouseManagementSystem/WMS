<template>
    <div>
        <c-table tableStriped tableHover theadSticky tableBordered theadTheme="dark" selectStatus="0" v-model="selectedOptions" :list="list"  />
    </div>
    
</template>

<script>
import CTable from '@/components/base/Content/GridView/grid-view.vue'

export default {
    name: 'c-table-demo',
    components: { CTable, },
    data () {
        return {
            selectedOptions: null,
            list: {
                head: [
                    { title: 'id', field: 'id', colClass: 'bg-info', colStyle: "width: 58px;", },
                    { title: '1', field: '1', children: [
                        { title: '1-1', field: '1-1', hildren: [
                            { title: '1-1-1', field: '1-1-1', },
                            { title: '1-1-2', field: '1-1-2', },
                        ], },
                        { title: '1-2', field: '1-2', children: [
                            { title: '1-2-1', field: '1-2-1', hildren: [
                                { title: '1-2-1-1', field: '1-2-1-1', },
                                { title: '1-2-1-2', field: '1-2-1-2', },
                            ],},
                            { title: '1-2-2', field: '1-2-2', hildren: [
                                { title: '1-2-2-1', field: '1-2-2-1', },
                                { title: '1-2-2-2', field: '1-2-2-2', hildren: [
                                    { title: '1-2-2-2-1', field: '1-2-2-2-1', },
                                    { title: '1-2-2-2-2', field: '1-2-2-2-2', },
                                ],},
                            ], },
                        ], },
                        { title: '1-3', field: '1-3', hildren: [
                            { title: '1-3-1', field: '1-3-1', },
                            { title: '1-3-2', field: '1-3-2', },
                        ],},
                    ]},
                    // { title: 'name', field: 'name',colStyle: "width: 100px;", cellStyle: {class: 'text-center'}, format: value => 'name_' + value, },
                    { title: 'sex', field: 'sex', colStyle: "width: 100px;", },
                    
                    { title: 'age', field: 'age', colStyle: "width: 58px;",  cellStyle: value => {return { class: Number(value) ? 'bg-success' : 'bg-danger' }}},
                ],
                operate: { index: 2, value: [ 'check', 'view', 'edit', 'delete', 'flow' ], },
                rowStyle: {
                    class: function (row) {
                        if (row && row.age && Number(row.age) == 5) return 'text-warning'
                    }
                },
                data: [
                    { id: 'id_1', name: 'mack', sex: 'man', age: 10, },
                    { 
                        id: { value: 'id_2', class: 'text-info',}, 
                        name: { value: 'jack', class: 'text-info',}, 
                        sex: 'man',
                        age: 10,
                    },
                    { id: 'id_3', name: 'mack', sex: 'man',  },
                    { id: 'id_4', name: 'mack', sex: 'man', age: 5, },
                    { id: 'id_5', name: 'mack', sex: 'man', age: 5, },
                    { id: 'id_6', name: 'mack', sex: 'man', age: 10, $class: 'text-primary' },
                    { id: 'id_7', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_8', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_9', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_3', name: 'mack', sex: 'man',  },
                    { id: 'id_4', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_5', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_6', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_7', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_8', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_9', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_3', name: 'mack', sex: 'man',  },
                    { id: 'id_4', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_5', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_6', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_7', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_8', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_9', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_3', name: 'mack', sex: 'man',  },
                    { id: 'id_4', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_5', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_6', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_7', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_8', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_9', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_3', name: 'mack', sex: 'man',  },
                    { id: 'id_4', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_5', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_6', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_7', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_8', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_9', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_3', name: 'mack', sex: 'man',  },
                    { id: 'id_4', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_5', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_6', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_7', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_8', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_9', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_3', name: 'mack', sex: 'man',  },
                    { id: 'id_4', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_5', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_6', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_7', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_8', name: 'mack', sex: 'man', age: 10, },
                    { id: 'id_9', name: 'mack', sex: 'man', age: 10, },
                ]
            }
        }
    },
}
</script>