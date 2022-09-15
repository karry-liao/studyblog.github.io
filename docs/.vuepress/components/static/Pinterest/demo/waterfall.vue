<template>
    <div class="box"  ref="box" style="width:100%;">
        <div class="item"  v-for="item in img" :key="item.id" > 
        <img  :src="item.url" alt="1" />
        </div>
    </div>
</template>

<script>
export default {
    name:'Pinterest',
    data() { 
        return {
            img:[
        {
            id: 1,
            'url': require('../imgs/1.jpg')
        },
        {
            id: 2,
            'url': require('../imgs/2.jpg')
        },
        {
            id: 3,
            'url': require('../imgs/3.jpg')
        },
        {
            id: 4,
            'url': require('../imgs/1.jpg')
        },
        {
            id: 5,
            'url': require('../imgs/2.jpg')
        },
        {
            id: 6,
            'url': require('../imgs/3.jpg')
        },
        {
            id: 7,
            'url': require('../imgs/1.jpg')
        },
        {
            id: 8,
            'url': require('../imgs/2.jpg')
        },
        {
            id: 9,
            'url': require('../imgs/3.jpg')
        },
        {
            id: 10,
            'url': require('../imgs/1.jpg')
        },
        {
            id: 11,
            'url': require('../imgs/2.jpg')
        },
        {
            id: 12,
            'url': require('../imgs/3.jpg')
        },
    ]
        }
    },

    mounted() {
        console.log(this.$refs.box.style.width)
                console.log(window.screen)
        console.log(window.screen.width)
    }
}
</script>

<style lang="less" scoped>
    .box {
          margin: 10px;
          column-count: 3;
          column-gap: 10px;
      }
      .item {
          margin-bottom: 10px;
      }
      .item img{
          width: 100%;
          height:100%;
      }
</style>