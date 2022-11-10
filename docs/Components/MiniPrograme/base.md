# MiniPrograme

## app入口文件可以做什么

1. 定义globalData，page通过const app =getApp()获取globalData
2. 判断小程序的进入场景
3. 获取用户的信息   wx.getUserInfo (将弃用) 后续使用open-type=“getUserInfo”  bingdGetUserInfi='handleGetUserInfo'添加按钮绑定事件获取用户信息
4. 还可通过``` <open-data type='userNickName'></open-type>```直接获取用户信息

## 内置组件

image： 单标签或者双标签，默认自己的大小 320X240   行内块元素(inline-block) , scaleFill     widthFix

```
 wx.chooseImage({
​	success:function(res){
        console.log(res)
​	}
})
```

botton: hover-class   open-type   size   loading

text:行内元素

view：块级元素   hidden

input

## **生命周期**

- ​	onLuach：通常在用户启动的时候触发，用于获取用户个人信息
- ​	onShow：通常用于充值应用的数据或者页面效果，只要页面重新出现了就会触发，不管这个页面是初次加载还是从后台切换回来
- ​	onLoad：发送异步请求来初始化页面数据，监听页面加载，类似vue中的created
- ​	onReady：监听页面初次渲染完成，类似vue中的mounted
- ​	onHide：监听页面隐藏
- ​	onUnload：监听页面卸载

## **钩子函数**

- ​	onPullDownRefresh：监听用户下拉动作，需配置enabelPulldownRefresh：true
- ​	onReachBottom：上拉触底处理函数
- ​	onShareAppMessage：用户点击右上角分享
- ​	onPageScroll：页面滚动触发函数
- ​	onResize：横屏触发，需要在页面的json文件添加：“pageOrientation“：”auto”
- ​	onTabItemTap：点击页面的tabitem才会触发

# conponent

```js
components({
​	properties:{
​		title:{
		observer:function(newvalue,oldvalue){}
		}
	},
    methods:{
           fool(){}
    },

     optiones:{	//定义组件的配置选项
​		multipleSlots:true	//​	multipleSlots:在使用多插槽是需设置true
        styleIsolation://设置样式的隔离方式，跟scoped类似
	},
    //外界给组件传入额外的样式
    externalClass:[],
        Observers(){      //监听properties/data的改变  拿不到lodVal
        	counter:function(newVal)
    },
    //组件中监听生命周期函数
    //1.监听所在页面的生命周期
    pageLifetimes:{
        show(){
            console.log('监听组件所在页面显示出来的生命周期')
        }，
       	hide(){
            console.log('监听组件所在页面隐藏出来的生命周期')
        }，
        resize(){
            console.log('监听页面尺寸改变')
        }
    }
    //2.监听组件本身的生命周期
        lifetimes:{
            created(){},
            attached(){
            	console.log('组件被添加到页面')
            },
            ready(){ }//组件被渲染出来
            move(){}//组件被移动到另一个节点，
            detached(){}//组件被移除
        }
})


```

# 小程序系统API

```js
wx.request({
    url:'',
    data:'',
    method:''
    success:function(res){
        console.log(res)
    },
    fail:function(){
        
    },
    header:'',
    reponseType:'',
    completer:'',
    dataType:'' //接口调用结束的回调函数，成功失败都会执行
})
```



# uni-app页面生命周期

## 页面生命周期

- onInit：监听页面初识化，其参数同onLoad参数，为上个页面传递的数据，参数类型为object，（用于页面传参）触发时机早于onLoad

- onLoad：监听页面加载，其参数为上个页面传递的数据，参数类型为对象，（用于页面传参）

- onShow：监听页面显示，页面每次出现在屏幕上都触发，包括从下级页面返回露出当前页面

- onReady：监听页面初次渲染完成，注意如果渲染速度快，会在页面进入动画完成前触发

- onHide：监听页面隐藏

- onUnload：监听页面卸载

- onResize：监听窗口尺寸变化

- onPullDownRefresh：监听用户下拉动作，一般用于下拉刷新

- onReachBottom：页面滚动到底部的时间，(不是scoll-view滚到底)，常用于下拉下一页数据

- onTabItemTap：点击tab时触发，参数为object

- onShareAppMessage：用户点击右上角分享

- onPageScroll：监听页面滚动，参数为object

- onNavigationBarButtonTap：监听原生标题栏目点击时间，参数为object

- onBackPress：监听页面返回，返回event={from：backbutton，navigateBack}backbutton表示来源是左上角返回按钮或者Android返回键；navigateBack表示小程序只有真机能触发，只能监听非navigateBack引起的返回，不可阻止默认事件。

  

  ## 组件生命周期

  beforeCreate

  created

  beforeMount

  mounted

  beforeUpdate

  updated

  beforeDestroy

  destroyed

