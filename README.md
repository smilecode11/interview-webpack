# webpack - 面试

## 基本配置

- mode
- output
- module
- devServer

## 高级配置

- 配置多入口
- 抽离 css 文件
- 抽离公共代码(公共 js/css) 和 第三方代码(axios 等)
- 懒加载, 使用 .vue

## webpack 性能优化

- 优化打包构建速度 - 开发体验和效率

  - 优化 babel-loader, 加缓存
  - IgnorePlugin, 直接忽略依赖库的某模块, 不引入
  - noParse, 引入依赖库, 但不打包
  - happyPack, 多进程打包 (不再维护, 建议使用 thread-laoder)
  - thread-loader, 将耗时 loader 放在一个独立的进程中运行, 加快 loader 构建速度
  - ParllelUglifyPlugin, 多进程压缩 JS
  - 自动刷新
  - 热更新
  - 缓存(cache), webpack5 开箱即用
  - DllPlugin, 大依赖缓存 (webpack5 不需要)
  - AutoDllPlugin & hardSourceWebpackPlugin, DllPlugin 代替方案 (webpack5 不需要)
  - 使用 webpack5 资源模块 (asset module)

- 优化产出代码 - 产品性能
  - 小图片 base64 输出
  - bundle 加 hash
  - 懒加载(异步加载)大文件库
  - 提取公共代码, 三方库和公共代码
  - IgnorePlugin
  - 使用 CDN, 静态资源 cdn 访问
  - 使用 production
  - 开启 Scope Hosting
