# 一、keep-alive

在平常开发中，有部分组件没有必要多次初始化，这时，我们需要将组件进行持久化，使组件的状态维持不变，在下一次展示时，也不会进行重新初始化组件。

也就是说，keepalive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染，也就是所谓的组件缓存。

是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。

### include和exclude指定是否缓存某些组件

include 包含的意思。值为字符串或正则表达式或数组。只有组件的名称与include的值相同的才会被缓存，即指定哪些被缓存，可以指定多个被缓存。这里以字符串为例，指定多个组件缓存，语法是用逗号隔开。如下：

```javascript
// 指定home组件和about组件被缓存 
<keep-alive include="home,about" >  
    <router-view></router-view>
</keep-alive>
```

exclude相当于include的反义词，就是除了的意思，指定哪些组件不被缓存，用法和include类似，如下：

```javascript
// 除了home组件和about组件别的都缓存，本例中就是只缓存detail组件
<keep-alive exclude="home,about" >
    <router-view></router-view>
</keep-alive>
```

### keep-alive的钩子函数执行顺序

​		首先使用了keep-alive的组件以后，组件上就会自动加上了`activated`钩子和`deactivated`钩子。

- `activated` 当组件被激活（使用）的时候触发 可以简单理解为进入这个页面的时候触发
- `deactivated` 当组件不被使用（inactive状态）的时候触发 可以简单理解为离开这个页面的时候触发

```
初始进入和离开 created ---> mounted ---> activated --> deactivated
后续进入和离开 activated --> deactivated
```

### keep-alive的应用场景举例

- 查看表格某条数据详情页，返回还是之前的状态，比如还是之前的筛选结果，还是之前的页数等
- 填写的表单的内容路由跳转返回还在，比如input框、下选择拉框、开关切换等用户输入了一大把东西，跳转再回来不能清空啊，不用让用户再写一遍

### 思考题：缓存后如何获取数据

解决方案可以有以下两种：

- beforeRouteEnter
- actived

### beforeRouteEnter

每次组件渲染的时候，都会执行`beforeRouteEnter`

```javascript
beforeRouteEnter(to, from, next){
    next(vm=>{
        console.log(vm)
        // 每次进入路由执行
        vm.getData()  // 获取数据
    })
},
```

### actived

在`keep-alive`缓存的组件被激活的时候，都会执行`actived`钩子

```javascript
activated(){    
    this.getData() // 获取数据
},
```

注意：服务器端渲染期间`avtived`不被调用

# 二、Teleport

`<Teleport>` 是一个内置组件，它可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去。

```js
<button @click="open = true">Open Modal</button>

<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```

`<Teleport>` 接收一个 `to` prop 来指定传送的目标。`to` 的值可以是一个 CSS 选择器字符串，也可以是一个 DOM 元素对象。这段代码的作用就是告诉 Vue“把以下模板片段**传送到 `body`** 标签下”。

你可以点击下面这个按钮，然后通

## 禁用 Teleport[#](https://cn.vuejs.org/guide/built-ins/teleport.html#disabling-teleport)

在某些场景下可能需要视情况禁用 `<Teleport>`。举例来说，我们想要在桌面端将一个组件当做浮层来渲染，但在移动端则当作行内组件。我们可以通过对 `<Teleport>` 动态地传入一个 `disabled` prop 来处理这两种不同情况。

```js
<Teleport :disabled="isMobile">
  ...
</Teleport>
```

## 多个 Teleport 共享目标[#](https://cn.vuejs.org/guide/built-ins/teleport.html#multiple-teleports-on-the-same-target)

一个可重用的模态框组件可能同时存在多个实例。对于此类场景，多个 `<Teleport>` 组件可以将其内容挂载在同一个目标元素上，而顺序就是简单的顺次追加，后挂载的将排在目标元素下更后面的位置上。

```js
<Teleport to="#modals">
  <div>A</div>
</Teleport>
<Teleport to="#modals">
  <div>B</div>
</Teleport>
//渲染结果为：
<div id="modals">
  <div>A</div>
  <div>B</div>
</div>
```

# 三、Suspense

`<Suspense>` 是一个内置组件，用来在组件树中协调对异步依赖的处理。它让我们可以在组件树上层等待下层的多个嵌套异步依赖项解析完成，并可以在等待时渲染一个加载状态。

在这个组件树中有多个嵌套组件，要渲染出它们，首先得解析一些异步资源。如果没有 `<Suspense>`，则它们每个都需要处理自己的加载、报错和完成状态。在最坏的情况下，我们可能会在页面上看到三个旋转的加载态，在不同的时间显示出内容。

有了 `<Suspense>` 组件后，我们就可以在等待整个多层级组件树中的各个异步依赖获取结果时，在顶层展示出加载中或加载失败的状态。

`<Suspense>` 可以等待的异步依赖有两种：

1. 带有异步 `setup()` 钩子的组件。这也包含了使用 `<script setup>` 时有顶层 `await` 表达式的组件。
2. [异步组件](https://cn.vuejs.org/guide/components/async.html)。

### `async setup()`[#](https://cn.vuejs.org/guide/built-ins/suspense.html#async-setup)

组合式 API 中组件的 `setup()` 钩子可以是异步的：

```js
export default {
  async setup() {
    const res = await fetch(...)
    const posts = await res.json()
    return {
      posts
    }
  }
}
```

如果使用 `<script setup>`，那么顶层 `await` 表达式会自动让该组件成为一个异步依赖：

```js
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

### 异步组件

异步组件默认就是**“suspensible”**的。这意味着如果组件关系链上有一个 `<Suspense>`，那么这个异步组件就会被当作这个 `<Suspense>` 的一个异步依赖。在这种情况下，加载状态是由 `<Suspense>` 控制，而该组件自己的加载、报错、延时和超时等选项都将被忽略。

异步组件也可以通过在选项中指定 `suspensible: false` 表明不用 `Suspense` 控制，并让组件始终自己控制其加载状态。

## 加载中状态







[错误处理](https://cn.vuejs.org/guide/built-ins/suspense.html#error-handling)[和其他组件结合](https://cn.vuejs.org/guide/built-ins/suspense.html#combining-with-other-components)

[SPONSORS](https://cn.vuejs.org/sponsor/)

[![稀土掘金技术社区](https://sponsors.vuejs.org/images/xitujuejinjishushequ.png)](https://juejin.cn/frontend?utm_source=vue&utm_campaign=sponsor)[Your logo](https://cn.vuejs.org/sponsor/)

[![万维广告联盟](https://cdn.wwads.cn/creatives/COi3HnBnyFF545MHJE1dI9uO9r1Ja4D4p0fvTPYE.png)](https://wwads.cn/click/bundle?code=$XF4n85uARSTqEeEB4H9Pa3HSbSAJN&version=2.3)

[👉**API设计、调试、文档、自动化测试 ，就用Apipost！无需登录，直接使用！免费！**](https://wwads.cn/click/bundle?code=$XF4n85uARSTqEeEB4H9Pa3HSbSAJN&version=2.3)[![img]()广告](https://wwads.cn/?utm_source=property-83&utm_medium=footer)



# Suspense[#](https://cn.vuejs.org/guide/built-ins/suspense.html#suspense)

实验性功能

`<Suspense>` 是一项实验性功能。它不一定会最终成为稳定功能，并且在稳定之前相关 API 也可能会发生变化。

`<Suspense>` 是一个内置组件，用来在组件树中协调对异步依赖的处理。它让我们可以在组件树上层等待下层的多个嵌套异步依赖项解析完成，并可以在等待时渲染一个加载状态。

## 异步依赖[#](https://cn.vuejs.org/guide/built-ins/suspense.html#async-dependencies)

要了解 `<Suspense>` 所解决的问题和它是如何与异步依赖进行交互的，我们需要想象这样一种组件层级结构：



```
<Suspense>
└─ <Dashboard>
   ├─ <Profile>
   │  └─ <FriendStatus>（组件有异步的 setup()）
   └─ <Content>
      ├─ <ActivityFeed> （异步组件）
      └─ <Stats>（异步组件）
```

在这个组件树中有多个嵌套组件，要渲染出它们，首先得解析一些异步资源。如果没有 `<Suspense>`，则它们每个都需要处理自己的加载、报错和完成状态。在最坏的情况下，我们可能会在页面上看到三个旋转的加载态，在不同的时间显示出内容。

有了 `<Suspense>` 组件后，我们就可以在等待整个多层级组件树中的各个异步依赖获取结果时，在顶层展示出加载中或加载失败的状态。

`<Suspense>` 可以等待的异步依赖有两种：

1. 带有异步 `setup()` 钩子的组件。这也包含了使用 `<script setup>` 时有顶层 `await` 表达式的组件。
2. [异步组件](https://cn.vuejs.org/guide/components/async.html)。

### `async setup()`[#](https://cn.vuejs.org/guide/built-ins/suspense.html#async-setup)

组合式 API 中组件的 `setup()` 钩子可以是异步的：

js

```
export default {
  async setup() {
    const res = await fetch(...)
    const posts = await res.json()
    return {
      posts
    }
  }
}
```

如果使用 `<script setup>`，那么顶层 `await` 表达式会自动让该组件成为一个异步依赖：

vue

```
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

### 异步组件[#](https://cn.vuejs.org/guide/built-ins/suspense.html#async-components)

异步组件默认就是**“suspensible”**的。这意味着如果组件关系链上有一个 `<Suspense>`，那么这个异步组件就会被当作这个 `<Suspense>` 的一个异步依赖。在这种情况下，加载状态是由 `<Suspense>` 控制，而该组件自己的加载、报错、延时和超时等选项都将被忽略。

异步组件也可以通过在选项中指定 `suspensible: false` 表明不用 `Suspense` 控制，并让组件始终自己控制其加载状态。

## 加载中状态[#](https://cn.vuejs.org/guide/built-ins/suspense.html#loading-state)

`<Suspense>` 组件有两个插槽：`#default` 和 `#fallback`。两个插槽都只允许**一个**直接子节点。在可能的时候都将显示默认槽中的节点。否则将显示后备槽中的节点。

template

```js
<Suspense>
  <!-- 具有深层异步依赖的组件 -->
  <Dashboard />

  <!-- 在 #fallback 插槽中显示 “正在加载中” -->
  <template #fallback>
    Loading...
  </template>
</Suspense>
```

在初始渲染时，`<Suspense>` 将在内存中渲染其默认的插槽内容。如果在这个过程中遇到任何异步依赖，则会进入**挂起**状态。在挂起状态期间，展示的是后备内容。当所有遇到的异步依赖都完成后，`<Suspense>` 会进入**完成**状态，并将展示出默认插槽的内容。

如果在初次渲染时没有遇到异步依赖，`<Suspense>` 会直接进入完成状态。

进入完成状态后，只有当默认插槽的根节点被替换时，`<Suspense>` 才会回到挂起状态。组件树中新的更深层次的异步依赖**不会**造成 `<Suspense>` 回退到挂起状态。

发生回退时，后备内容不会立即展示出来。相反，`<Suspense>` 在等待新内容和异步依赖完成时，会展示之前 `#default` 插槽的内容。这个行为可以通过一个 `timeout` prop 进行配置：在等待渲染新内容耗时超过 `timeout` 之后，`<Suspense>` 将会切换为展示后备内容。若 `timeout` 值为 `0` 将导致在替换默认内容时立即显示后备内容。

## 事件[#](https://cn.vuejs.org/guide/built-ins/suspense.html#events)

`<Suspense>` 组件会触发三个事件：`pending`、`resolve` 和 `fallback`。`pending` 事件是在进入挂起状态时触发。`resolve` 事件是在 `default` 插槽完成获取新内容时触发。`fallback` 事件则是在 `fallback` 插槽的内容显示时触发。

例如，可以使用这些事件在加载新组件时在之前的 DOM 最上层显示一个加载指示器。