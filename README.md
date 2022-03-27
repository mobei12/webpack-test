### webpack5,和以前版本有很大区别,慎用

### init 构建方式

## todo 解决多页面打包问题

### 打包分析

-   stats
    -   在 package.json 中配置
    -   在 webpack.config.js 中配置
-   时间插件时间
    -   [speed-measure-webpack-plugin](https://github.com/stephencookdev/speed-measure-webpack-plugin) 在 webpack5 和 MiniCssExtractPlugin 同时使用会报错
    -   使用 webpack 自带的分析工具 [ProfilingPlugin](https://webpack.js.org/plugins/profiling-plugin/#root)
-   空间插件分析
    -   [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
