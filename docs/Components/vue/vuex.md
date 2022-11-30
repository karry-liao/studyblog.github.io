## 一、Vuex

**State、 Getter、Mutation 、Action、 Module。**

### State

Vuex 使用单一状态树——是的，用一个对象就包含了全部的应用层级状态。至此它便作为一个“唯一数据源 (SSOT)”而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。

State属性是Vuex的单一状态树

### Getter

有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数

Getter类似于Vue的 computed 对象。是根据业务逻辑来处理State，使得生成业务所需的属性。

### Mutation

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。

Mutation是唯一用来更改Vuex中状态的方法。

### Action

Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。

Action是用来解决异步操作而产生的，它提交的是Mutation。

### Module

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。 为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割

Module是将Vuex模块化的对象，目的是更好的维护。

## 二、Vuex中的辅助函数

​	辅助函数： mapState、mapGetters、mapMutations、mapActions 等

### 如何使用辅助函数

首先，需要在当前组件中引入`Vuex`。

然后，通过Vuex来调用辅助函数。

### 辅助函数如何去映射vuex.store中的属性

#### 1、mapState:把state属性映射到computed身上

```javascript
computed:{  ...Vuex.mapState({    input:state=>state.inputVal,    n:state=>state.n  })    }
```

`state`：用来存储公共的状态 在`state`中的数据都是响应式的。

响应式原因：`state`里面有一个`getters`、`setters`方法；`data`中的数据也是响应式的，因为里面也有`getters`和`setters`方法

#### 2、mapAcions：把actions里面的方法映射到methods中

```javascript
methods:{
        ...Vuex.mapActions({
            add:"handleTodoAdd",    //val为actions里面的方法名称
            change:"handleInput"     
        })
    }
```

`actions`里面的函数主要用来处理异步的函数以及一些业务逻辑,每一个函数里面都有一个形参，这个形参是一个对象，里面有一个`commit`方法，这个方法用来触发mutations里面的方法

#### 3、mapMutations：把mutations里面的方法映射到methods中

```javascript
methods:{
        ...Vuex.mapMutations({
            handleAdd:"handlMutationseAdd"
        })
    }
```

`mutations`里面的函数主要用来修改`state`中的数据。`mutations`里面的所有方法都会有2个参数，一个是`store`中的`state`，另外一个是需要传递的参数。

理解`state`、`actions`、`mutations`，可以参考`MVC`框架。

- `state`看成一个数据库，只是它是响应式的，刷新页面数据就会改变；
- `actions`看成controller层，做数据的业务逻辑；
- `mutations`看成model层，做数据的增删改查操作。

#### 4、mapGetters:把getters属性映射到computed身上

```javascript
 computed:{        
     ...Vuex.mapGetters({       
         NumN:"NumN"   
     })  
 }
```

#### 5、modules属性: 模块

把公共的状态按照模块进行划分

- 每个模块都相当于一个小型的Vuex
- 每个模块里面都会有`state` `getters` `actions` `mutations`
- 切记在导出模块的时候加一个 `namespaced:true` 主要的作用是将每个模块都有独立命名空间
- `namespace：true`在多人协作开发的时候，可能子模块和主模块中的函数名字会相同，这样在调用函数的时候，相同名字的函数都会被调用，就会发生问题。为了解决这个问题，导出模块的时候要加`namespace：true`.

那么怎么调用子模块中的函数呢？假如我的子模块名字为todo.js。 函数名字就需要改成todo/函数名字。

## Vuex的核心原理

vuex的本质是一个对象

vuex对象有两个属性，一个是install方法，一个是store类

install方法的作用是将store这实例挂载到所有组件上，注意是同一个store实例

store这个类拥有commit方法，dispatch方法，store类里将用户传入的state包装成data，作为new vue的参数，从而实现state值的响应式