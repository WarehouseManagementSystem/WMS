# 项目更新日志

> 此处记录项目的开发进度  
> (这会让项目开发变得紧紧有条)

2019-04-02

* view dropdownMenu 显示与隐藏方案调整，优化体验

2019-04-01

* view 修改目录结构，修改控件名称

2019-03-28

* 解决 bug NavTabs prop 接受类型错误，已修正
* 解决 MaintContent 布局问题

2019-03-27

* 解决 bug DropdownMenuNav 在 Chrome 浏览器下 blur 事件不响应

2019-03-26

* view NavTabs 添加右键菜单，优化使用体验

2019-03-25

* view 引入 [circular-json](https://github.com/WebReflection/circular-json) 解决 js 中
    * JSON.stringify() 中的循环引用对象解析报错，
    * JSON.parse() 浏览器兼容性（行为不一）
* view 修改 localStorage(可用)、sessionStorage(可用)
* view NavTabs 添加 sessionStorage，优化用户体验：解决刷新页面时其他页面打开状态丢失的问题

2019-03-21

* view NavTabs 完成 100%
* 使用 sessionStorage 保持用户打开的页面数据，防止刷新时丢失，在会话结束时销毁（暂缓）

2019-03-18

* view NavTab 完成 80%

2019-03-16

* view DropdownMenuNav 完成
* view bug DropdownMenuNav 在 Chrome 浏览器下 blur 事件不响应（safari 没问题，其他浏览器为测试）(暂缓)(已解决 2019-03-27)
（没想到 DropdownMenuNav 会花这么长时间，问题还是比较多的，但好在都解决了）

2018-03-11

* view DropdownMenu 完成部分
* view 解决 router 问题
* view 制定 router 规则，以适应 DropdownMenu 的实现

2019-03-08

* view bug 调整 router 存在问题，待解决(已解决 2018-03-11)

2019-03-07

* view LangSelect 添加 active class
* view bug Nav 添加 NavTabs（存在较多问题，会在 DropdownMenu 完成后解决）(已解决 2019-03-18)

2019-03-06

* view blur 事件无响应，已解决
* view 修改 router 结构，便于菜单的自动生成
* view 弃用 @/layout/layout.vue(暂时)
* view 修改 404 页面

2019-03-05

* view 确定 菜单 样式

2019-03-04

* view 加入动画过度效果
* view bug 确定菜单样式，之前采用 bootstrap 的 Popovers 存在较多问题，已放弃，目前使用列表进行控制，但 blur 事件无响应，暂未解决（已解决 2019-03-06）

2019-02-28

* view 加入 [Font Awesome](https://fontawesome.com) 字体图标，免费版

2019-02-26

* view 界面调整
* view 加入 jQuery（本来不想加的，为了 bootstrap，哎，希望 bootstrap 早日放弃 jQuery）

2019-02-25

* view ui header end
* view ui nav start

2019-02-22

* view 添加 Avatar 和 UserCard 控件

2019-02-21

* View 界面调整
* view 引入 screenfull([npm](https://www.npmjs.com/package/screenfull))

2019-02-20

* view 修改 调整页面布局
* view 调整 调整 config 文件

2019-02-19

* view 添加 cookie、localStorage(可用)、sessionStorage(可用)、Service Worker 的通用方法（未测试可用性）

2019-02-18

* view vue-i18n 添加 `config` 目录，集中管理可配置项，未来可能添加一个配置页面通过用户 UI 对这些选项进行管理
* view vue-router 添加 404 页面

2019-02-16

* view vue-i18n 国际化实现按需加载语言包

2019-02-15

* view 添加 bootstrap([Page](https://getbootstrap.com) | [Github](https://github.com/twbs/bootstrap)) 页面框架
* view 添加 vue-i18n([Page](https://kazupon.github.io/vue-i18n/) | [Github](https://github.com/kazupon/vue-i18n)) 国际化

2019-01-30

* api 项目目录结构调整，项目文件管理更清晰(bate0.1)
* docs 添加文档 [项目规范-编码规范](Standard/CodingStandards.md)
* docs 修改文档 [项目规范相关文档](Standard/README.md)
* docs 修改文档 [开发流程规范](Standard/DevelopStandards.md)


2019-01-26

* 项目基础架构构建(完成)  
    * api 架构搭建
    * view 架构搭建
* 项目文档撰写(开始)
* Github 上建立[项目仓库](https://github.com/WarehouseManagementSystem/WMS)(完成)
* Github 中完善项目管理配置(待完善)