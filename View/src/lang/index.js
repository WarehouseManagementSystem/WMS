import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

// languages
import en from './en';
import zhcn from './zh-cn'

const messages = {
    // en: {
    //     hello: 'hello world'
    // },
    'en-US': en,  // 英文语言包
    'zh-CN': zhcn, // 中文语言包
}

// Create VueI18n instance with options
export default new VueI18n({
    locale: 'zh-CN', // set locale
    messages, // set locale messages
})