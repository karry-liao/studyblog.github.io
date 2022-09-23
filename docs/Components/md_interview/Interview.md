# CSS

1. **margin**和 padding 的区别，作用对象不同，padding 作用于自身
2. **VW**和**百分比**的区别：百分比有继承关系，继承父元素的百分比
3. **行内元素**和**块级元素**：行内元素不换行，不可以设置大小，宽度高度由内容决定。 块级元素独占一行，并且宽度有继承关系
4. shrink 让浏览器支持小字体 transform:scale(0.5)

# JS

1. **var** 声明提升，没有局部作用域，声明覆盖
2. **let**块级作用域，不可重复声明
3. **const**不可更改，不可重复声明

# 深拷贝和浅拷贝

- 数组和对象的赋值叫做浅拷贝

- 结构赋值针对一维数组和对象可以看成深拷贝，多维的就是浅拷贝。

  深拷贝

  ```js
  function deepclone(source) {
    // [] => Array(基类) {} = > Object
    const targetObj = source.constructor === Array ? [] : {};
    for (let Keys in source) {
      if (source.hasOwnProperty(Keys)) {
        //Keys => 3
        if (source[keys] && typeof source[keys] === "object") {
          targetObj[keys] = source[keys].constructor === Array ? [] : {};
          targetObj[keys] = deepclone(source[keys]);
        } else {
          targetObj[keys] = source[keys];
        }
      }
    }
  }
  ```

# 浏览器中输入 url 中，浏览器做了什么？

www.baidu.com ===》 DNS 域名系统 ===》 拿到真实 IP===》 建立连接（TCP 的三次握手） ===》 拿数据渲染页面 ===》 四次挥手 (读取浏览器缓存)

# 性能优化

​ a.加载

- 减少 http 请求

- 减小文件大小

- CDN（第三方库）

- SSR 服务端渲染，预渲染

- 懒加载

- 分包

  b 减少 dom 操作，避免回流，文档碎片

# 图片懒加载

```js
let num = document.getElementsByTageName("img").length;
let img = document.getElementsByTageName("img")
function lazyload(){

​	let seeHeight = document.documentElement.clienHeight;//可见区域

  	let scrolltop = document.documentElement.scrollTop || document.body.scrolltop;

    for(let i = n ; i < num; i++)
		if(img[i].offsetTop < seeHeight + scrollTop){
            if(img[i].getAttribute("src") == "./img2/timg.gif"){
                img[i].src = img[i].getAttribute("data-src")
            }
            n = i + 1
        }
}
```

# this 指向问题

- 全局的 this====》 window
- 全局的方法会被挂载到 window 上，所以也会指向 window
- 箭头函数没有作用域，没有 this，this 永远指向上一层 apply(this,id)

**改变 this 指向：**

1. call() 改变 this 后执行，传入对象 伪数组
2. apply() 改变 this 后执行 传入数组
3. bind() :改变 this 后不会执行

# 闭包

**为甚要有闭包：**

1. 避免变量被污染，
2. 私有化
3. 保存变量，常驻内存

**满足闭包的条件：**函数嵌套，内部嫩书运用外部函数的变量，必须以返回函数作为对应的一种返回形式

**闭包的应用场景：**防抖节流，库的封装(保证数据的私有性)

# new

**new 的过程发生了什么：**

1.创建一个空对象 --------------------- Object.create(null) 纯净的，没有原型链

let obj = new Object() Object====>基类

2.设置他的原型链

obj._proto_ == Person.prototype

3.改变 this 指向

let result = Person.call(obj)

4.判断返回值类型

```js
if(typeof (result) == "object"){

​	person1 = result

} else {

​	person1 = obj

}
```

# 原生 JS 实现事件委托

ul li

```
let ul = document.getElementById("ul")

​	ul.onclick = function (event) {

        console.log(event)

        event = event || window.event

        let target = event.target;

    if(tartget.nodeName == 'LI'){

    ​	alert(target.innerHTML)

	}

}
let btn = document.getElementById("btn")
btn.onclick = function() {
	let li = document.getElementById("li")
	li.textContent = ul.children.length;
	ul.appendChild(li)
}
```

# JQUERY

```
(function(window){
	window.$ = jquery = function(nodeSelector){
		let nodes = {};
		if(typeof nodeSelector === "string"){
		let temp = document.querySelectorAll(nodeSelector)
		for( let i = 0l i < temp.length; i++){
			nodes[i] = temp[i]
		}
		nodes.length = temp.length
		} else {
		 throw new Error("必须是字符串")
		}
		//添加方法
		 nodes.addClass = function (classes){
		 let className = classses.split(' ');
		 //循环class
		 calssName.forEach(value = > {
		 	for(let i = 0 ; i < nodes.length; i++){
		 		nodes[i].classList.add(value)
		 	}
		 })
		 }
		 //修改text
		 nodes.setText = function(text){
		 	for(let i = 0l i < nodes.length; i++){
		 		nodes[i].textContent = text
		 	}
		 }
		 return nodes
	}
})(window)
```

# VUE3 响应式------Proxy

```js
let obj = {
  name: "小明",
  age: 17,
};
const p = new Proxy(obj, {
  //增加 && 读取
  get(target, propName) {
    console.log(`读取P的${propName}属性`);
    return target[PropName];
  },
  //修改
  set(target, propName, value) {
    console.log(`修改P的${propName}属性`);
    target[PropName] = value;
  },
  //删除
  deleteProperty(target, propNmae) {
    console.log(`删除了P的${propName}属性`);
    return delete target[propName];
  },
});
```

# 手写 Promise

```js
//概念 &&  用法
//异步
let isGet = true
let getMoney = new Promise((resolve, reject)=>{
    if(isGet){
        let prop = {
            color: 'red',
            price: '$100'
        }
        resolve(prop)
    }else{
        let err = new Error('好像不太行')
        reject(err)
    }
})

let testFun = function(){
    getMoney.then((fullfilled) => {
        console.log(fulfilled)
    }).catch((rejected)=>{
        console.log(rejected.message)
    })
}
//链式调用 需return Promise.resolve(xxx)


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function MyPromise(excute){      //excute 执行器
    //ES5 1.执行结构
    let self = this;
    self.status = 'pending'    //状态
    self.value = null;  //成功的值
    self.reason = nill; //失败的原因

    //数据缓存区
    self.onFulfiledCallbacks = []
    self.onRejectedCallbacks = []
    //4.成功
    resolve(value){
        if(self.status === 'pending'){
            self.value = value   //保存成功结果
            self.status = 'fulfilled'
            //状态改变,依次取出
            self.onFulfiledCallbacks.forEach(item =>item(value))
        }
    }
    reject(reason){
        	if(self.status === 'pending'){
            self.reason = reason   //保存失败结果
            self.status = 'rejected'

            self.onRejectedCallbacks.forEach(item =>item(reason))
        }
    }
    // 3.自动执行一遍
    try {
        excute(resolve, reject)
    }catch(err){
        reject(err)
    }

    //2  .then
    MyPromise.prototype.then = function((onFulfilled, onRejected)){
        onFulfilled = typeof onFulfilled ==='function' ? onFulfilled : function(data) {resolve(data)}
        onRejected = typeof onRejected ==='function' ? onRejected : function(err) {throw err}
    }

    //let self = this
    //if(selft.status === 'pending'){
    //    self.onFulfiledCallbacks.push(onFulfilled)
    //   self.onRejectedCallbacks.push(onRejected)
    //}
    if(self.status ==='pending'){
        return new myPromise((resolve, reject) =>{
            self.onFulfiledCallbacks.push(()=>{
                let x = onFulfilled(self.value);
                x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
            })
            self.onRejectedCallbacks.push(()=>{
                let x = onFulfilled(self.reason);
                x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
            })
        })
    }
    if(self.status ==='fulfilled'){
        return new myPromise((resolve, reject) =>{
            try{
                let x = onFulfilled(self.value);
                x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
            } catch(err) {
                reject(err)
            }
        })
    }
     if(self.status ==='rejected'){
        return new myPromise((resolve, reject) =>{
            try{
                let x = onFulfilled(self.reason);
                x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
            } catch(err) {
                reject(err)
            }
        })
    }

    MyPromise.prototype.catch(()=>{
        return this.then(null, fn)
    })

    let demo = new MyPromise((resolve,reject) => {
        console.log('哈哈哈哈哈哈哈哈哈')
    })
}

```

# Vue 插件

1. 组件
2. 组件=》插件
3. 配置入口文件
4. 测试
5. 打包
6. 上传 npm 官网
7. 测试

"license":'MIT'

"description":"这是一段描述"

- 打包："lib":vue-cli-service build --target lib --name "项目名称" --dest lib src/plugins/index.js
- 在项目目录下生成 lib 文件夹
- 然后在 package.json 文件夹中配置入口 "main":"lib/vue-msg-karry.umd.min.js"
- 在终端输入 npm login 输入 npm 官网用户名和密码 emaill 登录
- 登录完成后直接输入 npm publish 命令 发布包

```js
const requireComponent = require.context("./", true, /\.vue$/); //动态引入文件
const install = (Vue) => {
  if (install.installed) return;
  install.installed;

  requireComponent.keys().forEach((fileName) => {
    //requireComponent.keys() => []
    const config = requireComponent(fileName);
    const conponemtName = config.default.name; //组件名

    Vue.component(componentName, config.default || config);
  });
  Vue.directive("focus", {
    inserted: function (el) {
      el.focus();
    },
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
};
```
