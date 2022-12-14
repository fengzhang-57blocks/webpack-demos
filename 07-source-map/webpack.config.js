const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  // 定位错误信息只包含行映射，打包编译速度快
  // devtool: "cheap-module-source-map",
  devtool: "source-map", // production 模式使用source-map
  mode: "production",
};
