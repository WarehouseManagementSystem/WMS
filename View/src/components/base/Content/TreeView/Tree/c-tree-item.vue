<template>
    <div style="cursor: default;" >
        <div class="d-table-row d-flex align-items-center" :class="labelChecked ? 'text-light bg-primary' : ''" @click.stop="clickOnItem"  @dblclick.stop="dblclickOnItem">
            <div class="d-table-cell pl-1" :class="labelChecked ? 'text-light bg-primary' : 'text-secondary'">
                <div v-if="isFolder" @click="open = !open">
                    <i class="mr-2" :class="open ? icon.caretDown : icon.caretRight" style="width: 10px" />
                    <i class="mr-2" :class="open ? icon.folderOpen : icon.folder" />
                </div>
                <i v-else class="mx-2" :class="icon.fileAlt"/>
            </div> <!-- icon -->
            <div class="d-table-cell pr-1">
                <font v-if="!editItem">{{ item.label }}</font>
                <b-text 
                    v-else 
                    ref="edior" 
                    size='sm' 
                    length="30" 
                    color="light" 
                    tempClass="p-0" 
                    required
                    v-model="item.label" 
                    @click.stop
                    @valid="editValid" 
                    @invalid="editInvalid" />
            </div> <!-- label or edit -->
        </div> <!-- item -->
        <c-tree 
            class="mx-3" 
            v-if="isFolder" 
            v-show="open" 
            :status="status" 
            :list="item.children" />
    </div>
</template>

<script>
import util from '@/util/index.js'
import config from '@/config/index.js'
import utilities from '@/components/utilities/index.js'

import BText from '@/components/base/Bootstrap/Form/b-text.vue'

export default {
    name: 'c-tree-item',
    components: { CTree: () => import('./c-tree'), BText, },
    data () {
        return {
            open: this.item.open,
            labelChecked: false,
            editItem: false, // 编辑
            editError: false, // 编辑错误
        }
    },
    props: {
        item: utilities.props.item,
        status: Number,
    },
    computed: {
        icon: function () {
            return config.ui.icon
        },
        isFolder: function () {
            return this.item.children
        },
    },
    mounted () {
        this.addClickEventListener()
    },
    destroyed () {
        if (this.status == 1) document.removeEventListener('click')
    },
    methods: {
        clickOnItem: function () {
            this.labelChecked = true
            if (this.editItem) this.hideEditor()
            this.$emit('item:selected', this.item)
        },
        dblclickOnItem: async function () {
            if (this.status == 1) {
                this.editItem = true
                await this.$nextTick()
                // 自动全选 editor 中的内容
                await util.document.setCursorPos(this.$refs.edior.$refs.text)
            }
        },
        editValid: function () {
            this.editError = false
        },
        editInvalid: function () {
            this.editError = true
        },
        hideEditor: function () {
            if (!this.editError) this.editItem = false
        },
        addClickEventListener: function () {
            if (this.status == 1) document.addEventListener('click', this.hideEditor)
        },
    },
}

</script>