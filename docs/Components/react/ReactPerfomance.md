## React中可以做的性能优化？

使用 **shouldComponentUpdate** 避免不需要的渲染，但是如果对 props 和 state 做深比较，代价很大，所以需要根据业务进行些取舍；在有子组件的情况下，为了避免子组件的重复渲染，可以通过父组件来判断子组件是否需要 PureRender。

**将 props 设置为数组或对象**：每次调用 React 组件都会创建新组件，就算传入的数组或对象的值没有改变，他们的引用地址也会发生改变，比如，如果按照如下的写法，那么每次渲染时 style 都是一个新对象

```javascript
// 不推荐
<button style={{ color: 'red' }} />

// 推荐
const style = { color: 'red' }
<button style={style} />

// 不推荐
<button style={this.props.style || {} } />  

// 推荐
const defaultStyle = {}
<button style={this.props.style || defaultStyle } /> 
```

- 将函数的绑定移动到构造函数内：可以避免每次都绑定事件。
- 使用 immutable 不可变数据，在我们项目中使用引用类型时，为了避免对原始数据的影响，一般建议使用 shallowCopy 和 deepCopy 对数据进行处理，但是这样会造成 CPU 和 内存的浪费，所以推荐使用 immutable，优点如下
  - 降低了“可变”带来的复杂度
  - 节省内存，immutable 使用结构共享尽量复用内存，没有被引用的对象会被垃圾回收
  - 可以更好的做撤销/重做，复制/粘贴，时间旅行
  - 不会有并发问题（因为数据本身就是不可变的）
  - 拥抱函数式编程
- 给子组件设置一个唯一的 key，因为在 diff 算法中，会用 key 作为唯一标识优化渲染