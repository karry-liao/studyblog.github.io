# 一、实现连续数字合并转换

```js
//[1,2,3,4,6,7,9,13,15]=>['1->4','6->7','9','13','15']

function shortenArray(arr) {
  // 处理边界
  if (!Array.isArray(arr) || arr.length <= 1) {
    return arr;
  }

  // 记录结果
  const result = [];

  // 记录连续数字的开始位置
  let start = 0;
  // 记录连续数字的结束位置
  let last = 0;

  function pushArr(arrStart, arrEnd) {
    if (arrStart === arrEnd) {
      result.push(arr[arrStart].toString());
    } else {
      result.push(`${arr[arrStart]}->${arr[arrEnd]}`);
    }
  }

  // 一次循环获取结果
  for (let i = 1; i < arr.length; i++) {
    const temp = arr[i];
    if (arr[last] + 1 === temp) {
      last = i;
    } else {
      pushArr(start, last);
      start = i;
      last = i;
    }
  }

  // 处理剩余数据
  pushArr(start, last);

  return result;
}

shortenArray([1, 2, 3, 4, 6, 7, 9, 13, 15]); // ['1->4','6->7','9','13','15']
```

# 二、递归实现深拷贝

```js
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}
```

