module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    //关闭“禁用console”规则
    "no-console": "off",
    //缩进不规范警告，要求缩进为2个空格，默认值为4个空格
    "indent": ["warn", 2, {
      //设置为1时强制switch语句中case的缩进为2个空格
      "SwitchCase": 1,
      //分别配置var、let和const的缩进
      "VariableDeclarator": { "var": 2, "let": 2, "const": 3 }
    }],

  }
}
