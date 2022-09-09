## 初识React

​			何为React，React用于构建用户界面的javascript库，

### 特性：

- JSX语法

- 单项数据绑定

- 虚拟DOM

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

​		在 `React` 中，一切皆为组件。通常将应用程序的整个逻辑分解为小的单个部分。 我们将每个单独的部分称为组件

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

  ### React的优势

  - 高效灵活
  - 声明式的设计，简单使用
  - 组件式开发，提高代码复用率
  - 单向响应的数据流会比双向绑定的更安全，速度更快

## React的生命周期

​	至React16.4版本后，React的生命周期大体可分为三个部分：

创建阶段、更新阶段、卸载阶段

#### **创建阶段:**

1. ​	**constructor:**自动调用，在内部方法中通过super关键字来调用父级组件的props，通常的操作为初始化state状态或者在this上挂载方法。

2. ​	**getDerivedStateFromProps：**新增的一个生命周期,是一个静态方法，不能访问到组件实例，执行时机：不论props变化还是state变化，都会调用，在每次render方法前调用，第一个参数为即将更新的props，第二个参数为上一个状态的state，比较以前的props个state来加一些限制条件，防止无用的state更新。改方法需要放回一个新的对象作为新的state或者返回null表示state状态不需要更新

3. ​	**render：**类组件必须实现的方法，用于渲染DOM结构，可以访问组件state与prop属性

   **Notice:**不要在render里面setState否则会触发死循环导致内存崩溃。

4. ​	**componentDidmount:**

   组件挂载到真实DOM后执行，在render方法之后执行，此方法多用于数据的获取，事件监听等操作。

   #### 更新阶段：

5. getDerivedStateFromProps：此方法通创建时期一样。

6. shouldComponentUpdate：用于告知组件本身当前的props和state是否需要重新渲染组件，默认返回true，执行时机：到新的props或者state时都会调用，通过返回true或者false告知组件更新与否，一般情况，不建议在改周期进行深层比较，会影响效率同事也不能调用setstate否则会触发无线循环更新。

7. 7.render：同上

8. getSnapshotBeforeUpdate：在render函数后面执行，执行时DOM元素还没更新，改方法返回一个snapshot值，作为componentDidUpdate第三个参数传入

   ```javascript
   getSnapshotBeforeUpdate(prevProps, prevState) {
       console.log('in getSnapshotBeforeUpdate');
       return 'componentDidUpdate 第三个参数';
   }
   
   componentDidUpdate(prevProps, prevState, snapshot) {
       console.log(snapshot);//componentDidUpdate 第三个参数
   }
   ```

   此方法的目的在于获取组件更新前的一些信息，比如组件的滚动位置之类的，在组件更新后可以根据这些信息恢复一些UI视觉上的状态

9. componentDidUpdate：组件更新结束触发，在该方法中，可以根据前后的`props`和`state`的变化做相应的操作，如获取数据，修改`DOM`样式

   #### 卸载阶段

10. 用于组件被卸载前，清理一些注册监听时间，或者取消订阅的网络请求等，一旦一个组件示例被卸载，只能重建，不可再次被挂载。

<img src="https://static.vue-js.com/66c999c0-d373-11eb-85f6-6fac77c0c9b3.png"/>

相比于React16.4版本之前的生命周期：

移除了componentWillMount、conponentWillReceiveProps、componentWillUpdate

新增了getDerivedStateFromProps、getSnapShotBeforeUpdate

但是移除的三个旧版依然存在，但必须在前面加上UNSAFE_前缀。如`UNSAFE_componentWillMount`