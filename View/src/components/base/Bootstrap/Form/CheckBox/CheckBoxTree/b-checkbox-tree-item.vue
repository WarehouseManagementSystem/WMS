<template>
    <div>
         <div class="d-table-row" @click.stop="open = !open">
            <div class="d-table-cell" style="width: 15px">
                <i v-if="isFolder" class="fas" :class="open ? 'fa-caret-down' : 'fa-caret-right'"></i>
            </div>
            <BCheckbox 
                class="d-table-cell" 
                ref="checkbox"
                :value="item.value"
                :label="item.label" 
                :disabled="disabledCheckbox" 
                :indeterminate="indeterminate" 
                :defaultState="defaultState" 
                v-model="checked"
                @input="changed = true" />
        </div>
        <BCheckboxTree
            class="mx-4" 
            v-if="isFolder && (open || changed)" 
            v-show="open" 
            :list="item.children" 
            :checked="checked" 
            :disabled="disabledCheckboxTree" 
            v-model="values" />
    </div>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import BCheckbox from '@/components/base/Bootstrap/Form/CheckBox/b-checkbox.vue'

export default {
    name: 'b-checkbox-tree-item',
    components: { BCheckbox, BCheckboxTree: () => import('./b-checkbox-tree') },
    model: {
        prop: 'values',
        event: 'input',
    },
    data () {
        return {
            open: false,
            checked: false,
            changed: false,
            defaultState: false,
        }
    },
    props: {
        item: utilities.props.item,
        disabled: utilities.props.disabled,
        isChecked: Boolean,
        values: Array,
    },
    computed: {
        isFolder: function () {
            return this.item.children && this.item.children.length && this.item.children.length > 0
        },
        disabledCheckbox: function () {
            return this.disabled || this.item.disabled || this.item.children && !(this.item.children.length || this.item.children.length > 0)
        },
        disabledCheckboxTree: function () {
            return this.disabled || this.item.disabled
        },
        indeterminate: function () {
            if (!this.isFolder || !this.values) return
            if (this.checked) return 2
            const c = this.item.children.map(e => e.value)
            let n = this.valuesMap.filter(e=> c.includes(e)).length
            if (n == 0) return 0
            else if (n == this.item.children.length) return 2
            else return 1
        },
        valuesMap: function () {
            return this.values && this.values.map && this.values.map(e => e.value)
        },
    },
    mounted () {
        if (this.values && this.values.map && !this.isFolder)
            this.defaultState = this.values.map(e => e.value).includes(this.item.value)
        this.checked = this.defaultState || this.indeterminate == 2
    },
    methods: {
        push: function (arr, item) {
            if (!this.valuesMap.includes(item.value))
                arr.push(item)
        },
        splice: function (arr, item) {
            if (this.valuesMap.includes(item))
                arr.splice(this.valuesMap.indexOf(item), 1);
        },
    },
    watch: {
        isChecked: function (val) {
            this.checked = val
        },
        checked: function (val) {
            if (this.disabledCheckboxTree) return
            if (val) {
                if (!this.isFolder) {
                    this.push(this.values, { value: this.item.value, label: this.item.label})
                }
            } else {
                this.splice(this.values, this.item.value)
            }
            this.$emit('input', this.values)
        },
    }
}
</script>
