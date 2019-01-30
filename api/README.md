# api

构建

```bash
# 当前目录 (./api)下执行
dotnet build
```

运行

```bash
# 当前目录 (./api)下执行
dotnet run
```

文件变化时自动重启

```bash
# 当前目录 (./api)下执行
dotnet watch run
```

## 开发环境  

.Net Core 2.2  

## 项目文件目录  

```text
./
-| api/Source           WebAPI Source(api项目源代码)
    -| A_Utils                项目基础模块：底层类、公用类封装，不提供功能
    -| B_Base                 基础功能模块：基础类、公共类，基础程序封装，提供最基础的功能
    -| Z_Template             模版：项目模块的模版，无特定功能。
```

## 项目子模块目录结构

```text
./Z-Template            模版：项目模块的模版。除 `A-Util`,`B-Base` 外，项目其它子模块均使用此目录结构
  -| Entitys                存放 Model
  -| Services               存放接口
  -| Handlers               实现接口
  -| Controllers            存放控制器，对外暴露接口
```