<template>
    <th 
        v-if="!hideSelect" 
        class="align-middle"
        data-type="select" >
        <b-checkbox class="text-center" v-model="isChecked" />
    </th>
</template>

<script>
import BCheckbox from '@/components/base/Bootstrap/Form/CheckBox/b-checkbox.vue'

export default {
    name: 'table-select-td',
    components: { BCheckbox, },
    model: {
        prop: 'checked',
        event: 'tr:checked'
    },
    data () {
        return {
            isChecked: this.checked
        }
    },
    props: {
        checked: Boolean,
        hideSelect: Boolean,
    },
    watch: {
        checked: function (value) {
            this.isChecked = value
        },
        isChecked: function (value) {
            this.$emit('tr:checked', value)
        },
    },
}
</script>