const marked = require('marked')
module.exports = source => {
    // console.log(source)
    // return 'console.log("hello~~")'
    const html = marked(source);
    // return html
    // return `module.exports = ${JSON.stringify(html)}`
    // return `export default ${JSON.stringify(html)}`
    // 返回 html 字符串，交给下一个 loader 处理
    return html
}