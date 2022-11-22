# 一、组合式API

### Setup():

`setup` 函数的第一个参数是组件的 `props`。和标准的组件一致，一个 `setup` 函数的 `props` 是响应式的，并且会在传入新的 props 时同步更新

```js
export default {
  props: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```

#### **props**

Notice！如果你解构了 **`props`** 对象，解构出的变量将会丢失响应性。因此我们推荐通过 `props.xxx` 的形式来使用其中的 props。

如果你确实需要解构 `props` 对象，或者需要将某个 prop 传到一个外部函数中并保持响应性，那么你可以使用 [toRefs()](https://cn.vuejs.org/api/reactivity-utilities.html#torefs) 和 [toRef()](https://cn.vuejs.org/api/reactivity-utilities.html#toref) 这两个工具函数

```js
import { toRefs, toRef } from 'vue'

export default {
  setup(props) {
    // 将 `props` 转为一个其中全是 ref 的对象，然后解构
    const { title } = toRefs(props)
    // `title` 是一个追踪着 `props.title` 的 ref
    console.log(title.value)

    // 或者，将 `props` 的单个属性转为一个 ref
    const title = toRef(props, 'title')
  }
}
```

#### **上下文context**

传入 `setup` 函数的第二个参数是一个 **Setup 上下文**对象。上下文对象暴露了其他一些在 `setup` 中可能会用到的值：

```js
export default {
  setup(props, context) {
    // 透传 Attributes（非响应式的对象，等价于 $attrs）
    console.log(context.attrs)
    // 插槽（非响应式的对象，等价于 $slots）
    console.log(context.slots)
    // 触发事件（函数，等价于 $emit）
    console.log(context.emit)
    // 暴露公共属性（函数）
    console.log(context.expose)
  }
}
//该上下文对象是非响应式的，可以安全地解构：
export default {
  setup(props, { attrs, slots, emit, expose }) {
    ...
  }
}
```

`attrs` 和 `slots` 都是有状态的对象，它们总是会随着组件自身的更新而更新。这意味着你应当避免解构它们，并始终通过 `attrs.x` 或 `slots.x` 的形式使用其中的属性。此外还需注意，和 `props` 不同，`attrs` 和 `slots` 的属性都**不是**响应式的。如果你想要基于 `attrs` 或 `slots` 的改变来执行副作用，那么你应该在 `onBeforeUpdate` 生命周期钩子中编写相关逻辑。

##### 暴露公共属性-expose

`expose` 函数用于显式地限制该组件暴露出的属性，当父组件通过[模板引用](https://cn.vuejs.org/guide/essentials/template-refs.html#ref-on-component)访问该组件的实例时，将仅能访问 `expose` 函数暴露出的内容：

```js
export default {
  setup(props, { expose }) {
    // 让组件实例处于 “关闭状态”
    // 即不向父组件暴露任何东西
    expose()

    const publicCount = ref(0)
    const privateCount = ref(0)
    // 有选择地暴露局部状态
    expose({ count: publicCount })
  }
}
```

##### 与渲染函数一起使用 h()

`setup` 也可以返回一个[渲染函数](https://cn.vuejs.org/guide/extras/render-function.html)，此时在渲染函数中可以直接使用在同一作用域下声明的响应式状态：

```js
import { h, ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return () => h('div', count.value)
  }
}
```

返回一个渲染函数将会阻止我们返回其他东西。对于组件内部来说，这样没有问题，但如果我们想通过模板引用将这个组件的方法暴露给父组件，那就有问题了。

我们可以用expose()解决这个问题

```js
import { h, ref } from 'vue'

export default {
  setup(props, { expose }) {
    const count = ref(0)
    const increment = () => ++count.value

    expose({
      increment
    })

    return () => h('div', count.value)
  }
}
//此时父组件可以通过模板引用来访问这个 increment 方法。
```



```createApp()```:创建一个应用实例，

```js
function createApp(rootComponent: Component, rootProps?: object): App

//第一个参数是根组件。第二个参数可选，它是要传递给根组件的 props。
import { createApp } from 'vue'

const app = createApp({
  /* root component options */
})
//or
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

```



```createSSRApp()```:以 [SSR 激活](https://cn.vuejs.org/guide/scaling-up/ssr.html#client-hydration)模式创建一个应用实例。用法与 `createApp()` 完全相同。



```app.mount()```:将应用实例挂载在一个容器元素中。对于每个应用实例，`mount()` 仅能调用一次。

```js
interface App {
  mount(rootContainer: Element | string): 	 ComponentPublicInstance
}

//
import { createApp } from 'vue'
const app = createApp(/* ... */)
app.mount('#app')

//也可以挂载到一个实际的 DOM 元素。
app.mount(document.body.firstChild)
```



```app.unmount()```:卸载一个已挂载的应用实例。卸载一个应用会触发该应用组件树内所有组件的卸载生命周期钩子。

```js
interface App {
  unmount(): void
}
```



```app.provide```:提供一个值，可以给后代组件注入使用。

```js
interface App {
  provide<T>(key: InjectionKey<T> | symbol | string, value: T): this
}
//
import { createApp } from 'vue'
const app = createApp(/* ... */)
app.provide('message', 'hello')   //提供值和其对应的数据	
//后代组件
export default {
  inject: ['message'], //inject注入使用
  created() {
    console.log(this.message) // 'hello'
  }
}
```



```app.component()```:如果同时传一个组件名字字符串和他的定义，则全局注册一个组件，如果只传一个名字，则返回改名字注册的组件。ps：如果存在的话

```js
interface App {
  component(name: string): Component | undefined
  component(name: string, component: Component): this
}
//示例
import { createApp } from 'vue'
const app = createApp({})
// 注册一个选项对象
app.component('my-component', {
  /* ... */
})
// 得到一个已注册的组件
const MyComponent = app.component('my-component')
```



```app.directive()```:如果同时传递一个名字和指令定义，	则全局注册指令，如果只传递名字，则返回改名字注册的指令。ps：存在的话

示例：

```js
import { createApp } from 'vue'
const app = createApp({
  /* ... */
})
// 注册（对象形式的指令）
app.directive('my-directive', {
  /* 自定义指令钩子 */
})
// 注册（函数形式的指令）
app.directive('my-directive', () => {
  /* ... */
})
// 得到一个已注册的指令
const myDirective = app.directive('my-directive')

```



```app.use()```:全局安装插件

```js
interface App {
  use(plugin: Plugin, ...options: any[]): this
}
//第一个参数应是插件本身，可选的第二个参数是要传递给插件的选项。
//插件可以是一个带 install() 方法的对象，亦或直接是一个将被用作 install() 方法的函数。插件选项 (app.use() 的第二个参数) 将会传递给插件的 install() 方法。
//若 app.use() 对同一个插件多次调用，该插件只会被安装一次
//示例
import { createApp } from 'vue'
import MyPlugin from './plugins/MyPlugin'

const app = createApp({
  /* ... */
})
app.use(MyPlugin)
```



```app.mixin()```:使用一个全局的mixin，一个全局的mixin会作用于应用中的每个组件实例。-------------Vue3.0慎用，特别是全局的mixin，~~~~推荐使用组合式函数来代替

```js
interface App {
  mixin(mixin: ComponentOptions): this
}
```



```app.version()```:当前应用所使用的 Vue 版本号

```js
interface App {
  version: string
}
//使用示例
export default {
  install(app) {
    const version = Number(app.version.split('.')[0])
    if (version < 3) {
      console.warn('This plugin requires Vue 3')
    }
  }
}
```



```app.config()```:每个应用实例都会暴露一个```config```对象，其中包含了对这个应用的配置和设定，你可以在挂载应用前更改这些属性

```js
import { createApp } from 'vue'
const app = createApp(/* ... */)
console.log(app.config)
```

```app.config.errorHandler()```:用于为应用内抛出的未捕获错误指定一个全局处理函数。

```js
interface AppConfig {
  errorHandler?: (
    err: unknown,
    instance: ComponentPublicInstance | null,
    // `info` 是一个 Vue 特定的错误信息
    // 例如：错误是在哪个生命周期的钩子上抛出的
    info: string
  ) => void
}
//错误处理器接收三个参数：错误对象、触发该错误的组件实例和一个指出错误来源类型信息的字符串。
app.config.errorHandler = (err, instance, info) => {
  // 处理错误，例如：报告给一个服务
}
```

```app.config.warnHandler()```:用于给vue的运行警告指定一个自定义处理函数。

```js
interface AppConfig {
  warnHandler?: (
    msg: string,
    instance: ComponentPublicInstance | null,
    trace: string
  ) => void
}
//警告处理器将接受警告信息作为其第一个参数，来源组件实例为第二个参数，以及组件追踪字符串作为第三个参数。
//警告仅会在开发阶段显示，因此在生产环境中，这条配置将被忽略。
  app.config.warnHandler = (msg, instance, trace) => {
  // `trace` is the component hierarchy trace
}
```

```app.config.perfomance()```:设置此项为 `true` 可以在浏览器开发工具的“性能/时间线”页中启用对组件初始化、编译、渲染和修补的性能表现追踪。仅在开发模式和支持 [performance.mark](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark) API 的浏览器中工作。

```app.config.compilerOptions()```:配置运行时编译器的选项。设置在此对象上的值将会在浏览器内进行模板编译时使用，并会影响到所配置应用的所有组件。另外你也可以通过 [`compilerOptions` 选项](https://cn.vuejs.org/api/options-rendering.html#compileroptions)在每个组件的基础上覆盖这些选项。

```app.config.compilerOptions.isCustomElement()```:

```js
// 将所有标签前缀为 `ion-` 的标签视为自定义元素
app.config.compilerOptions.isCustomElement = (tag) => {
  return tag.startsWith('ion-')
}
```

```app.config.compilerOptions.whitespace()```:用于调整模板中空格的处理行为。

- **类型** `'condense' | 'preserve'`

- **默认** `'condense'`

  Vue 移除/缩短了模板中的空格以求更高效的模板输出。默认的策略是“缩短”，表现行为如下：

  1. 元素中开头和结尾的空格字符将被缩短为一个空格。
  2. 包含换行的元素之间的空白字符会被删除。
  3. 文本节点中连续的空白字符被缩短成一个空格。

  ```js
  app.config.compilerOptions.whitespace = 'preserve'
  ```

```app.config.compilerOptions.delimiters```:用于调整模板内文本插值的分隔符。

```js
// 分隔符改为ES6模板字符串样式
app.config.compilerOptions.delimiters = ['${', '}']

```

```app.config.compilerOptions.comments```:用于调整是否移除模板中的 HTML 注释。  类型：boolean    默认：false

```js
app.config.compilerOptions.comments = true
```

```app.config.globalProperties```:一个用于注册能够被应用内所有组件实例访问到的全局属性的对象。

```js
interface AppConfig {
  globalProperties: Record<string, any>
}
  //这是对 Vue 2 中 Vue.prototype 使用方式的一种替代，此写法在 Vue 3 已经不存在了。与任何全局的东西一样，应该谨慎使用。如果全局属性与组件自己的属性冲突，组件自己的属性将具有更高的优先级。
  //使用方法
app.config.globalProperties.msg = 'hello'
    
export default {
  mounted() {
    console.log(this.msg) // 'hello'
  }
}
```

```app.config.optionMergeStrategies```:一个用于定义自定义组件选项的合并策略的对象。

```js
interface AppConfig {
  optionMergeStrategies: Record<string, OptionMergeFunction>
}

type OptionMergeFunction = (to: unknown, from: unknown) => any
//用法
    const app = createApp({
  // option from self
  msg: 'Vue',
  // option from a mixin
  mixins: [
    {
      msg: 'Hello '
    }
  ],
  mounted() {
    // 在 this.$options 上暴露被合并的选项
    console.log(this.$options.msg)
  }
})

// 为  `msg` 定义一个合并策略函数
app.config.optionMergeStrategies.msg = (parent, child) => {
  return (parent || '') + (child || '')
}

app.mount('#app')
// 打印 'Hello Vue'

```



### ```ref()```:

接受一个值，返回一个响应式的，可更改的ref对象，次对象只有一个指向其内部值的属性.value。

```js
function ref<T>(value: T): Ref<UnwrapRef<T>>

interface Ref<T> {
  value: T
}
```

如果将一个对象赋值给 ref，那么这个对象将通过 [reactive()](https://cn.vuejs.org/api/reactivity-core.html#reactive) 转为具有深层次响应式的对象。这也意味着如果对象中包含了嵌套的 ref，它们将被深层地解包。

若要避免这种深层次的转换，请使用 [`shallowRef()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref) 来替代。



### computed():

接受一个 getter 函数，返回一个只读的响应式 [ref](https://cn.vuejs.org/api/reactivity-core.html#ref) 对象。该 ref 通过 `.value` 暴露 getter 函数的返回值。它也可以接受一个带有 `get` 和 `set` 函数的对象来创建一个可写的 ref 对象。

```js
// 只读
function computed<T>(
  getter: () => T,
  // 查看下方的 "计算属性调试" 链接
  debuggerOptions?: DebuggerOptions
): Readonly<Ref<Readonly<T>>>

// 可写的
function computed<T>(
  options: {
    get: () => T
    set: (value: T) => void
  },
  debuggerOptions?: DebuggerOptions
): Ref<T>

```

创建一个只读的计算属性 ref：

```js
const count = ref(1)
const plusOne = computed(() => count.value + 1)
console.log(plusOne.value) // 2
plusOne.value++ // 错误
```

创建一个可写的计算属性 ref：

```js
const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1
  }
})

plusOne.value = 1
console.log(count.value) // 0
```



### reactive():

返回一个对象的响应式代理。

```js
function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
```

响应式转换是“深层”的：它会影响到所有嵌套的属性。一个响应式对象也将深层地解包任何 [ref](https://cn.vuejs.org/api/reactivity-core.html#ref) 属性，同时保持响应性。

若要避免深层响应式转换，只想保留对这个对象顶层次访问的响应性，请使用 [shallowReactive()](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive) 作替代。

创建一个响应式对象：

```js
const obj = reactive({ count: 0 })
obj.count++
//ref 的解包：
const count = ref(1)
const obj = reactive({ count })

// ref 会被解包
console.log(obj.count === count.value) // true

// 会更新 `obj.count`
count.value++
console.log(count.value) // 2
console.log(obj.count) // 2

// 也会更新 `count` ref
obj.count++
console.log(obj.count) // 3
console.log(count.value) // 3
//注意当访问到某个响应式数组或 Map 这样的原生集合类型中的 ref 元素时，不会执行 ref 的解包：
const books = reactive([ref('Vue 3 Guide')])
// 这里需要 .value
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// 这里需要 .value
console.log(map.get('count').value)
//将一个 ref 赋值给为一个 reactive 属性时，该 ref 会被自动解包：

const count = ref(1)
const obj = reactive({})

obj.count = count

console.log(obj.count) // 1
console.log(obj.count === count.value) // true
```



### readonly():

接收一个对象(不论是响应式还是普通的)或是一个ref，返回一个原值的只读代理。

```js
function readonly<T extends object>(
  target: T
): DeepReadonly<UnwrapNestedRefs<T>>
//只读代理是深层的：对任何嵌套属性的访问都将是只读的。它的 ref 解包行为与 reactive() 相同，但解包得到的值是只读的。
//要避免深层级的转换行为，请使用 shallowReadonly() 作替代。
//示例
    
const original = reactive({ count: 0 })
const copy = readonly(original)
watchEffect(() => {
  // 用来做响应性追踪
  console.log(copy.count)
})

// 更改源属性会触发其依赖的侦听器
original.count++

// 更改该只读副本将会失败，并会得到一个警告
copy.count++ // warning!
```



### ```watchEffect():```

立即运行一个函数，同时响应式的	追踪其依赖。并在依赖更新时重新执行。

```js
function watchEffect(
  effect: (onCleanup: OnCleanup) => void,
  options?: WatchEffectOptions
): StopHandle

type OnCleanup = (cleanupFn: () => void) => void

interface WatchEffectOptions {
  flush?: 'pre' | 'post' | 'sync' // 默认：'pre'
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}

type StopHandle = () => void

```

第一个参数就是要运行的副作用函数。这个副作用函数的参数也是一个函数，用来注册清理回调。清理回调会在该副作用下一次执行前被调用，可以用来清理无效的副作用，例如等待中的异步请求 (参见下面的示例)。

第二个参数是一个可选的选项，可以用来调整副作用的刷新时机或调试副作用的依赖。

返回值是一个用来停止该副作用的函数。

```js
//示例
const count = ref(0)

watchEffect(() => console.log(count.value))
// -> 输出 0

count.value++
// -> 输出 1
//------副作用清理
watchEffect(async (onCleanup) => {
  const { response, cancel } = doAsyncWork(id.value)
  // `cancel` 会在 `id` 更改时调用
  // 以便取消之前
  // 未完成的请求
  onCleanup(cancel)
  data.value = await response
})
//========停止监听
const stop = watchEffect(() => {})

// 当不再需要此侦听器时:
stop()
```



### ```watchPostEffect()```:

[`watchEffect()`](https://cn.vuejs.org/api/reactivity-core.html#watcheffect) 使用 `flush: 'post'` 选项时的别名。

### ```watchasyncEffect()```:

[`watchEffect()`](https://cn.vuejs.org/api/reactivity-core.html#watcheffect) 使用 `flush: 'sync'` 选项时的别名。

### watch():

侦听一个或者多个响应式数据，并在数据源变化时调用所给的函数。

```js
// 侦听单个来源
function watch<T>(
  source: WatchSource<T>,
  callback: WatchCallback<T>,
  options?: WatchOptions
): StopHandle

// 侦听多个来源
function watch<T>(
  sources: WatchSource<T>[],
  callback: WatchCallback<T[]>,
  options?: WatchOptions
): StopHandle

type WatchCallback<T> = (
  value: T,
  oldValue: T,
  onCleanup: (cleanupFn: () => void) => void
) => void

type WatchSource<T> =
  | Ref<T> // ref
  | (() => T) // getter
  | T extends object
  ? T
  : never // 响应式对象

interface WatchOptions extends WatchEffectOptions {
  immediate?: boolean // 默认：false
  deep?: boolean // 默认：false
  flush?: 'pre' | 'post' | 'sync' // 默认：'pre'
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}

```

`watch()` 默认是懒侦听的，即仅在侦听源发生变化时才执行回调函数。

第一个参数是侦听器的**源**。这个来源可以是以下几种：

- 一个函数，返回一个值

- 一个 ref

- 一个响应式对象

- ...或是由以上类型的值组成的数组

- 第二个参数是在发生变化时要调用的回调函数。这个回调函数接受三个参数：新值、旧值，以及一个用于注册副作用清理的回调函数。该回调函数会在副作用下一次重新执行前调用，可以用来清除无效的副作用，例如等待中的异步请求。

  当侦听多个来源时，回调函数接受两个数组，分别对应来源数组中的新值和旧值。

  第三个可选的参数是一个对象，支持以下这些选项：

  - **`immediate`**：在侦听器创建时立即触发回调。第一次调用时旧值是 `undefined`。
  - **`deep`**：如果源是对象，强制深度遍历，以便在深层级变更时触发回调。参考[深层侦听器](https://cn.vuejs.org/guide/essentials/watchers.html#deep-watchers)。
  - **`flush`**：调整回调函数的刷新时机。参考[回调的刷新时机](https://cn.vuejs.org/guide/essentials/watchers.html#callback-flush-timing)及 [`watchEffect()`](https://cn.vuejs.org/api/reactivity-core.html#watcheffect)。
  - **`onTrack / onTrigger`**：调试侦听器的依赖。参考[调试侦听器](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html#watcher-debugging)。

  与 [`watchEffect()`](https://cn.vuejs.org/api/reactivity-core.html#watcheffect) 相比，`watch()` 使我们可以：

  - 懒执行副作用；
  - 更加明确是应该由哪个状态触发侦听器重新执行；
  - 可以访问所侦听状态的前一个值和当前值。

  ```js
  //示例，监听一个getter函数
  const state = reactive({ count: 0 })
  watch(
    () => state.count,
    (count, prevCount) => {
      /* ... */
    }
  )
  //监听一个ref
  const count = ref(0)
  watch(count, (count, prevCount) => {
    /* ... */
  })
  //当监听多个数据来源时，回调函数接受两个数组，分别对应数组中的新值和旧值。
  watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
    /* ... */
  })
  //当使用 getter 函数作为源时，回调只在此函数的返回值变化时才会触发。如果你想让回调在深层级变更时也能触发，你需要使用 { deep: true } 强制侦听器进入深层级模式。在深层级模式时，如果回调函数由于深层级的变更而被触发，那么新值和旧值将是同一个对象。
  const state = reactive({ count: 0 })
  watch(
    () => state,
    (newValue, oldValue) => {
      // newValue === oldValue
    },
    { deep: true }
  )
  //当直接侦听一个响应式对象时，侦听器会自动启用深层模式：
  const state = reactive({ count: 0 })
  watch(state, () => {
    /* 深层级变更状态所触发的回调 */
  })
  ```

  `watch()` 和 [`watchEffect()`](https://cn.vuejs.org/api/reactivity-core.html#watcheffect) 享有相同的刷新时机和调试选项：

  ```js
  watch(source, callback, {
    flush: 'post',
    onTrack(e) {
      debugger
    }
  })
  ```



### ```isRef()```:

检查某个值是否为ref。

```js
function isRef<T>(r: Ref<T> | unknown): r is Ref<T>
//请注意，返回值是一个类型判定 (type predicate)，这意味着 isRef 可以被用作类型守卫：
if (isRef(foo)) {
  // foo 的类型被收窄为了 Ref<unknown>
  foo.value
}
```

### ```unRef()```:

如果参数是 ref，则返回内部值，否则返回参数本身。这是 `val = isRef(val) ? val.value : val` 计算的一个语法糖。

```js
function unref<T>(ref: T | Ref<T>): T
//示例
function useFoo(x: number | Ref<number>) {
  const unwrapped = unref(x)
  // unwrapped 现在保证为 number 类型
}
```

### ```toRef()```:

基于响应式对象上的一个属性，创建一个对应的 ref。这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值，反之亦然。

```js
const state = reactive({
  foo: 1,
  bar: 2
})

const fooRef = toRef(state, 'foo')

// 更改该 ref 会更新源属性
fooRef.value++
console.log(state.foo) // 2

// 更改源属性也会更新该 ref
state.foo++
console.log(fooRef.value) // 3

```

### ```isProxy```:

检查一个对象是否是由 [`reactive()`](https://cn.vuejs.org/api/reactivity-core.html#reactive)、[`readonly()`](https://cn.vuejs.org/api/reactivity-core.html#readonly)、[`shallowReactive()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive) 或 [`shallowReadonly()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreadonly) 创建的代理。

```js
function isProxy(value: unknown): boolean
```

### ```isReactive```:

检查一个对象是否是由 [`reactive()`](https://cn.vuejs.org/api/reactivity-core.html#reactive) 或 [`shallowReactive()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive) 创建的代理。

```js
function isReactive(value: unknown): boolean
```

### ```isReadonly()```:

检查一个对象是否是由 [`readonly()`](https://cn.vuejs.org/api/reactivity-core.html#readonly) 或 [`shallowReadonly()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreadonly) 创建的代理。

```js
function isReadonly(value: unknown): boolean
```

### shallowRef():

[`ref()`](https://cn.vuejs.org/api/reactivity-core.html#ref) 的浅层作用形式。

```js
function shallowRef<T>(value: T): ShallowRef<T>

interface ShallowRef<T> {
  value: T
}

```

和 `ref()` 不同，浅层 ref 的内部值将会原样存储和暴露，并且不会被深层递归地转为响应式。只有对 `.value` 的访问是响应式的。

`shallowRef()` 常常用于对大型数据结构的性能优化或是与外部的状态管理系统集成。

```js
const state = shallowRef({ count: 1 })
// 不会触发更改
state.value.count = 2
// 会触发更改
state.value = { count: 2 }
```

### ```triggerRef():```

强制触发依赖于一个[浅层 ref](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref) 的副作用，这通常在对浅引用的内部值进行深度变更后使用。

```js
function triggerRef(ref: ShallowRef): void
```

```js
const shallow = shallowRef({
  greet: 'Hello, world'
})

// 触发该副作用第一次应该会打印 "Hello, world"
watchEffect(() => {
  console.log(shallow.value.greet)
})

// 这次变更不应触发副作用，因为这个 ref 是浅层的
shallow.value.greet = 'Hello, universe'

// 打印 "Hello, universe"
triggerRef(shallow)

```

### ```customRef()```

创建一个自定义的 ref，显式声明对其依赖追踪和更新触发的控制方式。

```js
function customRef<T>(factory: CustomRefFactory<T>): Ref<T>

type CustomRefFactory<T> = (
  track: () => void,
  trigger: () => void
) => {
  get: () => T
  set: (value: T) => void
}
```

**示例**

创建一个防抖 ref，即只在最近一次 set 调用后的一段固定间隔后再调用：

```js
import { customRef } from 'vue'

export function useDebouncedRef(value, delay = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}

```

### shallowReactive():

[`reactive()`](https://cn.vuejs.org/api/reactivity-core.html#reactive) 的浅层作用形式。

```js
function shallowReactive<T extends object>(target: T): T
```

和 `reactive()` 不同，这里没有深层级的转换：一个浅层响应式对象里只有根级别的属性是响应式的。属性的值会被原样存储和暴露，这也意味着值为 ref 的属性**不会**被自动解包了。

```js
const state = shallowReactive({
  foo: 1,
  nested: {
    bar: 2
  }
})

// 更改状态自身的属性是响应式的
state.foo++

// ...但下层嵌套对象不会被转为响应式
isReactive(state.nested) // false

// 不是响应式的
state.nested.bar++

```

### ```shallowReadonly()```:

[`readonly()`](https://cn.vuejs.org/api/reactivity-core.html#readonly) 的浅层作用形式

```tsx
function shallowReadonly<T extends object>(target: T): Readonly<T>
//和 readonly() 不同，这里没有深层级的转换：只有根层级的属性变为了只读。属性的值都会被原样存储和暴露，这也意味着值为 ref 的属性不会被自动解包了。
const state = shallowReadonly({
  foo: 1,
  nested: {
    bar: 2
  }
})

// 更改状态自身的属性会失败
state.foo++

// ...但可以更改下层嵌套对象
isReadonly(state.nested) // false

// 这是可以通过的
state.nested.bar++

```

### ```toRaw()```:

根据一个 Vue 创建的代理返回其原始对象

```tsx
//类型
function toRaw<T>(proxy: T): T
//toRaw() 可以返回由 reactive()、readonly()、shallowReactive() 或者 shallowReadonly() 创建的代理对应的原始对象。
//这是一个可以用于临时读取而不引起代理访问/跟踪开销，或是写入而不触发更改的特殊方法。不建议保存对原始对象的持久引用，请谨慎使用。
const foo = {}
const reactiveFoo = reactive(foo)

console.log(toRaw(reactiveFoo) === foo) // true

```

### ```markRaw()```:

将一个对象标记为不可被转为代理。返回该对象本身。

```tsx
function markRaw<T extends object>(value: T): T
//示例
const foo = markRaw({})
console.log(isReactive(reactive(foo))) // false

// 也适用于嵌套在其他响应性对象
const bar = reactive({ foo })
console.log(isReactive(bar.foo)) // false

```

### ```effectScope()```:

创建一个 effect 作用域，可以捕获其中所创建的响应式副作用 (即计算属性和侦听器)，这样捕获到的副作用可以一起处理。

```tsx
function effectScope(detached?: boolean): EffectScope

interface EffectScope {
  run<T>(fn: () => T): T | undefined // 如果作用域不活跃就为 undefined
  stop(): void
}
//示例
const scope = effectScope()

scope.run(() => {
  const doubled = computed(() => counter.value * 2)

  watch(doubled, () => console.log(doubled.value))

  watchEffect(() => console.log('Count: ', doubled.value))
})

// 处理掉当前作用域内的所有 effect
scope.stop()

```

### ```getCurrentScope()```：

如果有的话，返回当前活跃的 [effect 作用域](https://cn.vuejs.org/api/reactivity-advanced.html#effectscope)。

```tsx
//类型
function getCurrentScope(): EffectScope | undefined
//
```

### ```onScopeDispose()```:

在当前活跃的 [effect 作用域](https://cn.vuejs.org/api/reactivity-advanced.html#effectscope)上注册一个处理回调函数。当相关的 effect 作用域停止时会调用这个回调函数。

这个方法可以作为可复用的组合式函数中 `onUnmounted` 的替代品，它并不与组件耦合，因为每一个 Vue 组件的 `setup()` 函数也是在一个 effect 作用域中调用的。

```tsx
function onScopeDispose(fn: () => void): void

```



# 二、Treeshaking

```
Tree shaking` 是一种通过清除多余代码方式来优化项目打包体积的技术，专业术语叫 `Dead code elimination
```

在`Vue2`中，无论我们使用什么功能，它们最终都会出现在生产代码中。主要原因是`Vue`实例在项目中是单例的，捆绑程序无法检测到该对象的哪些属性在代码中被使用到

```
import Vue from 'vue'
```

而`Vue3`源码引入`tree shaking`特性，将全局 API 进行分块。如果您不使用其某些功能，它们将不会包含在您的基础包中

### 使用方法

`Tree shaking`无非就是做了两件事：

- 编译阶段利用`ES6 Module`判断哪些模块已经加载
- 判断那些模块和变量未被使用或者引用，进而删除对应代码

通过`Tree shaking`，`Vue3`给我们带来的好处是：

- 减少程序体积（更小）
- 减少程序执行时间（更快）
- 便于将来对程序架构进行优化（更友好）

```javascript
// webpack.config.js
optimization: { 
    usedExports: true,
    minimize: true,  // webpack 4中UglifyjsWebpackPlugin可以通过minimize设置
}
```

# 三、Vue3.0-Composition Api & Vue2.0 Options Api

#### 1、Options Api

`Options API`，即大家常说的选项API，即以`vue`为后缀的文件，通过定义`methods`，`computed`，`watch`，`data`等属性与方法，共同处理页面逻辑

#### 2、Composition Api

在 Vue3 Composition API 中，组件根据逻辑功能来组织的，一个功能所定义的所有 API 会放在一起（更加的高内聚，低耦合）

#### 小结

- 在逻辑组织和逻辑复用方面，`Composition API`是优于`Options API`
- 因为`Composition API`几乎是函数，会有更好的类型推断。
- `Composition API `对 `tree-shaking` 友好，代码也更容易压缩
- `Composition API`中见不到`this`的使用，减少了`this`指向不明的情况
- 如果是小型组件，可以继续使用`Options API`，也是十分友好的

# 四、Vue3.0为何用Proxy API代替defineProperty API

### 一、Object.defineProperty

定义：`Object.defineProperty()` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象

#### 为什么能实现响应式

通过`defineProperty` 两个属性，`get`及`set`

- get

属性的 getter 函数，当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 this 对象（由于继承关系，这里的this并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值

- set

属性的 setter 函数，当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象。默认为 undefined

#### 小结

- 检测不到对象属性的添加和删除
- 数组`API`方法无法监听到
- 需要对每个属性进行遍历监听，如果嵌套对象，需要深层监听，造成性能问题

`Proxy` 不兼容IE，也没有 `polyfill`, `defineProperty` 能支持到IE9

# 五、Vue3的性能提升体现在那些方面

### 1.编译阶段

因此，`Vue3`在编译阶段，做了进一步优化。主要有如下：

- diff算法优化：`vue3`在`diff`算法中相比`vue2`增加了静态标记
- 静态提升：`Vue3`中对不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用
- 事件监听缓存：上述发现开启了缓存后，没有了静态标记。也就是说下次`diff`算法的时候直接使用
- SSR优化：当静态内容大到一定量级时候，会用`createStaticVNode`方法在客户端去生成一个static node，这些静态`node`，会被直接`innerHtml`，就不需要创建对象，然后根据对象渲染

### 2.源码体积

​		相比`Vue2`，`Vue3`整体体积变小了，除了移出一些不常用的API，再重要的是`Tree shanking`

### 3.响应式系统

`vue2`中采用 `defineProperty`来劫持整个对象，然后进行深度遍历所有属性，给每个属性添加`getter`和`setter`，实现响应式

`vue3`采用`proxy`重写了响应式系统，因为`proxy`可以对整个对象进行监听，所以不需要深度遍历

- 可以监听动态属性的添加
- 可以监听到数组的索引和数组`length`属性
- 可以监听删除属性

# 六、从Vue2.0到Vue3.0

## 1.父组件数据传递到子组件

**defineProps()**:

```tsx
<script setup>
const props = defineProps({
  someProp: {
    type: String,
    required: true
  }
})
</script>
```

**!Notice!**:注意：`defineProps` 、`defineEmits` 、 `defineExpose` 和 `withDefaults` 这四个宏函数只能在 `<script setup>` 中使用。他们不需要导入，会随着 `<script setup>` 的处理过程中一起被编译。

## 2.子组件数据向父组件传递

**$emit：**`$emit` 无法在 `<script setup>` 中使用，这时候我们需要使用 `defineEmits()`：

```js
const emit = defineEmits(['someEvent'])
function onClick() {
  emit('someEvent', 'child message')
}
//父组件接受并且定义函数
  <ChildView @some-event="someEvent" />
function someEvent(value) {
  console.log(value) // child message
}
```

## 3.父组件使用子组件数据

在 `<script setup>` 中，组件的属性和方法默认都是私有的。父组件无法访问到子组件中的任何东西，除非子组件通过 `defineExpose` 显式的暴露出去：

```js
<!-- 子组件 -->
<script setup>
import { ref } from 'vue'

const msg = ref('hello vue3!')
function change() {
  msg.value = 'hi vue3!'
  console.log(msg.value)
}
// 属性或方法必须暴露出去，父组件才能使用
defineExpose({ msg, change })
</script>

<!-- 父组件 -->
<script setup>
import ChildView from './ChildView.vue'
import { ref, onMounted } from 'vue'

const child = ref(null)
onMounted(() => {
  console.log(child.value.msg) // hello vue3!
  child.value.change() // hi vue3!
})
</script>

<template>
  <ChildView ref="child"></ChildView>
</template>
```

## 4.组件之间双向绑定

 Vue2 中组件的双向绑定采用的是 `v-model` 或 `.snyc` 修饰符，两种写法多少显得有点重复，于是在 Vue3 中合成了一种。Vue3 统一使用 `v-model` 进行处理，并且可以和多个数据进行绑定，如 `v-model:foo`、`v-model:bar`。

```
v-model` 等价于 `:model-value="someValue"` 和 `@update:model-value="someValue = $event"
v-model:foo` 等价于 `:foo="someValue"` 和 `@update:foo="someValue = $event"
```

## 5.路由跳转，获取路由参数

Vue2 中我们通常是使用 `this.$router` 或 `this.$route` 来进行路由的跳转和参数获取，但在 `<script-setup>`中，是这些方法无法使用的。我们可以使用 `vue-router` 提供的 `useRouter` 方法，来进行路由跳转：

```js
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function onClick() {
  router.push({
    path: '/about',
    query: {
      msg: 'hello vue3!'
    }
  })
}
</script>
```

## 6.获取上下文

vue3的setup中无法使用this这个上下文，蛋可以使用getCurrentInstance

```js
<script setup>
import { getCurrentInstance } from 'vue'

// 以下两种方法都可以获取到上下文对象
const { ctx } = getCurrentInstance()
const { proxy }  = getCurrentInstance()
</script>

```

注意：`ctx` 只能在开发环境使用，生成环境为 undefined 。 推荐使用 `proxy` ，在开发环境和生产环境都可以使用。

## 7.插槽的使用

 Vue2 的中一般是通过 `slot` 属性指定模板的位置，通过 `slot-scope` 获取作用域插槽的数据

```js
<!-- 父组件 -->
<script setup>
import ChildView from './ChildView.vue'
</script>

<template>
  <div>parent<div>
  <ChildView>
    <template slot="content" slot-scope="{ msg }">
      <div>{{ msg }}</div>
    </template>
  </ChildView>
</template>
<!-- 子组件 -->
//slot <===> name    slot-scope<===>slot绑定是数据（插槽作用域数据） 
<template>
  <div>child</div>
  <slot name="content" msg="hello vue3!"></slot>
</template>
```

Vue3 中则是通过 `v-slot` 这个指令来指定模板的位置，同时获取作用域插槽的数据，如：

```js
<!-- 父组件 -->
<script setup>
import ChildView from './ChildView.vue'
</script>

<template>
  <div>parent</div>
  <ChildView>
    <template v-slot:content="{ msg }">
      <div>{{ msg }}</div>
    </template>
  </ChildView>
</template>

<!-- ChildView 也可以简写为： -->
<ChildView>
  <template #content="{ msg }">
    <div>{{ msg }}</div>
  </template>
</ChildView>
<!-- 子组件 -->
<template>
  <div>child</div>
  <slot name="content" msg="hello vue3!"></slot>
</template>
```

## 8.缓存路由组件

缓存一般的动态组件，Vue3 和 Vue2 的用法是一样的，都是使用 `KeepAlive` 包裹 `Component`。但缓存路由组件，Vue3 需要结合插槽一起使用：

```js
// Vue2 中缓存路由组件
<KeepAlive>
  <RouterView />
</KeepAlive>
// Vue3 中缓存路由组件
<RouterView v-slot="{ Component }">
  <KeepAlive>
    <Component :is="Component">		       </Component>
  </KeepAlive>
</RouterView>
```

一个持续存在的组件可以通过 `onActivated()` 和 `onDeactivated()` 两个生命周期钩子注入相应的逻辑：

```js
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
})

onDeactivated(() => {
  // 调用时机为从 DOM 上移除、进入缓存
  // 以及组件卸载时
})
</script>
```

