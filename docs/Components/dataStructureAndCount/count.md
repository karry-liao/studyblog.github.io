## 找出出现次数最多的字符

```javascript
let str = 'adwadawgasdaw'
//1.切割成单个字母
str.split('')
function findMax(){
    if(str.length == 1){
        return str
    }
    let charObj = {}
    for(let i = 0;i<=str.lengt;i++){
        !charObj[str.charAt(i)]?charObj.charAt(i)=1:charObj[str.charAt(i)]+1
    }
    let maxChar = ''
    maxValue = 1;
    for(let k in charObj){
        if(charObj[k]>=maxValue){
            maxChar= k;
            maxValue = charObj[k]
        }
    }
    return maxChar;
}
```

## null与undefined

undefined == null

5+undefined = NaN

10+null  = 10

什么时候会返回undefined？

- 声明未赋值
- 函数默认返回值
- 对象缺失属性
- 方法缺少实参



