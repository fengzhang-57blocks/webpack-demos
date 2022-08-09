const path = require('path');

module.exports = {
  // 模式
  mode: 'development',
  // 入口文件
  entry: './src/index',
  // 输出文件
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist')
  },
  // loader加载器
  module: {
    rules: [],
  },
  // 插件
  plugins: [

  ],
};
