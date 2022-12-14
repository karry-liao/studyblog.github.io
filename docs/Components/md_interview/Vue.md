## 一、何为MVVM？

映射关系简化，隐藏controller MVVM在mvc基础上，把控制层隐藏掉了

Vue不是一个MVVM框架，他是一个视图层框架。

ViewModal是一个桥梁，将数据和视图进行关联。

## 二、Vue中响应式数据的理解

数据和对象类型的值变化的时候，通过defineReactive方法，借助defineProperty，将所有属性添加了getter和setter，用户在存取和设置的时候，可以进行一些操作。

缺陷：只能监控外层属性，如果多层，要使用递归。

get里面会做依赖收集（dep[watcher，watcher]） set里面会做数据更新(notify,通知watcher更新)

## 三、Vue种如何检测数组变化

Vue2.0中对数组没有进行defineProperty，而是重写了数组的七个方法，分别是：

- pop
- push
- shift
- unshift
- splice
- sort
- reverse

这些方法都会改变数组本身，数组的索引和长度是无法被监控的。

## 四、Vue中如何进行依赖搜集

Vue初始化完成之后，挂载并进行编译，生成rederFunction，当取值的时候，就会收集watcher，放到dep里面，当用户更改值的时候，就会通知watcher，去patch打补丁，去更新视图。

<img src='https://img1.imgtp.com/2022/12/06/6OSCPbOZ.png'/>

## 五、如何理解Vue中的模板编译原理

 即Vue是如何将template转换为reder函数的

- 将template转换为ast语法树 - parserHTML
- 对静态语法做标记(某些节点不改变)
- 重新生成代码 - codeGen 使用with语法包裹字符串

## 六、Vue生命周期钩子是如何实现的

Vue的生命周期钩子是一个回调函数，当组件创建实例的过程中会调用相应的钩子方法，内部会对钩子进行处理，钩子函数维护成数组的形式。

## 七、Vue组件生命周期由哪些？

**beforeCreate** 在实例初始化之后，数据观测observer 和event、watcher事件配置之前被调用

**created** 实例已经创建完成，在这一步，以下配置被完成

- 数据观测
- 属性和方法的运算
- watch/event时间回调
- $el尚未生成

**beforeMount** 在挂载之前被调用，render尚未被调用

**mounted** el被新创建的vm.$el替换，并挂载到实例上去之后调用

**beforeUpdate** 数据更新时，被调用，发生在虚拟Dom重新渲染和打补丁之前

**update** 由于数据更改导致的虚拟Dom重新渲染和打补丁，在这之后调用

**beforeDestroy** 实例销毁之前调用

**destroyed** 实例销毁之后调用，调用后Vue实例的所有东西都会被解绑，所有的事件监听会被移除，子实例被销毁，该钩子在服务端渲染期间不被调用

**keep-alive**（activated & deactivated）

## 八、Vue.mixin的使用场景和原理

Vue的mixin的作用就是抽离公共的业务逻辑，原理类似对象的继承，当组件初始化的时候，会调用mergeOptions方法进行合并，采用侧虐模式针对不同的属性进行合并，如果混入的数据和本身组件的数据有冲突，采用本身的数据数据为准

缺点：命名冲突，数据来源不清晰，不利于维护。

## 九、vue的组件data为什么必须是一个函数？

new view是一个单利模式，不会有任何的合并操作，所以根示例不必校验data一定是一个函数，组件的data必须是一个函数，是为了防止组件之间的数据产生污染，如果都是对象的话，会在合并的时候，指向同一个地址，而如果是一个函数的时候，合并的时候调用，会产生两个不同的内存空间

## 十、nexttick原理

nexttick是一个微任务

- nexttick中的回调是在Dom更新循环结束之后执行的延迟回调
- 可以用于获取更新后的Dom
- Vue中数据更新时异步的，使用nexttick可以把保证用户定义的逻辑在Dom更新之后执行

## 十一、computed和watch的区别

- computed和watch都是基于watcher来实现的
- computed的属性是具备缓存的，依赖的值不发生变化，对其取值的计算属性方法不会重复执行。
- watch是监控值的变化，当值发生变化的时候，会调用里面的回调函数

## 十二、Vue.set方法是如何实现的

- Vue给对象和数组本身都增加了dep属性
- 当给对象新增不存在的属性的时候，就会触发对象依赖的watcher去更新
- 当修改数组的索引的时候，就调用数组本身的splice方法去更新数组

## 十三、Vue为什么要用虚拟Dom

- 虚拟Dom就是用js对象来描述真实dom，是对真实Dom的抽象
- 由于直接操作dom性能低，但是js层的操作效率高，可以将dom 操作转换为对象操作，最终通过diff算法对比对差异进行更新dom
- 虚拟dom不依赖真实平台环境，可以实现跨平台

## 十四、Vue的diff算法原理

Vue的diff算法是平级比较，不考虑跨级比较的情况，内部采用深度递归的方式+双指针方式比较   平级比较，深度有限

- 先比较两个节点的是不是相同节点
- 相同节点比较属性，复用老节点
- 先比较儿子节点，考虑老节点和新节点儿子的情况
- 优先比较：头头 尾尾  头尾 尾头
- 对比查找，进行复用

## 十五、既然vue通过数据劫持可以精准的探测数据变化，为什么还要用diff检测差异

- 响应式数据变化，Vue确实可以在数据变化的时候，响应式系统可以立即得知，但是如果每个属性都添加watcher的话，性能会非常的差。
- 粒度过细，会导致更新不精准

所以采用watcher+diff算法来检测差异

## 十六、说明key的作用和原理

- Vue在patch过程中，通过key可以判断两个虚拟节点是否是相同节点
- 没有key会导致更新的时候出问题
- 尽量不要采用索引作为key

## 十七、谈谈对组件的理解

组件化开发大幅提高应用开发效率、测试性、复用性

常见的组件化技术：属性、自定义事件、插槽

降低更新范围，值重新渲染变的组件

高内聚，低耦合，单向数据流

## 十八、描述组件渲染的流程

产生组件虚拟节点=》创建组件的真实节点=》插入到页面

## 十九、描述组件的更新流程

属性会触发patchVnode方法，组件的虚拟节点会调用prepatch钩子然后更新属性，更新组件	

## 二十、异步组件原理

先渲染异步占位符节点=》组件加载完毕后调用forceUpdate强制更新

## 二十一、函数组件的优势和原理

函数式组件的特点：无状态，无生命周期，无this，因此性能可能会高一些	

正常的一个组件是一个类继承了vue

函数式组件，就是一个普通的函数

## 二十二、组件的传值方式有哪些？

1. props和emit：父组件向子组件传递数据，通过props传递。子组件向父组件传递通过emit事件
2. parent，children获取当前组件的父组件和当前组件的子组件
3. attrs和listeners
4. 父组件通过provide提供，子组件通过inject注入变量
5. $ref获取实例
6. eventBus平级组件数据传递
7. Vuex

## 二十三、$attrs是为了解决什么问题出现的？

主要作用是为了实现批量传递数据

provide/inject更适合应用在插件中，主要实现跨级数据传递

## 二十四、v-for和v-if哪个优先级跟高？

首先，v-for和v-if不能在同一个标签中使用

先处理v-for，在处理v-if

如果到的时候，赢先考虑用计算属性处理数据，在进行v-for，可以减少循环次数

## 二十五、v-mode是如何实现的？

在组件上用v-model，是**model**和**callback**

在普通元素上用v-model，会生成指令，还可能因为不同的元素：

生成value和input

生成change和radio

生产change和checked

## 二十六、Vue的普通插槽和作用域插槽的区别

**普通插槽**是渲染后做替换的工作，服组件渲染完成后，替换子组件的内容

**作用域插槽**可以拿到子组件里面的属性，在子组件中传入属性然后渲染.

## 二十七、Vue.use是干什么的?

Vue.use是用来使用插件的,我们可以在插件中扩展全局组件、指令、原型方法等.会调用install方法,将Vue的构建函数默认传入,在插件中可以使用Vue,无需依赖Vue库

## 二十八、组件写name有啥好处?

增加name属性,会在components属性中增加组件本身,实现组件的递归调用

可以表示组件的具体名称,方便调试和查找对应组件

## 二十九、vue的修饰符有哪些?

- .stop
- .prevent
- .capture
- .self
- .once
- .passive
- .right
- .center
- .middle
- .alt

## 三十、如何理解自定义指令

在生成ast语法树时，遇到指令会给当前元素添加directives属性

通过genDirectives生成指令代码

在patch钱，将指令的狗子提取到cbs中，在patch过程中调用对应的钩子

当执行cbs对应的钩子是，调用对应指令定义方法

## 三十一、keep-alive平时在哪里使用？原理是什么？

使用keep-alive包裹动态组件时，会对组件进行缓存，避免组件重新创建

使用两个场景，一个是动态组件，一个是router-view

## 三十二、vue-router有几种钩子函数？执行流程如何？

- 全局守卫
- 路由守卫
- 组件守卫

1. 导航被触发
2. 在失活的组件里调用beforeRouteLeave守卫
3. 调用全局的beforeEach守卫
4. 在重用的的组件里调用beforeRouteUpdate守卫（2.2+）
5. 在路由配置里调用beforeEnter
6. 解析异步路由组件
7. 在被激活的组件里调用beforeRouterEnter
8. 调用全局的beforeResolve
9. 导航被确认
10. 调用全局的afterEach钩子
11. 触发DOM更新
12. 调用beforeRouteEnter守卫中传给next的回调函数，创建好的实例会作为回调函数的参数传入

## 三十三、vuerouter的两种模式的区别

vue-router中有三种模式，分别是hash、history、abstract

abstract在不支持浏览器的api环境使用

hash模式兼容性好，但是不美观，不利于seo

history美观，historyAPI+popState，但是刷新会出现404

## 三十四、谈谈Vue的性能优化有哪些？

- 数据层级不要过深，合理的设置响应式数据
- 使用数据时， 缓存值的结果，不要频繁取值
- 合理使用key
- v-show(频繁切换性能高)和v-if的合理使用
- 控制组件的粒度=》vue采用组件级别更新
- 采用函数式组件=》函数式组件开销低
- 采用异步组件=》借助webpack的分包策略
- 使用keep-alive来缓存组件
- 虚拟滚动、时间分片等策略
- 打包优化

## 三十五、Vuex

Vuex是专门为Vue提供的全局状态管理系统，用于多个组件中的数据共享、数据缓存

问题：无法持久化

state：数据初始化仓库

getter：类似于计算属性的作用

mutation:主要修改状态，同步执行

action:执行业务代码，方便服用，逻辑可以为异步，不能直接修改状态

module:Vuex模块化管理

## 三十六、vue中使用了那些设计模式

单利模式：new 多次，只有一个实例

工厂模式：传入参数就可以创建实例（虚拟节点的创建）

发布订阅模式：eventBus

观察者模式：dep和watch

代理模式：_data属性、proxy、防抖、节流

中介者模式：vuex

策略模式

外观模式

## 三十七、何为动态组件

运行时在组件之间动态切换的方法，可以将多个条件组件（使用v-if -v-else-if   v-else 切换的组件）简化为一行代码

