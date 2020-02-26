<template>
    <div class="border rounded p-1" >
        <div v-if="canEdit">
            <b-button-group>
                <b-button size="sm" outline v-tip="'Add Item'"><i :class="icon.add" /></b-button>
                <b-button size="sm" outline v-tip="'Add Folder'"><i :class="icon.folderPlus" /></b-button>
                <b-button v-if="hideClearCheck" v-tip="'Clear Check'" @click="clickClearCheck" outline><i :class="icon.unCheck" /></b-button>
                <b-button v-if="hideDelete" v-tip="'Delete'" outline><i :class="icon.delete" /></b-button>
            </b-button-group>
            <hr class="my-2">
        </div>
        <c-tree :list="list" :status="statusNu" primaryKey="label" :selected="selectedOption" v-model="selectedOption" />
    </div>
</template>

<script>
import config from '@/config/index.js'
import utilities from '@/components/utilities/index.js'

import CTree from './Tree/c-tree'
import BButtonGroup from '@/components/base/Bootstrap/ButtonGroup/b-button-group.vue'
import BButton from '@/components/base/Bootstrap/Form/Button/b-button.vue'

export default {
    name: 'tree-view',
    components: { CTree, BButtonGroup, BButton, },
    model: {
        prop: 'selected',
        event: 'tree:selected'
    },
    data () {
        return {
            selectedOption: this.selected,
        }
    },
    props: {
        list: utilities.props.list,
        primaryKey: {
            type: String,
            default: 'id',
            require: true,
        },
        status: {
            type: [String, Number],
            default: 0,
            validator: (value) => {
                // 0: default,1: edit,2: Single choice, 3: Multiple choice
                return !isNaN(value) && [0, 1, 2, 3].includes(Number(value))
            }
        },
        selected: Object,
    },
    computed: {
        statusNu: function () {
            return Number(this.status) || 0
        },
        icon: function () {
            return config.ui.icon
        },
        canEdit: function () {
            return this.status == 1
        },
        isSelected: function () {
            return !this.selected || Object.keys(this.selected).length == 0 || Object.keys(this.selected).includes(this.primaryKey)
        },
        hideDelete: function () {
            return !this.isSelected
        },
        hideClearCheck: function () {
            return !this.isSelected
        },
    },
    methods: {
        clickClearCheck: function () {
            this.selectedOption = {}
        },
    },
    watch: {
        selected: function (value) {
            this.selectedOption = value
        },
        selectedOption: function (value) {
            this.$emit('tree:selected', value)
        },
    }
}
</script>