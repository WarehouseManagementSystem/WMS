// routers util

function ExcludeRouters(routers) { 
    if (routers
        && routers.Modules
        && typeof (routers.Modules) == 'object'
        && routers.SubsystemName
        && typeof (routers.SubsystemName) == `string`
        && ![...routers.SubsystemName].includes('-'))
        return true
    else
        return false
}

function ExcludePath(item) { 
    if (item
        && item.path
        && typeof (item.path) == `string`
        && item.name
        && typeof (item.name) == `string`
        && item.component
        && typeof (item.component) == `function`)
        return true
    else
        return false
}

function FormatRouters(routers, SubsystemName = '', array = []) {
    if (!ExcludeRouters(routers)) return []
    
    SubsystemName = SubsystemName
        ? SubsystemName + '-' + routers.SubsystemName
        : routers.SubsystemName
    
    for (let item of routers.Modules) {
        if (ExcludeRouters(item)) {
            FormatRouters(item, SubsystemName, array)
        } else {
            if (!ExcludePath(item)) continue
            
            item.path = '/' + SubsystemName + '-' + item.path
            array.push(item)
        }
    }
    return array
}

function FormateModels(routers, SubsystemName = '', obj = {}) { 
    if (!ExcludeRouters(routers)) return []

    SubsystemName = SubsystemName
        ? SubsystemName + '-' + routers.SubsystemName
        : routers.SubsystemName
    let items = []
    for (let item of routers.Modules) {
        if (ExcludeRouters(item)) {
            FormateModels(item, SubsystemName, obj)
        } else {
            if (!ExcludePath(item) || (item && item.unDisplay)) continue
            item.path = '/' + SubsystemName + '-' + item.path
            items.push(item)
        }
    }
    Object.assign(obj, { 'SubsystemName': routers.SubsystemName, Modules: [items] })
    return obj
}

export default {
    // Subsystem: function (basePath, routers) {
    //     // basePath 为空、非string类型、带有‘-’字符之一的子系统都会被忽略
    //     if (!basePath || typeof (basePath) != `string` || [...basePath].includes('-')) return []
    //     let array = []
    //     for (let item of routers) {
    //         if (item.base) { 
    //             item.base = basePath + '-' + item.base
    //         } else {
    //             Object.assign(item, { base: basePath })
    //         }
    //         item.path = '/' + item.base + '-' + item.path
    //         array.push(item)
    //     }
    //     return array
    // }
    FormatRouters,
    FormateModels,
}