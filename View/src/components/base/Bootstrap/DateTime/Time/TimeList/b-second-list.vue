<template>
    <dropdown-list v-model="selectValue" :list="list" @change="change" hide-null></dropdown-list>
</template>

<script>
import dropdownList from '@/components/base/Bootstrap/DropdownList/b-dropdownlist.vue'

export default {
    name: 'b-second-list',
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
            default: () => new Date().getSeconds(),
            validator: value => !isNaN(value) && value >= 0 && value < 60,
        },
        start: {
            type: Number,
            validator: value => !isNaN(value) && value >= 0 && value < 60,
        },
        end: {
            type: Number,
            validator: value => !isNaN(value) && value >= 0 && value < 60,
        },
    },
    computed: {
        list: function () {
            let list = []
            for (let n = 0; n < 60; n++) {
                let second = n
                list.push(
                    (second < this.start || second > this.end) 
                        ? {text: second, value: second, disabled: true } 
                        : {text: second, value: second, }
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
    },
}
</script>
