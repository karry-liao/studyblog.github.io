# 滑块验证

<ContainerBox title="介绍">
::: slot desc
用于用户操作后的页面提示框，用户可自定义信息
:::
</ContainerBox>
</ContainerBox>

## 代码演示

<ContainerBox title="基础用法">
<div class="demoBox">
<static-SlideVerify-demo-slideverify/>
</div>

<ShowCode>
::: slot codes
```vue
<template>
    <div class="drag" ref="dragDiv">
        <div class="drag_bg"></div>
        <div class="drag_text">{{confirmWords}}</div>
        <div ref="moveDiv" @mousedown="mousedownFn($event)" :class="{'handler_ok_bg':confirmSuccess}" class="handler handler_bg" style="position: absolute;top: 0px;left: 0px;"></div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                beginClientX:0,           /*距离屏幕左端距离*/
                mouseMoveStata:false,     /*触发拖动状态  判断*/
                maxwidth:'',               /*拖动最大宽度，依据滑块宽度算出来的*/
                confirmWords:'拖动滑块验证',   /*滑块文字*/
                confirmSuccess:false           /*验证成功判断*/
            }
        },
        methods: {
            mousedownFn:function (e) {
                if(!this.confirmSuccess){
                    e.preventDefault && e.preventDefault();   //阻止文字选中等 浏览器默认事件
                    this.mouseMoveStata = true;
                    this.beginClientX = e.clientX;
                }
            },        //mousedoen 事件
            successFunction(){
                this.confirmSuccess = true
                this.confirmWords = '验证通过';
                if(window.addEventListener){
                    document.getElementsByTagName('html')[0].removeEventListener('mousemove',this.mouseMoveFn);
                    document.getElementsByTagName('html')[0].removeEventListener('mouseup',this.moseUpFn);
                }else {
                    document.getElementsByTagName('html')[0].removeEventListener('mouseup',()=>{});
                }
                document.getElementsByClassName('drag_text')[0].style.color = '#fff'
                document.getElementsByClassName('handler')[0].style.left = this.maxwidth + 'px';
                document.getElementsByClassName('drag_bg')[0].style.width = this.maxwidth + 'px';
            },                //验证成功函数
            mouseMoveFn(e){
                if(this.mouseMoveStata){
                    let width = e.clientX - this.beginClientX;
                    if(width>0 && width<=this.maxwidth){
                        document.getElementsByClassName('handler')[0].style.left = width + 'px';
                        document.getElementsByClassName('drag_bg')[0].style.width = width + 'px';
                    }else if(width>this.maxwidth){
                        this.successFunction();
                    }
                }
            },                   //mousemove事件
            moseUpFn(e){
                this.mouseMoveStata = false;
                var width = e.clientX - this.beginClientX;
                if(width<this.maxwidth){
                    document.getElementsByClassName('handler')[0].style.left = 0 + 'px';
                    document.getElementsByClassName('drag_bg')[0].style.width = 0 + 'px';
                }
            }                       //mouseup事件
        },
        mounted(){
            this.maxwidth = this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth;
            document.getElementsByTagName('html')[0].addEventListener('mousemove',this.mouseMoveFn);
            document.getElementsByTagName('html')[0].addEventListener('mouseup',this.moseUpFn)
        }
    }
</script>

<style scoped>
    .drag{
        position: relative;
        background-color: #e8e8e8;
        width: 100%;
        height: 34px;
        line-height: 34px;
        text-align: center;
    }
    .handler{
        width: 40px;
        height: 32px;
        border: 1px solid #ccc;
        cursor: move;
    }
    .handler_bg{
        background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==") no-repeat center;
    }
    .handler_ok_bg{
        background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==") no-repeat center;
    }
    .drag_bg{
        background-color: #7ac23c;
        height: 34px;
        width: 0px;
    }
    .drag_text{
        position: absolute;
        top: 0px;
        width: 100%;text-align: center;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        -o-user-select:none;
        -ms-user-select:none;
    }
</style>

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

<ContainerBox title="自定义样式">
::: slot desc
悬浮切换图标
:::

<div class="demoBox">
<static-SlideVerify-demo-slideverify1/>
</div>

<ShowCode>
::: slot codes
```vue
<template>
  <div id="app">
  <div class="check" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp" >
    <p>拖动滑块使图片角度为正</p>
    <div class="img-con">
      <img src="https://z3.ax1x.com/2021/08/06/fn7X4S.png"  :style="{transform: imgAngle}" />
    <div v-if="showError" class="check-state" >
        错误
    </div>
    <div v-else-if="showSuccess" class="check-state">
        正确
    </div>
    <div v-else-if="checking" class="check-state">
        验证中
    </div>
    </div>

    <div ref="sliderCon" class="slider-con" :class="{'err-anim':showError}"><span ref="spanx"  class="slide-tip" style="opacity:1">拖动滑块验证</span>
      <div ref="slider" id="slider" class="slider"  :style="{'--move': `${slidMove}px`}" :class="sliding">
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      showError: false, // 显示错误提示
      showSuccess: false, // 显示成功提示
      checking: false, // 显示检查中提示
      sliding: false, // 当前是否正在拖动滑块
      slidMove: 0 // 滑块移动的距离(px)
    };
    },
    computed: {
        angle() {
        let sliderConWidth = this.sliderConWidth ?? 0;
        let sliderWidth = this.sliderWidth ?? 0;
        let ratio = this.slidMove / (sliderConWidth - sliderWidth);
        // 360度乘以滑块的移动比例，就是旋转的角度
        return 360 * ratio;
        },
        imgAngle() {
        return `rotate(${this.angle}deg)`;
        }
    },
    methods: {
        // 鼠标按下
        onMouseDown(event) {
        // 当用户鼠标按下时，目标不是滑块，则不处理
        if (event.target.id !== "slider") {
            return;
        }
        if (this.checking) return;
        // 设置状态为滑动中
        this.sliding = true;
        // 下面三个变量不需要监听变化，因此不放到 data 中

        // clientX 事件属性返回当事件被触发时鼠标指针相对于浏览器页面（或客户区）的水平坐标。
        // 记录鼠标按下时的x位置
        this.sliderLeft = event.clientX;
        this.sliderConWidth = this.$refs.sliderCon.clientWidth; // 记录滑槽的宽度
        this.sliderWidth = this.$refs.slider.clientWidth; // 记录滑块的宽度
        },
// 鼠标抬起
        onMouseUp(event) {
        if (this.sliding && this.checking === false) {
            this.checking = true;
            this.validApi(this.angle)
            .then((isok) => {
                if (isok) {
                this.showSuccess = true;
                } else {
                this.showError = true;
                }
                return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (isok) {
                    resolve(Math.round(this.angle));
                    } else {
                    reject();
                    }
                    this.resetSlider();
                }, 1000);
                });
            }).then((angle) => {
                // 处理业务，或者通知调用者验证成功
                alert("旋转正确: " + angle + "度");
            }).catch(err=>{})
            //     .catche((e) => {
            //     alert("旋转错误",e);
            // });
        }
        },
// 重置滑块
        resetSlider() {
        this.sliding = false;
        this.slidMove = 0;
        this.checking = false;
        this.showSuccess = false;
        this.showError = false;
        },
        // 处理鼠标移动
        onMouseMove(event) {
        if (this.sliding && this.checking === false) {
            // 滑块向右的平移距离等于鼠标移动事件的X坐标减去鼠标按下时的初始坐标。
            let m = event.clientX - this.sliderLeft;
            if (m < 0) {
            // 如果m小于0表示用户鼠标向左移动超出了初始位置，也就是0
            // 所以直接等于 0，以防止越界
            m = 0;
            } else if (m > this.sliderConWidth - this.sliderWidth) {
            // 滑块向右移动的最大距离是滑槽的宽度减去滑块的宽度。
            // 因为css的 translateX 函数是以元素的左上角坐标计算的
            // 所以要减去滑块的宽度，这样滑块在最右边时，才不会左上角和滑槽右上角重合。
                m = this.sliderConWidth - this.sliderWidth;
            }
            this.$refs.spanx.style.opacity = 5/m
            this.slidMove = m;
        }
        },
        // 验证角度是否正确
        validApi(angle) {
        return new Promise((resolve, reject) => {
            // 模拟网络请求
            setTimeout(() => {
            // 图片已旋转的角度
            const imgAngle = 90;
            // 图片已旋转角度和用户旋转角度之和
            let sum = imgAngle + angle;
            // 误差范围
            const errorRang = 10;
            // 当用户旋转角度和已旋转角度之和为360度时，表示旋转了一整圈，也就是转正了
            // 但是不能指望用户刚好转到那么多，所以需要留有一定的误差
            let isOk = Math.abs(360 - sum) <= errorRang;
            resolve(isOk);
            }, 1000);
        });
        }
    }
}
</script>

<style>
    #app {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    }
    .check-state {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    display: flex;
    justify-content:center;
    align-items:center;
    }
    .check {
    --slider-size: 50px;
    margin-top: 20px;
    width: 300px;
    background: white;
    box-shadow: 0 0 5px grey;
    border-radius: 5px;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    }

    .check .img-con {
    position: relative;
    overflow: hidden;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    }
    .slide-tip{
    text-align: center;
    width: 240px;
    display: block;
    position: absolute;
    line-height: 50px;
    }
    .check .img-con img {
    width: 100%;
    height: 100%;
    user-select: none;
    }

    .check .slider-con {
    width: 80%;
    height: var(--slider-size);
    border-radius: 50px;
    margin-top: 1rem;
    position: relative;
    background: #f5f5f5;
    box-shadow: 0 0 5px rgba(0,0,0,0.1) inset;
    }

    .slider-con .slider {
    background: white;
    width: var(--slider-size);
    height: var(--slider-size);
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(0,0,0,0.2);
    cursor: move;
    --move: 0px;
    transform: translateX(var(--move));
    }

    body {
    padding: 0;
    margin: 0;
    background: #fef5e0;
    }
    .slider-con .slider.sliding {
    background: #4ed3ff;
    }
    @keyframes jitter {
    20% {
        transform: translateX(-5px);
    }
    40% {
        transform: translateX(10px);
    }
    60% {
        transform: translateX(-5px);
    }
    80% {
        transform: translateX(10px);
    }
    100% {
        transform: translateX(0);
    }
    }

    .slider-con.err-anim {
    animation: jitter 0.5s;
    }
    /** 错误动画下的滑块颜色为红色 **/
    .slider-con.err-anim .slider {
    background: #ff4e4e;
    }

</style>
````

:::
</ShowCode>
</ContainerBox>

## Detail

<ContainerBox title="Props">
::: slot desc
    此项目还有很大的优化空间，请待后续完善。。。
:::
</ContainerBox>
