<template>
    <div>
        <c-table striped hover theadSticky tableBordered theadTheme="dark" selectStatus="2" v-model="selectedOptions" :list="list"  />
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
                    { title: 'id', field: 'id', colClass: 'text-center', colStyle: "width: 58px;", },
                    { title: 'name', field: 'name', children: [
                            { title: 'first name', field: 'first name', },
                            { title: 'last name', field: 'last name', children: [
                                { title: 'first name1', field: 'first name1', },
                                { title: 'last name1', field: 'last name1', },
                            ]},
                        ]},
                    { title: 'sex', field: 'sex', },
                    { title: 'age', field: 'age', },
                ],
                operate: { index: 1, value: [ 'check', 'view', 'edit', 'delete', 'flow' ], },
                data: [
                    { 
                        id: 'id_1',
                        name: 'mack',
                        sex: 'man',
                        age: 10,
                    },
                    { 
                        id: { value: 'id_2', class: 'text-info'}, 
                        name: { value: 'jack', class: 'text-info'}, 
                        sex: 'man',
                        age: 10,
                    },
                    { 
                        id: 'id_3', 
                        name: 'mack',
                        sex: 'man',
                        age: 10,
                    },
                ]
            }
        }
    },
}
</script>