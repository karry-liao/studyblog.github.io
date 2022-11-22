# 数组去重

```js
const uniqueArr = (arr) => [...new Set(arr)];

console.log(uniqueArr(["前端","js","html","js","css","html"]));
// ['前端', 'js', 'html', 'css']
```

# 从url获取参数并转为对象

```js
//方法一   split方法
const getParameters = URL => JSON.parse(`{"${decodeURI(URL.split("?")[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`
  )

getParameters("https://www.google.com.hk/search?q=xxx&new=567");
// {q: 'xxx', newwindow: '567'}

//方法二   URLSearchParams方法
// 创建一个URLSearchParams实例
const urlSearchParams = new URLSearchParams(window.location.search);
// 把键值对列表转换为一个对象
const params = Object.fromEntries(urlSearchParams.entries());

```

# 检查对象是否为空

```js
const isEmpty = obj => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;
isEmpty({}) // true
isEmpty({a:"not empty"}) //false
```

# 反转字符串

```js
const reverse = str => str.split('').reverse().join('');
reverse('this is reverse');
// esrever si siht
```

# 生成随机十六进制

```js
const randomHexColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`
console.log(randomHexColor());
// #a2ce5b
```

# 检查当前选项卡是否在后台

```js
const isTabActive = () => !document.hidden; 

isTabActive()
// true|false
```

# 检测元素是否处于焦点

```js
const elementIsInFocus = (el) => (el === document.activeElement);

elementIsInFocus(anyElement)
// 元素处于焦点返回true，反之返回false
```

# 检查设备类型

```js
const judgeDeviceType =
      () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent) ? 'Mobile' : 'PC';

judgeDeviceType()  // PC | Mobile
```

# 文字复制到剪贴板

```js
const copyText = async (text) => await navigator.clipboard.writeText(text)
copyText('单行代码 前端世界')
```

# 获取选定的文本

```js
const getSelectedText = () => window.getSelection().toString();

getSelectedText();
// 返回选中的内容
```

# 查询某天是否为工作日

```js
const isWeekday = (date) => date.getDay() % 6 !== 0 && date.getDay() % 7 !== 0;

isWeekday(new Date(2022, 03, 11))
// true
```

# 转换华氏/摄氏

华氏温度->摄氏度

```js
const fahrenheitToCelsius = (fahrenheit) => (fahrenheit - 32) * 5/9;

fahrenheitToCelsius(50);
// 10
```

摄氏度转华氏温度

```js
const celsiusToFahrenheit = (celsius) => celsius * 9/5 + 32;

celsiusToFahrenheit(100)
// 212
```

# 两日期之间相差的天数

```js
const dayDiff = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);

dayDiff(new Date("2021-10-21"), new Date("2022-02-12"))
// Result: 114
```

# 将 RGB 转换为十六进制

```js
const rgbToHex = (r, g, b) =>   "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

rgbToHex(255, 255, 255); 
//  #ffffff
```

# 计算数组平均值

```js
const average = (arr) => arr.reduce((a, b) => a + b) / arr.length;
average([1,9,18,36]) //16
```

