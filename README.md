# 模块二：模块化开发与规范化标准

## 简答题

### 一、Webpack 的构建流程主要有哪些环节？如果可以尽可能详尽的描述 Webpack 打包的整个过程

解：

Webpack 在启动后，会从 Entry 开始，递归解析 Entry 依赖的所有 Module，每找到一个 Module，就会根据 Module.rules 里配置的 Loader 规则进行相应的转换处理，对 Module 进行转换后，再解析出当前 Module 依赖的 Module，这些 Module 会以 Entry 为单位进行分组，即为一个 Chunk。因此一个 Chunk，就是一个 Entry 及其所有依赖的 Module 合并的结果。最后 Webpack 会将所有的 Chunk 转换成文件输出 Output。在整个构建流程中，Webpack 会在恰当的时机执行 Plugin 里定义的逻辑，从而完成 Plugin 插件的优化任务。



### 二、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路

解：

#### 什么是 Loader ？

Loader 用于对模块文件进行编译转换和加载处理，在 module.rules 数组中进行配置，它用于告诉 Webpack 在遇到哪些文件时使用哪些 Loader 去加载和转换。Loader 还可以通过 querystring 或 object 指定选项参数。

#### 什么是 plugin?

Plugin 用于扩展 Webpack 功能，实现原理是在构建流程里注入钩子函数。在 Plugin 数组中进行配置。

简而言之， Loader 是加载器，用去加载转换文件，Plugin  是插件，用于扩展 Webpack 的功能

#### Loader 的开发思路

> Loader 也是一个 Commonjs 模块，它需要返回一段有效的 JS 语句。因为 Loader 的执行时管道机制，所有 Loader 模块也可以返回一段字符串，由下一个 Loader进行处理

1. Loader 模块接收  `source` 参数，即源文件内容
2. 使用相应的处理器对 `source` 进行对应的处理
3. 返回一段有效的 JS 语句或者字符串

#### Plugin 的开发思路

> Webpack 提供有各个流程的钩子，Plugin 的实现就是利用 Webpack 的钩子进行的，在对应的钩子下挂载需要处理的 Plugin。Plugin 必须是函数或者是一个包含 apply 方法的对象

1. 确定要开发的 Plugin 的执行时机，找到相对应的 Webpack 钩子。
2. 处理webpack内部实例的特定数据。
3. 功能完成后调用webpack提供的回调。
4. 

## 编程题

### 一、使用 Webpack 实现 Vue 项目打包任务

具体任务及说明：

​	先下载任务的基础代码 百度网盘链接： https://pan.baidu.com/s/1pJl4k5KgyhD2xo8FZIms8Q 提取码: zrdd

​	这是一个使用 Vue Cli 创建出来的 Vue 项目基础结构

​	有所不同的是这里我移除掉了 vue-cli-service （包含 webpack 等工具的黑盒工具）

​	这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务

​	尽可能的使用上所有你了解到的功能和特性

### 作业要求

本次作业中的编程题要求大家完成相应代码后（二选一）

1.简单录制一个小视频介绍一下实现思路，并演示一下相关功能。

2.提交一个项目说明文档，要求思路流程清晰。

最终将录制的视频或者说明文档和代码统一提交至作业仓库

