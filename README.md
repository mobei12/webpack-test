### webpack5,和以前版本有很大区别,慎用

### init 构建方式

## todo 解决多页面打包问题

### 打包分析及优化

-   stats
    -   在 package.json 中配置
    -   在 webpack.config.js 中配置
-   时间插件时间
    -   [speed-measure-webpack-plugin](https://github.com/stephencookdev/speed-measure-webpack-plugin) 在 webpack5 和 MiniCssExtractPlugin 同时使用会报错
    -   使用 webpack 自带的分析工具 [ProfilingPlugin](https://webpack.js.org/plugins/profiling-plugin/#root)
-   空间插件分析
    -   [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
-   使用多进程打包
    -   [thread-loader](https://github.com/webpack-contrib/thread-loader)
        -   使用时，需将此 loader 放置在其他 loader 之前。放置在此 loader 之后的 loader 会在一个独立的 worker 池中运行。
        -   在 worker 池中运行的 loader 是受到限制的。例如：
            -   这些 loader 不能生成新的文件。
            -   这些 loader 不能使用自定义的 loader API（也就是说，不能通过插件来自定义）。
            -   这些 loader 无法获取 webpack 的配置。
-   多进程/多实例:并行压缩
    -   [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin/actions)。
        -   [webpackv5](https://webpack.docschina.org/plugins/terser-webpack-plugin/#root) 开箱即带有最新版本的 如果你使用的是 webpack v5 或更高版本，同时希望自定义配置，那么仍需要安装 terser-webpack-plugin。如果使用 webpack v4，则必须安装 terser-webpack-plugin v4 的版本
-   分包

    -   设计基础包
        -   在 html 和配置文件里配置基础包地址
        -   将 react、react-dom 基础包通过 cdn 引入,不打入 bundle 中 ,使用 html-webpack-externals-plugin 插件(webpack5 前)
        -   直接使用 externals 参数配置,(webpack5) - 预编译资源模块
        -   将基础包和业务基础包打包在一起(例如: antd,vue,react)
    -   使用 [DLLPlugin](https://webpack.docschina.org/plugins/dll-plugin#root) 插件进行分包,不打入 bundle 中, DIIReferencePlugin 插件对 manifest.json 进行引用
        -   创建 webpack.dll.config.js
            ```javascript
            // 单独配置在一个文件中webpack.dll.conf.js
            const path = require('path')
            const webpack = require('webpack')
            module.exports = {
            	//context: path.resolve(__dirname, './src'),
            	context: process.cwd(),
            	entry: {
            		// 想统一打包的类库
            		//vendor: ['react']
            		library: ['react', 'react-dom']
            	},
            	resolve: {
            		extensions: ['.js', '.jsx', '.json', '.less', '.css'],
            		modules: [__dirname, 'node_modules']
            	},
            	output: {
            		filename: '[name].dll.js',
            		path: path.resolve(__dirname, './dist/library'),
            		library: '[name]'
            	},
            	plugins: [
            		new webpack.DllPlugin({
            			// name 必须和 output.library 一致
            			name: '[name]',
            			// 该属性需要与 DllReferencePlugin 中一致
            			context: __dirname,
            			path: path.join(
            				__dirname,
            				'./dist/library',
            				'[name].json'
            			)
            		})
            	]
            }
            ```
        -   `npm run dll` 构建
        -   然后需要执行这个配置文件生成依赖文件，接下来需要使用 `DllReferencePlugin` 将依赖文件引入项目中
            ```javascript
            // webpack.conf.js
            module.exports = {
            	// ...省略其他配置
            	plugins: [
            		new webpack.DllReferencePlugin({
            			context: __dirname,
            			// manifest 就是之前打包出来的 json 文件
            			manifest: require('./dist/library/manifest.json')
            		})
            	]
            }
            ```
