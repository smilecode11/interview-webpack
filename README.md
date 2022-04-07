# webpack - 面试

## 基本配置
* mode
* output
* module
* devServer


## 高级配置
* 配置多入口
* 抽离 css 文件
* 抽离公共代码(公共 js/css) 和 第三方代码(axios 等)
* 懒加载, 使用 .vue


## webpack 性能优化
* 优化打包构建速度 - 开发体验和效率
  * 优化 babel-loader, 加缓存
  * IgnorePlugin, 直接忽略依赖库的某模块, 不引入
  * noParse,  引入依赖库, 但不打包
  * happyPack, 多进程打包
  * ParllelUglifyPlugin, 多进程压缩 JS
  * 自动刷新
  * 热更新
  * DllPugin

* 优化产出代码 - 产品性能
