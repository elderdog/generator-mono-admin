# <%= answers.name %>

> <%= answers.description %>

基于 [Ant Design Pro](https://pro.ant.design/zh-CN) 的 `umi@4` 版本，在官方模板的基础上做了如下改动：

- 🛖 使用 `monorepo` 方式管理仓库
- 🔖 设置 `alias` 以便引用 `root workspace` 下的公共资源
- 🎨 开启了 `tailwindcss`
- ⛳️ 预设了多环境配置
- 🎰 预设了环境变量
- 🪓 去掉了开发环境的 `proxy`
- 🎊 开启了 `iconfont`

## monorepo

`monorepo` 是这个 `template` 的核心目的之一，你可以将

- 需要添加的项目放置在 `/packages` 目录下，参考 `admin` 项目
- 共享组件放在 `/components` 下
- 共享 `hooks` 放在 `/hooks` 下
- 共享工具函数放在 `/utils` 下
- 你也可以创建更多共享资源目录

> 在 `/packages/admin/tsconfig.json` 和 `/packages/admin/config/config.ts` 中均设置了路径别名 `@~` 用来指向 `root workspace`，以便在开发时引用公共资源和跳转，如果你在新增项目中需要用到的话，记得添加。

## tailwindcss

开启方式参考[这里](https://umijs.org/docs/guides/generator#tailwind-css-%E9%85%8D%E7%BD%AE%E7%94%9F%E6%88%90%E5%99%A8)

使用过程遇到问题请看[这里](https://github.com/umijs/umi/issues/11401) [这里](https://github.com/umijs/umi/issues/11591#issuecomment-1702372136)

开启完之后，会发现 `tailwindcss` 和 `antd` 的样式有冲突，

需要在 `app.tsx` 文件中导出 `rootContainer` 以包上 `StyleProvider` 解决。

## 多环境配置

在启动命令中指定 `UMI_ENV` 为 `_dev_`, `_test_`, `_prod_` 来加载对应的环境配置

- 开发环境：`config._dev_.ts`
- 测试环境：`config._test_.ts`
- 生产环境：`config._prod_.ts`

## 环境变量

- `UMI_APP_TOKEN_KEY` 用来存取 `cookie` 中的 `token`，不同项目要用相同的环境变量名和不同的 `value`
- `UMI_APP_PUBLIC_PATH` 部署路径和路由 `base`，通常 `value` 是相同的
- `UMI_APP_BASE` 路由 `base`，因何部署路径一致而没有注入到环境变量中
- `UMI_APP_TITLE` 演示用，你可以拿它作为站点 `title` 或者干脆移除掉
- `UMI_APP_BASE_API` 后台 `api` 公共基础路径

环境变量 `UMI_APP_PUBLIC_PATH`, `UMI_APP_TOKEN_KEY` 不随环境变化，因此在 `.env` 文件中声明，在 `config.ts` 文件中注入。

> 💡 要十分注意的点：
> - 对于 `env` 类型的配置文件，`umi` 只读取 `.env` 和 `.env.local`
> - 在 `.env` 中，自定义的环境变量只有以 `UMI_APP_` 开头时才会被自动注入环境变量
> - 自动注入的环境变量可以这样访问到 `process.env.UMI_APP_XXX`
> - 在 `config.ts` 或 `config.[UMI_ENV].ts` 中，可以用 `define` 配置注入环境变量
> - 一些环境变量注入比如 `UMI_APP_TOKEN_KEY: process.env.UMI_APP_TOKEN_KEY` 只是为了在运行时好用，少些 `process.env.` 才注入的
> - 在运行时代码中使用了注入的环境变量，会在编译时被替换成 `define` 中设置的 `value`
> - 一些不随环境变化的环境变量，在 `config.ts` 中被注入
> - 需要跟随环境变化的环境变量，在 `config.[UMI_ENV].ts` 中被注入
> - 使用环境变量时可能报未知类型错误，可以在 `/packages/admin/src/typings.d.ts` 中声明类型

## proxy

我们通常有开发环境的后端服务，所以使用 `proxy` 反而不如直接联调接口，所以就把 `proxy` 移除掉了

## iconfont

官方文档上讲，要在 `layout` 中使用就要加 `iconfontUrl` 配置，要在 `menu` 中使用，也要加，这样做了之后发现两个问题：

- `iconfont` 被加载了两次
- 在 `menu` 和 `layout` 以外，比如登录页面，没法使用 `iconfont`

于是把 `iconfont.js（可以是在线资源）` 的加载写在了 `config.ts` 的 `headScripts` 中，其他地方不配置

Copyright (c) <%= answers.year %> <%= answers.author %>
