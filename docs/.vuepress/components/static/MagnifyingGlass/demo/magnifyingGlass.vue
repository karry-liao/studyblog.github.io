<template>
    <div>
      <div class="left">
        <img class="leftImg" src="../img/pic.jpg" alt="" />
        <!-- 鼠标层罩 -->
        <div v-show="topShow" class="top" :style="topStyle"></div>
        <!-- 最顶层覆盖了整个原图空间的透明层罩 -->
        <div
          class="maskTop"
          @mouseenter="enterHandler"
          @mousemove="moveHandler"
          @mouseout="outHandler"
        ></div>
      </div>
        <div v-show="rShow" class="right">
        <img
          :style="r_img"
          class="rightImg"
          src="../img/pic.jpg"
          alt=""
        />
      </div>

    </div>
  </template>
  
  <script>
    export default {
      data() {
        return {
          topStyle: { transform: "" },
          r_img: {},
          topShow: false,
          rShow: true,
        };
      },
      methods: {
        // 鼠标进入原图空间函数
        enterHandler() {
          // 层罩及放大空间的显示
          this.topShow = true;
          this.rShow = true;
        },
        // 鼠标移动函数
        moveHandler(event) {
          // 鼠标的坐标位置
          let x = event.offsetX;
          let y = event.offsetY;
          console.log(x,y)
          // 层罩的左上角坐标位置，并对其进行限制：无法超出原图区域左上角
          let topX = x - 50 < 0 ? 0 : x - 50;
          let topY = y - 50 < 0 ? 0 : y - 50;
          // 对层罩位置再一次限制，保证层罩只能在原图区域空间内
          if (topX > 100) {
            topX = 100;
          }
          if (topY > 100) {
            topY = 100;
          }
          // 通过 transform 进行移动控制
          this.topStyle.transform = `translate(${topX}px,${topY}px)`;
          this.r_img.transform = `translate(-${2 * topX}px,-${2 * topY}px)`;
          console.log(this.topStyle.transform,this.r_img.transform)
          
        },
        // 鼠标移出函数
        outHandler() {
          // 控制层罩与放大空间的隐藏
          this.topShow = false;
          this.rShow = false;
        },
      },
    };
    </script>
    
    
<style scoped>
    /* 放大的图片，通过定位将左上角定位到(0,0) */
    
    .right {
      margin-left: 206px;
      width: 200px;
      height: 200px;
      position: relative;
      /* overflow: hidden; */
      background-color: aqua;
    } /* 一个最高层层罩 */
    .rightImg {
        display: inline-block;
      width: 400px;
      height: 400px;
      position: absolute;
      top: 0;
      left: 0;
    } /* 右边的区域图片放大空间 */
    .maskTop {
      width: 200px;
      height: 200px;
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
    } /* 层罩，通过定位将左上角定位到(0,0) */
    .top {
      width: 100px;
      height: 100px;
      background-color: lightcoral;
      opacity: 0.4;
      position: absolute;
      top: 0;
      left: 0;
    } /* 原图的显示 */
    .left {
      width: 200px;
      height: 200px;
      border: 1px solid teal;
      float: left;
      position: relative;
    }
    .leftImg {
      width: 200px;
      height: 200px;
      display: inline-block;
    } /* 原图的容器 */
    </style>
    
  