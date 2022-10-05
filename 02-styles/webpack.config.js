const path = require('path');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    // 大部分loader在使用之前都要先通过npm进行安装
    rules: [
      // 配置css loader用来处理css格式的样式资源
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
      // 配置sass loader来处理scss/sass格式的样式资源
      {
        test: /\.s(a|c)ss$/,
        use: [
          "style-loader", // 3. 将js中的css通过创建style标签的形式添加到HTML（DOM）中
          "css-loader",   // 2. 将css文件编译为commonjs的模块到js中
          "sass-loader",  // 1. 将sass文件编译为css文件
        ],
      },
    ],
    // ❗️loader在处理文件时，首先会使用`use`队列尾部的loader进行处理，之后将处理结果交给上一个loader，一直到第一个loader处理完成位置
  },
  mode: "development",
};
