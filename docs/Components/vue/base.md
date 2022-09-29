## Vue

> **生命周期钩子的this上下文指向调用它的vue实例**

不能再生命周期选项property或回调上使用箭头函数如

created: () => console.log(this.a)   或 

vm.$watch('a', newValue => this.myMethod())。**因为箭头函数并没有 `this`，`this` 会作为变量一直向上级词法作用域查找，直至找到为止，**经常导致 Uncaught TypeError: Cannot read property of undefined 或 Uncaught TypeError: this.myMethod is not a function 之类的错误

**beforecreate：**

**created：**

**beforemounted:**

**mounted:**

**beforeupdated:**

**update:**

**beforedestroyed:**

**destroyed:**



### （1）什么是vue生命周期?

Vue 实例从创建到销毁的过程，就是生命周期。也就是从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。

### （2）vue生命周期的作用是什么?

Vue生命周期中有多个事件钩子，让我们在控制整个Vue实例过程时更容易形成好的逻辑。

### （3）vue生命周期总共有几个阶段?

可以总共分为8个阶段：创建前/后, 载入前/后,更新前/后,销毁前/后。

### （4）第一次页面加载会触发哪几个钩子?

第一次页面加载时会触发 beforeCreate, created, beforeMount, mounted 这几个钩子

### （5）DOM 渲染在 哪个周期中就已经完成?

DOM 渲染在 mounted 中就已经完成了。

### （6）简单描述每个周期具体适合哪些场景?

生命周期钩子的一些使用方法：

beforecreate : 可以在此阶段加loading事件，在加载实例时触发；

created : 初始化完成时的事件写在这里，如在这结束loading事件，异步请求也适宜在这里调用；

mounted : 挂载元素，获取到DOM节点；

updated : 如果对数据统一处理，在这里写上相应函数；

beforeDestroy : 可以做一个确认停止事件的确认框；

nextTick : 更新数据后立即操作dom；

# VUE进阶(一)

```vue
//添加一个请求拦截器
axios.interceptors.request.use(function (config){
	return config;
},function (error) {
	return Promise.reject(error);
});

//添加一个响应拦截器
axios.interceptors.responese.use(function (responese){
	return responese;
},function (error){
	return 	Promise.reject(error);
})

//移除一个拦截器
var = myInterceptor = axios.interceptors.request.use(function (){ .... });
axios.interceptors.request.eject(myInterceptor);

//给自定义的axios实例添加拦截器
var instance = axios.create();
instance.interceptors.request.use(function() { ....});


```

## axios的方法和请求响应数据结构

### 请求方法别名

​	get、delete、head、post、put、patch

### 相应数据结构

​	data:{},

​	status:200?

​	statusText: 'ok'

​	headers: {}

​	config: {}

## Vuex状态管理

**state：**驱动应用的数据源。

**view：**以声明的方式将state映射到视图

**actions：**响应在vue上的用户输入导致的状态变化。

state会显示到view，用户根据view上的内容进行操作，触发actions然后在影响state的变化。



## VUE中router的钩子函数

**beforeEach**：在跳转之前执行

**to:router** 即将进入路由对象

**from**:当前导航即将离开路由

**next**:Function，进行管道中的钩子，如果执行完了，如果执行完了，当前导航的状态为confirmed(确认的)，false，即终止导航。

```vue
router.beforeEach((to,from,next)=>{

​	let token = router.app.$storage.fetch("token");

​	let needAuth = to.matched.some(iten=>item.meta.login);

​	if(!token&& needAuth) return next({

​		path: "/login";

​	next();

})

})
```

**afterEach：**在跳转之后判断

**aftereach**：不用传next（）函数。

```vue
const = router = new VueRouter({

​	routes: [

​	{

​	path: '/login',

​	component: Login,

​	beforeEnter:(to,from,next)=>{

​		//.....

},

​	beforeLeave:(to,from,next)=>{

​		//....

}

}

]})
```



```
var routes = [

{

​	path:'/home',

​	component: 'home',

​	name: 'home'

}

]
```

beforeRouteLeave(to, from, next) {
    next()
},
beforeRouteEnter(to, from, next) {
    next()
},
beforeRouteUpdate(to, from, next) {
    next()
},

## ES6的基本知识

​	**let**：(代码块)块级作用域，不存在变量提升变量声明后必须 使用，在相同作用域内，不允许重复声明。

**const**:声明一个只读常量，一旦声明不发改变，声明后必须初始化一个值，const的作用域与let相同，只在块级作用域下有效，不可重复声明，没有变量提升。

**var**：存在变量提升，作用域为该语句所在的函数内。





## Promise

**promise**对象是一个构造函数，用来生成Promise实例。

**promise**对象代表一个异步操作，有三种状态：**pending**(进行中)，**fulfiled**(已成功)、**rejected**(已失败)



**1.Promise.all**方法用于将多个Promise实例，包装成一个新的Promise实例。

var p =Promise.all([p1,p2,p3]);

Promise.all方法接受一个数组作为参数，p1,p2,p3都是Promise实例,如果不是就会先调用下面讲到的`Promise.resolve`方法，将参数转为 Promise 实例，再进一步处理。

P的状态由p1,p2,p3决定：

​	1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

　2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。



**2**.**Promise.race()**:将多个Promise实例，包装成一个新的Promise实例。

​		 var p = Promise.race([p1, p2, p3]); 

上面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。



**3.Promise.resolve()**:将现有对象转换为Promise对象。



## vue store存储commit和dispatch

this.$store.dispatch('toShowLoginDiaglog',false)

this.$store.commit('toShowLoginDoalog',false)

**区别**：dispatch：含有异步操作  写法：“`this.$store.dispatch('action方法名',值)`

​			commit:同步操作，this.$store.commit('mutations方法名',值)



## vue  路由导航

**编程式**：	**router.push(location)**,向history添加新纪录，可通过浏览器的前进后退按钮进行浏览器页面跳转。

**声明式**：`<router-link :to=""></router-link>`等同于router.push(location)

**router.replace()**:不会在history留下记录，即使点击返回按钮也不会回到这个页面，替换当前记录。



## vue中computed和method 区别

computed是属性调用，而method是函数调用;

computed带有缓存功能，而metho

## 跨域解决方式

### CORS

​	

```javascript
app.use(async (ctx, next)=> {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200; 
  } else {
    await next();
  }
})
```

### Proxy

```javascript
//方案一
amodule.exports = {
    devServer: {
        host: '127.0.0.1',
        port: 8084,
        open: true,// vue项目启动时自动打开浏览器
        proxy: {
            '/api': { // '/api'是代理标识，用于告诉node，url前面是/api的就是使用代理的
                target: "http://xxx.xxx.xx.xx:8080", //目标地址，一般是指后台服务器地址
                changeOrigin: true, //是否跨域
                pathRewrite: { // pathRewrite 的作用是把实际Request Url中的'/api'用""代替
                    '^/api': "" 
                }
            }
        }
    }
}
//通过axios发送请求中，配置请求的根路径

axios.defaults.baseURL = '/api'

//方案二
//此外，还可通过服务端实现代理请求转发
//以express框架为例

var express = require('express');
const proxy = require('http-proxy-middleware')
const app = express()
app.use(express.static(__dirname + '/'))
app.use('/api', proxy({ target: 'http://localhost:4000', changeOrigin: false
                      }));
module.exports = app
//方案三
//通过配置nginx实现代理
server {
    listen    80;
    # server_name www.josephxia.com;
    location / {
        root  /var/www/html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
    location /api {
        proxy_pass  http://127.0.0.1:3000;
        proxy_redirect   off;
        proxy_set_header  Host       $host;
        proxy_set_header  X-Real-IP     $remote_addr;
        proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
    }
}
```

### JSONP

## 权限控制

前端权限控制可以分为四个方面：

- 接口权限
- 按钮权限
- 菜单权限
- 路由权限

### 接口权限

接口权限目前一般采用`jwt`的形式来验证，没有通过的话一般返回`401`，跳转到登录页面重新进行登录

登录完拿到`token`，将`token`存起来，通过`axios`请求拦截器进行拦截，每次请求的时候头部携带`token`

```javascript
axios.interceptors.request.use(config => {
    config.headers['token'] = cookie.get('token')
    return config
})
axios.interceptors.response.use(res=>{},{response}=>{
    if (response.data.code === 40099 || response.data.code === 40098) { //token过期或者错误
        router.push('/login')
    }
})
```

### 路由权限控制

**方案一**

初始化即挂载全部路由，并且在路由上标记相应的权限信息，每次路由跳转前做校验

```javascript
const routerMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{
      path: 'page',
      component: () => import('@/views/permission/page'),
      name: 'pagePermission',
      meta: {
        title: 'pagePermission',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }, {
      path: 'directive',
      component: () => import('@/views/permission/directive'),
      name: 'directivePermission',
      meta: {
        title: 'directivePermission'
        // if do not set roles, means: this page does not require permission
      }
    }]
  }]
```

### 菜单权限

菜单权限可以理解成将页面与理由进行解耦

#### 方案一

菜单与路由分离，菜单由后端返回

前端定义路由信息

```javascript
{
    name: "login",
    path: "/login",
    component: () => import("@/pages/Login.vue")
}
```

### 按钮权限

#### 方案一

按钮权限也可以用`v-if`判断

但是如果页面过多，每个页面页面都要获取用户权限`role`和路由表里的`meta.btnPermissions`，然后再做判断

这种方式就不展开举例了

自定义权限鉴定指令

```javascript
import Vue from 'vue'
/**权限指令**/
const has = Vue.directive('has', {
    bind: function (el, binding, vnode) {
        // 获取页面按钮权限
        let btnPermissionsArr = [];
        if(binding.value){
            // 如果指令传值，获取指令参数，根据指令参数和当前登录人按钮权限做比较。
            btnPermissionsArr = Array.of(binding.value);
        }else{
            // 否则获取路由中的参数，根据路由的btnPermissionsArr和当前登录人按钮权限做比较。
            btnPermissionsArr = vnode.context.$route.meta.btnPermissions;
        }
        if (!Vue.prototype.$_has(btnPermissionsArr)) {
            el.parentNode.removeChild(el);
        }
    }
});
// 权限检查方法
Vue.prototype.$_has = function (value) {
    let isExist = false;
    // 获取用户按钮权限
    let btnPermissionsStr = sessionStorage.getItem("btnPermissions");
    if (btnPermissionsStr == undefined || btnPermissionsStr == null) {
        return false;
    }
    if (value.indexOf(btnPermissionsStr) > -1) {
        isExist = true;
    }
    return isExist;
};
export {has}
```

## Vue常用修饰符和应用场景

`vue`中修饰符分为以下五种：

- 表单修饰符
- 事件修饰符
- 鼠标按键修饰符
- 键值修饰符
- v-bind修饰符

### 二、修饰符的作用

#### 表单修饰符

在我们填写表单的时候用得最多的是`input`标签，指令用得最多的是`v-model`

关于表单的修饰符有如下：

- lazy
- trim
- number

#### lazy

在我们填完信息，光标离开标签的时候，才会将值赋予给`value`，也就是在`change`事件之后再进行信息同步

```javascript
<input type="text" v-model.lazy="value"> <p>{{value}}</p>
```

#### trim

自动过滤用户输入的首空格字符，而中间的空格不会过滤

```javascript
<input type="text" v-model.trim="value">
```

#### number

自动将用户的输入值转为数值类型，但如果这个值无法被`parseFloat`解析，则会返回原来的值

```javascript
<input v-model.number="age" type="number">
```

### 事件修饰符

事件修饰符是对事件捕获以及目标进行了处理，有如下修饰符：

- stop
- prevent
- self
- once
- capture
- passive
- native

#### stop

阻止了事件冒泡，相当于调用了`event.stopPropagation`方法

```javascript
<div @click="shout(2)">
  <button @click.stop="shout(1)">ok</button>
</div>
//只输出1
```

#### prevent

阻止了事件的默认行为，相当于调用了`event.preventDefault`方法

```javascript
<form v-on:submit.prevent="onSubmit"></form>
```

#### self

只当在 `event.target` 是当前元素自身时触发处理函数

```javascript
<div v-on:click.self="doThat">...</div>
```

#### once

绑定了事件以后只能触发一次，第二次就不会触发

```javascript
<button @click.once="shout(1)">ok</button>
```

#### capture

使事件触发从包含这个元素的顶层开始往下触发

```javascript
<div @click.capture="shout(1)">
    obj1
<div @click.capture="shout(2)">
    obj2
<div @click="shout(3)">
    obj3
<div @click="shout(4)">
    obj4
</div>
</div>
</div>
</div>
// 输出结构: 1 2 4 3 
```

#### passive

在移动端，当我们在监听元素滚动事件的时候，会一直触发`onscroll`事件会让我们的网页变卡，因此我们使用这个修饰符的时候，相当于给`onscroll`事件整了一个`.lazy`修饰符

```javascript
<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
```

#### native

让组件变成像`html`内置标签那样监听根元素的原生事件，否则组件上使用 `v-on` 只会监听自定义事件

```javascript
<my-component v-on:click.native="doSomething"></my-component>
```

### 鼠标按钮修饰符

鼠标按钮修饰符针对的就是左键、右键、中键点击，有如下：

- left 左键点击
- right 右键点击
- middle 中键点击

```javascript
<button @click.left="shout(1)">ok</button> <button @click.right="shout(1)">ok</button> <button @click.middle="shout(1)">ok</button>
```

键盘修饰符是用来修饰键盘事件（`onkeyup`，`onkeydown`）的，有如下：

`keyCode`存在很多，但`vue`为我们提供了别名，分为以下两种：

- 普通键（enter、tab、delete、space、esc、up...）
- 系统修饰键（ctrl、alt、meta、shift...）

```javascript
// 只有按键为keyCode的时候才触发
<input type="text" @keyup.keyCode="shout()">
    
//还可以通过以下方式自定义一些全局的键盘码别名
Vue.config.keyCodes.f2 = 113
```

### v-bind修饰符

v-bind修饰符主要是为属性进行操作，用来分别有如下：

- async
- prop
- camel

#### async

能对`props`进行一个双向绑定

```javascript
//父组件
<comp :myMessage.sync="bar"></comp> 
//子组件
this.$emit('update:myMessage',params);
//以上这种方法相当于以下的简写
//父亲组件
<comp :myMessage="bar" @update:myMessage="func"></comp>
func(e){
 this.bar = e;
}
//子组件js
func2(){
  this.$emit('update:myMessage',params);
}
```



