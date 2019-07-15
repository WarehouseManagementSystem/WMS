<template>
    <div v-show="$slots.default && state" :class="`${this.state}-${this.type}`"><slot></slot></div>
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
                return ['valid', 'invalid'].includes(value)
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
    
}
</script>
