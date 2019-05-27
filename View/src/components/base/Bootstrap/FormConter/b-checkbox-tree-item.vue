<template>
    <div>
        <div class="d-table-row" @click.stop="open = !open">
            <div class="d-table-cell" style="width: 15px">
                <i v-if="isFolder" class="fas" :class="open ? 'fa-caret-down' : 'fa-caret-right'"></i>
            </div>
            <checkbox 
                :id="item.id" 
                class="d-table-cell" 
                v-bind="$attrs" 
                :color="color" 
                :text-color="textColor" 
                :text="item.text" 
                :value="item.value" 
                :checked="checked" 
                :disabled="item.disabled" 
                :aria-disabled="item.disabled" 
                :indeterminate="indeterminate" 
                v-on="inputListeners" 
                @change.stop="change"></checkbox>
        </div>
        <template v-if="item.children">
            <item 
                class="mx-4" 
                v-for="(child, index) in item.children" 
                :key="index"
                v-show="open" 
                :item="child" 
                :checkAll="isCheckAll" 
                v-model="checkedValues" ></item>
        </template>
    </div> 
</template>

<script>
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

import checkbox from './b-checkbox'

export default {
    name: 'b-checkbox-tree-item',
    inheritAttrs: false,
    mixins: [ utilities.mixins.form.base,],
    components: { checkbox, item: () => import('./b-checkbox-tree-item') },
    model: {
        prop: 'checkedValues',
        event: 'change',
    },
    data () {
        return {
            open: false,
        }
    },
    props: {
        item: utilities.props.item,
        checkAll: {
            type: Boolean,
            default: false,
        },
        checkedValues: utilities.props.list,
    },
    computed: {
        isFolder: function () {
            return this.item.children && this.item.children.length && this.item.children.length > 0
        },
        itemCheckedValues: function () {
            debugger
            let values = []
            if (!this.isFolder) return values
            for (const child of this.item.children) {
                if (this.checkedValues.includes(child.value)) values.push(child.value)
            }
            return values
        },
        indeterminate: function () {
            if (!this.itemCheckedValues || this.itemCheckedValues.length == 0) {
                return 0 // 未选择
            } else if (this.itemCheckedValues.length == this.item.children.length) {
                return 2 // 全选
            } else {
                return 1 // 部分选择
            }
        },
        isCheckAll: function () {
            if (this.isFolder) {
                if (this.checkedValues.includes(this.item.value)) {
                    for (const child of this.item.children) {
                        util.array.push(this.checkedValues, child.value)
                    }
                }
                return this.checkedValues.includes(this.item.value)
            }
            return false
        },
        checked: function () {
            return this.checkAll ? true : this.checkedValues.includes(this.item.value)
        },
        inputListeners: function () {
            var vm = this
            // `Object.assign` 将所有的对象合并为一个新对象
            return Object.assign({},
                // 我们从父级添加所有的监听器
                this.$listeners,
                // 然后我们添加自定义监听器，
                // 或覆写一些监听器的行为
                {
                    // 这里确保组件配合 `v-model` 的工作
                    change: function () {
                        vm.$emit('change', vm.checkedValues)
                    }
                }
            )
        },
    },
    methods: {
        change: function (e) {
            this.getCheckedValues(e)
        },
        getCheckedValues: function (e) {
            if (e.target.checked) {
                if (!this.isFolder) {
                    this.checkedValues.push(e.target.value)
                } else {
                    util.array.splice(this.checkedValues, e.target.value)
                    for (const child of this.item.children) {
                        util.array.push(this.checkedValues, child.value)
                    }
                }
            } else {
                util.array.splice(this.checkedValues, e.target.value)
                if (this.isFolder) {
                    for (const child of this.item.children) {
                        util.array.splice(this.checkedValues, child.value)
                    }
                }
            }
        },
    },
}
</script>