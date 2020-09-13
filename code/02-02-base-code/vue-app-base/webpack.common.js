

// 解题思路
//
// 1.配置基础的，公共的 webpack 配置，基础配置实现后再进行对开发环境、生产环境进行切分
// 2.以 main.js 为入口文件，输出到 dist 中
// 3.这是一个 Vue 项目，需要使用 loader 或 plugin 对 Vue 进行转换，由于对 Vue 的认识为 0 ,待我查资料后再补充
// 4.项目使用 less 需要是使用 less-loader 对 less 代码进行转换，并使用 style-loader
// 5.根据本项目内容，图片资源文件的比较小，所有使用 url-loader 将图片转换为 Data URL 格式
// 6.使用 babel-loader 对代码进行转换，使得代码尽可能的适配浏览器
// 7.使用 html-loader 对 html 代码进行转换
// 8.使用 html-webpack-plugin 对 html 模板进行处理，使 ./public/index.html 中的标题及 icon 能正常使用
// 9.配置 webpack-dev-server 使项目运行时可以自动刷新
// 10.配置 source Map 使开发调试时更方便
// 11.使用 Tree Shaking 尽可能的减少无效代码
// 12.压缩 css js 文件
// 13.为每个文件提供 hash 值
// 14.使用 clean-webpack-plugin 进行对生成的目录进行清除
// 15.使用 copy-webpack-plugin 对静态资源进行复制
// 16.使用 eslint 对代码进行校验
//
// 以上为基础
//
// 根据 package.json 中的 scripts 配置命令进行切分
//
// serve:
//     1.开发环境中，不需要 webpack 对代码进行处理，所有 mode = development
// 2.开发环境中，需要对代码进行调试，需要是用 source Map ，需要使用的 source Map 为 cheap-eval-module-source-map
// 3.开发环境中，不需要使用 Tree Shaking 已经压缩 css、js
// 4.开发环境中不需要每次都对静态资源进行拷贝，所有不使用 copy-webpack-plugin，
//
// build:
//     1.生产环境中，需要 webpack 对代码进行处理，所有 mode = 默认为production
// 2.生产环境中，不需要source map
// 3.生产环境中，需要使用 Tree Shaking 以及压缩 css js 文件，尽可能的减少体积
// 4.打包时需要将静态资源文件进行拷贝

const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    // 打包入口文件的路径
    entry: './src/main.js',
    // 输出文件路径
    output: {
        // 指定输出的文件名,设置6位的 hash 值
        filename: 'bundle.[hash:6].js',
        // 指定输出文件路径， 必须使用绝对路径
        path: path.join(__dirname, 'dist'),
    },
    module: {
        rules: [
            // vue loader
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                use: 'vue-loader',
            },
            {
                test: /\.(js|vue)$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                enforce: "pre",
                //指定检查的目录
                //eslint检查报告的格式规范
                options: {
                    formatter: require("eslint-friendly-formatter")
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            // less-loader、css-loader、style-loader 用于解析编译生成样式
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attributes: {
                            list: [
                                {
                                    tag: 'img',
                                    attribute: 'src',
                                    type: 'src'
                                },
                                {
                                    tag: 'a',
                                    attribute: 'href',
                                    type: 'src'
                                }
                            ]
                        }
                    },
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        esModule: false,
                        limit: 10 * 1024 // 小于10kb的文件转化为 data urls
                    }
                }
            },
        ]
    },
    plugins: [
        // 用于生成 index.html
        new htmlWebpackPlugin({
            title: '老王的 Webpack Vue',
            // html 模板，因为 html-loader 与 htmlWebpackPlugin 冲突，导致 ejs 模板解析有误
            // 所有引用 index.ejs 为模板文件
            template: path.resolve(__dirname, './index.ejs'),
            favicon: path.resolve(__dirname, 'public/favicon.ico'),
        }),
        // 作用：将rules中的规则应用到vue单文件组件中 例：style script中的语法解析
        new VueLoaderPlugin(),
        // 默认值配置
        new webpack.DefinePlugin({
            BASE_URL: '"/"'
        }),
    ]
}