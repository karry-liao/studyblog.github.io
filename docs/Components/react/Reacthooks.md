## 一、何为dangerouslySetInnerHtml？

​		在React中,```dangerouslySetInnerHtml```相当于浏览器DOM中的innerHTML属性，当使用`dangerouslySetInnerHTML` ，React也知道该特定元素的内容是动态的，对于该节点的子节点，它只是跳过与虚拟DOM的比较，以获得一些额外的性能。

正如该属性的名称所暗示的，使用它可能是危险的，因为它使你的代码容易受到跨站脚本（XSS）攻击。特别是当你从第三方来源获取数据或渲染用户提交的内容时，这就成为一个问题。

```javascript
const App = () => {
  const data = 'lorem <b>ipsum</b>';

  return (
    <div
      //分析data，使b标签生效
      dangerouslySetInnerHTML={{__html: data}}
    />
  );
}

export default App;
```

**NOTICE:**它应该是一个带有传递给`__html` 键的对象`dangerouslySetInnerHTML` 。除此之外，你使用`dangerouslySetInnerHTML` 属性的元素不应该有任何孩子，因此要使用`<div>` 元素作为自闭标签。

传递对象的要求只是另一种保障措施，以防止开发者在没有阅读文档和意识到潜在危险的情况下使用它。

除此之外，`dangerouslySetInnerHTML` 哈可能会被用来执行恶意脚本。如下：

```javascript
const App = () => {
  const data = `lorem ipsum <img src="" onerror="alert('message');" />`;

  return (
    <div
      dangerouslySetInnerHTML={{__html: data}}
    />
  );
}

export default App;
```

**应对方案：**   **DOMPurify**

```javascript
import DOMPurify from 'dompurify'

const App = () => {
  const data = `lorem <b onmouseover="alert('mouseover');">ipsum</b>`
  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(data)
  })

  return (
    <div
      dangerouslySetInnerHTML={sanitizedData()}
    />
  );
}
export default App;
```

请注意，由于DOMPurify需要一个DOM树，而Node环境没有，你要么使用`jsdom` 包来创建一个`window` 对象，并用它来初始化`DOMPurify` ，要么单独使用`isomorphic-dompurify` 包来代替，它同时封装了`DOMPurify` 和`jsdom` 包。

```javascript
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const clean = DOMPurify.sanitize(dirty);
```

## 二、常用React Hooks有哪些？

1. #### useState

   **类组件中**：可以用this.state来定义组件的状态

   ```javascript
   import React from 'react'
   
   class StateClass extends React.Component{
       constructor(){
           super()
           this.state = {
               name: '类'
           }
       }
       render() {
           return (
               <div onClick={ this.setName }>
                   这是一个类组件————{ this.state.name }
               </div>
           )
       }
       setName = () => {
           this.setState({
               name: '我通过类组件方法变成这样了'
           })
       }
   }
   export default StateClass
   ```

   **函数组件中**：使用useState来定义函数组件的装填，使用seState来创建状态。

   ```javascript
   import React,{ useState } from 'react'
   
   function StateFunction () {
       const [name, setName] = useState('函数')
       //     类名，修改函数名            初始值
   
       return (
           <div onClick={ () => setName('我使用hooks变成这样了') }>
           //    setName也可以写入方法，如setName（ val => val+'xxxx' ）
               这是一个函数式组件————{name}
           </div>
       )
   }
   
   export default StateFunction
   ```

2. #### useEffect

   `useEffect`又称副作用`hooks`。作用：给没有生命周期的组件，添加结束渲染的信号。执行时机：在渲染结束之后执行

   什么是副作用？

   - 副作用 ( side effect ): 数据获取，数据订阅，以及手动更改 React 组件中的 DOM 都属于副作用
   - 因为我们渲染出的页面都是静态的，任何在其之后的操作都会对他产生影响，所以称之为副作用

   使用：

   ◆第一个参数，接受一个函数作为参数

   ◆第二个参数，接受一个依赖列表，只有依赖更新时，才会执行函数

   ◆返回一个函数，先执行返回函数，再执行参数函数

   ​		如果没有第二个参数，那么在第一次渲染完成之后和每次更新渲染页面的时候，都会调用`useEffect`的回调函数。

   ​		有第二个参数，第二个参数传入一个数组，这个数组表示的是更新执行所依赖的列表，只有依赖列表改变时（当数组中的任意一项变化的时候，useEffect会被重新执行 ），才会触发回调函数。传入的为空数组`[]`，那么即告诉`useEffect`不依赖于`state`、`props`中的任意值，`useEffect`就只会运行一次，常用场景为页面获取数据的方法可以写入此处进行调用，以获取页面初始数据。

   ```javascript
   useEffect( () => {  
     console.log('没有第二个参数，函数式组件结束渲染')  
   })  
   useEffect( () => {  
     console.log('第二个参数为数组,函数式组件结束渲染')  
   },[num,val])  
   useEffect( () => {  
     console.log('第二个参数为[],函数式组件结束渲染')  
   },[]) 
   ```

**清除副作用：**

```javascript
useEffect( () => {  
console.log('2222函数式组件结束渲染')  
const updateMouse = (e) => {  
   console.log('打印当前位置')  
   setPositions({ x:e.clientX, y:e.clientY })  
}  
document.addEventListener('click',updateMouse) //  添加绑定方法事件(要修改依赖，绑定到依赖上)  
return () => {  
   //  在每次执行useEffect之前都会执行上一次return中内容  
   document.removeEventListener('click',updateMouse)  
   //  移除绑定方法事件(要修改依赖，绑定到依赖上)  
   console.log('1111销毁')  
}  
})  
```

- ①useEffect调度不会阻塞浏览器更新屏幕<异步>
- ②每次重新渲染都会生成新的effect，替换掉之前的，确保effect中获取的值是最新的，不用担心过期。

**与类组件进行对比**：如果放到类组件中，则是打印设置的时间内改变的最终值，在类组件中同等代码如下（仅给出关键代码）。打印设置的时间内改变的最终值是什么意思呢？如果你设置3000毫秒，那么渲染结束的瞬间开始计时，3000毫秒内连续点击三次，那么最终就会打印4次`3`，如果先等第一次`componentDidMount`中设置的定时器结束，再突然3000毫秒内连续点击三次，那么就会先打印第一次的`0`，再打印三次`3`，**因为类写法中是共用的同一个`num`状态值**。（如果你将时间设置为`0`毫秒，那么其实你连续点击三次，会跟`useEffect`一样，也是先打印一次`0`，再接着打印`1、2、3`，因为这个变化反应很快，你感觉不到差异。

```javascript
this.state = {  
    num:0  
}  
componentDidMount(){  
  setTimeout(() => {  
      console.log(this.state.num)  
  },3000)  
}  
componentDidUpdate(){  
  setTimeout(() => {  
      console.log(this.state.num)  
  },3000)  
}  
render() {  
  return (  
      <div onClick={ this.setNum }>  
          这是一个类组件————{ this.state.num }  
      </div>  
  )  
}  
setNum = () => {  
  this.setState({  
      num: this.state.num+1  
  })  
}  
```

##### **`useEffect`如何支持async/await？：**

​			

```javascript
//做法一：创建一个异步函数（`async...await` 的方式），然后执行该函数。
useEffect(() => {
  const asyncFun = async () => {
    setPass(await mockCheck());
  };
  asyncFun();
}, []);

//做法二：也可以使用 IIFE，如下所示：  立即执行函数
useEffect(() => {
  (async () => {
    setPass(await mockCheck());
  })();
}, []);
//做法三自定义Hooks    有待研究....
```



#### 3.useLayoutEffect

​		一般将`useLayoutEffect`称为有`DOM`操作的副作用`hooks`。作用是在`DOM`更新完成之后执行某个操作。执行时机：在`DOM`更新之后执行

与`useEffect`对比

- 相同点

  - 1.第一个参数，接收一个函数作为参数
  - 2.第二个参数，接收【依赖列表】，只有依赖更新时，才会执行函数
  - 3.返回一个函数，先执行返回函数，再执行参数函数
  - （所以说执行过程的流程是一样的）

- 不同点

  - 执行时机不同。`useLayoutEffect`在`DOM`更新之后执行；`useEffect`在`render`渲染结束后执行。执行示例代码会发现`useLayoutEffect`永远比`useEffect`先执行，这是因为`DOM`更新之后，渲染才结束或者渲染还会结束

  ```javascript
  const [num, setNum] = useState(0)
  //在类组件中用componentWillMount生命周期来实现
  useLayoutEffect( () => {
      console.log('useLayoutEfffect')
      //    也可以在此进行事件绑定
      return () => {
          //    也可以在此进行事件绑定移除
          console.log(1)
      }
  },[num])
  
  useEffect( () => {
      console.log('useEffect')
  },[num])
  
  return (
      <div onClick={ () => setNum( num => num+1 ) }>
          这是一个函数式组件————{num}
      </div>
  )
  ```

#### 4.useMemo

使用`useMemo`可以传递一个创建函数和依赖项，创建函数会需要返回一个值，只有在依赖项发生改变的时候，才会重新调用此函数，返回一个新的值。简单来说，作用是让组件中的函数跟随状态更新（即优化函数组件中的功能函数）。

- 使用：

  - 1.接收一个函数作为参数
  - 2.同样接收第二个参数作为依赖列表（可以与useEffect、useLayoutEffect进行对比学习）
  - 3.返回的是一个值。返回值可以是任何，函数、对象等都可以

  ```javascript
  const [num, setNum] = useState(1)  
  const [age, setAge] = useState(18)  
  const getDoubleNum = useMemo( () => {  
    console.log(`获取双倍Num${num}`)  
    return 2 * num  //    假设为复杂计算逻辑  
  },[num] )  
  return (  
    <div onClick={ () => { setAge( age => age+1 ) }  }>  
        <br></br>  
        这是一个函数式组件————num：{  getDoubleNum }  //  注意这里没括号，因为是返回值  
        <br></br>  
        age的值为————{ age }  
        <br></br>  
    </div>  
  )  
  ```

  只有在```useMemo```的第二个参数[num]更新时，才会触发更新```getDoubleNum```函数的执行，从而优化项目提升性能。

##### 父子组件重复渲染问题优化使用场景

​		未优化前代码如下。子组件包裹一个`memo`，但是包裹了还是会重新渲染, 为什么呢？因为我们定义的`info`是`const`定义的一个局部变量,每次重新渲染都是重新定义一个新的`info`，然后子组件进行浅层比较时候，`info`永远是不一样的，所以就会重新渲染（可以按照例子点击按钮，会发现子组件不断打印`我是子组件`）。如果子组件比较复杂的情况下，那么就会对页面性能产生影响.

```javascript
const Child = memo( () => {  
  console.log('我是子组件')  
  return <p>我是子组件</p>  
})  
function Parent() {  
  const [show,setShow] = useState(true) 
  //未优化
  const info = {  
      name: 'Even',  
      age: 22  
  }  
  //优化  当点击按钮后，因为info其包裹的useMemo依赖并没有改     变，返回值是同一个值，不会对子组件重新渲染
  //const info = useMemo( () => {  
  //return {  
  //    name: 'Even',  
  //    age: 22  
  //}  
//},[])  
  return(  
      <div>  
          <Child info={ info } />  
          <button onClick={ () => setShow(!show) }>点击更新状态</button>  
      </div>  
  )  
}  
```

#### 5.useCallback

​		作用：作用也是让某些操作、方法跟随状态的更新而去执行。

与`useMemo`对比。

- 可以简单这样看作，`useMemo(() => Fn,deps)`相当于`useCallback(Fn,deps)`

不同点：

- `useCallback`是对传过来的回调函数优化，返回的是一个函数；`useMemo`返回值可以是任何，函数，对象等都可以

相同点：

- 在使用方法上，`useMemo`与`useCallback`相同。接收一个函数作为参数，也同样接收第二个参数作为依赖列表

#### useCallback的适用场景

​	可以对父子组件传参渲染的问题进行优化。简单来说就是，**父组件的传入函数不更新，就不会触发子组件的函数重新执行**

```javascript
function Parent () {

    const [num, setNum] = useState(1)
    const [age, setAge] = useState(18)

    const getDoubleNum = useCallback( () => {
        console.log(`获取双倍Num${num}`)
        return 2 * num
    },[num] )

    return (
        <div onClick={ () => {setNum( num => num+1 )} }>
            这是一个函数式组件————num:{  getDoubleNum() }
            <br></br>
            age的值为————age:{ age }
            <br></br>
            set.size:{set.size}
            <Child callback={ getDoubleNum() }></Child>
        </div>
    )
}

function Child(props) {
    useEffect( () => {
        console.log('callback更新了') //这里代表的是需要跟随传入内容的改变而同步进行的操作
    },[props.callback])

    return (
        <div>
            子组件的getDoubleNum{props.callback}
        </div>
    )
}
```

**简单总结使用场景判断：**

- 在子组件不需要父组件的值和函数的情况下，只需要使用`memo`函数包裹子组件即可
- 如果有函数传递给子组件，使用`useCallback`
- 缓存一个组件内的复杂计算逻辑需要返回值时，使用`useMemo`
- 如果有值传递给子组件，使用`useMemo`

#### 6.useRef

​		`useRef`返回一个子元素索引，此索引在整个生命周期中保持不变。作用也就是：长久保存数据。注意事项，保存的对象发生改变，不通知。属性变更不会重新渲染

```javascript
const [num, setNum] = useState(0)  
//在未使用Ref时，无法在num>10时清除定时器，因为每次渲染都是通过setInterval重新返回的timer，timer也在更新，也就丢失了timer这个数据，导致无法准确清除某个需要清除的定时器
//useEffect( () => {  
//  timer = setInterval( () => {  
//      setNum( num => num+1 )  
//  },400 )  
//},[] )  
const ref = useRef()  
useEffect( () => {  
ref.current = setInterval( () => {  
   setNum( num => num+1 )  
},400 )  
// ref.current = '111'  
},[] )  
useEffect( () => {  
if(num > 10){  
   console.log('大于10了，清除定时器')  
   console.log('ref.current',ref.current)  
   clearTimeout(ref.current)  
}  
},[num] )  
return (  
<div>  
   这是一个函数式组件————num:{  num }  
</div>  
)  
```

重新赋值`ref.current`不会主动触发页面重新渲染。当我们将代码修改成下面这样，会在控制台打印发现`ref.current`的值打印为`111`，但是页面视图上显示的还是空，这是因为`ref`保存的对象发生改变，不会主动通知，属性变更不会重新渲染

```javascript
const [num, setNum] = useState(0)  
const ref = useRef()  
useEffect( () => {  
ref.current = '111'  
console.log('ref.current',ref.current)  
},[] )  
return (  
<div>  
     这是ref.current的值——ref.current:{ ref.current }  
   <br></br>  
   这是一个函数式组件————num:{  num }  
</div>  
)  
```

#### 7.useContext

​		**`useContext`是让子组件之间共享父组件传入的状态的。作用通俗地说是带着子组件去流浪。**

**使用方法：**

- 需要引入`useContetx`，`createContext`两个内容
- 通过`createContext`创建一个context句柄
- `Context.Provider`来确定数据共享范围
- 通过`value`来分发内容
- **注意事项**，上层数据发生改变，肯定会触发重新渲染（点击`button`按钮触发父组件更新传入的`num`值能看到子组件重新渲染）

```javascript
const Context = createContext(null)  
function StateFunction () {  
const [num, setNum] = useState(1)  
return (  
   <div>  
       <button onClick={ ()=> setNum(num => num+1) }>增加num的值+1</button>  
       <br></br>  
       这是一个函数式组件——num:{  num }  
       <Context.Provider value={num}>  
           <Item3></Item3>  
           <Item4></Item4>  
       </Context.Provider>  
   </div>  
)  
}  
function Item3 () {  
const num = useContext(Context)  
return (  
   <div>  
       子组件3: { num }  
   </div>  
)  
}  
function Item4 () {  
const num = useContext(Context)  
return (  
   <div>  
       子组件4: { num+2 }  
   </div>  
)  
}  
```



#### 8.useReducer

​		以前是只能在类组件中使用`Redux`，现在我们可以通过`useReducer`在函数式组件中使用`Redux`。作用是可以从状态管理的工具中获取到想要的状态。

​		如何使用`useReducer`。`Redux`必须要有的内容就是仓库`store`和管理者`reducer`。而`useReducer`也是一样的，需要创建数据仓库`store`和管理者`reducer`，即示例代码注释处。然后我们就可以通过`①`处的定义一个数组获取状态和改变状态的动作，触发动作的时候需要传入`type`类型判断要触发`reducer`哪个动作，然后进行数据的修改。需要注意的地方是，在`reducer`中`return`的对象中，需要将`state`解构，否则状态就剩下一个`num`值了

```javascript
const store = {  
  age:18,  
  num:1  
}    //    数据仓库  
const reducer = (state, action) => {  
  switch(action.type){  
      case 'add':  
          return {  
              ...state,  
              num: action.num+1  
          }  
      default:  
          return {  
              ...state  
          }  
  }  
} //    管理者  
function StateFunction () {  
  const [state,dispacth] = useReducer(reducer,store)  //    ①  
  return (  
      <div>  
          <button onClick={ () => {  
              dispacth({  
                  type: 'add',  
                  num: state.num  
              })  
          } }>  
              增加num的值+1  
          </button>  
          <br></br>  
          这是一个函数式组件——num:{  state.num }  
      </div>  
  )  
}  
```

#### 9.自定义Hooks

通过自定义 Hook，可以将组件逻辑提取到可重用的函数中。

可以理解成Hook就是用来放一些重复代码的函数。

```javascript
//封装钩子
const useList = () => {
  const [state, setState] = useState(initialState);
  const deleteLi = (index) => {
    setState((state) => {
      const newState = JSON.parse(JSON.stringify(state));
      newState.splice(index, 1);
      return newState;
    });
  };
  return { state, setState, deleteLi };//返回查、改、删
};

//使用钩子
import useList from \"./useList\";

function App(props) {
  const { state, deleteLi } = useList();//这里接收return出来的查、删API
  return (
     ... //这里跟最开始的App组件里是一样的，为了页面整洁，就不贴代码了
  );
}
```

