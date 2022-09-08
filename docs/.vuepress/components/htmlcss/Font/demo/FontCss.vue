<template>
  <div class="font">
        <h1 class="vintage0">爱生活，爱开发，编程使我快乐</h1>
        <h1 class="vintage1">爱生活，爱开发，编程使我快乐</h1>
        <h1 class="vintage2">爱生活，爱开发，编程使我快乐</h1>
        <h1 class="vintage3">爱生活，爱开发，编程使我快乐</h1>
        <h1 class="vintage4">爱生活，爱开发，编程使我快乐</h1>
        <h1 class="vintage5">爱生活，爱开发，编程使我快乐</h1>
        <h1 class='text-reflect-base'>爱生活，爱开发，编程使我快乐</h1>
        <h1 class="text">爱生活，爱开发，编程使我快乐</h1>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.font{
    text-align: center;
}
    .vintage0 {
    text-align: center;
    font-family: "微软雅黑";
    font-weight: bold;
    color: rgb(255, 72, 0);
    margin-top: 50px;
    animation: fireDiv 1s infinite;
    }
    @keyframes fireDiv {
    0% {
        text-shadow: 0 0 4px white, 0 -5px 4px #ff3, 2px -10px 6px #fd3,
        -2px -15px 11px #f80, 2px -25px 18px #f20;
    }
    25% {
        text-shadow: 0 0 4px white, 2px -7px 6px #ff3, 2px -12px 8px #fd3,
        -3px -20px 11px #f80, 4px -30px 22px #f20;
    }
    50% {
        text-shadow: 0 0 4px white, 2px -10px 8px #ff3, 2px -14px 10px #fd3,
        -4px -25px 11px #f80, 4px -35px 25px #f20;
    }
    75% {
        text-shadow: 0 0 4px white, 2px -7px 6px #ff3, 2px -12px 8px #fd3,
        -3px -20px 11px #f80, 4px -30px 22px #f20;
    }
    100% {
        text-shadow: 0 0 4px white, 0 -5px 4px #ff3, 2px -10px 6px #fd3,
        -2px -15px 11px #f80, 2px -25px 18px #f20;
    }
    }
.vintage1{
background: #EEE url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAAHklEQVQImWNkYGBgYGD4//8/A5wF5SBYyAr+//8PAPOCFO0Q2zq7AAAAAElFTkSuQmCC) repeat;
text-shadow: 5px -5px black, 4px -4px white;
font-weight: bold;
-webkit-text-fill-color: transparent;
background-clip: text }
.vintage2{
color: transparent;
-webkit-text-stroke: 1px red;
letter-spacing: 0.04em;}
.vintage3 {
color: transparent;
background-color : blue;
text-shadow : rgba(255,255,255,0.5) 0 5px 6px, rgba(255,255,255,0.2) 1px 3px 3px;
background-clip : text;
}
.vintage4{
display: block;
color: #fff;
text-align: center;
text-shadow: 0px -1px 4px white, 0px -2px 10px yellow, 0px -10px 20px #ff8000, 0px -18px 40px red;
position: relative;
}
.vintage5{
    font-family:cursive;text-shadow:6px 2px 2px #333;color:deeppink
}
.text-reflect-base{
    color: palegreen;
    -webkit-box-reflect:below 10px;
}
.text{
    margin-top:60px;
    background-image: -webkit-linear-gradient(left,blue,#66ffff 10%,#cc00ff 20%,#CC00CC 30%, #CCCCFF 40%, #00FFFF 50%,#CCCCFF 60%,#CC00CC 70%,#CC00FF 80%,#66FFFF 90%,blue 100%);
    -webkit-text-fill-color: transparent;/* 将字体设置成透明色 */
    background-clip: text;/* 裁剪背景图，使文字作为裁剪区域向外裁剪 */
    background-size: 200% 100%; 
    animation: masked-animation 4s linear infinite;
    font-size: 35px;
}
@keyframes masked-animation {
    0% {
        background-position: 0  0;
    }
    100% {
        background-position: -100%  0;
    }
}
</style>