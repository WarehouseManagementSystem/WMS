import v from './variables'

export default {
    color: (val = '') => {
        return {
            type: String,
            default: val || 'primary',
            validator: (value) => {
                // 这个值必须匹配下列字符串中的一个
                return v.base.color.bg.includes(value)
            },
        }
    },
    size: (val = '') => {
        return {
            type: String,
            default: val || '',
            validator: (value) => {
                // 这个值必须匹配下列字符串中的一个
                return v.base.size.includes(value)
            },
        }
    },
    set: (val = '') => {
        return {
            type: String,
            default: val || 'down',
            validator: (value) => {
                // 这个值必须匹配下列字符串中的一个
                return v.base.set.default.includes(value)
            },
        }
    },
    position: (val = '') => {
        return {
            type: String,
            default: val || 'top-center',
            validator: (value) => {
                // 这个值必须匹配下列字符串中的一个
                return v.base.position.default.includes(value)
            },
        }
    },
    width: (val = '') => {
        return {
            type: Number,
            default: val || 50,
            validator: (value) => {
                return value > 0 && value <= 100
            }
        }
    },
    href: (val = '') => {
        return {
            type: String,
            default: val || '#',
            validator: function () {
                return true
            },
        }
    },
    src: (val) => {
        return {
            type: String,
            default: val || '',
            validator: function () {
                return true
            },
        }
    },
    text: (val) => {
        return {
            type: String,
            default: val || '',
            
        }
    },
    show: (val) => { 
        return {
            type: Boolean,
            default: val || false,
        }
    },
    disabled: (val) => {
        return {
            type: Boolean,
            default: val || false,
        }
    },
    active: (val) => {
        return {
            type: Boolean,
            default: val || false,
        }
    },
    SrMessage: (val) => {
        return {
            type: String,
            default: val || '',
            validator: function () {
                return true
            },
        }
    },
}