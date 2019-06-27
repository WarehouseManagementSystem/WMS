<template>
    
</template>

<script>
import dropdownList from '@/components/base/Bootstrap/Dropdownlist/b-dropdownlist.vue'

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
            default: function () {
                return new Date().getMonth() + 1
            },
            validator: function (value) {
                return /^[1-9]\d*$/.test(value) && value > 0 && value < 23
            },
        },
        start: {
            type: Number,
            validator: function (value) {
                return /^[1-9]\d*$/.test(value) && value > 0 && value < 23
            },
        },
        end: {
            type: Number,
            validator: function (value) {
                return /^[1-9]\d*$/.test(value) && value > 0 && value < 23
            },
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
