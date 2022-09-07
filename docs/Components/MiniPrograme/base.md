# MiniPrograme

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