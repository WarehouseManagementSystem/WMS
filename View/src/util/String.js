export default {
    // 正确返回字符长度（兼容 UTF-8 和 UTF-16）
    codePointLength: (text) => {
        var result = text.toString().replace(/[^\x00-\xff]/g,"aa").length // text.match(/[\s\S]/gu);
        return result ? result : 0;
    },
    // 向前补全字符串/格式提示
    padStart: (str, lenght = 0, context = ' ') => { 
        if (typeof (str) == 'number') context = '0'
        return str.toString().padStart(lenght, context)
    },
    // 向后补全字符串
    padEnd: (str, lenght = 0, context = ' ') => { 
        if (typeof (str) == 'number') context = '0'
        return str.toString().padEnd(lenght, context)
    },
    toRegExp: function (str) { 
        var regParts = str.match(/^\/(.*?)\/([gim]*)$/);
        if (regParts) {
            // the parsed pattern had delimiters and modifiers. handle them. 
            return new RegExp(regParts[1], regParts[2]);
        } else {
            // we got pattern string without delimiters
            return new RegExp(str);
        }
    }
}