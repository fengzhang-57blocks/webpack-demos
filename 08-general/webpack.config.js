const path = require('path');
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.jsx?$/,
            loader: "babel-loader",
            exclude: /node_modules/, // 排除node_modules代码不编译
          },
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader, // 用 `MiniCssExtractPlugin.loader` 替换掉之前的 `style-loader`
              "css-loader",
              // ❗️注意，此时执行打包命令并不会生效，我们还需在`package.json`中设置`browserslist`
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
              MiniCssExtractPlugin.loader, // 用 `MiniCssExtractPlugin.loader` 替换掉之前的 `style-loader`
              "css-loader",
              // ❗️注意，此时执行打包命令并不会生效，我们还需在`package.json`中设置`browserslist`
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
              "sass-loader",
            ],
          },
          {
            test: /\.(png|jpe?g|gif)$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                // 配置此选项后 < 30kb 的图片文件会被转换为base64
                // 优点：减少请求次数
                // 缺点：转换为base64之后，体积会增大，所以过大的图片不适宜转换为base64
                maxSize: 30 * 1024,
              },
            },
            generator: {
              // 图片资源的输出目录
              filename: "./assets/[contenthash][ext][query]",
            },
          }
        ],
      }
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, "src"), // 指定检查文件的根目录
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    // 除了要在loader里边配置之外，还要在plugins进行配置
    // 配置完成，运行npx webpack会发现dist目录下多了styles/[contenthash].css文件，说明样式文件已经被打包为单独的文件了
    // 对比使用`style-loader`就会发现，在使用了`MiniCssExtractPlugin.loader`之后资源的加载情况要好了很多
    new MiniCssExtractPlugin({
      filename: './styles/[contenthash].css'
    }),
    // css压缩，运行npm run build之后查看输出目录的样式文件
    new CssMinimizerPlugin(),
  ],
  devtool: "cheap-module-source-map", // development
  // devtool: "hidden-source-map", // production
  // 遇到jsx文件无法识别，可通过配置自动补全文件名来解决
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: "production",
};
