**render()**  与 **template**异同点:都是类编译器

**render**函数是**template**的下一步，



h=>相当于原生js的createElement()=》创建真实元素=>生成虚拟dom=》真实dom

一值多判断

```
render(){
	return h('button',{
	//v-bind:class
		class:{
			btn:true,
			'btn-cuccess':this.type==cuccess
			'btn-error':this.type==error
			'btn-warning':this.type==warning
			'normal':！this.type
		}
		domProps:{
			innerText:this.text || '默认按钮'
		}
		//v-on
		on:{
		
		}
	})
}
```

当前组件名称：this.$options.name

<keep-alive :include="cached"></keep-alive>



### 柯里化：一个函数可以接受多个参数，反复被调用

fn(1,2,3)(4,5,6)(7,8,9)该技术被命名为函数柯里化

1. 不固定参数个数的函数
2. 第一次执行  返回函数
3. 后续执行，返回函数
4. 缓存参数
5. 内部函数  闭包  二次缓存函数



//闭包的应用场景：避免全局变量命名冲突

arguments

```javascript
function currying(){
	const args = Array.prototype.slice.call(arguments);
	//const args = []._proto__.slice.call(arguments);
	return currying
   // a.__proto__[Symbol.toPrimitive]
}
```



### **需求：能实现ajax请求，自动在失败的时候重连，重试次数可传递，延迟时间**

```javascript
const rate = 0.5
function request(){
    return new promise((resolve,reject)=>{
        setTimeout(()=>{
            let res = Math.random()
            if(res>rate){
                resolve(res)
            }else{
                reject(res	)
            }
        })
    }
}
function retry(func,times=0,delay=0){
        return new Promise((resolve,reject)=>{
            //func是一件事,
            let inner = async function inner(){
                try{
                    const result = await func()
                    resolve(result)
                }catch(e){
                    if(times--<=0){
                        reject(e)
                    }else{
                        //开始重试
                        console.log('开始重试，还剩次数',times)
                        setTimeout(()=>{
                            inner()
                        },delay)
                    }
                }
                inner();
            }
        })
    }
//函数设计
retry(request,3,2000).then(res=>{
        console.log(res,'成功')
    }).catch(e=>{
        console.log(e,'失败')
    })
```

