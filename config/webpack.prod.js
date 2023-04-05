const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

function getStyleLoaders(preProcessor) {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["postcss-preset-env"],
        },
      },
    },
    preProcessor,
  ].filter(Boolean);
}

module.exports = {
  mode: "production",
  // clean: true,
  entry: "./src/main.js",
  output: {
    // path 指定的是输出文件的目录
    path: path.resolve(__dirname, "../dist"),
    // filename 指定的是 js 文件的输出目录（这两者有差别！）
    filename: "js/bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          /**使用 style-loader、css-loader 处理样式资源
           * 以及 css 预处理器 [sass|less]-loader
           */
          {
            test: /\.css$/,
            use: getStyleLoaders(),
          },
          {
            test: /\.less$/,
            use: getStyleLoaders("less-loader"),
          },
          {
            test: /\.s(a|c)ss$/,
            use: getStyleLoaders("sass-loader"),
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
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, '../src'),
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    // 配置 ESLint 插件
    new ESLintWebpackPlugin({
      // context 指明对项目下的什么文件进行 eslint 检查
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
    }),

    /**
     * 使用 html-webpack-plugin 插件,
     * 可以将模板 html 文件移动到输出目录中，并自动引用 bundle.js 文件
     */
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),

    /**
     * 用 style-loader 在 js 文件中处理 css 文件会将样式动态注入到 html 的 style 标签中
     * 这样子会导致先解析完 html 再注入 style 标签，导致样式闪烁
     * 使用 mini-css-extract-plugin 插件，可以将 css 源文件输出为单独的 css 文件，
     * 即浏览器引擎是先解析 css 文件再解析 html 代码
     */
    new MiniCssExtractPlugin({
      filename: "css/[hash:8].css",
    }),

    new CssMinimizerPlugin(),
  ],

  devtool: "source-map",
};
