<template>
    <div style="cursor: default;" >
        <div 
            class="d-table-row d-flex align-items-center" 
            :class="objClass" 
            :style="objStyle" 
            ref="dropzone"
            :draggable="canDrap" 
            @click.stop="clickOnItem" 
            @dblclick.stop="dblclickOnItem" 
            @dragstart="dragstart" 
            @dragend="dragend" 
            @dragexit="dragexit" 
            @dragover="dragover" 
            @dragenter.stop
            @dragleave="dragleave" >
            <div class="d-table-cell pl-1" :class="labelChecked ? 'text-light bg-primary' : 'text-secondary'"  @click.stop="open = !open">
                <div v-if="isFolder">
                    <i class="mr-2" :class="open ? icon.caretDown : icon.caretRight" style="width: 10px" @dblclick.stop />
                    <i class="mr-2" :class="open ? icon.folderOpen : icon.folder"  @click.stop />
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

// drop
// https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API
// https://developer.mozilla.org/zh-CN/docs/Web/API/Document/drop_event

export default {
    name: 'c-tree-item',
    components: { CTree: () => import('./c-tree'), BText, },
    data () {
        return {
            open: this.item.open,
            labelChecked: false,
            editItem: false, // 编辑
            editError: false, // 编辑错误
            dropStatus: 'default', // 拖拽状态
            // default: 默认, start: 开示, end: 结束, top: 上部, bottom: 下部
            timer: null, // 停留计时器
        }
    },
    props: {
        item: utilities.props.item,
        status: Number,
        disDrap: Boolean,
    },
    computed: {
        icon: function () {
            return config.ui.icon
        },
        objClass: function () {
            let beChecked = this.labelChecked ? 'text-light bg-primary' : ''
            let isDropzone = this.canDrap ? 'dropzone' : ''
            return `${beChecked} ${isDropzone}`
        },
        objStyle: function () {
            switch (this.dropStatus) {
                case 'default': return ''
                case 'start': return 'opacity: .5'
                default: return ''
            }
            return ''
        },
        isFolder: function () {
            return this.item.children
        },
        canEdit: function () {
            return this.status == 1 && !this.disabled
        },
        canDrap: function () {
            return this.canEdit && !this.disDrap
        },
    },
    mounted () {
        if (this.canEdit) document.addEventListener('click', this.hideEditor)
    },
    destroyed () {
        if (this.canEdit) document.removeEventListener('click', this.hideEditor)
    },
    methods: {
        clickOnItem: function () {
            this.labelChecked = true
            if (this.editItem) this.hideEditor()
            this.$emit('item:selected', this.item)
        },
        dblclickOnItem: async function () {
            if (this.canEdit) {
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
        dragstart: function () {
            this.dropStatus = 'start'
        },
        dragend: function () {
            this.dropStatus = 'end'
             if (this.$store.state.timer) this.$store.commit('stopTimer')
        },
        dragexit: function () {
            this.dropStatus = 'end'
            if (this.$store.state.timer) this.$store.commit('stopTimer')
        },
        dragover: function (event) {
            if (this.dropStatus == 'start') return
            let target = this.$refs.dropzone // this.getDropzone(event.target)
            if (this.isFolder) {
                if (!this.$store.state.timer) {
                    util.dom.addClass(target, 'bg-light')
                    this.$store.commit('startTimer', {cellback: () => this.open = true, })
                }
            } else {
                let currentTarget = event.currentTarget || undefined
                if (currentTarget) this.dropStatus = event.y - currentTarget.offsetTop < currentTarget.offsetHeight / 2 ? 'top' : 'bottom'
                util.dom.addClass(target, 'border-primary')
                util.dom.removeClass(target, `border-top`)
                util.dom.removeClass(target, `border-bottom`)
                util.dom.addClass(target, `border-${this.dropStatus}`)
            }
        },
        dragleave: function (event) {
            if (this.dropStatus == 'start') return
            let target = this.$refs.dropzone // this.getDropzone(event.target)
            util.dom.removeClass(target, 'border-primary')
            util.dom.removeClass(target, `border-top`)
            util.dom.removeClass(target, `border-bottom`)
            util.dom.removeClass(target, 'bg-light')
            this.dropStatus = 'default'
            if (this.isFolder && this.$store.state.timer) this.$store.commit('stopTimer')
        },
        getDropzone: function (event) {
            return util.dom.hasClass(event, 'dropzone') ? event : this.getDropzone(event.parentElement)
        },
    },
}

</script>