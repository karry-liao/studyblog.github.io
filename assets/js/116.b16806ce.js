(window.webpackJsonp=window.webpackJsonp||[]).push([[116],{890:function(t,v,_){"use strict";_.r(v);var a=_(16),s=Object(a.a)({},(function(){var t=this,v=t._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"如何实现二维码登录pc网站的需求"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#如何实现二维码登录pc网站的需求"}},[t._v("#")]),t._v(" 如何实现二维码登录PC网站的需求")]),t._v(" "),v("h2",{attrs:{id:"二维码登录的本质"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#二维码登录的本质"}},[t._v("#")]),t._v(" 二维码登录的本质")]),t._v(" "),v("p",[t._v("二维码登录本质上也是一种登录认证方式。既然是登录认证，要做的也就两件事情：")]),t._v(" "),v("ul",[v("li",[t._v("告诉系统我是谁")]),t._v(" "),v("li",[t._v("向系统证明我是谁")])]),t._v(" "),v("h2",{attrs:{id:"扫描二维码登录的一般步骤"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#扫描二维码登录的一般步骤"}},[t._v("#")]),t._v(" 扫描二维码登录的一般步骤")]),t._v(" "),v("ul",[v("li",[t._v("扫码前，手机端应用是已登录状态，PC端显示一个二维码，等待扫描")]),t._v(" "),v("li",[t._v('手机端打开应用，扫描PC端的二维码，扫描后，会提示"已扫描，请在手机端点击确认"')]),t._v(" "),v("li",[t._v("用户在手机端点击确认，确认后PC端登录就成功了")])]),t._v(" "),v("h2",{attrs:{id:"具体流程"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#具体流程"}},[t._v("#")]),t._v(" 具体流程")]),t._v(" "),v("h3",{attrs:{id:"生成二维码"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#生成二维码"}},[t._v("#")]),t._v(" 生成二维码")]),t._v(" "),v("ul",[v("li",[t._v("PC端向服务端发起请求，告诉服务端，我要生成用户登录的二维码，并且把PC端设备信息也传递给服务端")]),t._v(" "),v("li",[t._v("服务端收到请求后，它生成二维码ID，并将二维码ID与PC端设备信息进行绑定")]),t._v(" "),v("li",[t._v("然后把二维码ID返回给PC端")]),t._v(" "),v("li",[t._v("PC端收到二维码ID后，生成二维码(二维码中肯定包含了ID)")]),t._v(" "),v("li",[t._v("为了及时知道二维码的状态，客户端在展现二维码后，PC端不断的轮询服务端，比如每隔一秒就轮询一次，请求服务端告诉当前二维码的状态及相关信息，或者直接使用websocket，等待在服务端完成登录后进行通知")])]),t._v(" "),v("h3",{attrs:{id:"扫描二维码"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#扫描二维码"}},[t._v("#")]),t._v(" 扫描二维码")]),t._v(" "),v("ul",[v("li",[t._v("用户用手机去扫描PC端的二维码，通过二维码内容取到其中的二维码ID")]),t._v(" "),v("li",[t._v("再调用服务端API将移动端的身份信息与二维码ID一起发送给服务端")]),t._v(" "),v("li",[t._v("服务端接收到后，它可以将身份信息与二维码ID进行绑定，生成临时token。然后返回给手机端")]),t._v(" "),v("li",[t._v("因为PC端一直在轮询二维码状态，所以这时候二维码状态发生了改变，它就可以在界面上把二维码状态更新为已扫描")])]),t._v(" "),v("h3",{attrs:{id:"状态确认"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#状态确认"}},[t._v("#")]),t._v(" 状态确认")]),t._v(" "),v("ul",[v("li",[t._v("手机端在接收到临时token后会弹出确认登录界面，用户点击确认时，手机端携带临时token用来调用服务端的接口，告诉服务端，我已经确认")]),t._v(" "),v("li",[t._v("服务端收到确认后，根据二维码ID绑定的设备信息与账号信息，生成用户PC端登录的token")]),t._v(" "),v("li",[t._v('这时候PC端的轮询接口，它就可以得知二维码的状态已经变成了"已确认"。并且从服务端可以获取到用户登录的token')]),t._v(" "),v("li",[t._v("到这里，登录就成功了，后端PC端就可以用token去访问服务端的资源了")])])])}),[],!1,null,null,null);v.default=s.exports}}]);