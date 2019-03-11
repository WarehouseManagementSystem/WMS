// routers util
export default {
    Subsystem: function (basePath, routers) {
        for (let item of routers) {
            item.path = '/' + basePath + '-' + item.path
            if (item.base) { 
                item.base = basePath + '-' + item.base
            } else {
                Object.assign(item, { base: basePath })
            }
        }
        return routers
    }
}