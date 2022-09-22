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


