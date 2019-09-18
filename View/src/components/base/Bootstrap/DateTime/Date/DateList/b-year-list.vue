<template>
    <dropdown-list v-model="selectValue" :list="list" @change="change" hide-null></dropdown-list>
</template>
<script>
import dropdownList from '@/components/base/Bootstrap/DropdownList/b-dropdownlist.vue'

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
            default: () => new Date().getFullYear(),
            validator: value => !isNaN(value),
        },
        start: {
            type: Number,
            validator: value => !isNaN(value),
        },
        end: {
            type: Number,
            validator: value => !isNaN(value),
        },
    },
    computed: {
        list: function () {
            let year = new Date().getFullYear() - 50
            let list = []
            for (let n = 0; n < 100; n++) {
                year ++
                list.push(
                    (year < this.start || year > this.end) 
                        ? {text: year, value: year, disabled: true,} 
                        : {text: year, value: year, }
                )
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
