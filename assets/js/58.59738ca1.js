(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{828:function(t,s,a){"use strict";a.r(s);var e=a(16),n=Object(e.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"webpack-loader-和-plugin-实现原理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#webpack-loader-和-plugin-实现原理"}},[t._v("#")]),t._v(" Webpack loader 和 plugin 实现原理")]),t._v(" "),s("h2",{attrs:{id:"_1-1-webpack打包基本原理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-webpack打包基本原理"}},[t._v("#")]),t._v(" 1.1 webpack打包基本原理")]),t._v(" "),s("p",[t._v("webpack的一个核心功能就是把我们写的模块化的代码，打包之后，生成可以在浏览器中运行的代码，我们这里也是从简单开始，一步步探索webpack的打包原理")]),t._v(" "),s("h2",{attrs:{id:"_1-2-实现webpack打包核心功能"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-实现webpack打包核心功能"}},[t._v("#")]),t._v(" 1.2 实现webpack打包核心功能")]),t._v(" "),s("p",[t._v("我们首先在项目根目录下再建立一个bundle.js，这个文件用来对我们刚刚写的模块化"),s("code",[t._v("js")]),t._v("代码文件进行打包")]),t._v(" "),s("ol",[s("li",[t._v("首先，我们需要读到入口文件里的内容（也就是index.js的内容）")]),t._v(" "),s("li",[t._v("其次，分析入口文件，递归的去读取模块所依赖的文件内容，生成依赖图")]),t._v(" "),s("li",[t._v("最后，根据依赖图，生成浏览器能够运行的最终代码")])]),t._v(" "),s("h3",{attrs:{id:"_1-处理单个模块-以入口为例"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-处理单个模块-以入口为例"}},[t._v("#")]),t._v(" 1. 处理单个模块（以入口为例）")]),t._v(" "),s("h4",{attrs:{id:"_1-1-获取模块内容"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-获取模块内容"}},[t._v("#")]),t._v(" 1.1 获取模块内容")]),t._v(" "),s("p",[t._v("我们需要用到"),s("code",[t._v("node.js")]),t._v("的核心模块"),s("code",[t._v("fs")]),t._v("，我们首先来看读到的内容是什么，然后定义一个"),s("code",[t._v("getModuleInfo")]),t._v("方法，这个方法里我们读出文件内容。入口文件"),s("code",[t._v("index.js")]),t._v("的所有内容都以字符串形式输出了，我们接下来可以用正则表达式或者其它一些方法，从中提取到"),s("code",[t._v("import")]),t._v("以及"),s("code",[t._v("export")]),t._v("的内容以及相应的路径文件名，来对入口文件内容进行分析，获取有用的信息。但是如果"),s("code",[t._v("import")]),t._v("和"),s("code",[t._v("export")]),t._v("的内容非常多，这会是一个很麻烦的过程，这里我们借助"),s("code",[t._v("babel")]),t._v("提供的功能，来完成入口文件的分析")]),t._v(" "),s("h4",{attrs:{id:"_1-2-分析模块内容"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-分析模块内容"}},[t._v("#")]),t._v(" 1.2 分析模块内容")]),t._v(" "),s("p",[t._v("我们安装"),s("code",[t._v("@babel/parser")]),t._v("，演示时安装的版本号为"),s("code",[t._v("^7.9.6")])]),t._v(" "),s("p",[t._v("这个babel模块的作用，就是把我们js文件的代码内容，转换成js对象的形式，这种形式的js对象，称做"),s("code",[t._v("抽象语法树(Abstract Syntax Tree, 以下简称AST)")])]),t._v(" "),s("p",[t._v("使用"),s("code",[t._v("@babel/parser")]),t._v("的"),s("code",[t._v("parse")]),t._v("方法把入口文件转化称为了"),s("code",[t._v("AST")]),t._v("，我们打印出了"),s("code",[t._v("ast")])]),t._v(" "),s("p",[t._v("入口文件内容被放到一个数组中，总共有六个"),s("code",[t._v("Node")]),t._v("节点，我们可以看到，每个节点有一个"),s("code",[t._v("type")]),t._v("属性，其中前两个的"),s("code",[t._v("type")]),t._v("属性是"),s("code",[t._v("ImportDeclaration")]),t._v("，这对应了我们入口文件的两条"),s("code",[t._v("import")]),t._v("语句，并且，每一个"),s("code",[t._v("type")]),t._v("属性是"),s("code",[t._v("ImportDeclaration")]),t._v("的节点，其"),s("code",[t._v("source.value")]),t._v("属性是引入这个模块的相对路径，这样我们就得到了入口文件中对打包有用的重要信息了。")]),t._v(" "),s("p",[t._v("接下来要对得到的ast做处理，返回一份结构化的数据，方便后续使用。")]),t._v(" "),s("h4",{attrs:{id:"_1-3-对模块内容做处理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-对模块内容做处理"}},[t._v("#")]),t._v(" 1.3 对模块内容做处理")]),t._v(" "),s("p",[t._v("对"),s("code",[t._v("ast.program.body")]),t._v("部分数据的获取和处理，本质上就是对这个数组的遍历，在循环中做数据处理，这里同样引入一个babel的模块"),s("code",[t._v("@babel/traverse")]),t._v("来完成这项工作。")]),t._v(" "),s("p",[t._v("创建一个对象"),s("code",[t._v("deps")]),t._v("，用来收集模块自身引入的依赖，使用"),s("code",[t._v("traverse")]),t._v("遍历"),s("code",[t._v("ast")]),t._v("，我们只需要对"),s("code",[t._v("ImportDeclaration")]),t._v("的节点做处理，注意我们做的处理实际上就是把相对路径转化为绝对路径，这里我使用的是"),s("code",[t._v("Mac")]),t._v("系统，如果是"),s("code",[t._v("windows")]),t._v("系统,注意斜杠的区别")]),t._v(" "),s("p",[t._v("获取依赖之后，我们需要对"),s("code",[t._v("ast")]),t._v("做语法转换，把"),s("code",[t._v("es6")]),t._v("的语法转化为"),s("code",[t._v("es5")]),t._v("的语法，使用"),s("code",[t._v("babel")]),t._v("核心模块"),s("code",[t._v("@babel/core")]),t._v("以及"),s("code",[t._v("@babel/preset-env")]),t._v("完成")]),t._v(" "),s("h3",{attrs:{id:"_2-递归的获取所有模块的信息"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-递归的获取所有模块的信息"}},[t._v("#")]),t._v(" 2. 递归的获取所有模块的信息")]),t._v(" "),s("p",[t._v("这个过程，也就是获取"),s("code",[t._v("依赖图(dependency graph)")]),t._v("的过程，这个过程就是从入口模块开始，对每个模块以及模块的依赖模块都调用"),s("code",[t._v("getModuleInfo")]),t._v("方法就行分析，最终返回一个包含所有模块信息的对象")]),t._v(" "),s("h3",{attrs:{id:"_3-生成最终代码"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-生成最终代码"}},[t._v("#")]),t._v(" 3. 生成最终代码")]),t._v(" "),s("p",[t._v("在我们实现之前，观察上一节最终得到的依赖图，可以看到，最终的code里包含exports以及require这样的语法，所以，我们在生成最终代码时，要对exports和require做一定的实现和处理")]),t._v(" "),s("p",[t._v("我们首先调用之前说的parseModules方法，获得整个应用的依赖图对象：")]),t._v(" "),s("h1",{attrs:{id:"_2-手写loader和plugin"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-手写loader和plugin"}},[t._v("#")]),t._v(" 2. 手写"),s("code",[t._v("loader")]),t._v("和"),s("code",[t._v("plugin")])]),t._v(" "),s("h2",{attrs:{id:"_2-1-如何自己实现一个loader"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-如何自己实现一个loader"}},[t._v("#")]),t._v(" 2.1 如何自己实现一个"),s("code",[t._v("loader")])]),t._v(" "),s("p",[t._v("loader本质上就是一个函数，这个函数会在我们在我们加载一些文件时执行")]),t._v(" "),s("h3",{attrs:{id:"_2-1-1-如何实现一个同步loader"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-1-如何实现一个同步loader"}},[t._v("#")]),t._v(" 2.1.1 如何实现一个同步"),s("code",[t._v("loader")])]),t._v(" "),s("p",[t._v("首先我们初始化一个项目：其中index.js和webpack.config.js的文件内容如下：")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// index.js")]),t._v("\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'我要学好前端，因为学好前端可以： '")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// webpack.config.js")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" path "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'path'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("mode")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'development'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("entry")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("main")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./src/index.js'")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("output")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("path")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" path"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("__dirname"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'dist'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("filename")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'[name].js'")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("我们在根目录下创建"),s("code",[t._v("syncLoader.js")]),t._v("，用来实现一个同步的loader，注意这个函数必须返回一个"),s("code",[t._v("buffer")]),t._v("或者"),s("code",[t._v("string")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// syncloader.ja")]),t._v("\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("exports")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("source")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'source>>>>'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" source"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" source\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("同时，我们在"),s("code",[t._v("webpack.config.js")]),t._v("中使用这个"),s("code",[t._v("loader")]),t._v("，我们这里使用"),s("code",[t._v("resolveLoader")]),t._v("配置项，指定"),s("code",[t._v("loader")]),t._v("查找文件路径，这样我们使用"),s("code",[t._v("loader")]),t._v("时候可以直接指定"),s("code",[t._v("loader")]),t._v("的名字")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" path "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'path'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("mode")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'development'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("entry")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("main")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./src/index.js'")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("output")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("path")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" path"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("__dirname"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'dist'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("filename")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'[name].js'")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("resolveLoader")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// loader路径查找顺序从左往右")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("modules")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'node_modules'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("module")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("rules")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("test")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token regex"}},[s("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),s("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v("\\.js$")]),s("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("use")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'syncLoader'")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h2",{attrs:{id:"_2-2-如何自己实现一个plugin"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-如何自己实现一个plugin"}},[t._v("#")]),t._v(" 2.2 如何自己实现一个"),s("code",[t._v("plugin")])]),t._v(" "),s("p",[s("code",[t._v("plugin")]),t._v("通常是在"),s("code",[t._v("webpack")]),t._v("在打包的某个时间节点做一些操作，我们使用"),s("code",[t._v("plugin")]),t._v("的时候，一般都是"),s("code",[t._v("new Plugin()")]),t._v("这种形式使用，所以，首先应该明确的是，"),s("code",[t._v("plugin")]),t._v("应该是一个类。")]),t._v(" "),s("p",[t._v("我们初始化一个与上一接实现loader时候一样的项目，根目录下创建一个"),s("code",[t._v("demo-webpack-plugin.js")]),t._v("的文件，我们首先在"),s("code",[t._v("webpack.config.js")]),t._v("中使用它")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" path "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'path'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" DemoWebpackPlugin "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./demo-webpack-plugin'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("mode")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'development'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("entry")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("main")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./src/index.js'")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("output")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("path")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" path"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("__dirname"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'dist'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("filename")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'[name].js'")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("plugins")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("DemoWebpackPlugin")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//再来看demo-webpack-plugin.js的实现")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("DemoWebpackPlugin")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("constructor")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'plugin init'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("apply")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("compiler")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" DemoWebpackPlugin\n")])])])])}),[],!1,null,null,null);s.default=n.exports}}]);