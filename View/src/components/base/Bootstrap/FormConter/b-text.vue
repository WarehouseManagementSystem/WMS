<template>
    <div>
        <input :type="imputType" class="form-control" :class="objClass" :placeholder="fillPlaceholder" v-bind="$attrs" v-on="inputListeners" @blur="validator($event, regex)"/>
        <b-info v-if="validInfo || Object.keys($scopedSlots).includes('valid-info')" state="valid"><slot name="valid-info">{{ validInfo }}</slot></b-info>
        <b-info v-if="invalidInfo || Object.keys($scopedSlots).includes('invalid-info')" state="invalid"><slot name="invalid-info">{{ invalidInfo }}</slot></b-info>
    </div>
</template>
<script>
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

import BInfo from './b-form-info'

export default {
    name: 'b-text',
    inheritAttrs: false,
    mixins: [ utilities.mixins.form.base, utilities.mixins.form.validator ],
    components: {  BInfo },
    props: {
        type: {
            type: String,
            default: 'text',
            validator: (value) => {
                // 这个值必须匹配下列字符串中的一个
                return ['text', 'password', 'search', 'email', 'url', 'tel', 'phone'].includes(value)
            },
        },
        placeholder: {
            type: String,
        },
        validInfo: {
            type: String,
        },
        invalidInfo: {
            type: String,
        },
    },
    computed: {
        imputType: function () {
            if (this.type == 'phone') return 'tel'
            return this.type
        },
        fillPlaceholder: function () {
            return this.placeholder 
                ? this.placeholder
                : ((Object.getOwnPropertyDescriptor(utilities.placeholder, this.type) 
                    && Object.getOwnPropertyDescriptor(utilities.placeholder, this.type).value) 
                    || null)
        },
        regex: function () {
            return this.pattern 
            ? util.string.toRegExp(this.pattern) 
            : ((Object.getOwnPropertyDescriptor(util.regex, this.type) 
                && Object.getOwnPropertyDescriptor(util.regex, this.type).value) 
                || null)
        },
    },
}
</script>
