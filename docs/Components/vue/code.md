# 一、数据驱动

**VUE**:本质上就是一个用 Function 实现的 Class，然后它的原型 prototype 以及它本身都扩展了一系列的方法和属性.

**Vue.js** 一个<u>核心思想</u>是**数据驱动**。所谓数据驱动，是指视图是由数据驱动生成的，我们对视图的修改，不会直接操作 DOM，而是通过修改数据。相比我们传统的前端开发，如使用 jQuery 等前端库直接修改 DOM，大大简化了代码量。特别是当交互复杂的时候，只关心数据的修改会让代码的逻辑变的非常清晰，因为 DOM 变成了数据的映射，我们所有的逻辑都是对数据的修改，而不用碰触 DOM，这样的代码非常利于维护。

# 二、vue初始化

### 		
**`Vue`** 只能通过 new 关键字初始化，然后会调用 `this._init` 方法， 该方法在 `src/core/instance/init.js` 中定义。

### 		
Vue 初始化主要就干了几件事情，合并配置，初始化生命周期，初始化事件中心，初始化渲染，初始化 data、props、computed、watcher 等等。

# 三、mount 挂载

​		通过$mount实例方法去挂载vm，`$mount` 方法支持传入 2 个参数，第一个是 `el`，它表示挂载的元素，可以是字符串，也可以是 DOM 对象，如果是字符串在浏览器环境下会调用 `query` 方法转换成 DOM 对象的。第二个参数是和服务端渲染相关，在浏览器环境下我们不需要传第二个参数。`$mount` 方法实际上会去调用 `mountComponent` 方法，mountComponent 核心就是先实例化一个渲染`Watcher`，在它的回调函数中会调用 `updateComponent` 方法，在此方法中调用 `vm._render` 方法先生成虚拟 Node，最终调用 `vm._update` 更新 DOM。

<img src="https://i.bmp.ovh/imgs/2022/04/24/2a1534b5e777c3a7.png" width="100%"/>

# 四、组件化

​		构造子类构造函数，安装组件钩子函数和实例化 `vnode`。

​		`createComponent` 的实现，了解到它在渲染一个组件的时候的 3 个关键逻辑：**构造子类构造函数，安装组件钩子函数和实例化 `vnode`**。`createComponent` 后返回的是组件 `vnode`，它也一样走到 `vm._update` 方法，进而执行了 `patch` 函数，执行 `vm.__patch__` 去把 VNode 转换成真正的 DOM 节点

## 五、如何让数据变得可观测？

```javascript
let obj = {}
let val = 20
Object.defineProperty(obj,"age",{
	get(){
		console.log('age属性被读取了')
		return value
	},
	set(newvalue){
	val = newvalue
	console.log('age属性被修改了',newvalue)
	}
})
```

//_Observe类

```javascript
Module.export class Observe{
	constructor(value){
	this.value = value
	if(Array.isArray(value)){
	}else{
        this.walk(value)
	}
	walk(obj){
		const keys = Object.keys(Obj)
        for(let i=0; i < keys.length; i++){
            definReactive(obj,keys[i])
        }
	}
}
function defineReactive(obj,key,val){
    if(arguments.length ===2){
        val = obj[key]
    }
    if(typeof val === 'object'){
        new Observe
    }
Object.defineProperty(obj,"age",{
	get(){
		console.log(`${key}属性被读取了`)
		return value
	},
	set(newvalue){
	val = newvalue
	console.log(`${newvalue}属性被修改了`,newvalue)
	}
})
}
```

