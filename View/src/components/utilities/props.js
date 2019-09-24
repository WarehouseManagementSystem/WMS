import v from './variables'

export default {
    color: {
        type: String,
        default: 'primary',
        validator: (value) => {
            // 这个值必须匹配下列字符串中的一个
            return v.base.color.bg.includes(value)
        }
    },
    textColor: {
        type: String,
        default: 'body',
        validator: (value) => {
            // 这个值必须匹配下列字符串中的一个
            return v.base.color.text.includes(value)
        }
    },
    borderColor: {
        type: String,
        default: 'secondary',
        validator: (value) => {
            // 这个值必须匹配下列字符串中的一个
            return v.base.border.color.includes(value)
        }
    },
    size: {
        type: String,
        default: '',
        validator: (value) => {
            // 这个值必须匹配下列字符串中的一个
            return v.base.size.includes(value)
        },
    },
    set: {
        type: String,
        default: 'down',
        validator: (value) => {
            // 这个值必须匹配下列字符串中的一个
            return v.base.set.default.includes(value)
        },
    },
    setX: {
        type: String,
        default: 'left',
        validator: (value) => {
            // 这个值必须匹配下列字符串中的一个
            return v.base.set.x.includes(value)
        },
    },
    position: {
        type: String,
        default: 'top-center',
        validator: (value) => {
            // 这个值必须匹配下列字符串中的一个
            return v.base.position.default.includes(value)
        },
    },
    justify: {
        type: String,
        default: '',
        validator: (value) => {
            // 这个值必须匹配下列字符串中的一个
            return v.base.justify.includes(value)
        },
    },
    width: {
        type: Number,
        default: 50,
        validator: (value) => {
            return value > 0 && value <= 100
        }
    },
    href: String,
    src: String,
    text: [String, Number, Array,],
    value: [String, Number, Array,],
    label: [String, Number, Array,],
    message: String,
    success: String,
    error: String,
    list: {
        type: Array,
        default: () => [],
    },
    item: Object,
    show: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    active: Boolean,
    function: Function,
    srMessage: String,
}