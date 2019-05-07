// mixins
// 通用混入

import utilities from '@/components/utilities/index.js'

export default {
    form: {
        props: {
            color: utilities.props.color = { default: 'transparent' },
            textColor: utilities.props.textColor,
            required: {
                type: Boolean,
                default: false,
            },
            maxlength: {
                type: Number,
                default: 64,
                validator: (value) => {
                    // 这个值必须匹配下列字符串中的一个
                    return value >= 0
                },
            },
            minlength: {
                type: Number,
                default: 0,
                validator: (value) => {
                    // 这个值必须匹配下列字符串中的一个
                    return value >= 0
                },
            },
            max: {
                type: Number,
                default: 100,
            },
            min: {
                type: Number,
                default: 0,
            },
            setup: {
                type: Number,
                default: 1,
                validator: (value) => {
                    // 这个值必须匹配下列字符串中的一个
                    return value > 0
                },
            },
        },
        computed: {
            objClass: function () {
                return `bg-${this.color} text-${this.textColor}`
            },
        },
    },
}