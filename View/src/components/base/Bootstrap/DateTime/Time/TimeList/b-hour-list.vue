<template>
    <dropdown-list v-model="selectValue" :list="list" @change="change" hide-null></dropdown-list>
</template>

<script>
import dropdownList from '@/components/base/Bootstrap/DropdownList/b-dropdownlist.vue'

export default {
    name: 'b-hour-list',
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
            default: () => new Date().getHours(),
            validator: value => !isNaN(value) && value > 0 && value < 23,
        },
        start: {
            type: Number,
            validator: value => !isNaN(value) && value > 0 && value < 23,
        },
        end: {
            type: Number,
            validator: value => !isNaN(value) && value > 0 && value < 23,
        },
    },
    computed: {
        list: function () {
            let list = []
            for (let n = 0; n < 23; n++) {
                let hour = n + 1
                list.push(
                    (hour < this.start || hour > this.end) 
                        ? {text: hour, value: hour, disabled: true } 
                        : {text: hour, value: hour, }
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
