// sessionStorage

export default {
    setItem: (key, value) => { 
        if (window.sessionStorage) {
            // 写入 sessionStorage
            sessionStorage.setItem(key, value);
        } else {
            console.log('[sessionStorage error] sessionStorage is not supported')
        }
    },
    getItem: (key) => {
        if (window.sessionStorage) {
            // 读取 sessionStorage
            sessionStorage.getItem(key)
        } else {
            console.log('[sessionStorage error] sessionStorage is not supported')
        }
    },
}