<template>
    <div class="custom-control custom-radio" :class="{ 'custom-control-inline': inline}">
        <input 
            type="radio" 
            class="custom-control-input" 
            :id="id" 
            v-bind="$attrs" 
            :checked="checked" 
            :aria-checked="checked" 
            v-on="inputListeners">
        <b-info v-if="validInfo || Object.keys($scopedSlots).includes('valid-info')" state="valid"><slot name="valid-info">{{ validInfo }}</slot></b-info>
        <b-info v-if="invalidInfo || Object.keys($scopedSlots).includes('invalid-info')" state="invalid"><slot name="invalid-info">{{ invalidInfo }}</slot></b-info>
        <label class="custom-control-label" :class="objClass" :for="id">{{ text }}</label>
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
    model: {
        prop: 'checked',
        event: 'input'
    },
    props: {
        text: utilities.props.text,
        id: {
            type: String,
            default: function () {
                return 'Radio-' + util.random.getRandomString()
            }
        },
        checked: {
            type: Boolean,
            default: false,
        },
        inline: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        inputListeners: function () {
            var vm = this
            // `Object.assign` 将所有的对象合并为一个新对象
            return Object.assign({},
                // 我们从父级添加所有的监听器
                this.$listeners,
                // 然后我们添加自定义监听器，
                // 或覆写一些监听器的行为
                {
                    // 这里确保组件配合 `v-model` 的工作
                    change: function (event) {
                        vm.$emit('input', event.target.value)
                    }
                }
            )
        },
    },
    methods: {
        validator: function (e) {
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