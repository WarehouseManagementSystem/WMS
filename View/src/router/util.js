// routers util
export default {
    Subsystem: function (basePath, routers) {
        for (let item of routers) {
            item.path = '/' + basePath + '-' + item.path
            Object.assign(item, { base: basePath })
        }
        return routers
    }
}