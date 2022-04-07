const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const { srcPath } = require("./paths")

module.exports = {
    entry: {
        index: path.join(srcPath, 'index.js'),
        other: path.join(srcPath, 'other.js')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader'],
                include: srcPath,
                exclude: /node_modules/
            },
            {
                test: /\.(html|htm)$/i,
                use: {
                    loader: 'html-loader',
                    options: {
                        esModule: false
                    }
                }
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
        // 多入口 - 生成 index.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html',
            //  chunks 表示该页面引用那些 chunk, 即上面 entry 中的 index 和 other
            chunks: ['index', 'vendor', 'common']
        }),

        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'other.html'),
            filename: 'other.html',
            chunks: ['other', 'common']
        }),

        //  添加 VueLoaderPlugin 插件
        new VueLoaderPlugin(),
    ]
}