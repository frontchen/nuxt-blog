const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("terser-webpack-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
module.exports = {
  publicPath: process.env.VUE_APP_BASEURL,
  // 生产环境sourceMap
  productionSourceMap: false,
  devServer: {
    hot: true,
    open: true,
    port: 3000,
    // proxy: {
    //   '/api': {
    //     target: `${process.env.VUE_APP_API}:${process.env.VUE_APP_API_PORT}/`, //API服务器的地址
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  chainWebpack: (config) => {
    config
      .plugin("ignore")
      .use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
    config.plugin("loadshReplace").use(new LodashModuleReplacementPlugin());
  },
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  // transpileDependencies: [ ],
  configureWebpack: (config) => {
    config.resolve = {
      alias: {
        "@": path.resolve(__dirname, "src"),
        Api: path.resolve(__dirname, "src/api/"),
        Components: path.resolve(__dirname, "src/components/"),
        Common: path.resolve(__dirname, "src/pages/common"),
        Pages: path.resolve(__dirname, "src/pages"),
      },
      extensions: ["*", ".js", ".vue", ".json"],
    };
    config.entry.app = ["babel-polyfill", "./src/main.js"];

    if (process.env.VUE_APP_ENV === "production") {
      let plugins = [
        new UglifyJsPlugin({
          terserOptions: {
            warnings: false,
            // 是否混淆变量名，默认false
            mangle: true,
            compress: {
              // 删除 debugger
              drop_debugger: true,
              //  删除 console.*
              // drop_console: true,
              // 删除特定方法
              pure_funcs: ["console.log"],
            },
          },
          // 使用sourceMap将错误消息位置映射到模块(这会减慢编译速度)
          sourceMap: false,
          // 使用多进程并行运行来提高构建速度。默认并发运行次数:os.cpus().length- 1
          parallel: true,
        }),
      ];
      config.plugins = [...config.plugins, ...plugins];
    }
  },
};
