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
                :value="item.value" 
                :text="item.text ? item.text : item.value" 
                :checked="isChecked" 
                :disabled="disabled ? disabled : item.disabled" 
                :indeterminate="indeterminate" 
                v-on="inputListeners" ></checkbox>
        </div>
        <template v-if="item.children">
            <item 
                class="mx-4" 
                v-for="(child, index) in item.children" 
                :key="index" 
                ref="child"
                :item="child" 
                :checked="isChecked" 
                :disabled="disabled ? disabled : item.disabled" 
                v-show="showFirstNode ? showFirstNode : open" 
                v-model="checkedValues" ></item>
        </template>
    </div> 
</template>

<script>
import utilities from '@/components/utilities/index.js'

import checkbox from '../b-checkbox'

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
        checked: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        showFirstNode: {
            type: Boolean,
            default: false,
        },
        checkedValues: utilities.props.list,
    },
    computed: {
        isFolder: function () {
            return this.item.children && this.item.children.length && this.item.children.length > 0
        },
        isChecked: function () {
            return this.checkedValues.includes(this.item.value) || this.checked
        },
        indeterminate: function () {
            // 0 - 未 选 择
            // 1 - 部分选择
            // 2 - 全选
            if (this.isChecked) return 2
            if (this.isFolder) {
                let n = 0
                for (const child of this.item.children) {
                    if (this.checkedValues.includes(child.value)) {
                        n++
                    }
                }
                if (n == 0) return 0
                else if (n == this.item.children.length) return 2
                else return 1
            }
            return 0
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
}
</script>