# JavaScript 的常用方法

## 		一、String类型

### 	1.charAt

​			返回在指定位置的字符  Str.charAt(3)

### 2.chartCodeAt()

​			 返回指定位置的字符编码 Str.chartCodeAt(a)

### 3.concat()

​			连接字符串  str1.concat(str2)

### 4.indexOf()

​			检索字符串,返回字符在字符串的下表  str.indexOf("123")   找不到匹配内容返回-1

### 5.match()

​			在字符串内检索指定的值或找到一个或多个正则表达式的匹配项，返回的是值不是位置。 str1.match("karry")

### 6.replace()

​			替换匹配的字符串 str1.replace(str1.match('hao'),str2.match('lixi'))  str2替换str1 

### 7.search():

​			检索与字符串匹配的字符串，返回地址  str1.search(str2)  返回第一个字符所在位置  未检测到返回-1

### 8.slice()

​			 提取字符串片段,并在新的字符串中返回被提取的部分  str1.slice(4,9)

### 9.split():

​			把字符串分割成数组  str1.split("-")

### 10.toLocaleLowerCase()

​			把字符串转换成小写 

 str.toLocaleLowerCase()   	  or     str.toLowerCase()

### 11.toLocaleUpperCase()

​			把字符串准换成大写  str.toLocaleUpperCase()  or	str.toUpperCase()

### 12.substr()

​			从其实索引号提取字符串中指定数目的字符 

### 13.subString()

​			提取字符串中两个指定索引号之间的字符
​	var str3 = str.substring(3,19);

字符串中空格占位置，从3开始，到18结束
	var str4 = str.substr(3,19);  //空格不占位。从3开始到19结束


​		

## 	二、数组 Array

### 1.slice[start,end]

​			返回原数组中指定开始下标到结束下标之间的组成新的数组(原数组不变);
​	1个参数：n，即n到末尾的所有
​	2个参数：[start,end]
​	var arr1 = arr.slice(2,6)

### 2.splice():

​			删除，2个参数，起始位置和删除的项数

​	var arr1 = arr.slice(2,3)	实际得到的新数组的项数是end-strat

### 3.pop()

​			删除数组的最后一个元素，减少数组的长度，返回被删除的值	  arr.pop();


​	

### 4.push()

​			将参数添加到数组的最后，返回新数组的长度	arr.push(6,7,8); 

### 5.shift()

​			删除数组的第一个参数，数组的长度减1，无参	arr.shift(); 

### 6.unshift()

​			像数组的开头添加一个或更多的元素，并返回新的长度。（参数不限）	 arr.unshift(2,4,5,{name:'liqi'});


​	

### 7.sort()

​			按指定的参数对数组进行排序，返回的值是经过排序后的数组（无参，函数）  arr.sort();

### 8.concat(3,4)

​			把两个字符串连接起来，返回的值是一个副本（参数不限）arr1.concat(3,arr1)


​	

### 9.join()

​			将数组的元素组成一个字符串	var arr2 = arr1.join(',');//以逗号分隔
​					var arr3 = arr1.join('');//以空格分隔

### 10.indexOf()

​			从数组的开头向后查找，接受两个参数，要查找的项和查找起点的位置索引
​					var num = arr.indexOf(78,3);//查找78所在的位置

### 11.foeEach()

​			对数组的每个元素执行一次提供的函数。array1.forEach(function(element) {
​						  console.log(element);
​						});

### 12.map

​			对数组的每一项运行给定的函数，返回没次函数调用的结果组成的数组
​						 array1.map(x => x * 2); //对数组的每项*2

### 13.for in

​			遍历数组	


​	
​					

## 			三、ES5-every和some方法：

### 1.every

​			是所有函数的每个回调都返回true的时候才会返回true，当遇到false的时候终止执行，返回false。

### 2.some

​			函数是存在有一个函数返回true的时候终止执行并返回true，否则返回false

### 3.Array.isArray(obj)  

​			Array对象的一个静态函数，用来判断一个对象是不是数组

### 4.filter(function(element))   

​			返回数组的一个子集，回调函数用于逻辑判断是否返回，返回true则把当前元素加到返回数组中，false则不加

### 5.reduce or reduceRight

​			reduce(function(v1,v2),value) / .reduceRight(functio(v1,v2),value)

​	console.log(arr.reduce(function(v1,v2){
​		 return v1 + v2;
​		})) // 21
​		//开始是1+2 = 3，之后3+3 =6，之后6+4 =10，之后
​		//10+5 =15，最后15+6 =21
​		console.log(arr.reduce(function(v1,v2){
​			  return v1 - v2;
​		},100)) // 79
​		//开始的时候100-1=99，之后99-2=97，之后97-3=94，之后
​		//94-4=90，之后90-5=85，最后85-6=79