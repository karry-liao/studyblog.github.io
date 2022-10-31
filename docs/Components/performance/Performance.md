# 前端性能优化

图片压缩和文件压缩

雪碧图/精灵图、节流防抖、

HTTP缓存、本地缓存、Vue的keep-alive缓存、

ssr服务器端渲染、懒加载、

对dom查询进行缓存、将dom操作合并 标准回答 前端性能优化分为两类，一类是文件加载更快，另一类是文件渲染更快。

 加载更快的方法： 让传输的数据包更小（压缩文件/图片）：图片压缩和文件压缩 减少网络请求的次数：雪碧图/精灵图、节流防抖 减少渲染的次数：缓存（HTTP缓存、本地缓存、Vue的keep-alive缓存等） 渲染更快的方法： 提前渲染：ssr服务器端渲染 避免渲染阻塞：CSS放在HTML的head中 JS放在HTML的body底部 避免无用渲染：懒加载 减少渲染次数：对dom查询进行缓存、将dom操作合并、使用减少重排的标签 加分回答 雪碧图的应用场景一般是项目中不常更换的一些固定图标组合在一起，比如logo、搜索图标、切换图标等。 电商项目中最常用到的懒加载，一般在查看商品展示的时候通常下拉加载更多，因为商品数据太多，一次性请求过来数据太大且渲染的时间太长。

# 如何进行站点内的图片性能优化？

1. 选择合适的图片格式和压缩大图，可从根源上截图大图加载过慢的问题。
2. 使用雪碧图，iconfont，base64，css 代替图片等可减少图片 http 请求，提高页面加载速度。
3. 使用 CDN 图片可达到分流的效果，减少服务券压力。
4. 图片懒加载，预加载，渐进式图片等可不同程度减少白屏时间，提高产品体验。

# React的性能优化

- 使用 shouldComponentUpdate 避免不需要的渲染，但是如果对 props 和 state 做深比较，代价很大，所以需要根据业务进行些取舍；在有子组件的情况下，为了避免子组件的重复渲染，可以通过父组件来判断子组件是否需要 PureRender。
- 将 props 设置为数组或对象：每次调用 React 组件都会创建新组件，就算传入的数组或对象的值没有改变，他们的引用地址也会发生改变，比如，如果按照如下的写法，那么每次渲染时 style 都是一个新对象
- 将函数的绑定移动到构造函数内：可以避免每次都绑定事件。
- 使用 immutable 不可变数据，在我们项目中使用引用类型时，为了避免对原始数据的影响，一般建议使用 shallowCopy 和 deepCopy 对数据进行处理，但是这样会造成 CPU 和 内存的浪费，所以推荐使用 immutable，优点如下
  - 降低了“可变”带来的复杂度
  - 节省内存，immutable 使用结构共享尽量复用内存，没有被引用的对象会被垃圾回收
  - 可以更好的做撤销/重做，复制/粘贴，时间旅行
  - 不会有并发问题（因为数据本身就是不可变的）
  - 拥抱函数式编程
- 给子组件设置一个唯一的 key，因为在 diff 算法中，会用 key 作为唯一标识优化渲染

# Promise实现，限制异步操作的并发个数，请求图片

有8个图片资源的url，已经存储在数组urls中。

urls类似于`['https://image1.png', 'https://image2.png', ....]`

而且已经有一个函数`function loadImg`，输入一个url链接，返回一个Promise，该Promise在图片下载完成的时候resolve，下载失败则reject。

但有一个要求，任何时刻同时下载的链接数量不可以超过3个。

```js
var urls = [
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting1.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting2.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting3.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting4.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting5.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn6.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn7.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn8.png",
];
function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function() {
      console.log("一张图片加载完成");
      resolve(img);
    };
    img.onerror = function() {
        reject(new Error('Could not load image at' + url));
    };
    img.src = url;
  });
```

```js
function limitLoad(urls, handler, limit) {
  let sequence = [].concat(urls); // 复制urls
  // 这一步是为了初始化 promises 这个"容器"
  let promises = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      // 返回下标是为了知道数组中是哪一项最先完成
      return index;
    });
  });
  // 注意这里要将整个变量过程返回，这样得到的就是一个Promise，可以在外面链式调用
  return sequence
    .reduce((pCollect, url) => {
      return pCollect
        .then(() => {
          return Promise.race(promises); // 返回已经完成的下标
        })
        .then(fastestIndex => { // 获取到已经完成的下标
            // 将"容器"内已经完成的那一项替换
          promises[fastestIndex] = handler(url).then(
            () => {
              return fastestIndex; // 要继续将这个下标返回，以便下一次变量
            }
          );
        })
        .catch(err => {
          console.error(err);
        });
    }, Promise.resolve()) // 初始化传入
    .then(() => { // 最后三个用.all来调用
      return Promise.all(promises);
    });
}
limitLoad(urls, loadImg, 3)
  .then(res => {
    console.log("图片全部加载完毕");
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });
```

# 实现MergePromise函数

实现mergePromise函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组data中

```js
const time = (timer) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, timer)
  })
}
const ajax1 = () => time(2000).then(() => {
  console.log(1);
  return 1
})
const ajax2 = () => time(1000).then(() => {
  console.log(2);
  return 2
})
const ajax3 = () => time(1000).then(() => {
  console.log(3);
  return 3
})
    function mergePromise (ajaxArray) {
  // 存放每个ajax的结果
  const data = [];
  let promise = Promise.resolve();
  ajaxArray.forEach(ajax => {
      // 第一次的then为了用来调用ajax
      // 第二次的then是为了获取ajax的结果
    promise = promise.then(ajax).then(res => {
      data.push(res);
      return data; // 把每次的结果返回
    })
  })
  // 最后得到的promise它的值就是data
  return promise;
}

mergePromise([ajax1, ajax2, ajax3]).then(data => {
  console.log("done");
  console.log(data); // data 为 [1, 2, 3]
});

// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]
```

