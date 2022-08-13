module.exports = {
  // 环境
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
  // 解析选项
  parserOptions: {
    ecmaVersion: 6, // ES语法版本
    sourceType: "module", // ES模块化
    ecmaFeatures: { // ES其他特性
      jsx: true, // 如果是React项目，需要开启JSX语法
    },
  },
  // 具体检查规则
  rules: {
    "no-var": "error", // 禁止使用var声明变量
    // "no-console": "warn", // 禁止使用console
  },
  // 继承其他规则
  extends: [
    "eslint:recommended", // 使用eslint官方推荐的规则
  ],
};
