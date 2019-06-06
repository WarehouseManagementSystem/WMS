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
    width: {
        type: Number,
        default: 50,
        validator: (value) => {
            return value > 0 && value <= 100
        }
    },
    href: {
        type: String,
        default: '#',
        validator: function () {
            return true
        },
    },
    src: {
        type: String,
        default: '',
        validator: function () {
            return true
        },
    },
    text: {
        type: [String, Number,],
        default: '',
    },
    value: {
        type: [String, Number,],
        default: ''
    },
    label: {
        type: [String, Number,],
    },
    message: {
        type: String,
    },
    success: {
        type: String,
    },
    error: {
        type: String,
    },
    list: {
        type: Array,
        default: function () { 
            return []
        },
    },
    item: {
        type: Object,
    },
    show: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    readonly: {
        type: Boolean,
        default: false,
    },
    active: {
        type: Boolean,
        default: false,
    },
    SrMessage: {
        type: String,
        default: '',
        validator: function () {
            return true
        },
    },
}