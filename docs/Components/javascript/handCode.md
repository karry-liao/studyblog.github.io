# 防抖

```js
function debounce(fn, delay){
    let timer
    return function(...args){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            fn.apply(this,args)
        },delay)
    }
}
```

# 节流

```js
function throttle(fn,delay){
	let last = 0
	return function(...args){
        const now = new.date()
        if(now-last > delay){
            last = now
            fn.apply(this,args)
        }
    }
}
```

# 深拷贝

## JSON方法

```js
const clone = Json.parse(Json.stringfy(obj))
```

## 递归拷贝

```js
function deepclone(obj,cache=new WeakMap()){
    if(obj === null || typeof onj !=='object') return obj
    if(obj instanceof Date) return new Date(obj)
    if(obj intanceof RegExp) return new RegExp(obj)
    
    if(cache.has(obj)) return cache.get(obj)
    let cloneObj = new obj.constructor()
    cache.set(obj,cloneObj)
    
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            cloneObj[key] = deepclone(obj[key],cache)
        }
    }
    return cloneObj
}
```

# 手写Promise

```js
class MyPromise {
    constructor(executor){
        this.status = 'pending'
        this.value = null
        this.reason = null
        this.onFulfiledCallbacks = []
        this.onRejectdCallbacks = []
        let resolve = value => {
            if(this.status == 'pending'){
                this.status = 'fulfiled'
                this.value = value
                this.onFulfiledCallbacks.forEach(fn=> fun())
            }
         let reject = reason =>{
             if(this.status ==='pending'){
                 this.status = 'rejected'
                 this.reason = reason
                 this.onRejectedCallbacks.forEach(fn=>fn())
             }
         }
         try{
             executor(resolve,reject)
         }catch(err){
             reject(err)
         }
        }
        then(onFulfiled,onRejected) {
            return new MyPromise(resoleve,reject)=>{
                if(this.status === 'fulfiled'){
                    setTimeout(()=>{
                        const x = onFulfiled(this.value);
                        x instanceof MyPromise ? x.then(resolve,reject) :resolve(x)
                    })
                }
            if(this.status === 'rejected'){
                setTimeout(()=>{
                    const x= onRejected(this.reason)
                    x instanceof MyPromise?x.then(resovle,reject):resolve(x)
                })
            }
            if(this.status === 'pending'){
                this.onFulfiledCallbacks.push(()=>{
                    setTimeout(()=>{
                        const x = onFullfiled(this.value)
                        x instanceof MyPromise?x.then(resovlve,reject):resolve(x)
                    })
                })
             this.onRejectCallbacks.push(()=>{
                 setTimeout(()=>{
                     const x = onRejected(this.reason)
                     x instanceof MyPromise ? x.then(resolve,reject): resolve(x)
                 })
             })
            }
            }
    }
}

```

# 异步控制并发放数

```js
function(limitRequest(urls=[],limit = 3)){
    return new Promise((resolve,reject)=>{
        const len = urls.length
        let count = 0
        
        while(limit>0){
            start()
            limit-=1
        }
        
        function start(){
            const url = url.shift()
            if(url){
                axios.post(url).then(res=>{
                    //todo
                }).catch(err=>{
                    //todo
                }).finally(()=>{
                    if(count == len-1){
                        resovle()
                    }else{
                        count ++
                        start()
                    }
                })
            }
        }
    })
}
```

# 继承

## ES5 继承(寄生组合继承)

```js
function Parent(name){
	this,name = name
}
Parent.prototype.eat = function(){
	console.log(this.name+ 'is eatting')
}
function Child(name,age){
	Parent.call(this,name)
	this.age = age
}
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = child

```

## ES6 继承

```js
class Parent {
    constructor(name){
        this.name = name
    }
    eat(){
        console.log(this.name+'is eating')
    }
}

class Child extends Parent{
    constructor(name,age){
    	super(name)
        this.age=age
    }
}
```

# 数组排序

```js
//方法一
//sort()

//方法二  冒泡排序
function bubbleSort(arr){
    let len = arr.length
    for(let i=0; i<len-1;i++){
        for(let j=0;j<len-1-i;j++){
            if(arr[j]>arr[j+1]){
                let num = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = null
            }
        }
    }
    return arr
}
```

# 数组去重

```js
//set 去重
const newArr = [...new Set(arr)]
const newArr = Array.form(new Set(arr))
//indexOf 去重
const newArr = arr.filter(item,index)=> arr.indexOf(item) ===index
```

# 获取URL参数

```js
//URLSearchParams 方法
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries)
//split方法
function getParams(url){
    const res={}
    if(url.includes('?')){
        const str = url.split('?')[1]
        const arr = str.split('&')
        arr.forEach(item=>{
            const key = item.split('=')[0]
            const value = item.split('=')[1]
            res[key] = decodeURLComponent(value)
        })
	}
    return res
}
    
```

# 发布订阅模式

```js
class EventEmitter {
    constructor(){
        this.cache= {}
    }
    on(name,fn){
        if(this.cache[name]){
            this.cache[name].push(fn)
        }else{
            this.cache[name] = [fn]
        }
    }
    off(name,fn){
        const tasks = this.cache[name]
        if(tasks){
            const index = tasks.findIndex((f)=>===fn || f.callback ===fn)
            if(index>=0){
                tasks.splice(index,1)
            }
        }
    }
    emit(name,once=false){
        if(this.cache[name]){
            const tasks = this.cache[name].slice()
            for(let fn of tasks){
                fn();
            }
            if(once){
                delete this.cache[name]
            }
        }
    }
}
```

# 手写call，apply，bind

```js
//call
Function.prototype.MyCall=function(context){
    if(typeof this!=="function"){
        throw new Error('type error')
    }
    if(context === null || context === undefine){
        context === window
    }else{
        context = Object(context)
    }
    const fnSym = Symbol()
    context[fnSym] = this
    const args = [...arguments].slice(1)
    const result = context[fnSym](...args)
   	delete context[fnSym]
    return result
}
//apply
Function.prototype.MyApply=function(context){
    if(typeof this !== "function"){
        throw new Error('type error')
    }
    if(context === null || context ===undefine){
    	context = window
    }else{
        context = Object(context)
    }
    const fnSym = Symbol()
    constext[fnSym] = this
    const args = [...arguments][1]
    const result = arguments.length>1?context[fnSym](...args):context[fnSym]()
    delete context[fnSym]
    return result
}
//bind
Function.prototype.Mybind = function(context){
    if(typeof this!=="function"){
        throw new Error('type error')
    }
    if(context === null || context ===undefind){
        context = window
    }else{
        context = Object(context)
    }
    
    const self = this
    const args = [...arguments.slice(1)]
    
    return function Fn(...newArgs){
        if(this instanceof Fn){
            return new self(...args,...newArgs)
        }
        return self.apply(context,[...args,...newArgs])
    }
}
```

# 手写new操作符

```js
function mynew(fn,...args){
    let newObj = Object.create(fn.prototype)
    
    let res = fn.call(newObj,...args)
    
    return res && typeof res === 'object'? res:newObj
}
```

# 函数柯里化

```js
//实现add(1)(2) =3
function add(x){
    let sum = x
    let tmp = function(y){
        sum = sum+y
        return tmp
    }
    tmp.toString()=()=>sum
    return tmp;
}
```

# 两个数组中的独立数据

```js
const newArr = a.concat(b).filter((item, _, arr) => {
  return arr.indexOf(item) === arr.lastIndexOf(item)
})
```

# 手写数组flat

```js
cnost flat = function(arr,deep=1){
    let result = []
    
    arr.forEach(item=>{
        if(Array.isArray(item) && deep > 0){
            result = result.concat(flat(item,deep-1))
        }else{
            result.push(item)
        }
    })
    return result
}
```

# 数组转tree

```js
function arrToTree(arr,parentId){
    const filterArr = arr.filter(item=>{
        return parentId === undefined?item.parent===-1:item.parent===parentId
    })
    
   	filterArr.map(item=>{
        item.chilNode=arrToTree(arr,item.id)
        return item
    })
    return filterArr
}
arrToTree(arr)
```

# 数组合并并去重，保留重复次数最多的数组

```js
function maxNum(item,arr){
	let num = 0;
    arr.forEach(val=>{
        item === val && num++
    })
    return num
}

function fn(arr1,arr2){
    let obj = new Map()
    [...arr1,...arr2].forEach(item=>{
        let hasNum = obj.get(item)
        let num = 1
        if(hasNum){
            num = hasNum + 1
        }
        obj.set(item,num)
    })
    
    let arr = []
    for(const key of obj.keys()){
        if(obj.get(key)>1){
            for(let index = 0; index<Math.max(maxNum(key,arr1),maxNum(key,arr2));index++){
                arr.push(key)
            }
        }else{
            arr.push(key)
        }
    }
    return arr.sort((a,b)=>a-b)
}
```

