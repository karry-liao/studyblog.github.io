<template>
  <div class="Logo">
    <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201911%2F30%2F20191130103938_uNhF5.thumb.700_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664606884&t=978883c3b180812cc76c793f1f6a6b92" alt="lyb" />
    <div class="name">Karry</div>
    <div class="desc">This is a learning site for front-end programmers</div>
  </div>
</template>
<script>
export default {
  name: "Logo"
}
</script>
<style scoped lang="less">
.Logo {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 100%;
  background-color: #fff;
  box-shadow: 0 8px 12px #ebedf0;
  border-radius: 20px;
  margin-bottom: 24px;
  padding: 24px;
  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-bottom: 25px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  }
  .name {
    font-size: 36px;
    margin-bottom: 15px;
  }
  .desc{
    color: grey;
  }
}
</style>
