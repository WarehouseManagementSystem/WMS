// set localStorage（本项目中会使用此版本 Storage 实现）
// 
// 解决浏览器兼容问题严谨实现 localStorage 和 sessionStorage
// 
// https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/localStorage

function installStorage(Storage, expires = '') {
    Object.defineProperty(window, Storage, new (function () {
        var aKeys = [], oStorage = {};
        Object.defineProperty(oStorage, "getItem", {
            value: function (sKey) { return sKey ? this[sKey] : null; },
            writable: false,
            configurable: false,
            enumerable: false
        });
        Object.defineProperty(oStorage, "key", {
            value: function (nKeyId) { return aKeys[nKeyId]; },
            writable: false,
            configurable: false,
            enumerable: false
        });
        Object.defineProperty(oStorage, "setItem", {
            value: function (sKey, sValue) {
                if (!sKey) { return; }
                document.cookie = escape(sKey) + "=" + escape(sValue) + expires + "; path=/";
            },
            writable: false,
            configurable: false,
            enumerable: false
        });
        Object.defineProperty(oStorage, "length", {
            get: function () { return aKeys.length; },
            configurable: false,
            enumerable: false
        });
        Object.defineProperty(oStorage, "removeItem", {
            value: function (sKey) {
                if (!sKey) { return; }
                document.cookie = escape(sKey) + "=" + expires + "; path=/";
            },
            writable: false,
            configurable: false,
            enumerable: false
        });
        this.get = function () {
            var iThisIndx;
            for (var sKey in oStorage) {
                iThisIndx = aKeys.indexOf(sKey);
                if (iThisIndx === -1) { oStorage.setItem(sKey, oStorage[sKey]); }
                else { aKeys.splice(iThisIndx, 1); }
                delete oStorage[sKey];
            }
            for (aKeys; aKeys.length > 0; aKeys.splice(0, 1)) { oStorage.removeItem(aKeys[0]); }
            for (var aCouple, iKey, nIdx = 0, aCouples = document.cookie.split(/\s*;\s*/); nIdx < aCouples.length; nIdx++) {
                aCouple = aCouples[nIdx].split(/\s*=\s*/);
                if (aCouple.length > 1) {
                    oStorage[iKey = unescape(aCouple[0])] = unescape(aCouple[1]);
                    aKeys.push(iKey);
                }
            }
            return oStorage;
        };
        this.configurable = false;
        this.enumerable = true;
    })());
}

export default {
    installLocalStorage: function() {
        if (!window.localStorage) {
            installStorage('localStorage', '; expires=Tue, 19 Jan 2038 03:14:07 GMT')
        }
    },

    installSessionStorage: function() {
        if (!window.sessionStorage) {
            installStorage('sessionStorage')
        }
    }
}

