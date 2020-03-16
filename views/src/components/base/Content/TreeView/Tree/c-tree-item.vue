<template>
    <div>
        <div 
            class="d-table-row d-flex align-items-center" 
            :class="objClass" 
            ref="dropzone"
            draggable="true" 
            @mouseenter="mouseenterOnItem" 
            @mouseleave="mouseleaveOnItem"
            @click.stop="clickOnItem" 
            @dblclick.stop="dblclickOnItem" 
            @dragstart="dragstart" 
            @dragover.prevent="dragover" 
            @dragleave="dragleave" 
            @dragend="dragend" 
            @dragexit="dragexit" 
            @drop.stop.prevent="drop" >
            <div class="d-table-cell pl-1" :class="itemClass"  @click.stop="open = !open">
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
                    @blur="editorBlur" 
                    @valid="editValid" 
                    @invalid="editInvalid" />
            </div> <!-- label or edit -->
        </div> <!-- item -->
        <c-tree 
            class="mx-3" 
            v-if="isFolder" 
            v-show="open" 
            :status="status" 
            :list="item.children"
            :primaryKey="primaryKey" 
            v-model="selectedOption" />
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
            selectedOption: this.selected,
            hover: false,
            editItem: false, // 编辑
            editError: false, // 编辑错误
            dropStatus: 'default', // 拖拽状态
            // default: 默认, start: 开始, end: 结束, top: 上部, bottom: 下部
        }
    },
    props: {
        item: utilities.props.item,
        status: Number,
        primaryKey: {
            type: String,
            default: 'id',
            require: true,
        },
        selected: Object,
    },
    computed: {
        icon: function () {
            return config.ui.icon
        },
        objClass: function () {
            let isHover = this.hover ? 'bg-light text-primary font-weight-bolder' : ''
            let beChecked = this.isSelected ? 'text-light bg-primary' : ''
            return `${beChecked} ${isHover}`
        },
        itemClass: function () {
            let beChecked = this.isSelected ? '' : 'text-secondary'
            return `${beChecked} `
        },
        isFolder: function () {
            return this.item.children
        },
        canEdit: function () {
            return this.status == 1 && !this.item.disabled
        },
        isSelected: function () {
            return this.selectedOption && this.item[this.primaryKey] && this.selectedOption[this.primaryKey] && this.selectedOption[this.primaryKey] == this.item[this.primaryKey]
        },
    },
    methods: {
        mouseenterOnItem: function () {
            if (!this.isSelected) this.hover = true
        },
        mouseleaveOnItem: function () {
            if (!this.isSelected) this.hover = false
        },
        clickOnItem: function () {
            this.hover = false
            this.selectedOption = this.item
        },
        dblclickOnItem: async function () {
            this.hover = false
            if (!this.canEdit) return
            this.editItem = true
            await this.$nextTick()
            // 自动全选 editor 中的内容
            await util.document.setCursorPos(this.$refs.edior.$refs.text)
        },
        editValid: function () {
            this.editError = false
        },
        editInvalid: function () {
            this.editError = true
        },
        editorBlur: function () {
            this.hideEditor()
        },
        hideEditor: function () {
            if (this.editItem && !this.editError) this.editItem = false
        },
        dragstart: function (event) {
            event.target.style.opacity = '.5'
            event.dataTransfer.setData('text/plain',null)
            this.dropStatus = 'start'
        },
        dragend: function (event) {
            event.target.style.opacity = ''
            this.dropStatus = 'end'
            if (this.$store.state.timer) this.$store.commit('stopTimer')
        },
        dragexit: function () {
            this.dropStatus = 'end'
            if (this.$store.state.timer) this.$store.commit('stopTimer')
        },
        dragover: function (event) {
            let target = this.$refs.dropzone
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
        dragleave: function () {
            let target = this.$refs.dropzone
            util.dom.removeClass(target, 'border-primary')
            util.dom.removeClass(target, `border-top`)
            util.dom.removeClass(target, `border-bottom`)
            util.dom.removeClass(target, 'bg-light')
            if (this.isFolder && this.$store.state.timer) this.$store.commit('stopTimer')
        },
        drop: function (event) {
            let target = this.$refs.dropzone
            util.dom.removeClass(target, 'border-primary')
            util.dom.removeClass(target, `border-top`)
            util.dom.removeClass(target, `border-bottom`)
            util.dom.removeClass(target, 'bg-light')
            this.dropStatus = 'default'
            if (this.isFolder && this.$store.state.timer) this.$store.commit('stopTimer')
            this.$emit('item:drop', event, this.isFolder, this.dropStatus)
        },
    },
    watch: {
        selected: function (value) {
            this.selectedOption = value
        },
        selectedOption: function (value) {
            this.$emit('item:selected', value)
        },
    }
}

</script>