import v from './variables'

export default {
    color: (val = undefined) => {
        return {
            type: String,
            default: val || 'primary',
            validator: (value) => {
                // 这个值必须匹配下列字符串中的一个
                return v.base.color.bg.includes(value)
            },
        }
    },
    size: (val = undefined) => {
        return {
            type: String,
            default: val || '',
            validator: (value) => {
                // 这个值必须匹配下列字符串中的一个
                return v.base.size.includes(value)
            },
        }
    },
    set: (val = undefined) => {
        return {
            type: String,
            default: val || 'down',
            validator: (value) => {
                // 这个值必须匹配下列字符串中的一个
                return v.base.set.default.includes(value)
            },
        }
    },
    position: (val = undefined) => {
        return {
            type: String,
            default: val || 'top-center',
            validator: (value) => {
                // 这个值必须匹配下列字符串中的一个
                return v.base.position.default.includes(value)
            },
        }
    },
    width: (val = undefined) => {
        return {
            type: Number,
            default: val || 50,
            validator: (value) => {
                return value > 0 && value <= 100
            }
        }
    },
    href: (val = undefined) => {
        return {
            type: String,
            default: val || '#',
            validator: function () {
                return true
            },
        }
    },
    src: (val = undefined) => {
        return {
            type: String,
            default: val || '',
            validator: function () {
                return true
            },
        }
    },
    text: (val = undefined) => {
        return {
            type: [String, Number, Boolean, Date],
            default: val || '',
        }
    },
    value: (val = undefined) => { 
        return {
            type: [String, Number, Boolean, Date],
            default: val || ''
        }
    },
    content: () => { 
        return {
            type: Array,
        }
    },
    items: () => {
        return {
            type: Object,
        }
     },
    show: (val = undefined) => { 
        return {
            type: Boolean,
            default: val || false,
        }
    },
    disabled: (val = undefined) => {
        return {
            type: Boolean,
            default: val || false,
        }
    },
    active: (val = undefined) => {
        return {
            type: Boolean,
            default: val || false,
        }
    },
    SrMessage: (val = undefined) => {
        return {
            type: String,
            default: val || '',
            validator: function () {
                return true
            },
        }
    },
}