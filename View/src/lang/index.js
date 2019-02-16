import Vue from 'vue'
import VueI18n from 'vue-i18n'
import axios from 'axios'

Vue.use(VueI18n)

// default languages
// import en_US from '@/lang/en-US';
// import zh from '@/lang/zh';

// const messages = {
//     // en: {
//     //     hello: 'hello world'
//     // },
//     'en-US': en_US.lang,  // English language package
// }

// default Local
const defaultLocal = 'en-US'

// fallback Local
const fallbackLocal = 'en-US'

// loaded Local packages
// our default Local that is preloaded 
const loadedLocals = []

let localMessage = {}

// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: defaultLocal, // set locale
    fallbackLocale: fallbackLocal, // fall back locale
    ssilentFallbackWarn: true,// 阻止成功的 fall back 警告，但会保留失败的 fall back 警告
    localMessage, // set locale messages
})

// load locale config
function loadLocalConfig(lang) {
    return import(/* webpackChunkName: "lang-[request]" */ `@/lang/config/${lang}`).then(msgs => {
        i18n.setLocaleMessage(lang, msgs.default.lang)
        loadedLocals.push(lang)
        return setI18nLanguage(lang)
    })
}

// set page`s language
function setI18nLanguage(lang) {
    i18n.locale = lang
    axios.defaults.headers.common['Accept-Language'] = lang
    document.querySelector('html').setAttribute('lang', lang)
    return lang
}

// Asynchronous loading of language package
function loadLanguageAsync(lang) {
    if (!loadedLocals.includes(lang)) {
        loadLocalConfig(lang)
    }
    return Promise.resolve(setI18nLanguage(lang))
}

export default i18n
export {
    i18n,
    defaultLocal,
    loadLocalConfig,
    loadLanguageAsync,
}