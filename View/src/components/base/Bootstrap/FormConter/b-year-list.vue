<template>
    <dropdownList v-model="selectValue" :list="list" @change="change" hide-null></dropdownList>
</template>
<script>
import dropdownList from './b-dropdownlist'

export default {
    name: 'b-year-list',
    components: { dropdownList },
    model: {
        prop: 'value',
        event: 'change',
    },
    data () {
        return {
            selectValue: this.value,
        }
    },
    props: {
        value: {
            type: Number,
            default: function () {
                return new Date().getFullYear()
            },
            valide: function (value) {
                return /^[1-9]\d*$/.test(value)
            },
        },
    },
    computed: {
        list: function () {
            let year = new Date().getFullYear() - 50
            let list = []
            for (let n = 0; n < 100; n++) {
                year ++
                list.push({text: year, value: year, })
            }
            return list
        },
    },
    methods: {
        change: function () {
            // 配合 v-model
            this.$emit('change', this.selectValue)
        },
    }
}
</script>
