<template>
  <div class="demo">
    
    <static-icon-karryIcon
      :imgUrl="require('./img/a.svg')"
      :imgUrlHover="require('./img/b.svg')"
      title="滑稽"
      size="10vw"
      left="0.5em"
      right="0.5em"
    />
  </div>
</template>
<script>
  export default {
      name: "indexB"
  }
  </script>
<style scoped>
.demo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 7.5vw;
}
</style>
