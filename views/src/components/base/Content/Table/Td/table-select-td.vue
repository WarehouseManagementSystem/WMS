<template>
    <th 
        v-if="!hideSelect" 
        class="d-print-none align-middle"
        data-type="select" >
        <b-checkbox class="text-center" v-model="isSelected" />
    </th>
</template>

<script>
import BCheckbox from '@/components/base/Bootstrap/Form/CheckBox/b-checkbox.vue'

export default {
    name: 'table-select-td',
    components: { BCheckbox, },
    model: {
        prop: 'selected',
        event: 'tr:selected'
    },
    data () {
        return {
            isSelected: this.selected
        }
    },
    props: {
        selected: Boolean,
        hideSelect: Boolean,
    },
    watch: {
        selected: function (value) {
            this.isSelected = value
        },
        isSelected: function (value) {
            this.$emit('tr:selected', value)
        },
    },
}
</script>