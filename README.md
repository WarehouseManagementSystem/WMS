# 仓库管理系统（Warehouse Management System/WMS）

![Deploy to GitHub Page](https://github.com/WarehouseManagementSystem/WMS/workflows/Deploy%20to%20GitHub%20Page/badge.svg)
[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=acorn&package-manager=npm_and_yarn&previous-version=6.4.0&new-version=6.4.1)](https://help.github.com/articles/configuring-automated-security-fixes)
> [Demo](https://warehousemanagementsystem.github.io/WMS/#)


## 开发环境

macOS 10.14.2 (18C54)  
.Net Core 2.2  
Vue.js 3.3.0  

## 编辑器

Visual Studio Code 1.30.2 (1.30.2)  

## 运行 API

构建

```bash
cd api
dotnet build
```

运行

```bash
cd api
dotnet run
```

文件变化时自动重启

```bash
cd api
dotnet watch run
```

## 运行用户 UI

构建

```bash
cd View
npm install
```

运行

```bash
cd View
npm run serve
```

## 项目文件目录

```text
./
-| api/Source           WebAPI Source(api项目源代码)
    -| A_Utils                项目基础模块：底层类、公用类封装，不提供功能
    -| B_Base                 基础功能模块：基础类、公共类，基础程序封装，提供最基础的功能
    -| Z_Template             模版：项目模块的模版，无特定功能。
  -| View               用户UI
  -| DOCS               项目文档
```

## 项目更新日志

[更新日志](DOCS/UPADTE.md)  

## 项目 BUG

[项目 BUG](DOCS/BUG.md)  

## TODO

[TODO](DOCS/TODO.md)  

## 项目规范或约定

[项目规范](DOCS/Standard/README.MD)  

## License

[MIT](LICENSE)  

---

我第一次采用这种方式管理项目，其实我没有太多的项目管理经验，也从未系统学习过项目管理。这套方案虽然很不成熟但我想试试，并且会不断去完善它，虽然这会增加很多的工作量。希望能够坚持下去！  
