// routers util
import util from '@/util/index'

function IsRouters(routers) { 
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

function IsPath(item) { 
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

function FormatSubsystemName(routers ,SubsystemName) { 
    return SubsystemName
        ? SubsystemName + '-' + routers.SubsystemName
        : routers.SubsystemName
}

function FormatPath(item, SubsystemName) { 
    return '/' + SubsystemName + '-' + item.path
}

function FormatRouters(routers, SubsystemName = '', array = []) {
    if (!IsRouters(routers)) return []

    SubsystemName = FormatSubsystemName(routers, SubsystemName)

    for (let item of routers.Modules) {
        if (IsRouters(item)) {
            FormatRouters(item, SubsystemName, array)
        } else {
            if (!IsPath(item)) continue
            item.path = FormatPath(item, SubsystemName)
            array.push(item)
        }
    }
    return array
}

function FormatModels(routers, SubsystemName = '') { 
    if (IsRouters(routers) && !routers.unDisplay) {
        SubsystemName = FormatSubsystemName(routers, SubsystemName)
        if (!routers.unDisplay) {
            for (let i = 0; i < routers.Modules.length; i++) {
                let item = routers.Modules[i]
                if (IsPath(item) && !item.unDisplay) {
                    item.path = FormatPath(item, SubsystemName)
                } else if (IsPath(item) && item.unDisplay) {
                    // 连接为 unDisplay: true,
                    routers.Modules.splice(i, 1)
                    i--
                } else if (IsRouters(item) && !(item.unDisplay || item.Modules.length == 0)) {
                    item = FormatModels(item, SubsystemName)
                    if (!IsRouters(item)) {
                        // 子模块 均为 unDisplay: true,
                        routers.Modules.splice(i, 1)
                        i--
                    }
                } else if (IsRouters(item) && (item.unDisplay || item.Modules.length == 0)) {
                    routers.Modules.splice(i, 1)
                    i--
                }
            }
        }
        if (routers.Modules.length == 0) {
            // 子系统根结点没有设置 unDisplay: true, 
            // 但所有子模块 和 链接 均设置为 unDisplay: true,
            return {}
        }
    } else {
        // 子系统根结点设置 unDisplay: true,
        return {}
    }
   
    return routers
}

function GetRouters(routers) { 
    return FormatRouters(util.global.clone(routers, false))
    // return FormatRouters(routers)
}

function GetModels(models) {
    return FormatModels(util.global.clone(models, false))
    // return FormatModels(models)
}

export default {
    IsRouters,
    IsPath,
    GetRouters,
    GetModels,
}