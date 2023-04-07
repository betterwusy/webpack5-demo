const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");

module.exports = {
  mode: "production",
  /** code split：
   *  1. 配置多入口多输出，对 js 代码进行拆分
   */
  // entry: {
  //   main: "./src/main.js",
  //   app: "./src/app.js",
  // },

  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name].[contenthash:8].js",
    chunkFilename: "js/[name].[contenthash:8].chunk.js", // 动态导入文件的输出文件名
    assetModuleFilename: "", // 定义资源模块处理后的输出文件名
    clean: true,
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),

    /**
     *  对 chunk 文件使用
     *  @vue/preload-webpack-plugin 插件
     *  使资源增加提示 preload/prefetch，
     */
    // new PreloadWebpackPlugin(),

    // 动态引入的 chunk 可能也有 css 文件生成,
    // 因此这里也要配 chunk 对应的 css 输出文件名称
    new miniCssExtractPlugin({
      filename: "style/[name].[contenthash:8].css",
      chunkFilename: "style/[name].[contenthash:8].chunk.css",
    }),
  ],

  /**
   *  code split:
   *  2. 多入口文件都引用了同一份代码，提取公共代码成一个 chunk 文件
   *      而不是把相同的代码都重复打包进多个文件
   */
  optimization: {
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
      // 以下是默认值
      // minSize: 20000, // 分割代码最小的大小
      // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
      // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
      // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
      // maxInitialRequests: 30, // 入口js文件最大并行请求数量
      // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
      // cacheGroups: { // 组，哪些模块要打包到一个组
      //   defaultVendors: { // 组名
      //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
      //     priority: -10, // 权重（越大越高）
      //     reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
      //   },
      //   default: { // 其他没有写的配置会使用上面的默认值
      //     minChunks: 2, // 这里的minChunks权重更大
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },
      // },

      // 修改配置
      cacheGroups: {
        // 组，哪些模块要打包到一个组
        // defaultVendors: { // 组名
        //   test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
        //   priority: -10, // 权重（越大越高）
        //   reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
        // },
        default: {
          // 其他没有写的配置会使用上面的默认值
          minSize: 0, // 我们定义的文件体积太小了，所以要改打包的最小文件体积
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },

    /**
     *  如果 chunk 文件内容变了所以文件名中的 [contenthash] 变了
     *  因为 main.js 内容中引用了这个 chunk 文件，同样导致 main 文件名中的 [contenthash] 也变了
     *  使用 runtimeChunk 配置，使 main.js 文件通过一个 runtime 文件来引用其他文件
     */
    runtimeChunk: {
      name: (entry) => `runtime~${entry.name}`
    }
  },
};
