## **工厂模式**  

​	**工厂模式一个用于创建对象的接口，这个接口由子类决定实例化哪个类，该模式使一个类的实例化延伸到了子类，而子类可以重写接口方法，以便于创建的时候指定自己的对象类型。**

```javascript
calss Product(){
    constructor(name){
        this.name = name
    }   
    init(){
        console.log('init')
    }
    fun(){
        cosole.log('fun')
    }
}
class Factory(){
    create(name){
        return new Product(name)
    }
}

let factory = new factory()
let p = factory.create('p1')
p.init()
p.fun()
```



## 单例模式

​	  **一个类只能构造唯一实例 （创建菜单对象）**

```javascript
 class LoginForm {
     constructor() {
         this.state = 'hide'
     }
     show() {
         if (this.state ==='show') {
             alert('已经显示了')
             return
         }
         this.state = 'show'
         console.log('登录框显示成功')
     }
     
     hide() {
         if(this.state ==='hide') {
             alert('已经隐藏')
             return
         }
         this.state = 'hide'
         console.log('登录框隐藏成功')
     }
 }

LoginForm.getInstance = (function() {
    let instance
    return function() {
        if(!instance) {
            instance = new LoginForm()
        }
        return instance
    }
})()

let obj1 = LoginForm.getInstance()
obj1.show()

let obj2 = LoginForm.getInstance()
obj2.hide()

console.log(obj1 === obj2)
```



## 代理模式    

​	**代理对象和本体对象具有一致的接口   图片预加载**

```javascript
const myImage = (function(){
    const imgNode = document.createElement('img')
    document.body.appendChild(imgNode)
    return {
        setSrc:function(src){
            imgNode.src = src
        }
    }
})()

const proxyImage = (function() {
    const img = new Image()
    img.onload = function() {
        myImage.setSrc(this.src)
    }
    return {
        setSrc: function(src) {
            myImage.setSrc('loading.jpg')
            img.src = src
        }
    }
})()

proxyImage.setSrc('http://loaded.jpg')
```

## 职责链模式   

​	**通过请求第一个条件**，会持续执行后续的条件，直到返回结果为止   if else 优化

```javascript
// 业务代码
const order500 = function(orderType, pay, stock) {
  if ( orderType === 1 && pay === true ) {
    console.log('500 元定金预购, 得到 100 元优惠券')
  } else {
    return 'nextSuccess'
  }
}

const order200 = function(orderType, pay, stock) {
  if ( orderType === 2 && pay === true ) {
    console.log('200 元定金预购, 得到 50 元优惠券')
  } else {
    return 'nextSuccess'
  }
}

const orderCommon = function(orderType, pay, stock) {
  if ((orderType === 3 || !pay) && stock > 0) {
    console.log('普通购买, 无优惠券')
  } else {
    console.log('库存不够, 无法购买')
  }
}

// 链路代码
Function.prototype.after = function(fn) {
  const self = this
  return function() {
    const result = self.apply(self, arguments)
    if (result === 'nextSuccess') {
      return fn.apply(self, arguments) // 这里 return 别忘记了~
    }
  }
}

const order = order500.after(order200).after(orderCommon)

order( 3, true, 500 ) // 普通购买, 无优惠券
```

## 装饰者模式   

​	**动态的给函数赋能  天冷了穿衣服，天热了脱衣服**

​	**允许向一个对象添加新的功能，但不改变原有对象**

```javascript
//装饰器的实现
//定义一个圆
class Circle{
    draw(){
        console.log("画一个圆");
    }
}
//使用装饰器添加一个边框
class Decorator{
    constructor(circle){
        this.circle = circle;
    }
    draw(){
        this.circle.draw();//圆自己绘制方法
        this.setBorder(this.circle)
    }
    setBorder(circle){
        console.log("绘制边框")
    }
}
var circle = new Circle();
var dec = new Decorator(circle);
dec.draw();
```

```javascript
//装饰器----注解形式
class Boy{
	speak(){
        @run//注解装饰
        console.log("唱")
    }
}
//非脚手架环境下需配置.babelrc转换文件
//装饰器  参数
function run(target,key,descriptor){
    //target是boy对象,key表示被装饰的方法名‘speak’，desc描述对象，value=speak()
    console.log("我能跑")
}
var boy = new Boy()
boy.speak()
```

```javascript
class Math{
    @log(100)
    add(a,b){
        return a+b;
    }
}
//日志装饰器
function log(num){
    function log(target,name,descriptor){
        var _num = num || 0
    var oldValue = descriptor.value //value == add
    //重构
    descriptor.value = function(...arg){
        arg[0] += _num;
        arg[1] += _num;
        console.log(`调用${name} 参数：`, arguments);
        return oldValue.apply(target,arg)
    }
    return descriptor;
	}
}

var math = new Math();
math.add(1,5)
```



## 观察者-发布订阅模式 

​		**当观察对象发生变化时自动调用相关函数  vue 双向绑定**

​		**PubSub 瀑布流库**

```javascript
    //发布者
    var shopObj = {}
    //商品列表
    shopObj.list = [];
    shopObj.listen = function(key,fn){
        if(!this.list[key]){
            this.list[key] = [];
            
        }
      this.list[key].push(fn);//往特定的商品列表中添加订阅
    }
    //发布消息
    shopObj.publish = function(key){
        var fns = this.list[key]
      for(var i = 0, fn; fn = this.fns[i++];){
        //执行订阅的fn  arguments JS内置对象
        fn.apply(this,arguments);
      }
    }
    //A添加订阅
    shopObj.listen("huawei",function(brand, model){
      console.log("A订阅："+ brand +" "+mode)
    })
    //B添加订阅
    shopObj.listen("apple",function(brand, model){
      console.log("B订阅："+ brand +" "+mode)
    })
    //商家发布消息
    shopObj.publish('hahaha','10000$')
```

