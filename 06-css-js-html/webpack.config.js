const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        // webpack在把某个文件交给loader处理时，
        // 会遍历 `module.rules` 中所有的loader，即使这些loader中第一个就命中，webpack还是会遍历剩下的loader，
        // 我们可以使用 `oneOf` 根据文件类型加载对应的loader，只要命中就退出 loader 的匹配。
        oneOf: [
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
        ],
      }
    ],
  },
  plugins: [
    // 除了要在loader里边配置之外，还要在plugins进行配置
    // 配置完成，运行npx webpack会发现dist目录下多了styles/[chunkhash].css文件，说明样式文件已经被打包为单独的文件了
    // 对比使用`style-loader`就会发现，在使用了`MiniCssExtractPlugin.loader`之后资源的加载情况要好了很多
    new MiniCssExtractPlugin({
      filename: './styles/[chunkhash].css'
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    // css压缩，运行npm run build之后查看输出目录的样式文件
    new CssMinimizerPlugin(),
  ],
  mode: "development",
};
