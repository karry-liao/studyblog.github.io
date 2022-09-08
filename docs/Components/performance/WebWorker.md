# WebWorker

<ContainerBox title="介绍">
::: slot desc
由于js是单线程模型。也就是说一次只能处理一件事情，前面的事情没有完毕，后面的事情要等待前面的事情处理完毕后才能执行。随着多核CPU的出现，我们可以最大限度的利用cpu多核，来提高js的性能。Worker接口可以创建后台任务。即可以给js运行新增线程。用于处理一些耗时、耗费性能的任务（异步的除外）
WebWorker的作用：1.解决页面卡死问题。2.发挥多核CPU的优势，提高js性能。
:::
</ContainerBox>

## 代码演示

```javascript
<script>
//main.js 主线
//传递一个数字给worker线程。worker线程计算处理完毕后，返回一个信息给主线程。

if (window.Worker) {   //这一步比较重要，兼容性判断。
        //1.创建一个worker线程。
	const myWorker = new Worker("worker.js");
        //2.向worker线程发送数据，值可以是number,string,boolean ,file,blob 等
	  myWorker.postMessage(10000000000);

        //3.监听后台任务，
	myWorker.onmessage = function(e) {
	    result.textContent = e.data;
	    console.log('Message received from worker');
	}

       //4.当离开页面的时候，或者需要结束worker时(比如任务完成时)，
        //可以结束Worker线程，不必占用资源       
       // myworker.terminate();


       //5.当myWorker异常时的时候，会触发onerror事件    
        myWorker.onerror = function() {
             console.log('There is an error with your worker!');
        }
} else {  //这一步非常重要。具体代码根据需要更具自己的业务写。
	console.log('Your browser doesn\'t support web workers.')
}
</script>
````
```javascript
//worker.js  worker 线程
// 程序处理完毕后返回一个结果给主线程。//0 可以加载其他js进来，比如ajax.
//importScripts('ajax.js','b.js')  

//1.监听主线程
onmessage = function(e) {
  console.log('Worker: Message received from main script');

    //接收来自主线程发送过来的数据
    let num = e.data;
//使用for循环模拟一个耗时、耗性能的任务。（如果这个for循环放在主线程，那么页面很可能会卡死，
//影响用户体验）。for(let i = 0;i<=num;i++){
    if(i==num){
       //2.向主线程发送数据
        postMessage('任务完成啦！')
    }
}
//3.worker 线程也可以调用close 方法来结束worker线程。
// close()


 //4.同样的，在worker 线程中也可以监听错误信息。
onerror = function(err){
    console.log(err)
}
```

