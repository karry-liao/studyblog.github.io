# Webpack loader 和 plugin 实现原理

## 1.1 webpack打包基本原理

webpack的一个核心功能就是把我们写的模块化的代码，打包之后，生成可以在浏览器中运行的代码，我们这里也是从简单开始，一步步探索webpack的打包原理

## 1.2 实现webpack打包核心功能

我们首先在项目根目录下再建立一个bundle.js，这个文件用来对我们刚刚写的模块化`js`代码文件进行打包

1. 首先，我们需要读到入口文件里的内容（也就是index.js的内容）
2. 其次，分析入口文件，递归的去读取模块所依赖的文件内容，生成依赖图
3. 最后，根据依赖图，生成浏览器能够运行的最终代码

### 1. 处理单个模块（以入口为例）

#### 1.1 获取模块内容

我们需要用到`node.js`的核心模块`fs`，我们首先来看读到的内容是什么，然后定义一个`getModuleInfo`方法，这个方法里我们读出文件内容。入口文件`index.js`的所有内容都以字符串形式输出了，我们接下来可以用正则表达式或者其它一些方法，从中提取到`import`以及`export`的内容以及相应的路径文件名，来对入口文件内容进行分析，获取有用的信息。但是如果`import`和`export`的内容非常多，这会是一个很麻烦的过程，这里我们借助`babel`提供的功能，来完成入口文件的分析

#### 1.2 分析模块内容

我们安装`@babel/parser`，演示时安装的版本号为`^7.9.6`

这个babel模块的作用，就是把我们js文件的代码内容，转换成js对象的形式，这种形式的js对象，称做`抽象语法树(Abstract Syntax Tree, 以下简称AST)`

使用`@babel/parser`的`parse`方法把入口文件转化称为了`AST`，我们打印出了`ast`

入口文件内容被放到一个数组中，总共有六个`Node`节点，我们可以看到，每个节点有一个`type`属性，其中前两个的`type`属性是`ImportDeclaration`，这对应了我们入口文件的两条`import`语句，并且，每一个`type`属性是`ImportDeclaration`的节点，其`source.value`属性是引入这个模块的相对路径，这样我们就得到了入口文件中对打包有用的重要信息了。

接下来要对得到的ast做处理，返回一份结构化的数据，方便后续使用。

#### 1.3 对模块内容做处理

对`ast.program.body`部分数据的获取和处理，本质上就是对这个数组的遍历，在循环中做数据处理，这里同样引入一个babel的模块`@babel/traverse`来完成这项工作。

创建一个对象`deps`，用来收集模块自身引入的依赖，使用`traverse`遍历`ast`，我们只需要对`ImportDeclaration`的节点做处理，注意我们做的处理实际上就是把相对路径转化为绝对路径，这里我使用的是`Mac`系统，如果是`windows`系统,注意斜杠的区别

获取依赖之后，我们需要对`ast`做语法转换，把`es6`的语法转化为`es5`的语法，使用`babel`核心模块`@babel/core`以及`@babel/preset-env`完成

### 2. 递归的获取所有模块的信息

这个过程，也就是获取`依赖图(dependency graph)`的过程，这个过程就是从入口模块开始，对每个模块以及模块的依赖模块都调用`getModuleInfo`方法就行分析，最终返回一个包含所有模块信息的对象

### 3. 生成最终代码

在我们实现之前，观察上一节最终得到的依赖图，可以看到，最终的code里包含exports以及require这样的语法，所以，我们在生成最终代码时，要对exports和require做一定的实现和处理

我们首先调用之前说的parseModules方法，获得整个应用的依赖图对象：

# 2. 手写`loader`和`plugin`

## 2.1 如何自己实现一个`loader`

loader本质上就是一个函数，这个函数会在我们在我们加载一些文件时执行

### 2.1.1 如何实现一个同步`loader`

首先我们初始化一个项目：其中index.js和webpack.config.js的文件内容如下：

```js
// index.js
console.log('我要学好前端，因为学好前端可以： ')

// webpack.config.js
const path = require('path')
module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    }
}
```

我们在根目录下创建`syncLoader.js`，用来实现一个同步的loader，注意这个函数必须返回一个`buffer`或者`string`

```js
// syncloader.ja
module.exports = function (source) {
    console.log('source>>>>', source)
    return source
}
```

同时，我们在`webpack.config.js`中使用这个`loader`，我们这里使用`resolveLoader`配置项，指定`loader`查找文件路径，这样我们使用`loader`时候可以直接指定`loader`的名字

```js
const path = require('path')
module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolveLoader: {
        // loader路径查找顺序从左往右
        modules: ['node_modules', './']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'syncLoader'
            }
        ]
    }
}
```

## 2.2 如何自己实现一个`plugin`

`plugin`通常是在`webpack`在打包的某个时间节点做一些操作，我们使用`plugin`的时候，一般都是`new Plugin()`这种形式使用，所以，首先应该明确的是，`plugin`应该是一个类。

我们初始化一个与上一接实现loader时候一样的项目，根目录下创建一个`demo-webpack-plugin.js`的文件，我们首先在`webpack.config.js`中使用它

```js
const path = require('path')
const DemoWebpackPlugin = require('./demo-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    plugins: [
        new DemoWebpackPlugin()
    ]
}

//再来看demo-webpack-plugin.js的实现

class DemoWebpackPlugin {
    constructor () {
        console.log('plugin init')
    }
    apply (compiler) {

    }
}

module.exports = DemoWebpackPlugin
```

