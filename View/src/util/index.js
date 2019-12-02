import './bootstrap/index'
import docCookies from './storage/cookies'
import docStorage from './storage/installStorage_strict'
import serviceWorker from './serviceWorker/serviceWorker'

import dom from './dom'
import obj from './object'
import array from './array'
import string from './string'
import random from './random'
import documents from './document'
import { clone } from './clone'

import file from './file/index'

import circularJSON from 'circular-json'

// 解决 storage 兼容性问题
docStorage.installLocalStorage()
docStorage.installSessionStorage()
    
export default {
    // 浏览器存储的相关解决方案
    storage: {
        cookies: docCookies,
    },
    serviceWorker: serviceWorker,
    clone: clone,
    // 解决 JSON.stringify() 的 
    // ‘Chrome sendrequest error: TypeError: Converting circular structure to JSON’
    // 参考链接
    // https://blog.csdn.net/hhthwx/article/details/79307843
    // https://stackoverflow.com/questions/4816099/chrome-sendrequest-error-typeerror-converting-circular-structure-to-json
    JSON: circularJSON,
    random: random,
    dom: dom,
    string: string,
    obj: obj,
    array: array,
    document: documents,
    file: file,
}