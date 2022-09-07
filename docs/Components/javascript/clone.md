# 浅拷贝与深拷贝

​		什么是浅拷贝？：将数组或者对象引用赋值给新的对象，是对原数组或者对象的引用。

​		什么是深拷贝？：将原对象或者数组的属性值直接拷贝过来，不再是对原数组或对象的引用，不会改变远数组或对象的值。



## 1.对象的深拷贝

​	**1.递归实现深拷贝—推荐**

```
	function deepClone(obj){
	let objClone = Array.isArray(obj) ? [] : {};
	if(obj && typeof obj === 'object'){
		for(let key in obj){
		if(obj[key] && typeof obj[key] === 'object'){
                objClone[key] = deepClone)(obj[key]);
            }else{
                objClone[key] = obj[key]
            }
		}
	}
	return objClone
}
```

​	**2.json实现深拷贝**

```javascript
	function deepClone(obj){

​	let  _Obj = JSON.stringfy(obj);

​	return  JSON.parse(_Obj)

}
```

​	**3.object.assign实现深拷贝—不推荐**

```javascript
functiom deepClone(obj){
	if(obj instanceof Object){
		return Object.assign({},obj)
	}else{
	return obj
	}
}
```

## 2.数组的深拷贝方法

​	**1.concat(arr1,arr2,....)**

```
functiom deepClone(arr){
	if(arr instanceof Array){
		return [].concat(arr);
	}else{
		return arr
	}
}
```

​	**2. slice**(idx1,idx2)

```
function deepClone(arr){
	if(arr instance Array){
		return arr.slice()
	} else {
		return arr
	}
}
```

​	**3.Json方式**

```
function deepClone(arr){
	let _arr = JSON.stringfy(arr)
	return JSON.parse(_arr)
} 
```

## **3.多维数组实现深拷贝**

```
function deepClone(arr){
	var out = [],i = 0,len = arr.lenth
	for(let i=0; i< len; i++){
		if(arr[i] instance Array){
			out[i] = deepClone(arr[i]);
		}
		else out[i] = arr[i]
	}
	return out
}
```

