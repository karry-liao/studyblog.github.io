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

## 六、如何预防用户快速连续点击，造成数据多次提交

为了防止重复提交，前端一般会在第一次提交的结果返回前，将提交按钮禁用。

实现的方法有很多种：

- css设置 `pointer-events` 为 `none`
- 增加变量控制，当变量满足条件时才执行点击事件的后续代码
- 如果按钮使用 button 标签实现，可以使用 `disabled` 属性
- 加遮罩层，比如一个全屏的loading，避免触发按钮的点击事件

## 七、如何判断是PC还是移动端访问

### 一、navigator.userAgent

JS 通过`navigator.userAgent`属性拿到这个字符串，只要里面包含`mobi`、`android`、`iphone`等关键字，就可以认定是移动设备。

```javascript
if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
  // 当前设备是移动设备
}

// 另一种写法
if (
  navigator.userAgent.match(/Mobi/i) ||
  navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/iPhone/i)
) {
  // 当前设备是移动设备
}
```

这种方法的优点是简单方便，缺点是不可靠，因为用户可以修改这个字符串，让手机浏览器伪装成桌面浏览器。

```javascript
if (/Android|iPhone|iPad|iPod/i.test(navigator.platform)) {
 // 当前设备是移动设备
} 
```

### 二、window.screen，window.innerWidth

`window.screen`对象返回用户设备的屏幕信息，该对象的`width`属性是屏幕宽度（单位为像素）。

```javascript
if (window.screen.width < 500) {
 // 当前设备是移动设备 
}
```

这个方法的缺点在于，如果手机横屏使用，就识别不了。

另一个属性`window.innerWidth`返回浏览器窗口里面的网页可见部分的宽度，比较适合指定网页在不同宽度下的样式。

```javascript
const getBrowserWidth = function() {
 if (window.innerWidth < 768) {
   return "xs";
 } else if (window.innerWidth < 991) {
   return "sm";
 } else if (window.innerWidth < 1199) {
   return "md";
 } else {
   return "lg";
 }
};
```

### 三、window.orientation

第三种方法是侦测屏幕方向，手机屏幕可以随时改变方向（横屏或竖屏），桌面设备做不到。

`window.orientation`属性用于获取屏幕的当前方向，只有移动设备才有这个属性，桌面设备会返回`undefined`。

```javascript
if (typeof window.orientation !== 'undefined') {
 // 当前设备是移动设备 
}
```

注意，iPhone 的 Safari 浏览器不支持该属性。

### 四、touch 事件

第四种方法是，手机浏览器的 DOM 元素可以通过`ontouchstart`属性，为`touch`事件指定监听函数。桌面设备没有这个属性。

```javascript
function isMobile() { 
 return ('ontouchstart' in document.documentElement); 
}

// 另一种写法
function isMobile() {
try {
   document.createEvent("TouchEvent"); return true;
 } catch(e) {
   return false; 
 }
}
```

### 五、window.matchMedia()

CSS 通过 media query（媒介查询）为网页指定响应式样式。如果某个针对手机的 media query 语句生效了，就可以认为当前设备是移动设备。

`window.matchMedia()`方法接受一个 CSS 的 media query 语句作为参数，判断这个语句是否生效。

```javascript
let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
//除了通过屏幕宽度判断，还可以通过指针的精确性判断。
let isMobile = window.matchMedia("(pointer:coarse)").matches;
//有些设备支持多种指针，比如同时支持鼠标和触摸。pointer:coarse只用来判断主指针，此外还有一个any-pointer命令判断所有指针。
let isMobile = window.matchMedia("(any-pointer:coarse)").matches;
```

### 六、工具包

除了上面这些方法，也可以使用别人写好的工具包。这里推荐 react-device-detect，它支持多种粒度的设备侦测。

```javascript
import {isMobile} from 'react-device-detect';

if (isMobile) {
 // 当前设备是移动设备
}
```

## 八、如何使用js生成海报

### 方案一：DOM->canvas->image

将目标 DOM 节点绘制到 canvas 画布，然后利用 canvas 相关的 API 以图片形式导出。

可简单标记为绘制阶段和导出阶段两个步骤：

- 绘制阶段：选择希望绘制的 DOM 节点，根据 DOM 的 `nodeType` 属性调用 `canvas` 对象的对应 API，将目标 DOM 节点绘制到 `canvas` 画布（例如对于 img 标签的绘制使用 drawImage 方法)。
- 导出阶段：通过 canvas 的 `toDataURL` 或 `getImageData` 等对外接口，最终实现画布内容的导出。

### 方案二：DOM->svg->canvas->image

将 html 作为 svg 的外联元素，利用 svg 的 API 导出为图片

### 方案三：使用NodeJS 调用浏览器方法

在后端生成海报，比如可以使用nodeJS，通过 `puppter` 等库，调用浏览器的 page 对象，基于 page.screenshots 截图并保存到磁盘。

## 九、如何获取页面滚动距离

_**pageYOffset**_：属window对象，IE9+、Firefox、Chrome、Opera均支持该方式获取页面滚动敢赌值，并且会忽略DOCTYPE定义规则。

```javascript
window.pageYOffset
```

_**scrollY**_：属于window对象，Firefox、Chrome、Opera均支持，IE不支持，忽略DOCTYPE定义规则。

```
window.scrollY
```

页面如果未定义DOCTYPE文档头，所有浏览器都支持docume.body.scrollTop属性获取滚动高度。

```
document.body.scrollTop
```

如果页面定义了DOCTYPE文档头，那么HTML元素上的scrollT属性在IE、Firefox、Opera（presto内核）下都可以获取滚动高度值，而在Chrome和Safari下其值为0。

```
document.documentElement.scrollTop; //Chrome,Safari下为0
```

此在获取页面滚动高度的时候优先考虑使用 window.pageYOffset 然后在使用scrollTop。

```javascript
var _scrollLeft = window.scrollX || window.pageXOffset || document.documentElement.scrollLeft 
 var _scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop
```

## 十、如何顺序执行10个异步任务

### 解法1：for 循环 + await

## 解法2：Array.prototype.reduce