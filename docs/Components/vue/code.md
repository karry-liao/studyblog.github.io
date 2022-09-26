## 一、数据驱动

**VUE**:本质上就是一个用 Function 实现的 Class，然后它的原型 prototype 以及它本身都扩展了一系列的方法和属性.

**Vue.js** 一个<u>核心思想</u>是**数据驱动**。所谓数据驱动，是指视图是由数据驱动生成的，我们对视图的修改，不会直接操作 DOM，而是通过修改数据。相比我们传统的前端开发，如使用 jQuery 等前端库直接修改 DOM，大大简化了代码量。特别是当交互复杂的时候，只关心数据的修改会让代码的逻辑变的非常清晰，因为 DOM 变成了数据的映射，我们所有的逻辑都是对数据的修改，而不用碰触 DOM，这样的代码非常利于维护。

## 二、vue初始化

### 		
**`Vue`** 只能通过 new 关键字初始化，然后会调用 `this._init` 方法， 该方法在 `src/core/instance/init.js` 中定义。

### 		
Vue 初始化主要就干了几件事情，合并配置，初始化生命周期，初始化事件中心，初始化渲染，初始化 data、props、computed、watcher 等等。

## 三、mount 挂载

​		通过$mount实例方法去挂载vm，`$mount` 方法支持传入 2 个参数，第一个是 `el`，它表示挂载的元素，可以是字符串，也可以是 DOM 对象，如果是字符串在浏览器环境下会调用 `query` 方法转换成 DOM 对象的。第二个参数是和服务端渲染相关，在浏览器环境下我们不需要传第二个参数。`$mount` 方法实际上会去调用 `mountComponent` 方法，mountComponent 核心就是先实例化一个渲染`Watcher`，在它的回调函数中会调用 `updateComponent` 方法，在此方法中调用 `vm._render` 方法先生成虚拟 Node，最终调用 `vm._update` 更新 DOM。

<img src="https://i.bmp.ovh/imgs/2022/04/24/2a1534b5e777c3a7.png" width="100%"/>

## 四、组件化

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

## 六、Diff算法

​		`diff` 算法是一种通过同层的树节点进行比较的高效算法

其有两个特点：

- 比较只会在同层级进行, 不会跨层级比较
- 在diff比较的过程中，循环从两边向中间比较

当数据发生改变时，`set`方法会调用`Dep.notify`通知所有订阅者`Watcher`，订阅者就会调用`patch`给真实的`DOM`打补丁，更新相应的视图

```javascript
function patch(oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) { // 没有新节点，直接执行destory钩子函数
        if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
        return
    }

    let isInitialPatch = false
    const insertedVnodeQueue = []

    if (isUndef(oldVnode)) {
        isInitialPatch = true
        createElm(vnode, insertedVnodeQueue) // 没有旧节点，直接用新节点生成dom元素
    } else {
        const isRealElement = isDef(oldVnode.nodeType)
        if (!isRealElement && sameVnode(oldVnode, vnode)) {
            // 判断旧节点和新节点自身一样，一致执行patchVnode
            patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)
        } else {
            // 否则直接销毁及旧节点，根据新节点生成dom元素
            if (isRealElement) {

                if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
                    oldVnode.removeAttribute(SSR_ATTR)
                    hydrating = true
                }
                if (isTrue(hydrating)) {
                    if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                        invokeInsertHook(vnode, insertedVnodeQueue, true)
                        return oldVnode
                    }
                }
                oldVnode = emptyNodeAt(oldVnode)
            }
            return vnode.elm
        }
    }
}
```

`patch`函数前两个参数位为`oldVnode` 和 `Vnode` ，分别代表新的节点和之前的旧节点，主要做了四个判断：

- 没有新节点，直接触发旧节点的`destory`钩子
- 没有旧节点，说明是页面刚开始初始化的时候，此时，根本不需要比较了，直接全是新建，所以只调用 `createElm`
- 旧节点和新节点自身一样，通过 `sameVnode` 判断节点是否一样，一样时，直接调用 `patchVnode `去处理这两个节点
- 旧节点和新节点自身不一样，当两个节点不一样的时候，直接创建新节点，删除旧节点



- 当数据发生改变时，订阅者`watcher`就会调用`patch`给真实的`DOM`打补丁

- 通过`isSameVnode`进行判断，相同则调用`patchVnode`方法

- ```
  patchVnode
  ```

  做了以下操作：

  - 找到对应的真实`dom`，称为`el`
  - 如果都有都有文本节点且不相等，将`el`文本节点设置为`Vnode`的文本节点
  - 如果`oldVnode`有子节点而`VNode`没有，则删除`el`子节点
  - 如果`oldVnode`没有子节点而`VNode`有，则将`VNode`的子节点真实化后添加到`el`
  - 如果两者都有子节点，则执行`updateChildren`函数比较子节点

- ```
  updateChildren
  ```

  主要做了以下操作：

  - 设置新旧`VNode`的头尾指针
  - 新旧头尾指针进行比较，循环向中间靠拢，根据情况调用`patchVnode`进行`patch`重复流程、调用`createElem`创建一个新节点，从哈希表寻找 `key`一致的`VNode` 节点再分情况操作

## 七、Vue模板是如何编译的

```javascript
new Vue({  render: h => h(App) })
```

render 函数是怎么来的有两种方式

- 第一种就是经过模板编译生成 render 函数
- 第二种是我们自己在组件里定义了 render 函数，这种会跳过模板编译的过程

## 八、模板编译 <template></template>

​		这个是模板，不是真实的 HTML，浏览器是不认识模板的，所以我们需要把它编译成浏览器认识的原生的 HTML

1. 提取出模板中的原生 HTML 和非原生 HTML，比如绑定的属性、事件、指令等等
2. 经过一些处理生成 render 函数
3. render 函数再将模板内容生成对应的 vnode
4. 再经过 patch 过程( Diff )得到要渲染到视图中的 vnode
5. 最后根据 vnode 创建真实的 DOM 节点，也就是原生 HTML 插入到视图中，完成渲染

## 九、Vue中style标签中的scoped是如何工作的

1. 每个组件都会拥有一个`[data-v-hash:8]`插入HTML标签，子组件标签上也具体父组件`[data-v-hash:8]`;
2. 如果style标签加了`scoped属性`，里面的选择器都会变成`(Attribute Selector) [data-v-hash:8]`;
3. 如果子组件选择器跟父组件选择器完全一样，那么就会出现子组件样式被父组件覆盖，因为`子组件会优先于父组件mounted`，有兴趣可以测试一下哦。

```javascript
"scripts": {  
    "debug": "node --inspect-brk ./node_modules/webpack/bin/webpack.js"  
 },
```

## 十、Vue3怎么设置全局变量

**方法一**    config.globalProperties

`vue2.x`挂载全局是使用 `Vue.prototype.$xxxx=xxx` 的形式来挂载，然后通过 `this.$xxx`来获取挂载到全局的变量或者方法。

这在 `Vue 3` 中，就等同于 `config.globalProperties`。这些 `property` 将被复制到应用中作为实例化组件的一部分

```javascript
// 之前 (Vue 2.x)
Vue.prototype.$http = () => {}

// 之后 (Vue 3.x)
const app = createApp({})
app.config.globalProperties.$http = () => {}
```

**方法二    Provide/Inject**

vue3新的 `provide/inject` 功能可以穿透多层组件，实现数据从父组件传递到子组件。

可以将全局变量放在根组件的 `provide` 中，这样所有的组件都能使用到这个变量。

如果需要变量是响应式的，就需要在 `provide` 的时候使用 `ref` 或者 `reactive` 包装变量。

## 十一、刷新浏览器后，Vuex的数据是否存在？如何解决？

在vue项目中用vuex来做全局的状态管理， 发现当刷新网页后，保存在vuex实例store里的数据会丢失。

原因：因为 `store` 里的数据是保存在运行内存中的，当页面刷新时，页面会重新加载vue实例，store里面的数据就会被重新赋值初始化。

我们有两种方法解决该问题：

1. 使用 `vuex-along`
2. 使用 `localStorage` 或者 `sessionStroage`

### vuex-along的使用方法

```javascript
//先执行npm install vuex-along --save

//配置 `vuex-along`: 在 `store/index.js` 中最后添加以下代码:

import VueXAlong from 'vuex-along' //导入插件
export default new Vuex.Store({
    //modules: {
        //controler  //模块化vuex
    //},
    plugins: [VueXAlong({
        name: 'store',     //存放在localStroage或者sessionStroage 中的名字
        local: false,      //是否存放在local中  false 不存放 如果存放按照下面session的配置
        session: { list: [], isFilter: true } //如果值不为false 那么可以传递对象 其中 当isFilter设置为true时， list 数组中的值就会被过滤调,这些值不会存放在seesion或者local中
    })]
});
```

## 使用 `localStorage` 或者 `sessionStroage`

```javascript
created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
},
```

## 十二、Vite

```javascript
//创建vite项目
$ npm create vite@latest

{
  "scripts": {
    "dev": "vite", // 启动开发服务器，别名：`vite dev`，`vite serve`
    "build": "vite build", // 为生产环境构建产物
    "preview": "vite preview" // 本地预览生产构建产物
  }
}
```

## 十三、Vue中$route和$router有什么区别

### this.$router

是 router 实例,通过 `this.$router` 访问路由器,相当于获取了整个路由文件，在`$router.option.routes`中，或查看到当前项目的整个路由结构 具有实例方法

```javascript
// 导航守卫
router.beforeEach((to, from, next) => {
  /* 必须调用 `next` */
})
router.beforeResolve((to, from, next) => {
  /* 必须调用 `next` */
})
router.afterEach((to, from) => {})

// 动态导航到新路由
router.push
router.replace
router.go
router.back
router.forward
```

### this.$route

当前激活的路由信息对象。这个属性是只读的，里面的属性是 immutable (不可变) 的，不过可以 watch (监测变化) 它。

通过 `this.$route` 访问的是当前路由，获取和当前路由有关的信息

```javascript
fullPath: ""  // 当前路由完整路径，包含查询参数和 hash 的完整路径
hash: "" // 当前路由的 hash 值 (锚点)
matched: [] // 包含当前路由的所有嵌套路径片段的路由记录 
meta: {} // 路由文件中自赋值的meta信息
name: "" // 路由名称
params: {}  // 一个 key/value 对象，包含了动态片段和全匹配片段就是一个空对象。
path: ""  // 字符串，对应当前路由的路径
query: {}  // 一个 key/value 对象，表示 URL 查询参数。跟随在路径后用'?'带的参数
```

## 十四、Vue3响应式的使用

本文带大家从头开始学习如何实现简单版 Vue 3 响应式，实现了 Vue3 Reactivity 中的核心方法（ `effect` / `track` / `trigger` / `computed` /`ref` 等方法

通常我们有三种方法读取一个对象的属性：

1. 使用 `.` 操作符：`leo.name` ；
2. 使用 `[]` ： `leo['name']` ；
3. 使用 `Reflect` API： `Reflect.get(leo, 'name')` 。

**Proxy** 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。语法如下：

```javascript
const p = new Proxy(target, handler)
```

- target : 要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
- handler : 一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 `p` 的行为。

### 引入 ref 方法

```javascript
const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

**使用 `rective` 函数**

```javascript
const ref = intialValue => reactive({value: intialValue});
```

**使用对象的属性访问器（计算属性）**

```javascript
const ref = raw => {
  const r = {
    get value(){
      track(r, 'value');
      return raw;
    },

    set value(newVal){
        raw = newVal;
      trigger(r, 'value');
    }
  }
  return r;
}
```

### 使用方式

```javascript
let product = reactive({ price: 10, quantity: 2 });
let total = 0, salePrice = ref(0);
effect(() => {
    salePrice.value = product.price * 0.9
});
effect(() => {
    total = salePrice.value * product.quantity
});
console.log(total, salePrice.value); // 18 9
product.quantity = 5;
console.log(total, salePrice.value); // 45 9
product.price = 20;
console.log(total, salePrice.value); // 90 18
```

### 实现简易 Computed 方法

```javascript
const computed = getter => {
    let result = ref();
    effect(() => result.value = getter());
    return result;
}

let product = reactive({ price: 10, quantity: 2 });
let salePrice = computed(() => {
    return product.price * 0.9;
})
let total = computed(() => {
    return salePrice.value * product.quantity;
})

console.log(total.value, salePrice.value);
product.quantity = 5;
console.log(total.value, salePrice.value);
product.price = 20;
console.log(total.value, salePrice.value);
```

## 十五、history和hash模式的区别

### hash 模式

hash 模式是一种把前端路由的路径用井号 `#` 拼接在真实 URL 后面的模式。当井号 `#` 后面的路径发生变化时，浏览器并不会重新发起请求，而是会触发 `hashchange` 事件。hash模式兼容性比较好。

```javascript
<a href="#/a">A页面</a>
<a href="#/b">B页面</a>
<div id="app"></div>
<script>
  function render() {
    app.innerHTML = window.location.hash
  }
  window.addEventListener('hashchange', render)
  render()
</script>
```

### history 模式

history API 是 H5 提供的新特性，允许开发者直接更改前端路由，即更新浏览器 URL 地址而不重新发起请求。兼容性不如 hash，且需要服务端支持，否则一刷新页面就404了，

```javascript
<a href="javascript:toA();">A页面</a>
<a href="javascript:toB();">B页面</a>
<div id="app"></div>
<script>
  function render() {
    app.innerHTML = window.location.pathname
  }
  function toA() {
    history.pushState({}, null, '/a')
    render()
  }
  function toB() {
    history.pushState({}, null, '/b')
    render()
  }
  window.addEventListener('popstate', render)
</script>

history.replaceState({}, null, '/b') // 替换路由
history.pushState({}, null, '/a') // 路由压栈
history.back() // 返回
history.forward() // 前进
history.go(-2) // 后退2次
```

## 十六、VNode有哪些属性

1. __v_isVNode: true，内部属性，表示为Vnode
2. __v_skip: true，内部属性，表示跳过响应式转换，Reactive转换时会根据此属性进行判断
3. isCompatRoot?: *true*，用于是否做了兼容处理的判断
4. type: VNodeTypes，虚拟节点的类型
5. props: (VNodeProps & ExtraProps) | *null*，虚拟节点的props
6. key: *string* | *number* | *null*，虚拟阶段的key，可用于diff
7. ref: VNodeNormalizedRef | *null*，虚拟阶段的引用
8. children: VNodeNormalizedChildren，子节点
9. component: ComponentInternalInstance | null，组件实例
10. scopeId: *string* | *null*，仅限于SFC(单文件组件)，在设置currentRenderingInstance当前渲染实例时，一期设置
11. slotScopeIds: *string*[] | *null*，仅限于单文件组件，与单文件组件的插槽有关
12. transition: TransitionHooks | null，TransitionHooks
13. dirs: DirectiveBinding[] | null，当前Vnode绑定的指令

## 十七、Vue2.0为什么不能检查数组的变化

​		**Vue检测数据的变动是通过Object.defineProperty实现的，所以无法监听数组的添加操作是可以理解的，因为是在构造函数中就已经为所有属性做了这个检测绑定操作。无法检测通过索引改变数组的操作。即vm.items[indexOfItem] = newValue？**

​		Vue对数组的7个变异方法（push、pop、shift、unshift、splice、sort、reverse）实现了响应式。这里就不做测试了。

​		对于对象而言，每一次的数据变更都会对对象的属性进行一次枚举，一般对象本身的属性数量有限，所以对于遍历枚举等方式产生的性能损耗可以忽略不计，但是对于数组而言呢？数组包含的元素量是可能达到成千上万，假设对于每一次数组元素的更新都触发了枚举/遍历，其带来的性能损耗将与获得的用户体验不成正比，故vue无法检测数组的变动。Vue3.0用proxy代替了```defineProperty```之后就解决了这个问题。

### 解决方案

#### 		数组

```javascript
//1.这是个深度的修改，某些情况下可能导致你不希望的结果，因此最好还是慎用
this.dataArr = this.originArr
this.$set(this.dataArr, 0, {data: '修改第一个元素'})
console.log(this.dataArr)        
console.log(this.originArr)  //同样的 源数组也会被修改 在某些情况下会导致你不希望的结果 
this.$set(array, index, data)
//2.splice
splice（）
//3.利用临时变量进行中转
let tempArr = [...this.targetArr]
tempArr[0] = {data: 'test'}
this.targetArr = tempArr
```

#### 		对象

```javascript
//this.$set(obj, key ,value) - 可实现增、改
//watch时添加deep：true深度监听，只能监听到属性值的变化，新增、删除属性无法监听
this.$watch('blog', this.getCatalog, {
    deep: true
    // immediate: true // 是否第一次触发
  });
//watch时直接监听某个key
watch: {
  'obj.name'(curVal, oldVal) {
    // TODO
  }
}
```

## 十八、Vue页面渲染流程

`_render` 开始构建 `VNode`，核心方法为 `createElement`，一般会创建普通的 `VNode` ，遇到组件就创建组件类型的 `VNode`，否则就是未知标签的 `VNode`，构建完成传递给 `_update`。

`patch` 阶段根据 `VNode` 创建真实节点树，核心方法为 `createElm`，首先遇到组件类型的 `VNode`，内部会执行 `$mount`，再走一遍相同的流程。普通节点类型则创建一个真实节点，如果它有子节点开始递归调用 `createElm`，使用 `insert` 插入子节点，直到没有子节点就填充内容节点。最后递归完成后，同样也是使用 `insert` 将整个节点树插入到页面中，再将旧的根节点移除。

## 十九、React与Vue区别

React 是由Facebook创建的JavaScript UI框架，React推广了 Virtual DOM( 虚拟 DOM )并创造了 JSX 语法。JSX 语法的出现允许我们在 javascript 中书写 HTML 代码。

VUE 是由尤雨溪开发的，VUE 使用了模板系统而不是JSX，因其实模板系统都是用的普通的 HTML，所以对应用的升级更方便、更容易，而不需要整体重构。

VUE 相较于 React 更容易上手，如果是一个有一定开发经验的开发者，甚至都不需要花额外的时间去学习，直接一遍开发一遍查文挡即可。

React 整体是函数式的思想，在 React 中是单向数据流，推崇结合 immutable 来实现数据不可变。

而 Vue 的思想是响应式的，也就是基于是数据可变的，通过对每一个属性建立 Watcher 来监听，当属性变化的时候，响应式的更新对应的虚拟 DOM。

如上，所以 React 的性能优化需要手动去做，而Vue的性能优化是自动的，但是Vue的响应式机制也有问题，就是当 state 特别多的时候，Watcher 会很多，会导致卡顿。

## 二十、computed和watch的区别

### computed

​		计算属性基于 data 中声明过或者父组件传递的 props 中的数据通过计算得到的一个**新值**，这个新值只会根据已知值的变化而变化，简言之：这个属性依赖其他属性，由**其他属性计算而来**的。具有缓存的特性，只有**依赖型数据**发生**改变**，computed 才会重新计算。如果 computed 属性值是一个函数，那么默认会走 get 方法，必须要有一个返回值，函数的返回值就是属性的属性值。计算属性定义了 fullName 并返回对应的结果给这个变量，变量不可被重复定义和赋值。

**计算属性的高级**

在computed 中的属性都有一个 **get** 和一个 **set** 方法，当数据变化时，调用 set 方法。下面我们通过计算属性的 getter/setter 方法来实现对属性数据的显示和监视，即双向绑定。

```javascript
computed: {
    fullName: {
        get() { //读取当前属性值的回调，根据相关的数据计算并返回当前属性的值
            return this.firstName + ' ' + this.lastName
        },
        set(val) { // 当属性值发生改变时回调，更新相关的属性数据，val就是fullName的最新属性值
            const names = val ? val.split(' ') : [];
            this.firstName = names[0]
            this.lastName = names[1]
        }
    }
}
```

### **watch 监听属性**

​		通过 vm 对象的 $watch() 或 watch 配置来监听 Vue 实例上的属性变化，或某些特定数据的变化，然后执行某些具体的业务逻辑操作。当属性变化时，回调函数自动调用，在函数内部进行计算。其可以监听的数据来源：data，props，computed 内的数据。

 		监听函数有两个参数，第一个参数是最新的值，第二个参数是输入之前的值，顺序一定是**新值，旧值**，如果只写一个参数，那就是最新属性值

​		当需要在数据变化时执行异步或开销较大的操作时，watch方式是最有用的。所以 watch 一定是**支持异步**的。

​        deep: true    深度监听对象内部值的变化，可以在选项参数中指定，注意监听数组的变更不需要这么做。

### 总结：

#### **computed**

- 初始化显示或者相关的 data、props 等属性数据发生变化的时候调用；
- 计算属性不在 data 中，它是基于data 或 props 中的数据通过计算得到的一个新值，这个新值根据已知值的变化而变化；
- 在 computed 属性对象中定义计算属性的方法，和取data对象里的数据属性一样，以属性访问的形式调用；
- 如果 computed 属性值是函数，那么默认会走 get 方法，必须要有一个返回值，函数的返回值就是属性的属性值；
- computed 属性值默认会**缓存**计算结果，在重复的调用中，只要依赖数据不变，直接取缓存中的计算结果，只有**依赖型数据**发生**改变**，computed 才会重新计算；
- 在computed中的，属性都有一个 get 和一个 set 方法，当数据变化时，调用 set 方法。

#### **watch**

- 主要用来监听某些特定数据的变化，从而进行某些具体的业务逻辑操作，可以看作是 computed 和 methods 的结合体；
- 可以监听的数据来源：data，props，computed内的数据；
- watch**支持异步**；
- **不支持缓存**，监听的数据改变，直接会触发相应的操作；
- 监听函数有两个参数，第一个参数是最新的值，第二个参数是输入之前的值，顺序一定是新值，旧值。

## 二十一、Vue-Loader

```
使用 vue-loader 的之前， 我们需要安装一些必要的 loader。。

必需的 loader 包括：vue-loader、vue-style-loader、vue-template-compiler、css-loader。 可能需要的 loader 包含：sass-loader、less-loader、url-loader 等。
```

一个包含 **vue-loader** 的简单 **webpack配置** 如下：

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader')
const isProduction = process.env.NODE_ENV === 'production'
const extractLoader = {
    loader: MiniCssExtractPlugin.loader,
    options: {
        publicPath: '../',
        hmr: process.env.NODE_ENV === 'development'
    },
}
const cssExtractplugin = new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
    ignoreOrder: false
})
const webpackConfig = {
    entry: {...},
    output: {...},
    optimization: {...},
    resolve: {...},
    modules: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.css$/,
            oneOf: [{
                resourceQuery: /\?vue/,
                use: [isProduction ? extractLoader  : 'vue-style-loader', 'css-loader']
            }, {
                use: [isProduction ? extractLoader  : 'style-loader', 'css-loader']
            }]
        },
        ...
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        isProduction ? cssExtractplugin : ''
    ]

}

```

### vue-loader 工作原理

​		通过vue-loader，webpack可以将.vue文件转化为浏览器可识别的javascript。

**vue-loader** 的工作流程， 简单来说，分为以下几个步骤:

1. 将一个 **.vue 文件** 切割成 **template**、**script**、**styles** 三个部分。
2. **template 部分** 通过 **compile** 生成 **render**、 **staticRenderFns**。
3. 获取 **script 部分** 返回的配置项对象 **scriptExports**。
4. **styles 部分**，会通过 **css-loader**、**vue-style-loader**， 添加到 **head** 中， 或者通过 **css-loader**、**MiniCssExtractPlugin** 提取到一个 **公共的css文件** 中。
5. 使用 **vue-loader** 提供的 **normalizeComponent** 方法， **合并 scriptExports、render、staticRenderFns**， 返回 **构建vue组件需要的配置项对象 - options**， 即 **{data, props, methods, render, staticRenderFns...}**。

**css scoped** 的 **工作流程** 如下:

1. 使用 **vue-loader** 处理 **.vue** 文件， 根据 **.vue 文件** 的 **请求路径** 和 **文件内容**， 生成 **.vue 文件** 的 **hash** 值, 如：**7ba5bd90**；
2. 如果 **.vue 文件** 的 **某一个 style 标签** 有 **scoped** 属性， 为 **.vue 文件** 生成一个 **scopedId**，**scopedId** 的格式为 **data-v-hash**， 如：**data-v-7ba5bd90**；
3. 使用 **vue-loader** 从 **.vue 文件** 中获取 **style区域块(scoped)** 的 **样式内容(字符串)\**；如果使用了 \**less** 或者 **sass**， 要使用 **less-loader** 或者 **sass-loader** 处理 **样式内容**，使 **样式内容** 变为 **浏览器可识别的css样式**； 然后使用 **PostCSS** 提供的 **parser** 处理 **样式内容**， 为 **样式内容** 中的每一个 **css选择器** 添加 **[data-v-hash]\**； 再使用 \**css-loader**；最后使用 **style-loader** 把 **css 样式** 添加到 **head** 中或者通过 **miniCssExtractPlugin** 将 **css 样式** 提取一个公共的 **css** 文件中。
4. 通过 **normalizer** 方法返回 **完整的组件配置项 options**， **options** 中有属性 **_scopeId**, 如 **_scopedId: data-v-7ba5bd90**;
5. 使用 **组件配置项 options** 构建组件实例， 给 **组件** 中每一个 **dom元素** 添加属性: **data-v-hash**。

### CSS Modules

我们也可以在 .vue 文件 的 style 标签 上添加 module 属性， 使得 style 标签 中的 样式 变为 组件私有，具体使用方法详见 - 官网。

**css scoped** 的实质是利用 **css属性选择器** 使得 **样式** 称为 **局部样式**，而 **css modules** 的实质是让 **样式的类名、id名唯一** 使得 **样式** 称为 **局部样式**。

使用 **vue-loader** 处理 **.vue** 文件， 将 **.vue 文件内容** 转化为 **js 代码**。 如果 **.vue 文件** 中的 **style 标签** 中有 **module** 属性， 向 **js 代码** 中注入一个 **injectStyle** 方法

## 二十二、自定义指令

### 输入框防抖

```javascript
// 1.设置v-debounce自定义指令
Vue.directive('debounce', {
  bind: (el, binding) => {
    let debounceTime = binding.value; // 防抖时间
    if (!debounceTime) { // 用户若不设置防抖时间，则默认2s
      debounceTime = 2000;
    }
    let cbFun;
    el.addEventListener('click', event => {
      if (!cbFun) { // 第一次执行
        cbFun = setTimeout(() => {
          cbFun = null;
        }, debounceTime);
      } else {
        event && event.stopImmediatePropagation();
      }
    }, true);
  },
});
// 2.为button标签设置v-debounce自定义指令
<button @click="sayHello" v-debounce>提交</button>
```

### 图片懒加载

```javascript
const LazyLoad = {
    // install方法
    install(Vue,options){
          // 代替图片的loading图
        let defaultSrc = options.default;
        Vue.directive('lazy',{
            bind(el,binding){
                LazyLoad.init(el,binding.value,defaultSrc);
            },
            inserted(el){
                // 兼容处理
                if('IntersectionObserver' in window){
                    LazyLoad.observe(el);
                }else{
                    LazyLoad.listenerScroll(el);
                }

            },
        })
    },
    // 初始化
    init(el,val,def){
        // data-src 储存真实src
        el.setAttribute('data-src',val);
        // 设置src为loading图
        el.setAttribute('src',def);
    },
    // 利用IntersectionObserver监听el
    observe(el){
        let io = new IntersectionObserver(entries => {
            let realSrc = el.dataset.src;
            if(entries[0].isIntersecting){
                if(realSrc){
                    el.src = realSrc;
                    el.removeAttribute('data-src');
                }
            }
        });
        io.observe(el);
    },
    // 监听scroll事件
    listenerScroll(el){
        let handler = LazyLoad.throttle(LazyLoad.load,300);
        LazyLoad.load(el);
        window.addEventListener('scroll',() => {
            handler(el);
        });
    },
    // 加载真实图片
    load(el){
        let windowHeight = document.documentElement.clientHeight
        let elTop = el.getBoundingClientRect().top;
        let elBtm = el.getBoundingClientRect().bottom;
        let realSrc = el.dataset.src;
        if(elTop - windowHeight<0&&elBtm > 0){
            if(realSrc){
                el.src = realSrc;
                el.removeAttribute('data-src');
            }
        }
    },
    // 节流
    throttle(fn,delay){
        let timer; 
        let prevTime;
        return function(...args){
            let currTime = Date.now();
            let context = this;
            if(!prevTime) prevTime = currTime;
            clearTimeout(timer);

            if(currTime - prevTime > delay){
                prevTime = currTime;
                fn.apply(context,args);
                clearTimeout(timer);
                return;
            }

            timer = setTimeout(function(){
                prevTime = Date.now();
                timer = null;
                fn.apply(context,args);
            },delay);
        }
    }

}
export default LazyLoad;
```

### 一键 Copy的功能

```javascript
import { Message } from 'ant-design-vue';

const vCopy = { //
  /*
    bind 钩子函数，第一次绑定时调用，可以在这里做初始化设置
    el: 作用的 dom 对象
    value: 传给指令的值，也就是我们要 copy 的值
  */
  bind(el, { value }) {
    el.$value = value; // 用一个全局属性来存传进来的值，因为这个值在别的钩子函数里还会用到
    el.handler = () => {
      if (!el.$value) {
      // 值为空的时候，给出提示，我这里的提示是用的 ant-design-vue 的提示，你们随意
        Message.warning('无复制内容');
        return;
      }
      // 动态创建 textarea 标签
      const textarea = document.createElement('textarea');
      // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
      textarea.readOnly = 'readonly';
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      // 将要 copy 的值赋给 textarea 标签的 value 属性
      textarea.value = el.$value;
      // 将 textarea 插入到 body 中
      document.body.appendChild(textarea);
      // 选中值并复制
      textarea.select();
      // textarea.setSelectionRange(0, textarea.value.length);
      const result = document.execCommand('Copy');
      if (result) {
        Message.success('复制成功');
      }
      document.body.removeChild(textarea);
    };
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', el.handler);
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el, { value }) {
    el.$value = value;
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el) {
    el.removeEventListener('click', el.handler);
  },
};

export default vCopy;
```

关于自定义组件还有很多应用场景，如：拖拽指令、页面水印、权限校验等等应用场景