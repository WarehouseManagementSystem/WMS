<template>
    <th 
        class="align-middle text-center"
        style="width: 45px;"
        data-type="select" >
        <b-checkbox v-model="isChecked" />
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