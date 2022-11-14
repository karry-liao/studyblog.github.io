# ServiceWorker

## 何为ServiceWorker？

​		**ServiceWorker**是一种特化的Worker，专门来处理跟网页有关的资源(asset)，在浏览器和服务端质检扮演一个代理(Proxy)的角色，ServiceWorker同时引入缓存(Cache)，可以用来缓存一个网络响应。

​		一般来说，ServiceWorker处理的就是页面与缓存、服务器之间的关系，

- 离线请求（提供个类似于app的用户吐艳，类似于app的生命周期）
- 性能优化

## Cache

​		Cache 提供一个`Request -> Response`的持久缓存，除非显式删除，存储在 Cache 里面的数据不会主动过期，同时也不会主动去更新，需要手动维护其更新。Cache 存储的是 Request -> Response 的键值对。

基础用法：

​		一个域之内可以存在多个 Cache，可以通过一个名字来标识对应的 Cache：

```js
// caches extends CacheStorage，是 window / self 上面的一个全局变量
// 下面是通过一个 cacheName 来获取对应的缓存对象
const cache = await caches.open('hello-cache-v1');

//然后可以通过 Cache.put 方法将缓存设置进去

const request = new Request('/samples/service-worker/basic/', { method: 'GET' })
const response = await fetch(request)
const cache = await caches.open('hello-cache-v1');
cache.put(request, response)
```

