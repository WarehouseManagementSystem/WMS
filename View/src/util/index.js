import docCookies from './storage/cookies'
import serviceWorker from './serviceWorker/serviceWorker'

export default {
    // 浏览器存储的相关解决方案
    storage: {
        cookies: docCookies,
    },
    serviceWorker: serviceWorker,
}