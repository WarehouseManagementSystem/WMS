import docCookies from './storage/cookies'
import docStorage from './storage/installStorage_strict'
// import serviceWorker from './serviceWorker/serviceWorker'

import dom from './dom'
import obj from './object'
import array from './array'
import string from './string'
import random from './random'
import documents from './document'
import { clone } from './clone'

import file from './file/index'

// 解决 storage 兼容性问题
docStorage.installLocalStorage()
docStorage.installSessionStorage()
    
export default {
    // 浏览器存储的相关解决方案
    storage: {
        cookies: docCookies,
    },
    // serviceWorker: serviceWorker,
    clone: clone,
    random: random,
    dom: dom,
    string: string,
    obj: obj,
    array: array,
    document: documents,
    file: file,
}