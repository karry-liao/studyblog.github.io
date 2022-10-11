## 一. 如何获取浏览器URL中查询字符串中的参数？

   ```js
   //基础版本
   function getQueryString() {
       var sHref = window.loacation.href;
       var args = sHref.split("?");
       if(args[0] == sHref) {
           return "";
       }
       var arr = args[1].split("&");
       var obj = {};
       for (var i = 0; i < arr.length; i++){
           var arg = arr[i].split("=");
           obj[args[0]] = arg[1]
       }
       return obj;
   }
   var href = getQueryString();
   console.log(href["categoryId"]);
   
   //正则版本
   function getQueryString(name) {
       if(!name) return null;
       var after = window.location.search;
       after = after.substr(1) || window.location.hash.split("?")[1];
       if(!after) return null;
       if(after.index(name) === -1) return null;
       var reg = new RegExg("(^|&)" + name + "=([^&]*)(&|$)")
       var r = decordeURI(after).match(reg);
       if (!r) return null;
       return r[2];
   }
   cnosole.log(getQueryString("categoryId"));
   ```

## 二. js实现一个打点计时器

### 	**setTimeout方法**

   ```js
   function count(start,end) {
       if(start <= end) {
           console.log(start++);
           st = setTimeout(function() {
               count(start, end);
           },100);
       }
       return {
           cancel: function() {
               clearTimeout(st);
           }
       }
   }
   count(1,10)
   ```

### 	**setInterval()**方法

   ```js
   function count(start, end){
       console.log(start++);
       var timer = setInterval(function() {
           if(start <= end) {
               console.log(start++);
           }
       },100);
       return {
           cancel: function(){
               clearInterval(timer);
           }
       }
   }
   count(1, 10);
   ```

   

## 三. 用js实现一个标准的排序算法

### 	**冒泡排序**

   ```js
   function BubbleSort(array) {
       var length = array.length;
       for (var i = length -1; i>0; i--) {
           for (var i = 0 ; j < i; j++) {
               if (array[j] > array[j+1]) {
                   var temp = array[j];
                   array[j] = array[j+1]
                   array[j+1] = temp;
               }
           }
           console.log(array);
           console.log("=========================")
       }
       return arry
   }
   var arr = [10,7, 6, 5, 11, 9, 8, 7, 3]
   var result = BubbleSort(arr);
   cnosole.log(result);
   ```

## 四.防抖节流

 防抖：只触发时间后在N秒内函数只执行一次，若在N秒内再次触发则重新计算。点击按钮 2秒后调用函数，在1.5秒时有点了，则重新计算。      下拉触底加载下一页。

```javascript
//输入完毕后过两秒再查询(延迟执行)
function debounce(func,wait){
    let timeout;
    return function(){
        if(timeout) clearTimeout(timeout);
        timeout = setTimeout(function(){
            func.apply(this)
        },wait)
    }
}
//输入完毕后立即查询，过两秒再查询(立即执行)
function debounce(func,wait){
    let timeout;
    return function(){
        if(timeout) clearTimeout(timeout);
        let callNow = !timeout;
        timeout = setTimeout(()=>{
            timeout = null;
        },wait);
        if(callNow) func.apply(count,2000)
    }
}
```

节流：39滴焊锡   连续发生的时间在N秒内置执行一次   即时查询

```javascript
//定时器    固定时间去发请求
function throttle(func,wat){
    let timeout;
    return function(){
        if(!timeout){
            timeout = setTimeout(()=>{
                timeout = null;
                func.apply()
            },wait)
        }
    }
}
//时间戳
function throttle(func,wat){
    let prev = 0;
    return function(){
        let now = Date.now();
        if(now - prev > wait){
            func.apply(this)
            prev = now
        }
    }
}
```

## 五、加载白屏时间长的原因有哪些，如何优化？

**白屏时间**：即用户点击一个链接或打开浏览器输入URL地址后，从屏幕空白到显示第一个画面的时间。

当用户点开一个链接或者是直接在浏览器中输入URL开始进行访问时，就开始等待页面的展示。页面渲染的时间越短，用户等待的时间就越短，用户感知到页面的速度就越快。这样可以极大的**提升用户的体验，减少用户的跳出，提升页面的留存率。**

### 三、白屏的过程

从输入url，到页面的画面展示的过程

1、首先，在浏览器地址栏中输入url

2、浏览器先查看浏览器缓存-系统缓存-路由器缓存，如果缓存中有，会直接在屏幕中显示页面内容。若没有，则跳到第三步操作。

3、在发送http请求前，需要域名解析(DNS解析)，解析获取相应的IP地址。

4、浏览器向服务器发起tcp连接，与浏览器建立tcp三次握手。

5、握手成功后，浏览器向服务器发送http请求，请求数据包。

6、服务器处理收到的请求，将数据返回至浏览器

7、浏览器收到HTTP响应

8、读取页面内容，浏览器渲染，解析html源码

9、生成Dom树、解析css样式、js交互,渲染显示页面

#### 1. DNS解析优化

针对DNS Lookup环节，我们可以针对性的进行DNS解析优化。

- DNS缓存优化
- DNS预加载策略
- 稳定可靠的DNS服务器

#### 2. TCP网络链路优化

多花点钱吧

#### 3. 服务端处理优化

服务端的处理优化，是一个非常庞大的话题，会涉及到如Redis缓存、数据库存储优化或是系统内的各种中间件以及Gzip压缩等…

#### 4. 浏览器下载、解析、渲染页面优化

根据浏览器对页面的下载、解析、渲染过程，可以考虑一下的优化处理：

- 尽可能的精简HTML的代码和结构
- 尽可能的优化CSS文件和结构
- 一定要合理的放置JS代码，尽量不要使用内联的JS代码
- 将渲染首屏内容所需的关键CSS内联到HTML中，能使CSS更快速地下载。在HTML下载完成之后就能渲染了，页面渲染的时间提前，从而缩短首屏渲染时间；
- 延迟首屏不需要的图片加载，而优先加载首屏所需图片（offsetTop<clientHeight）

```javascript
document.documentElement.clientHeight//获取屏幕可视区域的高度 element.offsetTop//获取元素相对于文档顶部的高度
```

因为JavaScript 会阻塞 DOM 生成，而样式文件又会阻塞 JavaScript 的执行，所以在实际的工程中需要重点关注 JavaScript 文件和样式表文件，使用不当会影响到页面性能的。