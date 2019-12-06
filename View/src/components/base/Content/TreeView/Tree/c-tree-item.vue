<template>
    <div>
        <div class="d-table-row d-flex align-items-center">
            <div class="d-table-cell text-secondary">
                <div v-if="isFolder" @click="open = !open">
                    <i class="mr-2" :class="open ? icon.caretDown : icon.caretRight" style="width: 10px" />
                    <i class="mr-2" :class="open ? icon.folderOpen : icon.folder" />
                </div>
                <i v-else class="mx-2" :class="icon.fileAlt"/>
            </div>
            <div class="d-table-cell" @dblclick.stop="dblclickOnLabel">
                <font v-if="!editItem">{{ item.label }}</font>
                <b-text tempClass="p-0" v-else v-model="item.label" size='sm' length="30" required @valid="editValid" @invalid="editInvalid" @click.stop="clickOnEdit" />
            </div>
        </div>
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
            editItem: false,
            editError: false,
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
        dblclickOnLabel: function () {
            if (this.status == 1) this.editItem = true
        },
        clickOnEdit: function (event) {
            util.document.setCursorPos(event.target)
        },
        editValid: function () {
            this.editError = false
        },
        editInvalid: function () {
            this.editError = true
        },
        addClickEventListener: function () {
            if (this.status == 1) document.addEventListener('click', () => {
                if (!this.editError) this.editItem = false
            })
        },
    },
}

</script>