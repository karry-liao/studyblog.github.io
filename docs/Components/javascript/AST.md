## 何为AST语法树？

​		AST（抽象语法树）在开发过程中扮演一个非常重要的角色，但是我们却很少去直接接触它。

无论是代码编译（babel），打包（webpack），代码压缩，css预处理，代码校验（eslint），代码美化（pretiier），Vue中对template的编译，这些的实现都离不开AST。

了解学习AST，能够帮助我们更好的对上面说的这些工具原理进行理解，同时，我们可以利用它去开发一些工具，来优化我们的开发流程，提高开发效率。

AST是对源代码的抽象语法结构的树状表现形式。

**代码：**

```javascript
let answer = 2 * 3;
```

**对应的抽象语法树：**

```javascript
{
    "type": "Program",
    "body": [
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "answer"
                    },
                    "init": {
                        "type": "BinaryExpression",
                        "operator": "*",
                        "left": {
                            "type": "Literal",
                            "value": 2,
                            "raw": "2"
                        },
                        "right": {
                            "type": "Literal",
                            "value": 3,
                            "raw": "3"
                        }
                    }
                }
            ],
            "kind": "let"
        }
    ],
    "sourceType": "script"
}
```

## AST是如何生成的

AST是通过JS Parser （解析器），将js源码转化为抽象语法树，主要分为两步

### 1. 分词

将整个的代码字符串，分割成语法单元数组（token）。 JS中的语法单元（token）指标识符（function，return），运算符，括号，数字，字符串等能解析的最小单元。主要有以下几种：

1. 标识符
   没有被引号括起来的连续字符，可以包含字母、数字、_、$，其中数字不能作为开头。
   标识符可能是var，return，function等关键字，也可能是true，false这样的内置常量，或是一个变量。具体是哪种语义，分词阶段不区分，只要正确拆分即可。
2. 数字 十六进制，十进制，八进制以及科学表达式等都是最小单元
3. 运算符： +、-、 *、/ 等
4. 字符串 对计算机而言，字符串只会参与计算和展示，具体里面细分没必要分析
5. 注释 不管是行注释还是块注释，对于计算机来说并不关心其内容，所以可以作为不可再拆分的最小单元
6. 空格 连续的空格，换行，缩进等，只要不在字符串中都没有实际的逻辑意义，所以连续的空格可以作为一个语法单元。
7. 其他，大括号，中括号，小括号，冒号 等等。

### 2. 语义分析

语义分析的目的是将分词得到的语法单元进行一个整体的组合，分析确定语法单元之间的关系。

简单来说，语义分析可以理解成对语句（statement）和表达式（expression）的识别。

1. 语句，一个具备边界的代码区域。相邻的两个语句之间从语法上讲互不影响。比如： `var a = 1; if(xxx){xxx}`
2. 表达式，指最终会有一个结果的一小段代码，它可以嵌入到另一个表达式中，且包含在表达式中。比如：`a++`， `i > 0 && i< 6`

语义分析是一个递归的过程，它会将分词分析出来的数组转化成树形的表达形式。同时，会验证语法，语法如果存在错误的话，会抛出语法错误。

## AST的具体应用

文章一开始就说到了，babel，webpack，css预处理，eslint等都应用到了AST树，那么AST到底做了一个什么样的角色呢！？ 下面我们就来看一下。

首先看一下babel工作原理的实现。

第1步 解析（Parse）
通过解析器babylon将代码解析成抽象语法树

第2步 转换（TransForm）
通过babel-traverse plugin对抽象语法树进行深度优先遍历，遇到需要转换的，就直接在AST对象上对节点进行添加、更新及移除操作，比如遇到箭头函数，就转换成普通函数，最后得到新的AST树。

第3步 生成（Generate）
通过babel-generator将AST树生成es5代码

### vue模板编译过程

第1步 解析（Parse）

```const ast = parse(template.trim(), options)```

将模板字符串解析生成 AST,这里的解析器是vue自己实现的，解析过程中会使用正则表达式对模板顺序解析，当解析到开始标签、闭合标签、文本的时候都会有相对应的回调函数执行，来达到构造 AST 树的目的。

生成的AST 元素节点总共有 3 种类型，1 为普通元素， 2 为表达式，3为纯文本。下面看一个例子

```js
<ul :class="bindCls" class="list" v-if="isShow">
    <li v-for="(item,index) in data" @click="clickItem(index)">{{item}}:{{index}}</li>
</ul>
```

上面模板解析生成的AST树如下：

```js
ast = {
  'type': 1,
  'tag': 'ul',
  'attrsList': [],
  'attrsMap': {
    ':class': 'bindCls',
    'class': 'list',
    'v-if': 'isShow'
  },
  'if': 'isShow',
  'ifConditions': [{
    'exp': 'isShow',
    'block': // ul ast element
  }],
  'parent': undefined,
  'plain': false,
  'staticClass': 'list',
  'classBinding': 'bindCls',
  'children': [{
    'type': 1,
    'tag': 'li',
    'attrsList': [{
      'name': '@click',
      'value': 'clickItem(index)'
    }],
    'attrsMap': {
      '@click': 'clickItem(index)',
      'v-for': '(item,index) in data'
     },
    'parent': // ul ast element
    'plain': false,
    'events': {
      'click': {
        'value': 'clickItem(index)'
      }
    },
    'hasBindings': true,
    'for': 'data',
    'alias': 'item',
    'iterator1': 'index',
    'children': [
      'type': 2,
      'expression': '_s(item)+":"+_s(index)'
      'text': '{{item}}:{{index}}',
      'tokens': [
        {'@binding':'item'},
        ':',
        {'@binding':'index'}
      ]
    ]
  }]
}
```

第2步 优化语法树（Optimize）

```optimize(ast, options)```

vue模板中并不是所有数据都是响应式的，有很多数据是首次渲染后就永远不会变化的，那么这部分数据生成的 DOM 也不会变化，我们可以在patch的过程跳过对他们的比对。
此阶段会深度遍历生成的 AST树，检测它的每一颗子树是不是静态节点，如果是静态节点则它们生成 DOM 永远不需要改变，这对运行时对模板的更新起到极大的优化作用。

遍历过程中，会对整个 AST 树中的每一个 AST 元素节点标记static和staticRoot（递归该节点的所有children，一旦子节点有不是static的情况，则为false，否则为true）。

```javascript
ast = {
  'type': 1,
  'tag': 'ul',
  'attrsList': [],
  'attrsMap': {
    ':class': 'bindCls',
    'class': 'list',
    'v-if': 'isShow'
  },
  'if': 'isShow',
  'ifConditions': [{
    'exp': 'isShow',
    'block': // ul ast element
  }],
  'parent': undefined,
  'plain': false,
  'staticClass': 'list',
  'classBinding': 'bindCls',
  'static': false,
  'staticRoot': false,
  'children': [{
    'type': 1,
    'tag': 'li',
    'attrsList': [{
      'name': '@click',
      'value': 'clickItem(index)'
    }],
    'attrsMap': {
      '@click': 'clickItem(index)',
      'v-for': '(item,index) in data'
     },
    'parent': // ul ast element
    'plain': false,
    'events': {
      'click': {
        'value': 'clickItem(index)'
      }
    },
    'hasBindings': true,
    'for': 'data',
    'alias': 'item',
    'iterator1': 'index',
    'static': false,
    'staticRoot': false,
    'children': [
      'type': 2,
      'expression': '_s(item)+":"+_s(index)'
      'text': '{{item}}:{{index}}',
      'tokens': [
        {'@binding':'item'},
        ':',
        {'@binding':'index'}
      ],
      'static': false
    ]
  }]
}
```

第3步 生成代码

```
const code = generate(ast, options)
```

通过generate方法，将ast生成render函数

```js
with(this){
  return (isShow) ?
    _c('ul', {
        staticClass: "list",
        class: bindCls
      },
      _l((data), function(item, index) {
        return _c('li', {
          on: {
            "click": function($event) {
              clickItem(index)
            }
          }
        },
        [_v(_s(item) + ":" + _s(index))])
      })
    ) : _e()
}
```

### Prettier实现原理

通过上面对babel实现原理和vue模板的编译原理可以看出，他们的实现有很多相同之处，都是先将源码解析成AST树，然后对AST树就行处理，最后生成想要的东西。

Prettier的实现同样是这样，首先依然是将代码解析生成AST树，然后是对AST遍历，调整长句，整理空格，括号等，最后输出代码，这里就不赘述了。

我们分析了Babel原理、vue模板编译过程、Prettier原理，这里我们简单总结一下。
如果把源码比作一个机器，那么分词过程就是将这台机器拆分成一个个零件，语义分析过程就是分析每个零件的位置以及作用，然后根据需要对零件进行加工处理，最后再组装成一个新的机器。

## AST还能做什么

那么工作中我们能使用AST做些什么呢？！

这里就要发挥想象了，看看我们日常工作中有什么需求是可以通过AST开发个工具来解决。
比如，可以通过AST可以将代码自动转成流程图；
或者根据自定义的注释规范，通过工具自动生成文档；
或是通过工具自动生成骨架屏文件。