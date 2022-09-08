<template id="fontPosition">
    <div>

            <span>程序猿</span>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
#fontPosition{
    position: relative;
    margin-left: auto;
    justify-content: center;
    align-items: center;
}
div {
    height: 80px;
    font-size: 30px;
    background: linear-gradient(90deg,  rgb(0, 0, 0) 50%, #fff 50%);
    display: flex;
    justify-content: center;
    align-items: center;
 
    span {
      color: #fff;
      transform: translate(-50%, -50%);
      animation: move 2s infinite linear alternate;
      mix-blend-mode: difference;
    }
}
@keyframes move {
    0% {
        transform: translate(-30%, -50%);
    }
    100% {
        transform: translate(-70%, -50%);
    }
}
 
</style>