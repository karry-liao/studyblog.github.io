## Mixin是什么？

​		`Mixin`是面向对象程序设计语言中的类，提供了方法的实现。其他类可以访问`mixin`类的方法而不必成为其子类

​		`Mixin`类通常作为功能模块使用，在需要该功能时“混入”，有利于代码复用又避免了多继承的复杂

## Vue中的Mixin

​		本质其实就是一个`js`对象，它可以包含我们组件中任意功能选项，如`data`、`components`、`methods `、`created`、`computed`等等

​		我们只要将共用的功能以对象的方式传入 `mixins`选项中，当组件使用 `mixins`对象时所有`mixins`对象的选项都将被混入该组件本身的选项中来

在`Vue`中我们可以**局部混入**跟**全局混入**

### 局部混入

```javascript
//定义一个`mixin`对象，有组件`options`的`data`、`methods`属性
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}
//组件通过mixins属性调用mixin对象
Vue.component('componentA',{
  mixins: [myMixin]
})
//该组件在使用的时候，混合了mixin里面的方法，在自动执行create生命钩子，执行hello方法
```

### 全局混入

```javascript
//通过Vue.mixin()进行全局的混入
Vue.mixin({
  created: function () {
      console.log("全局混入")
    }
})
//PS：全局混入常用于插件的编写
```

