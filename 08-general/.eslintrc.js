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
    // ES其他特性
    ecmaFeatures: {
      // 如果是React项目，需要开启JSX语法
      jsx: true,
    },
  },
  // 具体检查规则
  // 自定义规则会覆盖预设规则
  // 如果遇到不匹配的规则，在使用webpack打包是会有相应的警告/错误提示
  rules: {
    semi: "warn", // 缺少分号警告提示
    "no-var": "error", // 禁止使用var声明变量
  },
  // 继承其他规则
  extends: [
    "eslint:recommended", // 使用ESLint官方推荐的规则
    // 对于React的开发，配置 https://www.npmjs.com/package/eslint-plugin-react
    // 否则可能会报一些比较奇怪的ESLint错误
    "plugin:react/recommended"
  ],
};
