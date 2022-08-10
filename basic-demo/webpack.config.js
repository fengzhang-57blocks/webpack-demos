const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist/'),
    // 此配置告知webpack每次打包都清空之前的打包结果
    clean: true,
  },
  module: {
    rules: [
      {
        // 匹配所有.css结尾的文件
        test: /\.css$/,
        // 指定使用哪些loader来处理这种格式的文件
        use: [
          // 将js中的css通过创建style标签的形式添加到HTML（DOM）中
          'style-loader',
          // 将css文件编译为commonjs的模块到js中
          'css-loader',
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          // 将scss或sass文件编译为css文件
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            // 指定小于30kb的图片转base64
            // 优点：减少请求数量 缺点：体积可能会更大
            maxSize: 30 * 1024,
          },
        },
        generator: {
          // 此配置可以将图片输出到指定路径
          filename: 'images/[name].[ext]',
        },
      },
    ],
  },
};
