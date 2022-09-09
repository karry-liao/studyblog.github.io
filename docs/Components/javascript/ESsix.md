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

**````Array.from():```**将两类对象转为真正的数组：类似数组的对象和可遍历`（iterable）`的对象（包括 `ES6` 新增的数据结构 `Set` 和 `Map`）

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

  

