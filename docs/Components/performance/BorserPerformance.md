## 前端性能监控

1. **响应速度**：页面初始访问速度 + 交互响应速度
2. **页面稳定性**：页面出错率，如资源加载错误，JS 执行报错
3. **外部服务调用**：网络请求访问速度

## 性能指标

1. **FP:首次绘制**First Paint
2. **FCP:首次内容绘制**First Contentful Paint
3. **FMP:首次有效绘制**First Meaningful Paint
4. **TTI:页面交互时间**Time to Interactive

## window.performance基础

**navigation**

| 属性名                     | 含义                                                         |
| :------------------------- | :----------------------------------------------------------- |
| connectStart               | 返回**与服务端建立连接开始时间**，如果是持久连接或者是从缓存中获取资源，则这个值等于`domainLookupEnd` |
| connectEnd                 | 返回**与服务端建立连接完成时间**，如果是持久连接或者是从缓存中获取资源，则这个值等于`domainLookupEnd` |
| domComplete                | html文档完全解析完毕的时间节点                               |
| domContentLoadedEventEnd   | DOMContentLoaded事件触发的结束时间                           |
| domContentLoadedEventStart | DOMContentLoaded事件触发的结开始时间                         |
| domInteractive             | 返回**当前网页DOM结构结束解析、开始加载内嵌资源(如js、css)\**时，即\**Document.readyState变为interactive**的时间 |
| domLoading                 | 返回当前**网页DOM结构开始解析时**，即**Document.readyState变为loading时**的时间戳 |
| domainLookupEnd            | 返回**查询DNS结束时间**，如果是持久连接或者是从缓存中获取资源，则这个值等于`fetchStart` |
| domainLookupStart          | 返回**查询DNS开始时间**，如果是持久连接或者是从缓存中获取资源，则这个值等于`fetchStart` |
| fetchStart                 | 如果要使用“GET”请求方法获取新资源，fetchStart返回的是**浏览器发起请求到检测缓存前时间**，否则直接返回**浏览器请求时间** |
| loadEventEnd               | 返回**onload完成时间**，当load事件尚未触发时，它返回零       |
| loadEventStart             | 返回**onload开始时间**，当load事件尚未触发时，它返回零       |
| navigationStart            | 返回**上一个url卸载时间**，如果没有上一个url，则这个值等于`fetchStart`，在 PerformanceNavigationTiming 中已废弃 |
| redirectEnd                | 返回**最后一个HTTP重定向完成时间**，如果没有重定向，或者重定向中的一个不同源，这个值会返回0 |
| redirectStart              | 返回**第一个HTTP重定向开始时间**，如果没有重定向，或者重定向中的一个不同源，这个值会返回0 |
| requestStart               | 返回**浏览器向服务器发出HTTP请求时间**                       |
| responseEnd                | 返回**浏览器从服务器收到（或从本地缓存读取，或从本地资源读取）最后一个字节时间**（如果在此之前HTTP连接已经关闭，则返回关闭时）的时间 |
| responseStart              | 返回**浏览器从服务器收到（或从本地缓存读取）第一个字节时间**。如果传输层在开始请求之后失败并且连接被重开，该属性将会被数制成新的请求的相对应的发起时间 |
| secureConnectionStart      | 返回浏览器与服务器开始安全链接的握手时间，如果当前网页不要求安全连接，则返回0 |
| unloadEventEnd             | 返回**unload处理完成时间**，如果当前url与上一个url是同源，则返回的值是指上一个页面卸载到这个页面用户代理开始前时间，如果与上一个不同域或者没有上一个url，则返回0 |
| unloadEventStart           | 返回**unload开始处理时间**，如果当前url与上一个url是同源，则返回的值是指上一个页面卸载到这个页面用户代理后时间，如果与上一个不同域或者没有上一个url，则返回0 |

## 各指标计算方式

| 指标             | 计算方式                                                     | 说明                                                         |
| :--------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 页面加载总耗时   | loadEventEnd - startTime                                     | 指页面完全加载完所用的时间，这时候触发完成了 onload 事件     |
| DNS解析耗时      | domainLookupEnd - domainLookupStart                          | 指通过域名解析服务（DNS），将指定的域名解析成IP地址所消耗的时间 |
| TCP连接耗时      | connectEnd - connectStart                                    | 指浏览器和WEB服务器建立TCP/IP连接所用的时间                  |
| SSL连接耗时      | location.protocol === 'https:' ? connectEnd - secureConnectionStart | 只在 HTTPS 下有效，属于TCP连接耗时的一部分，指安全连接握手耗时 |
| 网路请求耗时     | responseStart - requestStart                                 | 指开始发送请求到服务器返回第一个字节所需要的时间             |
| 数据传输耗时     | responseEnd-responseStart                                    | 指服务器端返回第一个字节到最后一个字节所需要的时间           |
| DOM解析耗时      | domContentLoadedEventEnd - responseEnd                       | 指页面请求完成（responseEnd）后，到整个 DOM 解析完所用的时间，页面的复杂度决定了 DOM 解析耗时 |
| 资源加载耗时     | loadEventEnd - domContentLoadedEventEnd                      | 指 DOM 解析完成后到页面完全加载完所用的时间                  |
| 首包时间         | responseStart - startTime                                    | 指从页面请求到浏览器开始接收到数据所用的时间                 |
| 页面渲染耗时     | loadEventEnd - responseEnd                                   | 等于页面完全加载时间 - HTML 加载完成时间（见下面指标）       |
| 页面完全加载时间 | loadEventEnd - startTime                                     | 指页面完全加载完所用的时间，这时候触发完成了 onload 事件     |
| 白屏时间         | 优先使用最新标准 performance.getEntriesByType('paint')[0].startTime，不支持的话使用 Chrome、IE 提供的 firstPaintTime，chrome.loadTimes().firstPaintTime 或 performance.msFirstPaint，还没有获取，取 domInteractive - startTime但是实际上报取的值是：loadEventEnd - startTime | 首次渲染时间，指页面出现第一个文字或图像所花费的时间         |
| 页面加载完时间   | loadEventEnd - startTime                                     | 指页面完全加载完所用的时间，这时候触发完成了 onload 事件     |
| HTML加载完时间   | responseEnd - startTime                                      | 指页面所有 HTML 加载完成（不包括页面渲染时间），即包括 DNS、TCP、Request 和 Response |
| 首次交互时间     | domInteractive - startTime                                   | 指页面 DOMContentLoaded 事件触发的开始时间，这时候页面可以交互 |
| 首屏时间         | 有两种方式：第一种通过计算首屏区域内的所有图片加载时间，然后取其最大值；第二种方式：通过 window.MutationObserver 来监听首屏所有元素变化情况，并记录时间，最后取其最大值（会去掉得分相同重复的值），算出的时间需要加上 domInteractive（可交互时间），目前系统采用第二种实现方式，如果第二种取不到，取 domInteractive，但该值会比实际首屏时间要小 | 首屏时间，也称用户完全可交互时间，即整个页面首屏完全渲染出来，用户完全可以交互，一般首屏时间小于页面完全加载时间，该指标值可以衡量页面访问速度 |