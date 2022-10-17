## SourceMap

### 浏览器怎么知道源文件和 source map 的关系？

这里我们以 webpack 做个实验，通过 webpack5 对于以下代码进行打包：

```javascript
// index.js
const a = 1
console.log(a);
```

当我们开启 source map 选项以后，产物应该为两个文件，分别为 `bundle.js` 以及 `bundle.js.map`。

查看 `bundle.js` 文件以后我们会发现代码中存在这一一段注释：

```javascript
console.log(1);
//# sourceMappingURL=bundle.js.map
```

`sourceMappingURL` 就是标记了该文件的 source map 地址。

### source map 的应用

一般来说 source map 的应用都是在监控系统中，开发者构建完应用后，通过插件将源代码及 source map 上传至平台中。一旦客户端上报错误后，我们就可以通过该库来还原源代码的报错位置（具体 API 看文档即可），方便开发者快速定位线上问题。