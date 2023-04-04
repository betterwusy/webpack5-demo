const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  // clean: true,
  entry: "./src/main.js",
  output: {
    // path 指定的是输出文件的目录
    path: path.resolve(__dirname, "dist"),
    // filename 指定的是 js 文件的输出目录（这两者有差别！）
    filename: "./js/bundle.js",
    clean: true,
  },
  module: {
    rules: [
      /**使用 style-loader、css-loader 处理样式资源
       * 以及 css 预处理器 [sass|less]-loader
       */
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.s(a|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },

      /**
       * 使用 webpack5 内置 asset module（资源模块）处理资源文件
       * 如：图片、字体文件、音/视频 等
       * 可选资源模块类型如下：
       *  - asset/resource: 将文件导出到输出目录中
       *  - asset/inline:   将文件转成 dataUrl
       *  - asset/source:   导出文件的源代码注入到输出文件中
       *  - asset:  通用资源类型, 按照默认条件，自动地在 resource 和 inline 之间进行选择
       *             默认是小于 8kb 用 inline 方式，否则用 resource 方式
       *             用 parser.dataUrlCondition.maxSize 属性来修改此条件（单位 b）
       */
      {
        test: /\.(p(n|e)g|jpe?g|gif|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        // generator 对象配置生成的文件路径和名称
        generator: {
          filename: "static/images/[hash:8][ext][query]",
        },
      },
      // 处理字体资源
      {
        test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[hash:8][ext][query]",
        },
      },

      // 对 js 文件使用 babel 进行处理
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules代码不编译
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    // 配置 ESLint 插件
    new ESLintWebpackPlugin({
      // context 指明对项目下的什么文件进行 eslint 检查
      context: path.resolve(__dirname, "src"),
    }),

    /**
     * 使用 html-webpack-plugin 插件,
     * 可以将模板 html 文件移动到输出目录中，并自动引用 bundle.js 文件
     */
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
  ],

  /**
   *  配置开发服务器
   *  指定主机名和端口号，在开发本地启动一个 web 服务器，
   *  并在资源文件发生变化时自动刷新重新构建输出文件
   *  （并不会生成 dist 目录，因为输出文件是在内存中）
   */
  devServer: {
    host: "localhost",
    port: "3000",
    open: true,
  },
};
