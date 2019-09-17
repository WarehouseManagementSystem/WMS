<template>
    <option 
        v-if="!item.children" 
        :value="item.value" 
        :selected="isSelected(item.value)"
        :aria-selected="isSelected(item.value)"
        :disabled="item.disabled"
        :aria-disabled="item.disabled" >
        {{ item.text || item.value }}
    </option>
    <optgroup
        v-else
        :label="item.label" 
        :disabled="item.disabled" 
        :aria-disabled="item.disabled" >
        <b-select-option v-for="(child, index) in item.children" :key="index" :item="child" :isSelectedValue="isSelectedValue" :multiple="multiple" />
    </optgroup>
    
    
</template>

<script>
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-select-option',
    components: { BSelectOption: () => import('./b-select-option.vue') },
    props: {
        item: utilities.props.item,
        isSelectedValue: [ String, Number, Array, ],
        multiple: Boolean,
    },
    methods: {
        isSelected: function (val) {
            return this.multiple ? this.isSelectedValue.includes(val) : this.isSelectedValue == val
        },
    },
}
</script>