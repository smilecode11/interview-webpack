const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { srcPath } = require("./paths")

module.exports = {
    entry: {
        index: path.join(srcPath, 'index.js'),
        other: path.join(srcPath, 'other.js')
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader'],
            include: srcPath,
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            //  loader 的执行顺序是, 从后往前
            use: ['style-loader', 'css-loader', 'postcss-loader']
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        },
        {
            test: /\.html$/,
            use: {
                loader: 'html-loader',
                options: {
                    esModule: false
                }
            }
        }]
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: path.join(srcPath, 'index.html'),
        //     filename: 'index.html'
        // })

        // 多入口 - 生成 index.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html',
            //  chunks 表示该页面引用那些 chunk, 即上面 entry 中的 index 和 other
            chunks: ['index']   //  只引用 index.js
        }),

        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'other.html'),
            filename: 'other.html',
            chunks: ['other']
        })
    ]
}