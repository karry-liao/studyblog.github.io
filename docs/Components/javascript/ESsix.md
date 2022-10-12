## var、let、const

在ES5中，顶层对象的属性和**全局变量**是等价的，用`var`声明的变量既是全局变量，也是顶层变量

注意：顶层对象，在浏览器环境指的是`window`对象，在 `Node` 指的是`global`对象，使用`var`声明的变量存在**变量提升**的情况，使用`var`，我们能够对一个变量进行多次声明，后面声明的变量会覆盖前面的变量声明，在函数中使用使用`var`声明变量时候，该变量是局部的，而如果在函数内不使用`var`，该变量是全局的

#### ```var```、```let```、```const```的区别

|                |       var        | let  | const |
| :------------: | :--------------: | :--: | :---: |
|     作用域     | 非函数内部为全局 | 块级 | 块级  |
|    变量提升    |   Y-undefined    |  N   |   N   |
| 修改声明的变量 |        Y         |  Y   |   N   |
|   暂时性死区   |        N         |  Y   |   Y   |
|    重复声明    |        Y         |  N   |   N   |

## 数组篇

**扩展运算符:   ...**

**Array.from():**将两类对象转为真正的数组：类似数组的对象和可遍历`（iterable）`的对象（包括 `ES6` 新增的数据结构 `Set` 和 `Map`）

```javascript
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
//-----------------------------------
Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]
```

```**Array.of():**```用于将一组值，转换为数组

```javascript
Array.of(3, 11, 8) // [3,11,8]
//没有参数的时候，返回一个空数组
Array() // []
//当参数只有一个的时候，实际上是指定数组的长度
Array(3) // [, , ,]
//参数个数不少于 2 个时，Array()才会返回由参数组成的新数组
Array(3, 11, 8) // [3, 11, 8]
```

## 实例对象新增的方法

- copyWithin(target-必须,start-可选,end-可选)：将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。

  ```javascript
  [1, 2, 3, 4, 5].copyWithin(0, 3) // 将从 3 号位直到数组结束的成员（4 和 5），复制到从 0 号位开始的位置，结果覆盖了原来的 1 和 2
  // [4, 5, 3, 4, 5] 
  ```

- find()、findIndex()：

  `find()`用于找出第一个符合条件的数组成员

  参数是一个回调函数，接受三个参数依次为当前的值、当前的位置和原数组。

  ```javascript
  [1, 5, 10, 15].find(function(value, index, arr) {
    return value > 9;
  }) // 10
  ```

  ```findIndex()```返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回`-1

  ```javascript
  [1, 5, 10, 15].findIndex(function(value, index, arr) {
    return value > 9;
  }) // 2
  ```

  这两个方法都可以接受第二个参数，用来绑定回调函数的`this`对象。

  ```javascript
  function f(v){
    return v > this.age;
  }
  let person = {name: 'John', age: 20};
  [10, 12, 26, 15].find(f, person);    // 26
  ```

- fill()：使用给定值，填充一个数组

  ```javascript
  ['a', 'b', 'c'].fill(7)
  // [7, 7, 7]
  
  new Array(3).fill(7)
  // [7, 7, 7]
  
  //还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置
  ['a', 'b', 'c'].fill(7, 1, 2)
  // ['a', 7, 'c']
  ```

- entries()，keys()，values()

  `keys()`是对键名的遍历、`values()`是对键值的遍历，`entries()`是对键值对的遍历

  ```javascript
  for (let index of ['a', 'b'].keys()) {
    console.log(index);
  }
  // 0
  // 1
  
  for (let elem of ['a', 'b'].values()) {
    console.log(elem);
  }
  // 'a'
  // 'b'
  
  for (let [index, elem] of ['a', 'b'].entries()) {
    console.log(index, elem);
  }
  // 0 "a"
  ```

- includes()

  用于判断数组是否包含给定的值

  ```javascript
  [1, 2, 3].includes(2)     // true
  [1, 2, 3].includes(4)     // false
  [1, 2, NaN].includes(NaN) // true
  //方法的第二个参数表示搜索的起始位置，默认为0
  //参数为负数则表示倒数的位置
  [1, 2, 3].includes(3, 3);  // false
  [1, 2, 3].includes(3, -1); // true
  ```

  

- flat()，flatMap()

  将数组扁平化处理，返回一个新数组，对原数据没有影响,`flat()`默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将`flat()`方法的参数写成一个整数，表示想要拉平的层数，默认为1

  ```javascript
  [1, 2, [3, 4]].flat()
  // [1, 2, 3, 4]
  ```

  `flatMap()`方法对原数组的每个成员执行一个函数相当于执行`Array.prototype.map()`，然后对返回值组成的数组执行`flat()`方法。该方法返回一个新数组，不改变原数组

  ```
  // 相当于 [[2, 4], [3, 6], [4, 8]].flat()
  [2, 3, 4].flatMap((x) => [x, x * 2])
  // [2, 4, 3, 6, 4, 8]
  ```

  ## ES7~ES12
  
  ### ES2016(ES7)
  
  #### Array.prototype.includes()
  
  `includes()` 方法用来判断一个数组是否包含一个指定的值，如果包含则返回 `true`，否则返回 `false`。

```javascript
arr.includes(valueToFind[, fromIndex])
```

​		`fromIndex` 可选 从`fromIndex` 索引处开始查找 `valueToFind`。如果为负值（即从末尾开始往前跳 `fromIndex` 的绝对值个索引，然后往后搜寻）。默认为 0。

​		使用 `includes()`只能判断简单类型的数据，对于复杂类型的数据，比如对象类型的数组，二维数组，这些是无法判断的.

​		使用 `includes()`查找字符串是区分大小写的。

​		能识别NaN，indexOf是不能识别NaN的

#### 	幂运算符 **

```javascript
console.log(2 ** 10); // 1024
```

### 	ES2017(ES8)

#### Object.values()

`Object.values `方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。

```javascript
const obj = {
  name: "jimmy",
  age: 18,
  height: 188,
};
console.log(Object.values(obj)); // [ 'jimmy', 18, 188 ]
```

#### Object.entries()

Object.entries() 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历属性的键值对数组。

```javascript
const obj = {
  name: "jimmy",
  age: 18,
  height: 188,
};
console.log(Object.entries(obj)); // [ [ 'name', 'jimmy' ], [ 'age', 18 ], [ 'height', 188 ] ]
console.log(Object.entries([1, 2, 3])); // [ [ '0', 1 ], [ '1', 2 ], [ '2', 3 ] ]
```

#### Object.getOwnPropertyDescriptors()

`Object.getOwnPropertyDescriptors() ` 方法用来获取一个对象的所有自身属性的描述符。

```javascript

//我们可以使用es5的 `Object.defineProperty()`设置和修改他们.
const obj = {
  name: "jimmy",
  age: 18,
};
const desc = Object.getOwnPropertyDescriptors(obj);
console.log(desc);  
// 打印结果
{
  name: {
    value: 'jimmy',
    writable: true,
    enumerable: true,
    configurable: true
  },
  age: { 
   value: 18, 
   writable: true,
   enumerable: true, 
   configurable: true 
  }
}
//我们可以使用es5的 `Object.defineProperty()`设置和修改他们.
const obj = {};
Object.defineProperty(obj, "name", {
  value: "jimmy",
  writable: true,
  configurable: true,
  enumerable: true,
});
Object.defineProperty(obj, "age", {
  value: 34,
  writable: true,
  configurable: true,
  enumerable: true,
});
console.log(obj); // { name: 'jimmy', age: 34 }

//writable: false和configurable: false,为false时，对象的name对象的值不能改变和不能被删除，打印出来还是原来的对象。

//当设置enumerable: false时，表示对象的属性不可被枚举，这时打印对象为空，遍历对象的键也为空。
```

#### String.prototype.padStart

把指定字符串填充到字符串头部，返回新字符串。

str.padStart(targetLength [, padString])

#### String.prototype.padEnd

把指定字符串填充到字符串尾部，返回新字符串。

语法同上

- `targetLength`

当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。

- `padString` 可选

填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的默认值为 " "

```javascript
'abc'.padStart(10);         // "       abc"
'abc'.padStart(10, "foo");  // "foofoofabc"
'abc'.padStart(6,"123465"); // "123abc"
'abc'.padStart(8, "0");     // "00000abc"
'abc'.padStart(1);          // "abc"
'abc'.padEnd(10);          // "abc       "
'abc'.padEnd(10, "foo");   // "abcfoofoof"
'abc'.padEnd(6, "123456"); // "abc123"
'abc'.padEnd(1);           // "abc"
```

#### async/await

​		async函数中使用await，那么await这里的代码就会变成同步的了，意思就是说只有等await后面的Promise执行完成得到结果才会继续下去，await就是等待。

- await 只能在 async 标记的函数内部使用，单独使用会触发 Syntax error。
- await后面需要跟异步操作，不然就没有意义，而且await后面的Promise对象不必写then，因为await的作用之一就是获取后面Promise对象成功状态传递出来的参数。

### ES2018(ES9)

#### Object Rest & Spread

```javascript
const input = {
  a: 1,
  b: 2,
  c: 3,
}

const output = {
  ...input,
  c: 4
}

console.log(output) // {a: 1, b: 2, c: 4}
```

这块代码展示了 spread 语法，可以把 input 对象的数据都拓展到 output 对象，这个功能很实用。需要注意的是，**如果存在相同的属性名，只有最后一个会生效**。

当对象 key-value 不确定的时候，把必选的 key 赋值给变量，用一个变量收敛其他可选的 key 数据，这在之前是做不到的。注意，**rest 属性必须始终出现在对象的末尾**，否则将抛出错误。

```javascript
const input = {
  a: 1,
  b: 2,
  c: 3
}

let { a, ...rest } = input

console.log(a, rest) // 1 {b: 2, c: 3}
```

#### for await of

异步迭代器(for-await-of)：循环等待每个Promise对象变为resolved状态才进入下一步。

上述代码证实了 for of 方法不能遍历异步迭代器，得到的结果并不是我们所期待的，于是 for await of 就粉墨登场啦！

**ES9 中可以用 for...await...of 的语法来操作**

```javascript
function TimeOut(time) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(time)
        }, time)
    })
}

async function test() {
    let arr = [TimeOut(2000), TimeOut(1000), TimeOut(3000)]
    for await (let item of arr) {
        console.log(Date.now(), item)
    }
}
test()
// 1560092345730 2000
// 1560092345730 1000
// 1560092346336 3000
```

### Promise.prototype.finally()

​		Promise.prototype.finally() 方法返回一个Promise，在promise执行结束时，无论结果是fulfilled或者是rejected，在执行then()和catch()后，都会执行finally指定的回调函数。这为指定执行完promise后，无论结果是fulfilled还是rejected都需要执行的代码提供了一种方式，避免同样的语句需要在then()和catch()中各写一次的情况。

**loading关闭**

需要每次发送请求，都会有loading提示，请求发送完毕，就需要关闭loading提示框，不然界面就无法被点击。不管请求成功或是失败，这个loading都需要关闭掉，这时把关闭loading的代码写在finally里再合适不过了

### String 扩展

```javascript
const foo = (a, b, c) => {
    console.log(a)
    console.log(b)
    console.log(c)
}
const name = 'jimmy'
const age = 18
foo `这是${name},他的年龄是${age}岁` 
```

<img src='../images/string.jpe'/>

在模板字符串中，如果输入无效的unicode字符，还是会报错。只有在便签模板中 从es9开始才不会报错。

```javascript
 let string = `%u{61} and %unicode`;
 console.log(string); // Uncaught SyntaxError: Invalid Unicode escape sequence
```

### ES2019(ES10)

#### 	Object.fromEntries()

方法 Object.fromEntries() 把键值对列表转换为一个对象，这个方法是和 Object.entries() 相对的。

```javascript
Object.fromEntries([
    ['foo', 1],
    ['bar', 2]
])
// {foo: 1, bar: 2}
```

#### Map 转 Object

```javascript
const map = new Map()
map.set('name', 'jimmy')
map.set('age', 18)
console.log(map) // {'name' => 'jimmy', 'age' => 18}

const obj = Object.fromEntries(map)
console.log(obj)
// {name: "jimmy", age: 18}

const course = {
    math: 80,
    english: 85,
    chinese: 90
}
//过滤
//course表示所有课程，想请求课程分数大于80的课程组成的对象：
const res = Object.entries(course).filter(([key, val]) => val > 80)
console.log(res) // [ [ 'english', 85 ], [ 'chinese', 90 ] ]
console.log(Object.fromEntries(res)) // { english: 85, chinese: 90 }

//url的search参数转换
// let url = "https://www.baidu.com?name=jimmy&age=18&height=1.88"
// queryString 为 window.location.search
const queryString = "?name=jimmy&age=18&height=1.88";
const queryParams = new URLSearchParams(queryString);
const paramObj = Object.fromEntries(queryParams);
console.log(paramObj); // { name: 'jimmy', age: '18', height: '1.88' }
```

### Array.prototype.flat()

```javascript
let newArray = arr.flat([depth])
//depth 可选 指定要提取嵌套数组的结构深度，默认值为 1。
//使用 Infinity，可展开任意深度的嵌套数组
//// `flat()` 方法会移除数组中的空项:
var arr5 = [1, 2, , 4, 5];
arr5.flat(); // [1, 2, 4, 5]
```

### Array.prototype.flatMap()

flatMap() 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。从方法的名字上也可以看出来它包含两部分功能一个是 map，一个是 flat（深度为1）。

```javascript
var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
    // 返回新数组的元素
}[, thisArg])
//callback
//可以生成一个新数组中的元素的函数，可以传入三个参数：

//currentValue
//当前正在数组中处理的元素

//index
//可选 数组中正在处理的当前元素的索引。

//array
//可选 被调用的 map 数组

//thisArg可选
//执行 callback 函数时 使用的this 值。
const numbers = [1, 2, 3]
numbers.map(x => [x * 2]) // [[2], [4], [6]]
numbers.flatMap(x => [x * 2]) // [2, 4, 6]
```

#### String.prototype.trimStart()

#### String.prototype.trimEnd()

​	trimStart() 方法从字符串的开头删除空格，trimLeft()是此方法的别名。

​	trimEnd() 方法从一个字符串的右端移除空白字符，trimRight 是 trimEnd 的别名。

```javascript
let str = '   foo  '
console.log(str.length) // 8
str = str.trimStart() // 或str.trimLeft()
console.log(str.length) // 5

let str = '   foo  '
console.log(str.length) // 8
str = str.trimEnd() // 或str.trimRight()
console.log(str.length) // 6
```

#### Symbol.prototype.description

我们知道，Symbol 的描述只被存储在内部的 `Description` ，没有直接对外暴露，我们只有调用 Symbol 的 toString() 时才可以读取这个属性：

```javascript
const name = Symbol('es')
console.log(name.toString()) // Symbol(es)
console.log(name) // Symbol(es)
console.log(name === 'Symbol(es)') // false
console.log(name.toString() === 'Symbol(es)') // true
//现在可以通过 description 方法获取 Symbol 的描述:
const name = Symbol('es')
console.log(name.description) // es
name.description = "es2" // 只读属性 并不能修改描述符
console.log(name.description === 'es') // true
// 如果没有描述符 输入undefined
const s2 = Symbol()
console.log(s2.description) // undefined
```

### ES2020(ES11)

#### 空值合并运算符（Nullish coalescing Operator）

**空值合并操作符**（ `??` ）是一个逻辑操作符，当左侧的操作数为 `null`或者`undefined`时，返回其右侧操作数，否则返回左侧操作数。

```javascript
const foo = undefined ?? "foo"
const bar = null ?? "bar"
console.log(foo) // foo
console.log(bar) // bar
```

与逻辑或操作符（`||`）不同，逻辑或操作符会在左侧操作数为假值时返回右侧操作数。也就是说，如果使用 `||` 来为某些变量设置默认值，可能会遇到意料之外的行为。比如为假值（例如`''`,`0`,`NaN`,`false`）时。见下面的例子。

```javascript
const foo = "" ?? 'default string';
const foo2 = "" || 'default string';
console.log(foo); // ""
console.log(foo2); // "default string"

const baz = 0 ?? 42;
const baz2 = 0 || 42;
console.log(baz); // 0
console.log(baz2); // 42
```

#### 可选链 Optional chaining

**可选链**操作符( `?.` )允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。`?.` 操作符的功能类似于 `.` 链式操作符，不同之处在于，在引用为 `null` 或者 `undefined` 的情况下不会引起错误，该表达式短路返回值是 `undefined`。与函数调用一起使用时，如果给定的函数不存在，则返回 `undefined`。

```javascript
const street2 = user?.address?.street
const num2 = user?.address?.getNum?.()
console.log(street2, num2)
//可选链不能用于赋值
let object = {};
object?.property = 1; // Uncaught SyntaxError: Invalid left-hand side in assignment
```

#### globalThis



#### BigInt

**`BigInt`** 是一种内置对象，它提供了一种方法来表示大于 `2的53次方 - 1` 的整数。这原本是 Javascript中可以用 `Number` 表示的最大数字。**`BigInt`** 可以表示任意大的整数。

**使用 BigInt 有两种方式：**

```javascript
const bigInt = 9007199254740993n
console.log(bigInt)
console.log(typeof bigInt) // bigint

// `BigInt` 和 [`Number`]不是严格相等的，但是宽松相等的。
console.log(1n == 1) // true
console.log(1n === 1) // false

// `Number` 和 `BigInt` 可以进行比较。
1n < 2 // ↪ true
2n > 1 // ↪ true

//使用 BigInt 函数
const bigIntNum = BigInt(9007199254740993n)
console.log(bigIntNum)
//运算
let number = BigInt(2);
let a = number + 2n; // 4n
let b = number * 10n; // 20n
let c = number - 10n; // -8n
console.log(a);
console.log(b);
console.log(c);
```

#### String.prototype.matchAll()

**`matchAll()`** 方法返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。

```javascript
const regexp = /t(e)(st(d?))/g;
const str = 'test1test2';

const array = [...str.matchAll(regexp)];
console.log(array[0]);  // ["test1", "e", "st1", "1"]
console.log(array[1]); // ["test2", "e", "st2", "2"]
```

#### Promise.allSettled()

我们都知道 Promise.all() 具有并发执行异步任务的能力。但它的最大问题就是如果其中某个任务出现异常(reject)，所有任务都会挂掉，Promise直接进入reject 状态。

场景：现在页面上有三个请求，分别请求不同的数据，如果一个接口服务异常，整个都是失败的，都无法渲染出数据

我们需要一种机制，如果并发任务中，无论一个任务正常或者异常，都会返回对应的的状态，这就是`Promise.allSettled`的作用

### Dynamic Import（按需 import）

`import()`可以在需要的时候，再加载某个模块。

```javascript
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});
//上面代码中，import()方法放在click事件的监听函数之中，只有用户点击了按钮，才会加载这个模块。
```

### ES2021(ES12)

#### 逻辑运算符和赋值表达式（&&=，||=，??=）



```javascript
//&&=
//逻辑与赋值 `x &&= y`等效于：
x && (x = y);

//||=
//逻辑或赋值（x ||= y）运算仅在 x 为false时赋值。
//x ||= y 等同于：x || (x = y);
const a = { duration: 50, title: '' };

a.duration ||= 10;
console.log(a.duration); // 50

a.title ||= 'title is empty.';
console.log(a.title); // "title is empty"

//??=
//逻辑空赋值运算符 (x ??= y) 仅在 x 是 nullish (null 或 undefined) 时对其赋值。
//x ??= y 等价于： x ?? (x = y);
//示例一
const a = { duration: 50 };

a.duration ??= 10;
console.log(a.duration); // 50

a.speed ??= 25;
console.log(a.speed); // 25
//示例二
function config(options) {
  options.duration ??= 100;
  options.speed ??= 25;
  return options;
}

config({ duration: 125 }); // { duration: 125, speed: 25 }
config({}); // { duration: 100, speed: 25 }
```

#### String.prototype.replaceAll()

`replaceAll()` 方法返回一个新字符串，新字符串中所有满足 `pattern` 的部分都会被`replacement` 替换。`pattern`可以是一个字符串或一个`RegExp`，`replacement`可以是一个字符串或一个在每次匹配被调用的函数。使用正则表达式搜索值时，它必须是全局的。

原始字符串保持不变。

```javascript
'aabbcc'.replaceAll('b', '.'); // 'aa..cc'
```

#### **数字分隔符**

`ES2021`中允许 JavaScript 的数值使用下划线（`_`）作为分隔符。

```javascript
let budget = 1_000_000_000_000;
budget === 10 ** 12 // true
//这个数值分隔符没有指定间隔的位数，也就是说，可以每三位添加一个分隔符，也可以每一位、每两位、每四位添加一个。
123_00 === 12_300 // true
12345_00 === 123_4500 // true
12345_00 === 1_234_500 // true
//小数和科学计数法也可以使用数值分隔符。
// 小数
0.000_001

// 科学计数法
1e10_000
```

- 不能放在数值的最前面（leading）或最后面（trailing）。
- 不能两个或两个以上的分隔符连在一起。
- 小数点的前后不能有分隔符。
- 科学计数法里面，表示指数的`e`或`E`前后不能有分隔符。

#### **Promise.any**

方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。

只要参数实例有一个变成`fulfilled`状态，包装实例就会变成`fulfilled`状态；如果所有参数实例都变成`rejected`状态，包装实例就会变成`rejected`状态。

`Promise.any()`跟`Promise.race()`方法很像，只有一点不同，就是`Promise.any()`不会因为某个 Promise 变成`rejected`状态而结束，必须等到所有参数 Promise 变成`rejected`状态才会结束。