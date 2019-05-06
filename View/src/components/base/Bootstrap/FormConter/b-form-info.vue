<template>
    <div v-show="$slots.default && state" :class="objClass"><slot></slot></div>
</template>
<script>
import config from "@/config/index";

export default {
    name: 'b-form-info',
    props: {
        state: {
            type: String,
            required: true,
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return ['success', 'error'].includes(value)
            },
        },
        type: {
            type: String,
            default: config.ui.forms.validInfoType,
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return ['feedback', 'tooltip'].includes(value)
            },
        },
    },
    computed: {
        objClass: function () {
            if (this.state == 'success') return `valid-${this.type}`
            else if (this.state == 'error') return `invalid-${this.type}`
            else return ''
        },
    },
}
</script>
