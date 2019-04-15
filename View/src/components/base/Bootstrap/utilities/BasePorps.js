import v from './variables'

export default {
    variant: {
        type: String,
        default: 'primary',
        validator: function (value) {
            // 这个值必须匹配下列字符串中的一个
            return v.themes.includes(value)
        },
    },
    width: {
        type: Number,
        default: 50,
        validator: function (value) {
            return value > 0 && value <= 100
        }
    },
    dismissible: {
        type: Boolean,
        default: false,
    },
    SrMessage: {
        type: String,
    },
}