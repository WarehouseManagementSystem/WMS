import util from './util'

// System
import aRouters from './Subsystem/a'
import bRouters from './Subsystem/b'
import cRouters from './Subsystem/c'
import SystemRouters from './Subsystem/System'

const Modules = [
    util.GetModels(cRouters),
    util.GetModels(aRouters),
    util.GetModels(bRouters),
    util.GetModels(SystemRouters),
]

const Routers = [
    ...util.GetRouters(aRouters),               // a
    ...util.GetRouters(bRouters),               // b
    ...util.GetRouters(cRouters),               // c
    ...util.GetRouters(SystemRouters),          // System
]

export default Routers

export { Modules }
    
/*\
|*| 路由规则
|*| 0. 依赖于 vue router（https://router.vuejs.org/zh/）
|*| 1. 在菜单中显示的链接的顺序遵循添加的循序，不显示在主菜单的链接添加：unDisplay: true
|*| 2. 路由需按此文件（@/router/routes.js） 中的方式进行引入，
|*|    使用 util.Subsystem(<Subsystem-name>, <routers>) 方法会为路由加上 base: <Subsystem-name>,请勿自主添加
|*| 3. 原则上由 util.Subsystem(<Subsystem-name>, <routers>) 添加的路由为一个单独的子系统
|*| 4. 子系统 <Subsystem-name> 规则
|*| 4-1. 不重复，如若重复会合并到同一个子系统
|*| 4-2. 子系统名称必须为非空字符串且不能带有 ‘-’，否则整个子系统都会被忽略
|*| 4-3. 如若子系统中的路由全部设置为 unDisplay: true（默认为 false）或子系统中路由为空则不会显示该子系统
|*| 5. 模块 <routers> 规则
|*| 5-1 在 @/router/Subsystem 下的文件会在此文件（@/router/routes.js）引入，此称为模块
|*| 5-2 模块中的一个路由会作为系统某个子系统的一个模块
\*/