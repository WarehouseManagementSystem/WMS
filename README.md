# api

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

构建

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
  -| api                WebAPI
    -| Utils                存放基础类、公共类
    -| Entitys              存放 Model
    -| Services             存放接口
    -| Helpers              实现接口
    -| Controllers          存放控制器，对外暴露接口
  -| View               用户UI
  -| DOCS               项目文档
```

## 项目更新日志

[更新日志](DOCS/UPADTE.md)  

## 项目 BUG

[项目 BUG](DOCS/BUG.md)  

## TODO

[TODO](DOCS/TODO.TODO)  

## License

[MIT](LICENSE)  

---

我第一次采用这种方式管理项目，其实我没有太多的项目管理经验，也从未系统学习过项目管理。这套方案在哪里也找不到，因为这是我经验和想象的产物，虽然很不成熟但我想试试，并且会不断去完善它，虽然这会增加很多的工作量。希望能够坚持下去！  