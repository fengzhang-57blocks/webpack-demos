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
  // webpack-dev-server服务器启动之后并不会在`./dist`目录下有任何资源输出，此时打包之后的资源都在挂载在了内存中
  // 当然devServer也可以不配置而直接运行`npx webpack serve`，此时服务器启动地址为默认的 `http://localhost:8080/`
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 服务器端口号
    open: true, // 编译完成之后自动打开浏览器
  },
  mode: "development",
};
