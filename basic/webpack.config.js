const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "./dist/"),
    clean: true, // 告知webpack每次打包都清空之前的打包结果
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 匹配所有.css结尾的文件
        // 指定使用哪些loader来处理这种格式的文件
        use: [
          "style-loader",  // 将js中的css通过创建style标签的形式添加到HTML（DOM）中
          "css-loader", // 将css文件编译为commonjs的模块到js中
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader", // 将scss或sass文件编译为css文件
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 30 * 1024, // 指定小于30kb的图片转base64，优点是减少请求数量 缺点：体积可能会更大
          },
        },
        generator: {
          filename: "images/[name].[ext]", // 此配置可以将图片输出到指定路径
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules代码不编译
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({

      context: path.resolve(__dirname, "src"), // 指定检查文件的根目录
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  // devServer: {
  //   host: "localhost", // 启动服务器域名
  //   port: "3000", // 服务器端口号
  //   open: true, // 编译完成之后自动打开浏览器
  // },
};
