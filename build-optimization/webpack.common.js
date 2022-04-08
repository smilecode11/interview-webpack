const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
// const AutoDllWebpackPlugin = require('autodll-webpack-plugin')
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const { srcPath } = require("./paths")

module.exports = {
    //  webpack5 开箱即用持久化缓存: 通过配置持久化缓存, 来缓存生成的 webpack 模板和 chunk, 改善构建速度
    cache: {
        type: 'filesystem'
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
            //  babel-loader, happypack 演示
        ]
    },
    plugins: [
        //  进度条
        new ProgressBarPlugin({
            format: `  :msg [:bar] ${':percent'} (:elapsed s)`
        }),

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

        //#region webpack5 不需要 dll
        //  配置打包为 dll 的文件
        // new AutoDllWebpackPlugin({
        //     inject: true,   //  设置 true, 则把 dll bundles 插到 index.html 中
        //     filename: '[name].dll.js',
        //     context: path.join(__dirname, '../'),   //  AutoDllWebpackPlugin 的 context 必须和 package.json 同级
        //     entry: {
        //         vue: ['vue']
        //     }
        // }),
        //  使用 hardSourceWebpackPlugin
        // new HardSourceWebpackPlugin({})
        //#endregion
    ]
}