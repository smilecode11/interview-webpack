const webpack = require('webpack')
const { merge } = require('webpack-merge')   //  此处用于合并配置项, 作用类似 Object.assign
const webpackCommonConf = require("./webpack.common.js")
const { distPath } = require('./paths')

module.exports = merge(webpackCommonConf, {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'file-loader'
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            ENV: JSON.stringify('development')  //  window.ENV
        })
    ],
    devServer: {
        port: 8080,
        open: true,  //  自动打开浏览器
        compress: true,  //  启动 gzip 压缩 

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