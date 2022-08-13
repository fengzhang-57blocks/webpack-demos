const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "./dist/"),
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/, // 匹配所有.css结尾的文件
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader", // 将css文件编译为commonjs的模块到js中
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [
                      "postcss-preset-env", // 使用这个预设能解决大多数样式兼容性问题
                    ],
                  },
                },
              },
            ],
          },
          {
            test: /\.s(a|c)ss$/,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [
                      "postcss-preset-env", // 使用这个预设能解决大多数样式兼容性问题
                    ],
                  },
                },
              },
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
            options: {
              cacheDirectory: true, // 开启babel编译缓存
              cacheCompression: false, // 缓存文件不要压缩
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname , "src"), // 指定检查文件的根目录
      cache: true,
      cacheLocation: path.resolve(__dirname, "./cache/.eslintcache"),
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: './styles/[chunkhash].css'
    }),
    new CssMinimizerPlugin(), // css压缩
  ],
  devtool: "hidden-source-map",
};
