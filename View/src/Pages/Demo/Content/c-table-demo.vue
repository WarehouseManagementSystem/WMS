<template>
    <div>
        <c-table striped hover theadSticky tableBordered theadTheme="dark" selectStatus="2" @selected="selected(row)"  :list="list"  />
    </div>
    
</template>

<script>
import CTable from '@/components/base/Content/Table/c-table.vue'

export default {
    name: 'c-table-demo',
    components: { CTable, },
    data () {
        return {
            opt: [],
            list: {
                head: [
                    { title: 'id', field: 'id', colClass: 'text-center', colStyle: "width: 58px;", },
                    { title: 'name', field: 'name', },
                    { title: 'sex', field: 'sex', },
                    { title: 'age', field: 'age', },
                ],
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
    methods: {
        trClick: function (row) {
            
            let json = JSON.stringify(row)
            alert(json)
        },
        selected: function (opt) {
            this.opt = opt
        }
    }
}
</script>