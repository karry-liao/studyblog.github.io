## 初识 React

​ 何为 React，React 用于构建用户界面的 javascript 库，

### 特性：

- JSX 语法

- 单项数据绑定

- 虚拟 DOM

- 声明式编程

- Component

  何为**声明式编程**：此为一种编程范式，关注与要做什么，而不是要怎么做，它表达逻辑而不显式地定义步骤。这意味着我们需要根据逻辑的计算来声明要显示的组件

  如实现一个标记的地图：

  通过命令式创建地图、创建标记、以及在地图上添加的标记的步骤如下：

  ```javascript
  // 创建地图
  const map = new Map.map(document.getElementById("map"), {
    zoom: 4,
    center: { lat, lng },
  });

  // 创建标记
  const marker = new Map.marker({
    position: { lat, lng },
    title: "Hello Marker",
  });

  // 地图上添加标记
  marker.setMap(map);
  ```

  **React**：

  ```javascript
  <Map zoom={4} center={(lat, lng)}>
    <Marker position={(lat, lng)} title={"Hello Marker"} />
  </Map>
  ```

  声明式编程方式使得 `React` 组件很容易使用，最终的代码简单易于维护

### React-Component

​ 在 `React` 中，一切皆为组件。通常将应用程序的整个逻辑分解为小的单个部分。 我们将每个单独的部分称为组件

组件可以是一个函数或者是一个类，接受数据输入，处理它并返回在 `UI` 中呈现的 `React` 元素

函数式组件如下：

```javascript
const Header = () => {
  return (
    <message style={{ backgroundColor: "orange" }}>
      <h1>click it</h1>
    </message>
  );
};
```

类组件（有状态组件）如下：

```javascript
class animals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className="animals">
        <cat />
        <dog />
      </div>
    );
  }
}
```

### 组件的特点：

- 可组合：每个组件易于和其它组件一起使用，或者嵌套在另一个组件内部

- 可重用：每个组件都是具有独立功能的，它可以被使用在多个 UI 场景

- 可维护：每个小的组件仅仅包含自身的逻辑，更容易被理解和维护

  ### React 的优势

  - 高效灵活
  - 声明式的设计，简单使用
  - 组件式开发，提高代码复用率
  - 单向响应的数据流会比双向绑定的更安全，速度更快

## React 的生命周期

​ 至 React16.4 版本后，React 的生命周期大体可分为三个部分：

创建阶段、更新阶段、卸载阶段

#### **创建阶段:**

1. ​ **constructor:**自动调用，在内部方法中通过 super 关键字来调用父级组件的 props，通常的操作为初始化 state 状态或者在 this 上挂载方法。

2. ​ **getDerivedStateFromProps：**新增的一个生命周期,是一个静态方法，不能访问到组件实例，执行时机：不论 props 变化还是 state 变化，都会调用，在每次 render 方法前调用，第一个参数为即将更新的 props，第二个参数为上一个状态的 state，比较以前的 props 个 state 来加一些限制条件，防止无用的 state 更新。改方法需要放回一个新的对象作为新的 state 或者返回 null 表示 state 状态不需要更新

3. ​ **render：**类组件必须实现的方法，用于渲染 DOM 结构，可以访问组件 state 与 prop 属性

   **Notice:**不要在 render 里面 setState 否则会触发死循环导致内存崩溃。

4. ​ **componentDidmount:**

   组件挂载到真实 DOM 后执行，在 render 方法之后执行，此方法多用于数据的获取，事件监听等操作。

   #### 更新阶段：

5. **getDerivedStateFromProps**：此方法通创建时期一样。

6. **shouldComponentUpdate**：用于告知组件本身当前的 props 和 state 是否需要重新渲染组件，默认返回 true，执行时机：到新的 props 或者 state 时都会调用，通过返回 true 或者 false 告知组件更新与否，一般情况，不建议在改周期进行深层比较，会影响效率同事也不能调用 setstate 否则会触发无线循环更新。

7. **render**：同上

8. **getSnapshotBeforeUpdate**：在 render 函数后面执行，执行时 DOM 元素还没更新，改方法返回一个 snapshot 值，作为 componentDidUpdate 第三个参数传入

   ```javascript
   getSnapshotBeforeUpdate(prevProps, prevState) {
       console.log('in getSnapshotBeforeUpdate');
       return 'componentDidUpdate 第三个参数';
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
       console.log(snapshot);//componentDidUpdate 第三个参数
   }
   ```

   此方法的目的在于获取组件更新前的一些信息，比如组件的滚动位置之类的，在组件更新后可以根据这些信息恢复一些 UI 视觉上的状态

9. **componentDidUpdate**：组件更新结束触发，在该方法中，可以根据前后的`props`和`state`的变化做相应的操作，如获取数据，修改`DOM`样式

   #### 卸载阶段

10. 用于组件被卸载前，清理一些注册监听时间，或者取消订阅的网络请求等，一旦一个组件示例被卸载，只能重建，不可再次被挂载。

<img src="https://static.vue-js.com/66c999c0-d373-11eb-85f6-6fac77c0c9b3.png"/>

相比于 React16.4 版本之前的生命周期：

移除了 componentWillMount、conponentWillReceiveProps、componentWillUpdate

新增了 getDerivedStateFromProps、getSnapShotBeforeUpdate

但是移除的三个旧版依然存在，但必须在前面加上 UNSAFE\_前缀。如`UNSAFE_componentWillMount`

父子组件的挂载生命周期函数，可以发现挂载时，子组件的挂载钩子先被触发；卸载时，父组件的卸载钩子先被触发。

## Redux 和 Vuex 区别

相同点：

- ​ state 共享数据
- ​ 流程一直：定义全局 state，触发，修改 state
- ​ 原理相似，通过全局注入 store

不同点：

​ 从实现原理上来讲：

- ​ Redux 使用的是不可变数据，儿 Vuex 的数据时可变的，Redux 每次都是用新的 state 替换就得 state，而 Vuex 是直接修改
- ​ Redux 在检测数据变化的时候，是通过 diff 的方式比较，而 Vuex 其实和 Vue 的原理一样，是通过 getter/setter 来比较

​ 从表现层来讲：

- ​ Vuex 定义了 state，getter，mutatuion，action 四个对象；Redux 定义了 state，reducer，action
- ​ Vuex 中的 state 统一存放，方便理解；reduxstate 依赖所有的 reducer 出事之后
- ​ vuex 有 getter,目的是快捷得到 state；redux 没有这层，react-redux mapStateToProps 参数做了这个工作。
- ​ vuex 中 mutation 只是单纯赋值(很浅的一层)；redux 中 reducer 只是单纯设置新 state(很浅的一层)。他俩作用类似，但书写方式不同
- ​ action 中可简单可复杂,简单就直接发送数据对象（{type:xxx, your-data}）,复杂需要调用异步 ajax（依赖 redux-thunk 插件）。
- ​ vuex 触发方式有两种 commit 同步和 dispatch 异步；redux 同步和异步都使用 dispatch

## 共同思想

- 单一的数据源
- 变化可以预测

本质上 ∶ redux 与 vuex 都是对 mvvm 思想的服务，将数据从视图中抽离的一种方案。

## Redux 中的 connect 有什么作用？

​ connect 负责连接 React 和 Redux

**获取 state**

​ connect 通过 context 获取 Provider 中的 store，通过 store.getState()获取整个 store tree 上的 state。

**包装原组件**

​ 将 state 和 action 通过 props 的方式传入到原组件内部，wrapWithConnect 返回一个 ReactCommponent 对象 Connect，Connect 重新 render 外部传入的原组件 WrappedComponent，并把 connect 中传入的 `mapStateToProps`，`mapDispatchToProps`与组件上原有的 props 合并后，通过属性的方式传给 `WrappedComponent`

**监听 store tree 变化**

​ connect 缓存了`store tree`中 state 的状态，通过当前 state 状态 和变更前 state 状态进行比较，从而确定是否调用 `this.setState()`方法触发 Connect 及其子组件的重新渲染

## Redux 状态管理和变量挂载在 window**中的区别**

两者都是存储数据以供后期使用。但是 Redux 状态更改可回溯——`Time travel`，数据多了的时候可以很清晰的知道改动在哪里发生，完整的提供了一套状态管理模式。
