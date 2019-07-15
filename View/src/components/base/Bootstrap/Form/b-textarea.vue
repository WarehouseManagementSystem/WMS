<template>
    <div>
        <textarea 
            class="form-control" 
            :class="[objClass, readonlyClass]" 
            :style="objStyle" 
            :rows="rows" 
            :cols="cols" 
            :readonly="readonly" 
            :aria-readonly="readonly" 
            :disabled="disabled" 
            :aria-disabled="disabled" 
            v-bind="$attrs" 
            v-on="inputListeners" 
            @input.stop="change" 
            @blur="validator"/>
        <b-info v-if="validInfo || Object.keys($scopedSlots).includes('valid-info')" state="valid"><slot name="valid-info">{{ validInfo }}</slot></b-info>
        <b-info v-if="invalidInfo || Object.keys($scopedSlots).includes('invalid-info')" state="invalid"><slot name="invalid-info">{{ invalidInfo }}</slot></b-info>
        <b-help v-if="message" :info="message" />
    </div>
</template>
<script>
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

import BInfo from '@/components/base/Bootstrap/Form/Other/b-form-info.vue'
import BHelp from '@/components/base/Bootstrap/Form/Other/b-form-help.vue'

export default {
    name: 'b-textarea',
    inheritAttrs: false,
    mixins: [ utilities.mixins.form.base, utilities.mixins.form.readonly, utilities.mixins.form.validator ],
    components: {  BInfo, BHelp, },
    data () {
        return {
            message: '',
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
        maxlength: {
            ...utilities.props.maxlength,
            default: 1024,
        },
        info: utilities.props.value,
        prompt: Boolean,
        resize: Boolean,
    },
    computed: {
        objStyle: function () {
            return this.resize ? '':'resize: none'
        },
    },
    methods: {
        change: function (e) {
            if (!this.prompt) return
            let message = ''
            let codeCount = util.string.codePointLength(e.target.value)
            if (this.maxlength >= codeCount) message =  `已输入 ${codeCount} 个字符，还可输入 ${this.maxlength - codeCount} 个字符`
            else message = `已输入 ${codeCount} 个字符，已超出 ${codeCount - this.maxlength} 个字符`

            this.message = this.info ? this.info + `(${message})` : message
        },
        
    },
    mounted () {
        this.message = this.info || ''
        if (this.prompt) {
            this.message += this.info ? `(已输入 0 个字符，还可输入 ${this.maxlength} 个字符)` : `已输入 0 个字符，还可输入 ${this.maxlength} 个字符`
        }
    }
}
</script>
