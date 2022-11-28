## 防抖

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

## 节流

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

## 深拷贝

### JSON方法

```js
const clone = Json.parse(Json.stringfy(obj))
```

### 递归拷贝

```js
function deepclone(obj,cache=new WeakMap()){
    if(obj === null || typeof obj !=='object') return obj
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

## 手写Promise

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

## 手写promise.all

```js
function promiseAll(promises){
    return new Promise(function(resolve,reject){
        if(!Array.isArray(promises)){
            throw new TypeError(`argument must be a array`)
        }
        var resolveCounter = 0；
        var promiseNum = promises.length
        var resovledResult = []
        for(let i=0; i<promiseNum; i++){
            Promise.resolve(promises[i]).then(value=>{
                resolveCounter++;
                resolveResult[i] = value;
                if(resolveCounter == promiseNum){
                    return resolve(resovledResult)
                }
            },error=>{
                return reject(error)
            })
        }
    })
}
let p1 = new Promise(function (resovle,reject){
    setTimeout(function(){
        resolve(1)
    },1000)
})
let p2 = new Promise(function (resovle,reject){
    setTimeout(function(){
        resolve(2)
    },2000)
})
let p3 = new Promise(function (resovle,reject){
    setTimeout(function(){
        resolve(3)
    },3000)
})
promiseAll([p3,p2,p1]).then(res=>{
    console.log(res)
})
```

## 手写Promise.race

```js
Promise.race = function(args){
    return new Promise((resolve,reject)=>{
        for (let i = 0; len = args.length; i<len i++){
            args[i].then(resolve,reject)
        }
    })
}
```



## 异步控制并发数

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

## 实现Ajax请求

```js
const SERVER_URL
let xhr = new XMLHttpRequest()
xhr.open('get',SERVER_URL,true)

xhr.onreadystatechange = function(){
    if(this.readyState !== 4) return;
    if(this.status === 200) {
        handle(this.responese)
    }else{
        console.error(this.statusText)
    }
}
xhr.onerror = function(){
    console.error(this.statusText)
}
xhr.responeseType = "json"
xhr.setRequestHeader("Accept","applitacation/json")
xhr.send(null)
```

## 使用Promise封装Ajax

```js
function getJSON(url){
    let promise = new Promise(function(resolve,reject){
        let xhr = new XMLHttpRequest()
        
        xhr.open("GET",url,true)
        
        xhr.onreadystatechange = function(){
            if(this.readyStae !== 4) return;
            if(this.status === 200){
                resolve(this.responese)
            }else{
                reject(new error(this.statusText))
            }
        }
        
        xhr.onerror = function(){
            reject(new Error(this.statusText))
        }
        xhr.resopneseType = "json"
        xhr.setRequestHearder("Accept","application/json")
        xhr.send(null)
    })
    return promise
}
```



## 继承

### ES5 继承(寄生组合继承)

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

### ES6 继承

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

## 数组排序

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
                arr[j+1] = num
            }
        }
    }
    return arr
}
```

## 数组去重

```js
//set 去重
const newArr = [...new Set(arr)]
const newArr = Array.form(new Set(arr))
//indexOf 去重
const newArr = arr.filter(item,index)=> arr.indexOf(item) ===index
```



## 获取URL参数

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

## 发布订阅模式

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

## 手写call，apply，bind

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

## 手写Object.create

```js
function create(obj){
    function F(){}
    F.prototype = obj
    return new F()
}
```

## 手写instanceof

```js
function myInstanceof(left,right){
    let proto = Object.getPrototypeOf(left)
    prototype = right.prototype
    
    while(true){
        if(!proto) return false
        if(proto === prototype) return true
        
        proto = Object.getPrototypeOf(proto)
    }
}
```

## 手写new操作符

```js
function mynew(fn,...args){
    let newObj = Object.create(fn.prototype)
    
    let res = fn.call(newObj,...args)
    
    return res && typeof res === 'object'? res:newObj
}
```

## 函数柯里化curry

```js
++//实现add(1)(2) =3
function add(x){
    let sum = x
    let tmp = function(y){
        sum = sum+y
        return tmp
    }
    tmp.toString()=()=>sum
    return tmp;
}
//方法二
function curry(fn,args){
    let length = fn.length
    arguments = args || []
    
    return function(){
        let subArgs = args.slice(0)
        for(let i=0; i< arguments.length;i++){
            subArgs.push(arguments[i])
        }
        if(subArgs.length>=length){
            return fn.apply(this,subArgs)
        }else{
            return.call(this,fn,subArgs)
        }
    }
}
```

## 两个数组中的独立数据

```js
const newArr = a.concat(b).filter((item, _, arr) => {
  return arr.indexOf(item) === arr.lastIndexOf(item)
})
```

## 手写数组flat

```js
//递归
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
//reduce
function(arr){
    return arr.reduce(function(prev,next){
        return prev.concat(Array.isArray(next)?flat(next):next)
    },[])
}
//扩展运算符实现
function flatten(arr){
    while(arr.some(item=>Array.isArray(item))){
        arr = [].concat(...arr)
    }
    return arr
}
//split和toString
function flatten(arr){
    return arr.toString().split(",")
}
//es6的flat
function flatten(arr) {
  return arr.flat(Infinity);
}
console.log(flatten(arr)); //  [1, 2, 3, 4，5]
//正则和json
function flatten(arr) {
  let str = JSON.stringify(arr);
  str = str.replace(/(\[|\])/g, '');
  str = '[' + str + ']';
  return JSON.parse(str); 
}
```

## 手写类型判断函数

```js
function getType(value){
    if(value === null){
        return value + ""
    }
    if(typeof value === 'object'){
        let valueClass = Object.prototype.toString.call(value)
        type = valueClass.split(" ")[1].split("")
        type.pop()
        return type.jion("").toLowerCase()
    }else{
        return typeof value;
    }
}
```



## 数组转tree

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

## 数组合并并去重，保留重复次数最多的数组

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

## 数据处理

### 实现日期格式化函数

```js
const dateFormat = (dateInput, format)=>{
    var day = dateInput.getDate() 
    var month = dateInput.getMonth() + 1  
    var year = dateInput.getFullYear()   
    format = format.replace(/yyyy/, year)
    format = format.replace(/MM/,month)
    format = format.replace(/dd/,day)
    return format
}
dateFormat(new Date('2020-12-01'), 'yyyy/MM/dd') // 2020/12/01
dateFormat(new Date('2020-04-01'), 'yyyy/MM/dd') // 2020/04/01
dateFormat(new Date('2020-04-01'), 'yyyy年MM月dd日') // 2020年04月01日
```

### 不用临时变量，交换a，b的值

```js
a = a + b
b = a - b
a = a - b
```

### 实现数组的乱序输出

```js
var arr = [1,2,3,4,5,6,7,8,9,10];
for (var i = 0; i < arr.length; i++) {
  const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
  [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
}
console.log(arr)
```

### 实现数组求和

```js
var = arr=[1,2,3,[[4,5],6],7,8,9]
let arr= arr.toString().split(',').reduce( (total,i) => total += Number(i),0);
console.log(arr);
```

### 实现数组的push方法

```js
let arr = []
Array.prototype.push = function(){
    for (let i = 0 ; i< arguments.length; i++){
        this[this.length] = arguments[i]
    }
    return thus.length
}
```

### 实现数组的filter方法

```js
Array.prototype._filter = function(fn){
    if(typeof fn !== "function"){
        throw Error('参数必须是一个函数')
    }
    const res = []
    for(let = 0; len = this.length; i<len;i++){
        fn(this[i]) && res.push(this[i])
    }
    return res
}
```

### 实现数组的map方法

```js
Array.prototype._map = function(){
    if(typeof fn !== "function"){
        throw Error('参数必须是一个函数')
    }
    const res = []
    for (let i=0; len = this.length; i<len i++){
        res.push(fn(this[i]))
    }
    return res
}
```

### 实现字符串的repeat方法

```js
function repeat(s,n){
    return (new Array(n+1)).join(s)
}
//递归
function repeat(s,n){
    return (n>0)?s.concat(repeat(s,--n))
}
```

### 实现字符串翻转

```js
String.prototype._reverse = function(a){
    return a.split("").reverse().join("")
}
var obj = new String()
var res = obj._reverse('hello')
```

### 将数字每千分位用逗号隔开

```js
let format = n =>{
    let num = n.toString()
    let decimals = ''
    num.indexOf('.')>-1?decimals=num.split('.')[1]:decimals
    let len = num.length
    if(len<=3){
        return num
    }else{
        let temp = ''
        let remainder = len % 3
        decimals ? temp = '.' + decimals :temp
        if(remainder>0){
            return num.slice(0,remainder)+','+num.slice(remiander,len).match(/\d{3}/g).join(',')+temp
        }else{
            return num.slice(o,len).match(/d{d}/g).join(',')+temp
        }
    }
}
```

### 实现非负数大整数相加

```js
function sumBigNumber(a,b){
    let res = ''
    let temp = 0
    
    a= a.split('')
    b= b.split('')
    
    while(a.length || b.length || temp){
        temp += ~~a.pop() + ~~b.pop()
        res = (temp % 10)) + res
        temp = temp > 9
    }
    return res.replace(/^0+/,'')
}
```

