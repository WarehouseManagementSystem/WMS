<template>
    <div class="custom-control custom-switch">
        <input type="checkbox" class="custom-control-input" :id="id" :checked="checked" :aria-checked="checked" v-bind="$attrs" v-on="inputListeners">
        <label class="custom-control-label" :for="id">{{ text }}</label>
        <b-info :info="info" />
    </div>
</template>

<script>
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

import BInfo from '@/components/base/Bootstrap/Form/Other/b-form-info.vue'

export default {
    name: 'b-switch',
    inheritAttrs: false,
    components: { BInfo, },
    mixins: [ utilities.mixins.form.base, ],
    model: {
        prop: 'checked',
        event: 'input'
    },
    props: {
        text: utilities.props.text,
        info: utilities.props.info,
        checked: Boolean,
        id: {
            type: String,
            default: function () {
                return 'Switch-' + util.random.getRandomString()
            }
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
                    input: function (event) {
                        vm.$emit('input', event.target.checked)
                    }
                }
            )
        },
    }
}
</script>