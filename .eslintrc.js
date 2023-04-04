module.exports = {
  // js 运行环境
  env: {
    node: true, // 启用 node 环境（即允许有 global 等 node 全局变量）
    browser: true, // 启用浏览器环境（即允许有 window 等浏览器全局变量）
  },

  // 解析选项
  parserOptions: {
    ecmaVersion: 6, // ES 语法版本
    sourceType: "module", // 资源模块类型
    ecmaFeatures: {
      // ES 其他特性
      jsx: true,
    },
  },

  // 继承哪些声明文件
  extends: [
    "eslint:recommended",
  ],

  // 具体检查规则 0/1/2 或者 "off"/"warn"/"error"
  rules: {
    "no-var": 2,
    semi: 0, // 必须使用分号
    "array-callback-return": "warn", // 强制数组方法的回调函数中有 return 语句，否则警告
    "default-case": [
      "warn", // 要求 switch 语句中有 default 分支，否则警告
      { commentPattern: "^no default$" }, // 允许在最后注释 no default, 就不会有警告了
    ],
    eqeqeq: [
      "warn", // 强制使用 === 和 !==，否则警告
      "smart", // https://eslint.bootcss.com/docs/rules/eqeqeq#smart 除了少数情况下不会有警告
    ],
  },

  // 其他配置选项 https://eslint.bootcss.com/docs/user-guide/configuring
};
