# 项目规范相关文档

> 没有规矩不成方圆，此目录存放项目开发中所遵循的规范或约定

## 1. 源码管理

### 1.1 API 项目源码管理

> API 项目源码应遵循 [编码规范](CodingStandards.md)  
> 在基础功能完备之后原则上将不再对`A_Util`,`B_Base` 中的源码进行修改（bug修复除外）

#### 1.1.1 子模块

* 什么时候新增子模块 - 在已有模块功能与要新增功能之间为独立关系时可考虑新增模块（具体与系统要实现的功能有关）。子模块的新增应与开发计划相关，并在计划中统一规划。
* 如何新增子模块 - 如[项目文件目录](/api/README.md#项目文件目录)所示，按`api/Source/Z_Template/`中的模版组织子模块文件结构。

#### 1.1.2 API Route 规范

API 调用地址根据其 Controller 所在 API 项目中的文件地址而定  
Controller 相对于 API 项目根节点地址为：api/Source/Z_Template/ValuesController.cs  
其对应的 API 调用地址为：api/Z_Template/ValuesController/[controller]  
即：api/子模块地址/所在 Controller.cs 的文件名/[controller]  
注意：由于项目的源文件均在 Source 目录下因此去除文件地址中的 `Source/`  
但会在调用地址前保留 `api/`，以表明其为 API 调用  

## 2. 开发流程规范

[开发流程规范](DevelopStandards.md)