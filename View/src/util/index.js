import docCookies from './storage/cookies'
import circularJSON from 'circular-json'
import docStorage from './storage/installStorage_strict'
import serviceWorker from './serviceWorker/serviceWorker'
import { clone } from './global'
import './bootstrap/index'

// 解决 storage 兼容性问题
docStorage.installLocalStorage()
docStorage.installSessionStorage()
    
export default {
    // 浏览器存储的相关解决方案
    storage: {
        cookies: docCookies,
    },
    serviceWorker: serviceWorker,
    global: {
        clone,
    },
    // 解决 JSON.stringify() 的 
    // ‘Chrome sendrequest error: TypeError: Converting circular structure to JSON’
    // 参考链接
    // https://blog.csdn.net/hhthwx/article/details/79307843
    // https://stackoverflow.com/questions/4816099/chrome-sendrequest-error-typeerror-converting-circular-structure-to-json
    JSON: circularJSON,
}