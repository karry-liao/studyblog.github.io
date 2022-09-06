<template>
    <div>
        <div class="bt">
            <button @click="submit">点击出现message</button>
        </div>
        <message ref="msg"></message>
    </div>
</template>

<script>
    import message from '../index.vue'
export default {
    name:"vue-msg",
    components: {
        message
    },
    data(){
        return {
            msg:"",
            isShow:false,
        }
    },
    methods: {
        submit(){
        this.$nextTick(()=>{
            this.$refs.msg.msgPlugin("这是自定义message组件弹窗案例",2000)
      })
    },
    }
}
</script>

<style lang="less" scoped>
    .bt {
        display: flex;
        justify-content: center;
        align-items: center;
            button{
            width: 200px;
            height: 40px;
            color: aquamarine;
            background-color: red;
            border-radius: 5px;
        }
    }
</style>