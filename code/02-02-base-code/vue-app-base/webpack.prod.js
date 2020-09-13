const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const {merge} = require('webpack-merge')
const common = require('./webpack.common')
module.exports = merge(common, {
    mode: 'production',
    output: {
        // 指定输出的文件名
        filename: 'bundle.[chunkhash:6].js',
    },
    devtool: false,
    optimization: {
        usedExports: true,
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin(), // 压缩 css
            new TerserWebpackPlugin(), //压缩 js
        ],
        concatenateModules: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './public',
                    to: './'
                }
            ]
        })
    ]
})