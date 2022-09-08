render()  与 template异同点:都是类编译器

render函数是template的下一步，



h=>相当于原生js的createElement()=》创建真实元素=>生成虚拟dom=》真实dom

一值多判断

```
render(){
	return h('button',{
	//v-bind:class
		class:{
			btn:true,
			'btn-cuccess':this.type==cuccess
			'btn-error':this.type==error
			'btn-warning':this.type==warning
			'normal':！this.type
		}
		domProps:{
			innerText:this.text || '默认按钮'
		}
		//v-on
		on:{
		
		}
	})
}
```

