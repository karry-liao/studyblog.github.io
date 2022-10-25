# ES6中的Set和Map的区别

`Set`是一种叫做集合的数据结构，`Map`是一种叫做字典的数据结构

什么是集合？什么又是字典？

- 集合
  是由一堆无序的、相关联的，且不重复的内存结构【数学中称为元素】组成的组合
- 字典
  是一些元素的集合。每个元素有一个称作key 的域，不同元素的key 各不相同

区别？

- 共同点：集合、字典都可以存储不重复的值
- 不同点：集合是以[值，值]的形式存储元素，字典是以[键，值]的形式存储

## 一、Set

`Set`是`es6`新增的数据结构，类似于数组，但是成员的值都是唯一的，没有重复的值，我们一般称为集合

`Set`本身是一个构造函数，用来生成 Set 数据结构

```js
const s = new Set();
```

## 二、Map

`Map`类型是键值对的有序列表，而键和值都可以是任意类型

`Map`本身是一个构造函数，用来生成 `Map` 数据结构

```js
const m = new Map()
```

| Name | 方法名                                        | 遍历方法                            |
| ---- | --------------------------------------------- | ----------------------------------- |
| Set  | add(),delete(),has(),clear()                  | keys(),values(),entries(),forEach() |
| Map  | **Size()**,set(),get(),has(),delete(),clear() | keys(),values(),entries(),forEach() |
|      |                                               |                                     |

## 三、WeakSet 和 WeakMap

### WeakSet

```js
const ws = new WeakSet();
`WeakSet `可以接受一个具有 `Iterable `接口的对象作为参数
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}
```

在`API`中`WeakSet`与`Set`有两个区别：

- 没有遍历操作的`API`
- 没有`size`属性

`WeackSet`只能成员只能是引用类型，而不能是其他类型的值,`WeakSet `里面的引用只要在外部消失，它在 `WeakSet `里面的引用就会自动消失

### WeakMap

`WeakMap`结构与`Map`结构类似，也是用于生成键值对的集合

在`API`中`WeakMap`与`Map`有两个区别：

- 没有遍历操作的`API`
- 没有`clear`清空方法

`WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名

`WeakMap`的键名所指向的对象，一旦不再需要，里面的键名对象和所对应的键值对会自动消失，不用手动删除引用