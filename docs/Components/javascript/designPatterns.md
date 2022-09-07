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

## 观察者模式

​	**当观察对象发生变化时自动调用相关函数  vue 双向绑定**

## 发布订阅模式 

​	**PubSub 瀑布流库**



