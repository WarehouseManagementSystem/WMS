// localStorage

// 记录 localStroage 实现是否已加载
let include = false

function loadLocaStorage(url) { 
    if (!include) {
        return import(/* webpackChunkName: "localStorage-[request]" */ url).then(() => { 
            include = true
        })
    }
}

// 此处加载的为严格实现的 localStorage
loadLocaStorage(`@/util/storage/setLocalStorage_strict.js`)

export default {
    setItem: (key, value) => localStorage.setItem(key, value),
    removeItem: (key) => localStorage.removeItem(key),
}