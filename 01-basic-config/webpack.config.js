const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 打包入口文件
  entry: "./src/index.js",
  // 打包输出路径
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    // 配置loader之后能让webpack处理其他类型的文件
    rules: [
      {
        // 指定哪些类型文件会被loader转换处理
        test: '/\\.txt$/',
        // 指定在处理这些文件时应该使用哪些loader
        loader: 'raw-loader',
      },
    ],
  },
  // 插件能够让webpack执行更复杂的任务，包括：打包优化、资源管理、环境变量注入...
  // 使用插件一般要:
  //    1. 先通过npm安装
  //    2. 导入`webpack.config.js`
  //    3. 放到plugins配置下，且多数插件都可自定义插件配置
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  // 为webpack指定模式，一般分：development/production/none
  //    开发中设置为 `development`
  //    上线时设置为 `production`
  mode: "development",
};
