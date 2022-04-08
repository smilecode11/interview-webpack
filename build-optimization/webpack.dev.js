const path = require('path')
const webpack = require('webpack')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')    //  热更新插件
const { merge } = require('webpack-merge')   //  此处用于合并配置项, 作用类似 Object.assign
const webpackCommonConf = require("./webpack.common.js")
const { srcPath } = require('./paths')

module.exports = merge(webpackCommonConf, {
    mode: 'development',
    entry: {
        // index: path.join(srcPath, 'index.js'),
        index: [    //  index 被赋予热更新能力
            'webpack-dev-server/client?http://localhost:8080/',
            'webpack/hot/dev-server',
            path.join(srcPath, 'index.js')
        ],
        other: path.join(srcPath, 'other.js')
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'file-loader'
            },
            //  dev 环境可以直接使用 style-loader, 但是在生产环境这样做是不合理的. css 和 html 理应拆分
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.(scss|sass)/,
                include: srcPath,
                use: ['style-loader', 'css-loader', 'postcss-loader'/* , {
                    loader: 'thread-loader',
                    options: {
                        workerParallelJobs: 2
                    }
                } */, 'sass-loader']
            },
            {
                test: /\.js$/,
                // use: ['babel-loader'],
                use: ['babel-loader?cacheDirectory'],   //  开启缓存
                include: srcPath,   //  明确范围, include 和 exclude 两者选一个即可
                // exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            ENV: JSON.stringify('development')  //  window.ENV
        }),

        new HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 8080,
        open: true,  //  自动打开浏览器
        compress: true,  //  启动 gzip 压缩

        hot: true,   //  开启热更新

        //  设置代理
        proxy: {
            //  将本地 /api1/xxx 代理到 localhost:3000/xxx
            '/api1': {
                target: "http://localhost:3000",
                pathRewrite: {
                    '/api1': ''
                },
            },
            //  将本地 /api2/xxx 代理到 localhost:3001/api2/xxx
            '/api2': 'http://localhost:3001'
        }
    }
})