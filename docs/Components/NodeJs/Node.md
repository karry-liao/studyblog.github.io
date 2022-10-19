## 如何判断当前脚本运行在浏览器端还是node环境中？

```this === window ? 'browser' : 'node';```

通过判断 Global 对象是否为 window，如果不为 window，当前脚本没有运行在浏览器中。