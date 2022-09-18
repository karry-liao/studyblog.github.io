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

<style scoped>
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
    background: #ffffff;
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