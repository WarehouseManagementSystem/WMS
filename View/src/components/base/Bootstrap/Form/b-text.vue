<template>
    <div>
        <input 
            :type="imputType" 
            class="form-control" 
            :class="[objClass, readonlyClass]" 
            :style="objstyle" 
            :size="Number(length)"
            ref="text" 
            :placeholder="fillPlaceholder" 
            :readonly="readonly" 
            :aria-readonly="readonly" 
            :disabled="disabled" 
            :aria-disabled="disabled" 
            v-bind="$attrs" 
            v-on="inputListeners" 
            @blur="validator($event, regex)" />
        <b-valid v-if="$slots.validInfo || validInfo" state="valid"><slot name="valid-info">{{ validInfo }}</slot></b-valid>
        <b-valid v-if="$slots.invalidInfo || invalidInfo" state="invalid"><slot name="invalid-info">{{ invalidInfo }}</slot></b-valid>
        <b-info :info="info" />
        <i v-if="!this.hideIcon && this.fillIcon" class="text-muted text-center position-absolute" :class="fillIcon" style="top: 0.7em;left:1.5em; width:1em;"></i>
    </div>
</template>
<script>
import util from '@/util/index.js'
import config from '@/config/index.js'
import utilities from '@/components/utilities/index.js'

import BValid from '@/components/base/Bootstrap/Form/Other/b-form-valid.vue'
import BInfo from '@/components/base/Bootstrap/Form/Other/b-form-info.vue'

export default {
    name: 'b-text',
    inheritAttrs: false,
    mixins: [ utilities.mixins.form.base, utilities.mixins.form.readonly, utilities.mixins.form.validator ],
    components: {  BValid, BInfo, },
    props: {
        type: {
            type: String,
            default: 'text',
            validator: (value) => {
                // 这个值必须匹配下列字符串中的一个
                return ['text', 'password', 'search', 'email', 'url', 'ip', 'tel', 'phone', 'number'].includes(value)
            },
        },
        placeholder: String,
        length: [String, Number],
        info: utilities.props.value,
        icon: utilities.props.value,
        hideIcon: Boolean,
        prompt: Boolean,
    },
    computed: {
        imputType: function () {
            if (this.type == 'phone') return 'tel'
            if (this.type == 'ip') return 'text'
            return this.type
        },
        fillPlaceholder: function () {
            const o = Object.getOwnPropertyDescriptor(config.ui.forms.placeholder, this.type)
            return this.placeholder 
                ? this.placeholder
                : (o && o.value) || null
        },
        fillIcon: function () {
            if (['number'].includes(this.type)) return
            const o = Object.getOwnPropertyDescriptor(config.ui.icon, this.type)
            return this.icon 
                ? this.icon
                : (o && o.value) || null
        },
        objstyle: function () {
            let o = {}
            if (!this.hideIcon && this.fillIcon) Object.assign(o, {'padding-left': '2em'})
            return o
        },
        regex: function () {
            if (['number'].includes(this.type)) return null
            const o = Object.getOwnPropertyDescriptor(config.regex, this.type)
            return this.pattern 
                ? util.string.toRegExp(this.pattern.toString()) 
                : (o && o.value) || null
        },
    },
}
</script>
<style scoped>
/* 隐藏数字控件的默认上下箭头 */
input[type="number"]::-webkit-inner-spin-button, 
input[type="number"]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
}
input[type="number"] { 
    -moz-appearance: test-field; 
}
</style>