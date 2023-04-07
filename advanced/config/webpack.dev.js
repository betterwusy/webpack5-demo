const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  /** code split：
   *  1. 配置多入口多输出，对 js 代码进行拆分
   */
  entry: {
    app: "./src/app.js",
    main: "./src/main.js",
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
  devServer: {
    host: "localhost",
    port: "3000",
    open: true,
  },
};
