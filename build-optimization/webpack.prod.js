const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { merge } = require('webpack-merge')
const HappyPack = require('happypack')
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin') //  Scope Hosting
const webpackCommonConf = require("./webpack.common.js")
const { distPath, srcPath } = require('./paths')

module.exports = merge(webpackCommonConf, {
    mode: 'production',
    entry: {
        index: path.join(srcPath, 'index.js'),
        other: path.join(srcPath, 'other.js')
    },
    output: {
        filename: '[name].[contenthash:8].js',  //  打包代码时, 加上hash值, 通过 hash 值判断是否命中缓存去获取资源
        path: distPath,
        // publicPath:  'https://cnd.abc.com' //  修改所有 ing钛资源文件 url 的前缀
    },
    resolve: {
        //  针对 NPM 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法文件
        mainFields: ['jsnext:main', 'browser', 'main']
    },
    module: {
        //  noParse 忽略大型的 library 可以提高构建性能
        noParse: /jquery|lodash/,
        rules: [
            // 图片 - 考虑 base64 编码的情况
            {
                test: /\.(png|jpg|jpeg|gif|bmp)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // 小于 5kb 的图片用 base64 格式产出
                        // 否则，依然延用 file-loader 的形式，产出 url 格式
                        limit: 5 * 1024,
                        // 打包到 img 目录下
                        outputPath: '/img1/',

                        //  设置图片的 cdn 地址, 也可以统一在外面的 output 中设置
                        // publicPath: 'http://cdn.abc.com'
                    }
                }
            },
            //  抽离 css, 不再使用 style-loader
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            //  抽离 less -> css
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader']
            },
            {
                test: /\.(scss|sass)/,
                include: srcPath,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader']
            },
            {
                test: /\.js$/,
                // use: ['babel-loader'],
                // use: ['babel-loader?cacheDirectory'],   //  开启缓存
                use: ['happypack/loader?id=babel'],   //    把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
                include: srcPath,   //  明确范围, include 和 exclude 两者选一个即可
                // exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),   //  默认清空 output.path 文件夹
        new webpack.DefinePlugin({
            ENV: JSON.stringify('production')
        }),

        //  抽离 css 文件
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css'
        }),

        //  1.webpack.IgnorePlugin 实例 忽略 moment库 下的 ./locale(语言包) 模块的引入
        new webpack.IgnorePlugin({
            resourceRegExp: /\.\/locale/,
            contextRegExp: /moment/
        }),

        //  happypack 开启多进程打包
        new HappyPack({
            //  使用唯一标识符 id 代表当前 happypack 处理一类特定的文件
            id: 'babel',
            //  如何处理 js 文件, 和 loader 配置一样
            loaders: ['babel-loader?cacheDirectory']
        }),

        //  使用 WebpackParallelUglifyPlugin 多进程压缩输出 JS
        new WebpackParallelUglifyPlugin({
            // （还是使用 UglifyJS 压缩，只不过帮助开启了多进程）
            uglifyJS: {
                output: {
                    beautify: false, // 最紧凑的输出
                    comments: false, // 删除所有的注释
                },
                compress: {
                    // 删除所有的 `console` 语句，可以兼容ie浏览器
                    drop_console: true,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true,
                }
            }
        }),

        //  启用 Scope Hoisting
        new ModuleConcatenationPlugin()
    ],

    optimization: {
        //  压缩 css
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],

        //  分割代码块, 如三方模块, 公共文件
        splitChunks: {
            chunks: 'all',

            //  缓存分组
            cacheGroups: {
                //  三方模块
                vendor: {
                    name: 'vendor', // chunk 名称
                    priority: 1, // 权限更高，优先抽离，重要！！！
                    test: /node_modules/,
                    minSize: 0,  // 大小限制
                    minChunks: 1  // 最少复用过几次
                },

                // 公共的模块
                common: {
                    name: 'common', // chunk 名称
                    priority: 0, // 优先级
                    minSize: 0,  // 公共模块的大小限制
                    minChunks: 2  // 公共模块最少复用过几次
                }
            }
        }
    }
})