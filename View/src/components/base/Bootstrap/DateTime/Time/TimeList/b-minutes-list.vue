<template>
    <dropdownList v-model="selectValue" :list="list" @change="change" hide-null></dropdownList>
</template>

<script>
import dropdownList from '@/components/base/Bootstrap/Dropdownlist/b-dropdownlist.vue'

export default {
    name: 'b-minutes-list',
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
                return new Date().getMinutes()
            },
            validator: function (value) {
                return /^[0-9]\d*$/.test(value) && value >= 0 && value < 60
            },
        },
        start: {
            type: Number,
            validator: function (value) {
                return /^[0-9]\d*$/.test(value) && value >= 0 && value < 60
            },
        },
        end: {
            type: Number,
            validator: function (value) {
                return /^[0-9]\d*$/.test(value) && value >= 0 && value < 60
            },
        },
    },
    computed: {
        list: function () {
            let list = []
            for (let n = 0; n < 60; n++) {
                let minutes = n
                list.push(
                    (minutes < this.start || minutes > this.end) 
                        ? {text: minutes, value: minutes, disabled: true } 
                        : {text: minutes, value: minutes, }
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
