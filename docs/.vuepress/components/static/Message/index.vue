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