(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{802:function(t,n,s){"use strict";s.r(n);var e={data:()=>({countdown:60,value:"免费获取验证码",isDisabled:!1}),computed:{buttonType(){return this.isDisabled?"info":"primary"}},methods:{async sendCode(){try{this.countdown--,this.isDisabled=!0,this.value=this.countdown+"s 后重新发送";let t=setInterval(()=>{this.countdown>1?(this.countdown--,this.value=this.countdown+"s 后重新发送"):(clearInterval(t),this.value="获取验证码",this.isDisabled=!1,this.countdown=60)},1e3)}catch(t){console.log(t)}}}},i=s(16),o=Object(i.a)(e,(function(){var t=this,n=t._self._c;return n("div",[n("el-button",{attrs:{type:t.buttonType,disabled:t.isDisabled},on:{click:function(n){return t.sendCode()}}},[t._v(t._s(t.value))])],1)}),[],!1,null,null,null);n.default=o.exports}}]);