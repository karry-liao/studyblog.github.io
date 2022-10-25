# Webpack-dev-server

​		基于我们`webpack.config.js`里的配置创建一个`compiler`，然后基于`compiler`和`devServer`相关配置生成一个`WepackDevServer`实例，该实例会启动一个`express`服务来帮我们监听静态资源变化并更新。

#### setupHooks

​		`setupHooks`主要做的就是在`webpack`的`done`钩子上挂了个给客户端广播消息的回调，通过这个回调，客户端就能知道项目工程代码有更新，这时候客户端就会发请求给`express`服务去获取最新的`webpack`打包的代码。

