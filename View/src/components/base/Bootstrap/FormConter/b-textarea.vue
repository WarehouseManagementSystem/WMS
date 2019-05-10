<template>
    <div>
        <textarea ref="textarea" class="form-control" :class="objClass" :style="objStyle" :rows="rows" :cols="cols" v-bind="$attrs" v-on="inputListeners" @input.stop="change" @blur="validator"/>
        <b-info v-if="validInfo || Object.keys($scopedSlots).includes('valid-info')" state="valid"><slot name="valid-info">{{ validInfo }}</slot></b-info>
        <b-info v-if="invalidInfo || Object.keys($scopedSlots).includes('invalid-info')" state="invalid"><slot name="invalid-info">{{ invalidInfo }}</slot></b-info>
        <b-help v-if="showMessage" :message="message"></b-help>
    </div>
</template>
<script>
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

import BInfo from './b-form-info'
import BHelp from './b-form-help.vue'

export default {
    name: 'b-textarea',
    inheritAttrs: false,
    mixins: [ utilities.mixins.form.base, utilities.mixins.form.validator ],
    components: {  BInfo, BHelp, },
    data () {
        return {
            message: `已输入 0 个字符，还可输入 ${this.maxlength} 个字符`,
        }
    },
    props: {
        rows: {
            type: [Number, String],
            default: 3,
            validator: (value) => {
                return value > 0
            },
        },
        cols: {
            type: [Number, String],
            validator: (value) => {
                return value > 0
            },
        },
        resize: {
            type: Boolean,
            default: false,
        },
        maxlength: utilities.props.maxlength = {default: 512,},
        showMessage: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        objStyle: function () {
            return this.resize ? '':'resize: none'
        },
    },
    methods: {
        change: function (e) {
            let codeCount = util.string.codePointLength(e.target.value)
            this.message = `已输入 ${codeCount} 个字符，还可输入 ${this.maxlength > codeCount ? this.maxlength - codeCount : 0} 个字符`
        },
    },
}
</script>
