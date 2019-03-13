// routers util
export default {
    Subsystem: function (basePath, routers) {
        // basePath 为空、非string类型、带有‘-’字符之一的子系统都会被忽略
        if (!basePath || typeof (basePath) != `string` || [...basePath].includes('-')) return []
        let array = []
        for (let item of routers) {
            if (item.base) { 
                item.base = basePath + '-' + item.base
            } else {
                Object.assign(item, { base: basePath })
            }
            item.path = '/' + item.base + '-' + item.path
            array.push(item)
        }
        return array
    }
}