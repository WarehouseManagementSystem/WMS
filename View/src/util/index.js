import docCookies from './storage/cookies'
import localStorage from './storage/localStorage'
import sessionStorage from './storage/sessionStorage'
import serviceWorker from './serviceWorker/serviceWorker'

export default {
    // 浏览器存储的相关解决方案
    storage: {
        cookies: docCookies,
        localStorage: localStorage,
        sessionStorage: sessionStorage,
    },
    serviceWorker: serviceWorker
}