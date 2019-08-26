// system configs
import icon from './icon'
import regex from './regex'
import status from './status'
import placeholder from './placeholder'

export default {
    lang: {
        defaultLocale: 'zh-CN',// default Locale
        fallbackLocale: 'en-US',// fallback Locale
        langsList: [
            { code: 'en-US', name: 'English' },
            { code: 'zh-CN', name: '简体中文' },
            // ar-EG
            // bg-BG
            // cs-CZ
            // de-DE
            // en-US
            // es-ES
            // fi-FI
            // fr-FR
            // hu-HU
            // it-IT
            // ja-JP
            // nb-NO
            // nl-NL
            // pt-BR
            // ro-RO
            // ru-RU
            // sv-SE
            // tr-TR
            // zh-CN
        ],
    }, // Locale config
    ui: {
        forms: {
            // b-form-info type: 'feedback'、'tooltip'
            validInfoType: 'feedback',
            placeholder: placeholder, // placeholder
        }, // forms
        icon: icon, // icon
        status: status, // status
    }, // UI config
    
    regex: regex, // regex
    // routes: routes, // routes config
}