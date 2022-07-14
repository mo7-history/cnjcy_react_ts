<!--
 * @LastEditors: Mark
 * @Description: none
 * @Author: Mark
 * @Date: 2019-05-14 14:47:31
 * @LastEditTime: 2019-06-17 14:49:00
 -->

# one-react-ts-web 项目说明

脚手架仓库地址 <https://github.com/facebook/create-react-app>

React-TypeScript 文档 <https://typescript.bootcss.com/tutorials/react.html>

TypeScript 文档 <https://www.tslang.cn/docs/handbook/basic-types.html>

## 运行方式

```bash
#更新和安装依赖
npm install

#本地查看与开发
npm run start

#生产环境打包发布
npm run build

#打包之后的本地测试
npm run local-serve

```

## 项目 ESlint 风格指南 , 以及 `VSCode` 编辑器配置建议

### VSCode 插件

- ESlint

美化辅助插件

- Prettier

### settings.json 设置

```json
{
  "editor.formatOnSave": true,
  "editor.formatOnType": true,
  "prettier.eslintIntegration": true,
  "eslint.autoFixOnSave": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.validate": [
    "html",
    "javascript",
    "javascriptreact",
    {
      "language": "typescript",
      "autoFix": true
    },
    {
      "language": "typescriptreact",
      "autoFix": true
    },
    {
      "language": "vue",
      "autoFix": true
    }
  ]
}
```

## 脚手架定制化

基于 `react-creat-app` 做了如下个性化定制

- 添加 TypeScript 支持

- 修改 `package.json`中的`browserslist`

- 添加 `.env` 设定环境变量

- 新增 `react-router-dom` 实现路由跳转

  - 采用配置文件的形式管理路由

  - 编写 reouterView 插件机制,采用中心化路由管理模式控制路由

- 修改 `public\index.html`

  - 新增 meta

- css 预处理器配置

  - 配置 less , scss , css 的模块化设置
  - 支持 less 以及 scss
  - 推荐使用 scss

- eslint 配置

  - 定制了基于团队最优的 eslint 配置

## 状态管理和页面通信

Mobx

文档地址
<https://cn.mobx.js.org/>

## 演示 demo

基础页面建设

主路由渲染规划

子路由渲染规划

多级路由渲染规划

样式演示模块

请求模块

Mobx 状态管理 Demo

## 客户端本地存储

store.js

文档地址
<https://github.com/marcuswestin/store.js>

使用方式:

```js
import { localStore } from "@/utils/utils.js";

// Store current user
localStore.set("user", { name: "Marcus" });

// Get current user
localStore.get("user");

// Remove current user
localStore.remove("user");

// Clear all keys
localStore.clearAll();

// Loop over all stored values
localStore.each(function(value, key) {
  console.log(key, "==", value);
});
```

## 实用工具库

Lodash

文档地址
<https://www.lodashjs.com/>

引用官方推荐命名

```js
import _ from "lodash";
import _ from "lodash/core";
import fp from "lodash/fp";
import array from "lodash/array";
import object from "lodash/fp/object";
import at from "lodash/at";
import curryN from "lodash/fp/curryN";
```

注:不建议使用 `React-lodash`
原因: 会降低可读性,增加复杂性

数据处理和视图尽量分开,数据处理完毕之后再进入视图

## style

新增浏览器差异化处理文件

normalize.css

样式模块化和组件局部作用域

```js
import styles from "./index.module.less";
<h2 className={styles.title}>Demo</h2>;
```

如果要像这样模块化使用样式类 , 则 less 或者 css 或者 scss 文件必须以 `xxx.module.less/css/scss` 的形式命名 , 文件名中间必须包含 `.module.`

## js 模块引用的路径别名配置 `Webpack alias`

建议别名使用 @/ 开头而非仅用 @ 开头，因为有小概率会与某些 scoped 形式的 npm 包（如：@babel/core）产生命名冲突。

因此简化配置如下:

```js

  "@": path.resolve("src"),

```

js 中使用:

```js
import { userLogin, getBannerList, getTestToken } from "@/api/Demo";

import routes from "@/pages/routes";
```

css 中使用需要添加 `~` 为前缀:

```css
@import "~@/assets/style/resize.less";
```
