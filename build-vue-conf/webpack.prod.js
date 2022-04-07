const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { merge } = require('webpack-merge')   //  此处用于合并配置项, 作用类似 Object.assign
const webpackCommonConf = require("./webpack.common.js")
const { distPath } = require('./paths')

module.exports = merge(webpackCommonConf, {
    mode: 'production',
    output: {
        filename: '[name].[contenthash:8].js',  //  打包代码时, 加上hash值, 通过 hash 值判断是否命中缓存去获取资源
        path: distPath,
    },
    module: {
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
            }
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
        })
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