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

**开发环境**：  

.Net Core 2.2  

**项目文件目录**：  

```text
./
  -| api                WebAPI
    -| Utils                存放基础类、公共类
    -| Entitys              存放 Model
    -| Services             存放接口
    -| Helpers              实现接口
    -| Controllers          存放控制器，对外暴露接口
```