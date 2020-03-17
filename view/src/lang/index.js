import Vue from 'vue'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import config from '@/config/index'

Vue.use(VueI18n)

// default Locale
// import en_US from '@/config/lang/packages/en-US';
// import zh from '@/lang/zh';

// const messages = {
//     // en: {
//     //     hello: 'hello world'
//     // },
//     'en-US': en_US.lang,  // English Locale package
// }

// default Locale
const defaultLocale = config.lang.defaultLocale

// fallback Locale
const fallbackLocale = config.lang.fallbackLocale

// loaded Locale packages
// our default Locale that is preloaded 
const loadedLocales = []

let localeMessage = {}

// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: defaultLocale, // set locale
    fallbackLocale: fallbackLocale, // fall back locale
    ssilentFallbackWarn: true,// 阻止成功的 fall back 警告，但会保留失败的 fall back 警告
    localeMessage, // set locale messages
})

// set page`s language
function setI18nLanguage(lang) {
    i18n.locale = lang
    axios.defaults.headers.common['Accept-Language'] = lang
    document.querySelector('html').setAttribute('lang', lang)
    return lang
}

// Asynchronous loading of locale package
async function loadLanguageAsync(lang) {
    if (!loadedLocales.includes(lang)) {
        return await import(/* webpackChunkName: "lang-[request]" */ `@/lang/packages/${lang}`).then(msgs => {
            i18n.setLocaleMessage(lang, msgs.default.lang)
            loadedLocales.push(lang)
            return setI18nLanguage(lang)
        })
    }
    return Promise.resolve(setI18nLanguage(lang))
}

export default i18n
export {
    i18n,
    loadLanguageAsync,
}