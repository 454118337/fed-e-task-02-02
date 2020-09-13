const {merge} = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-eval-module-source-map',
    devServer: {
        contentBase: './public', // 资源路径
        overlay: true, // 在页面上显示错误
        hot: true, // 是否热加载
        open: true, // 是否自动打开浏览器
        port: 8081, // 接口
        stats: "errors-only" //只打印错误错误信息
    },
})