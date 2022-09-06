# Button

<ContainerBox title="介绍">
::: slot desc
用于用户操作后的页面提示框，用户可自定义信息
:::
</ContainerBox>
</ContainerBox>

## 代码演示

<ContainerBox title="基础用法">
<div class="demoBox">
<static-Message-demo-message/>
</div>

<ShowCode>
::: slot codes
```vue
<template>
    <div class="msg">
        <p ref="msg"  :class="{active:isShow}">
            {{msg}}
        </p>
    </div>
</template>

<script>
export default {
    name:"vue-msg",
    data(){
        return {
            msg:"",
            isShow:false,
        }
    },
    methods:{
        msgPlugin(msg,time=2000){
            this.msg = msg,
            this.isShow = true
            console.log(this.msg)
            setTimeout(()=>{
                this.isShow = false
                this.msg = ''
            }, time)
        }
    }
}
</script>

<style>
.msg{
    display: flex;
    justify-content: center;
    align-items: center;
}
.msg .active{
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translate(-50%, -50%);
    width: 0;
    min-height: 0;
    text-align: center;
    background-color: rgba(0, 255, 76, 0.1);
    border-radius: 5px;
    border: 2px solid rgba(22, 123, 22, 0.3);
    color: #632020;
    transition: all 0.5s;
    z-index: 99;
    opacity: 1;
    min-width: 150px;
    min-height: 25px;
    text-align: center;
    display: block;
}
</style>
````
:::
</ShowCode>
</ContainerBox>

## API

<ContainerBox title="Props">
::: slot desc

| 参数                           | 说明                                              | 类型   | 默认值 |
| ------------------------------ | ------------------------------------------------- | ------ | ------ |
| msgPlugin                         | function,携带两个参数msgPlugin(msg,time)         | function   | function("",2000)      |



:::
</ContainerBox>