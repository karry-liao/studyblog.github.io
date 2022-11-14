# web实时消息推送

## 何为消息推送？

推送的场景比较多，比如有人关注我的公众号，这时我就会收到一条推送消息，以此来吸引我点击打开应用。

消息推送(`push`)通常是指网站的运营工作等人员，通过某种工具对用户当前网页或移动设备APP进行的主动消息推送。

消息推送一般又分为`web端消息推送`和`移动端消息推送`。

## 短轮询

轮询(`polling`)应该是实现消息推送方案中最简单的一种，这里我们暂且将轮询分为`短轮询`和`长轮询`。

短轮询很好理解，指定的时间间隔，由浏览器向服务器发出`HTTP`请求，服务器实时返回未读消息数据给客户端，浏览器再做渲染显示。

一个简单的JS定时器就可以搞定，每秒钟请求一次未读消息数接口，返回的数据展示即可。

```js
setInterval(() => {
  // 方法请求
  messageCount().then((res) => {
      if (res.code === 200) {
          this.messageCount = res.data
      }
  })
}, 1000);
```

### 长轮询

长轮询是对上边短轮询的一种改进版本，在尽可能减少对服务器资源浪费的同时，保证消息的相对实时性。长轮询在中间件中应用的很广泛，比如`Nacos`和`apollo`配置中心，消息队列`kafka`、`RocketMQ`中都有用到长轮询。

### iframe流

**iframe**流就是在页面中插入一个隐藏的`<iframe>`标签，通过在`src`中请求消息数量API接口，由此在服务端和客户端之间创建一条长连接，服务端持续向`iframe`传输数据。

这种方式实现简单，前端只要一个`<iframe>`标签搞定了

```js
<iframe src="/iframe/message" style="display:none"></iframe>
//服务端直接组装html、js脚本数据向response写入就行了
@Controller
@RequestMapping("/iframe")
public class IframeController {
    @GetMapping(path = "message")
    public void message(HttpServletResponse response) throws IOException, InterruptedException {
        while (true) {
            response.setHeader("Pragma", "no-cache");
            response.setDateHeader("Expires", 0);
            response.setHeader("Cache-Control", "no-cache,no-store");
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().print(" <script type=\"text/javascript\">\n" +
                    "parent.document.getElementById('clock').innerHTML = \"" + count.get() + "\";" +
                    "parent.document.getElementById('count').innerHTML = \"" + count.get() + "\";" +
                    "</script>");
        }
    }
}
```

### SSE

服务器发送事件(`Server-sent events`)，简称`SSE`。`SSE`它是基于`HTTP`协议的，我们知道一般意义上的HTTP协议是无法做到服务端主动向客户端推送消息的，但SSE是个例外，它变换了一种思路。SSE在服务器和客户端之间打开一个单向通道，服务端响应的不再是一次性的数据包而是`text/event-stream`类型的数据流信息，在有数据变更时从服务器流式传输到客户端。

整体的实现思路有点类似于在线视频播放，视频流会连续不断的推送到浏览器，你也可以理解成，客户端在完成一次用时很长（网络不畅）的下载。

`SSE`与`WebSocket`作用相似，都可以建立服务端与浏览器之间的通信，实现服务端向客户端推送消息，但还是有些许不同：

- SSE 是基于HTTP协议的，它们不需要特殊的协议或服务器实现即可工作；`WebSocket`需单独服务器来处理协议。
- SSE 单向通信，只能由服务端向客户端单向通信；webSocket全双工通信，即通信的双方可以同时发送和接受信息。
- SSE 实现简单开发成本低，无需引入其他组件；WebSocket传输数据需做二次解析，开发门槛高一些。
- SSE 默认支持断线重连；WebSocket则需要自己实现。
- SSE 只能传送文本消息，二进制数据需要经过编码后传送；WebSocket默认支持传送二进制数据。

SSE好像一直不被大家所熟知，一部分原因是出现了WebSockets，这个提供了更丰富的协议来执行双向、全双工通信。对于游戏、即时通信以及需要双向近乎实时更新的场景，拥有双向通道更具吸引力。

但是，在某些情况下，不需要从客户端发送数据。而你只需要一些服务器操作的更新。比如：站内信、未读消息数、状态更新、股票行情、监控数量等场景，`SEE`不管是从实现的难易和成本上都更加有优势。此外，SSE 具有`WebSockets`在设计上缺乏的多种功能，例如：`自动重新连接`、`事件ID`和`发送任意事件`的能力。

前端只需进行一次HTTP请求，带上唯一ID，打开事件流，监听服务端推送的事件就可以了

**客户端：**

```js
<script>
    let source = null;
    let userId = 7777
    if (window.EventSource) {
        // 建立连接
        source = new EventSource('http://localhost:7777/sse/sub/'+userId);
        setMessageInnerHTML("连接用户=" + userId);
        /**
         * 连接一旦建立，就会触发open事件
         * 另一种写法：source.onopen = function (event) {}
         */
        source.addEventListener('open', function (e) {
            setMessageInnerHTML("建立连接。。。");
        }, false);
        /**
         * 客户端收到服务器发来的数据
         * 另一种写法：source.onmessage = function (event) {}
         */
        source.addEventListener('message', function (e) {
            setMessageInnerHTML(e.data);
        });
    } else {
        setMessageInnerHTML("你的浏览器不支持SSE");
    }
</script>
```

**服务端：**

```java
private static Map<String, SseEmitter> sseEmitterMap = new ConcurrentHashMap<>();

/**
 * 创建连接
 *
 * @date: 2022/7/12 14:51
 * @auther: 公众号：程序员小富
 */
public static SseEmitter connect(String userId) {
    try {
        // 设置超时时间，0表示不过期。默认30秒
        SseEmitter sseEmitter = new SseEmitter(0L);
        // 注册回调
        sseEmitter.onCompletion(completionCallBack(userId));
        sseEmitter.onError(errorCallBack(userId));
        sseEmitter.onTimeout(timeoutCallBack(userId));
        sseEmitterMap.put(userId, sseEmitter);
        count.getAndIncrement();
        return sseEmitter;
    } catch (Exception e) {
        log.info("创建新的sse连接异常，当前用户：{}", userId);
    }
    return null;
}
public static void sendMessage(String userId, String message) {

    if (sseEmitterMap.containsKey(userId)) {
        try {
            sseEmitterMap.get(userId).send(message);
        } catch (IOException e) {
            log.error("用户[{}]推送异常:{}", userId, e.getMessage());
            removeUser(userId);
        }
    }
}
```

### MQTT协议

`MQTT` 全称(Message Queue Telemetry Transport)：一种基于发布/订阅（`publish`/`subscribe`）模式的`轻量级`通讯协议，通过订阅相应的主题来获取消息，是物联网（`Internet of Thing`）中的一个标准传输协议。该协议将消息的发布者（`publisher`）与订阅者（`subscriber`）进行分离，因此可以在不可靠的网络环境中，为远程连接的设备提供可靠的消息服务，使用方式与传统的MQ有点类似。

`TCP`协议位于传输层，`MQTT` 协议位于应用层，`MQTT` 协议构建于`TCP/IP`协议上，也就是说只要支持`TCP/IP`协议栈的地方，都可以使用`MQTT`协议。

### Websocket

WebSocket是一种在`TCP`连接上进行全双工通信的协议，建立客户端和服务器之间的通信渠道。浏览器和服务器仅需一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。

前端初始化打开WebSocket连接，并监听连接状态，接收服务端数据或向服务端发送数据。

```js
<script>
    var ws = new WebSocket('ws://localhost:7777/webSocket/10086');
    // 获取连接状态
    console.log('ws连接状态：' + ws.readyState);
    //监听是否连接成功
    ws.onopen = function () {
        console.log('ws连接状态：' + ws.readyState);
        //连接成功则发送一个数据
        ws.send('test1');
    }
    // 接听服务器发回的信息并处理展示
    ws.onmessage = function (data) {
        console.log('接收到来自服务器的消息：');
        console.log(data);
        //完成通信后关闭WebSocket连接
        ws.close();
    }
    // 监听连接关闭事件
    ws.onclose = function () {
        // 监听整个过程中websocket的状态
        console.log('ws连接状态：' + ws.readyState);
    }
    // 监听并处理error事件
    ws.onerror = function (error) {
        console.log(error);
    }
    function sendMessage() {
        var content = $("#message").val();
        $.ajax({
            url: '/socket/publish?userId=10086&message=' + content,
            type: 'GET',
            data: { "id": "7777", "content": content },
            success: function (data) {
                console.log(data)
            }
        })
    }
</script>
```

