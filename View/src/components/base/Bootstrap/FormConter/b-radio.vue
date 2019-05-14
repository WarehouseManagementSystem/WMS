<template>
    <div class="custom-control custom-radio">
        <input type="radio" class="custom-control-input" :id="id" v-bind="$attrs" v-on="inputListeners">
        <b-info v-if="validInfo || Object.keys($scopedSlots).includes('valid-info')" state="valid"><slot name="valid-info">{{ validInfo }}</slot></b-info>
        <b-info v-if="invalidInfo || Object.keys($scopedSlots).includes('invalid-info')" state="invalid"><slot name="invalid-info">{{ invalidInfo }}</slot></b-info>
        <label class="custom-control-label" :for="id">{{ text }}</label>
    </div>
</template>

<script>
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

import BInfo from './b-form-info'

export default {
    name: 'b-radio',
    inheritAttrs: false,
    mixins: [ utilities.mixins.form.base, utilities.mixins.form.validator ],
    components: { BInfo },
    props: {
        text: utilities.props.text,
        id: {
            type: String,
            default: function () {
                return 'Radio-' + util.random.getRandomString()
            }
        },
    },
    methods: {
        validator: function (e) {
            debugger
            // 验证函数不会对传入的数据进行处理
            const value = e.target ? e.target.value.trim() : e.value.trim()
            // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
            if (!this.validateRequired(value)) { util.dom.addClass(e.target, 'is-invalid'); return }
            util.dom.removeClass(e.target, 'is-invalid')
            this.$emit('valid')
        },
    },
}
</script>