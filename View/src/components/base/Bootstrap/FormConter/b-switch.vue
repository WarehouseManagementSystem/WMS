<template>
    <div class="custom-control custom-switch">
        <input type="checkbox" class="custom-control-input" :id="id" v-bind="$attrs" v-on="inputListeners">
        <label class="custom-control-label" :for="id">{{ text }}</label>
    </div>
</template>

<script>
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-switch',
    inheritAttrs: false,
    mixins: [ utilities.mixins.form.base, ],
    data () {
        return {
            checked: false,
        }
    },
    props: {
        text: utilities.props.text,
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
                    change: function (event) {
                        vm.$emit('input', event.target.checked)
                    }
                }
            )
        },
    }
}
</script>