const path = require('path');
module.exports = {
    mode: 'none',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
        publicPath: "dist/"
    },
    module: {
        rules: [
            {
                test:/.js$/,
                use:{
                    loader: 'babel-loader',
                    options: {
                        presets:['@babel/preset-env']
                    }
                }
            },
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /.jpg|.png$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024 //字节
                    }
                }
            },
            {
                test: /.html$/,
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
            }
        ]
    }
}