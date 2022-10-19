# JavaScript的错误类型

- Error
- EvalError
- RangeError
- ReferenceError
- SyntaxError
- TypeError
- URIError

### Error

`Error`是最基本的错误类型，其他的错误类型都继承自该类型。因此，所有错误的类型共享了一组相同的属性。 这个类型的错误很少见。一般使用开发人员自定义抛出的错误。

### EvalError

这个错误会在使用`eval()`函数发生异常时候抛出。两种情况会出错：

```
new eval();
eval = foo;
```

### RangeError

这个错误会在数值超出相应范围时触发。比如使用`new Array()`的时候传递一个负数或者是超过数组最大长度（4,294,967,295）的数，比如Number.MAX_VALUE，Number.MIN_VALUE。注意递归爆炸也有这个错误。

### ReferenceError

这个错误一般就是出现在变量找不到的情况，比如：

```
var a = b;
Uncaught ReferenceError: b is not defined
```

### SyntaxError

当Javascript语言解析代码时,Javascript引擎发现了不符合语法规范的tokens或token顺序时抛出SyntaxError。

### TypeError

这个错误在JavaScript中是经常遇到的，不管是初学者还是老手。在变量中保存着以外的类型时，或者在访问不存在的方法时。都会导致这种错误。但是归根结底还是由于在执行特定于类型的操作时，变量的类型并不符合要求所致。比如：

```
var o = new 10;
a.style.widht = "10px";
```

### URIError

在使用encodeURI或者decodeURI因为URL格式不正确时，就会导致URIError错误。这种错误也很少见。