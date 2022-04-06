const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { srcPath } = require("./paths")

module.exports = {
    entry: path.join(srcPath, 'index'),
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
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html'
        })
    ]
}