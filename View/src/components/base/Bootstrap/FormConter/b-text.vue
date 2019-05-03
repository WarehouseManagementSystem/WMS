<template>
    <input :type="type" class="form-control" :class="objClass"/>
</template>
<script>
import mixins from '@/components/utilities/mixins.js'

export default {
    name: 'b-text',
    mixins: [mixins.form],
    props: {
        type: {
            type: String,
            default: 'text',
            validator: (value) => {
                // 这个值必须匹配下列字符串中的一个
                return ['text', 'password', 'email', 'number', 'url', 'tel',  'date', `time`, 'range', 'color'].includes(value)
            },
        },
        
    },
}
</script>
