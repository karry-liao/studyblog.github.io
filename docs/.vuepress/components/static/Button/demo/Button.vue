<template>
    <div class="cmp">
        <button ref="button" class="button1" :style="{color:color}">{{ButtonName}}</button>
    </div>
  </template>
  
  <script>
import { watch } from 'vue'
  export default {
    name:"button1-karry",
    data(){
        return{
        text:""
        }
    },
    props:{
        ButtonName:{
            type: String,
            default:"可自定义内容"
        },
        color:{
            type: String,
            default:"#FFFF00"
        },
    },
  }
  </script>
  
  <style>
    .cmp{
        display: flex;
        justify-content: center;
        align-items: center;
    }
      .button1{
          /* width: 150px; */
          height: 70px;
          background-color: gray;
          border-radius: 10px;
          border-color: brown;
          border: 3px saddlebrown solid;
          color: beige;
          font-size: 30px;
          outline: none;
          z-index: 1;
          position: relative;
          overflow: hidden;
      }
      .button1::before{
          content: "";
          position: absolute;
          background-color: aliceblue;
          width: 200px;
          height: 200px;
          z-index: -2;
          left: 50%;
          top: 50%;
          transform-origin: 0 0;
          animation: rotate 3s infinite linear;
      }
      .button1::after{
          content: "";
          position: absolute;
          background: #0000ff;
          width: calc(100% - 4px);
          height: calc(100% - 4px);
          left: 2px;
          top: 2px;
          border-radius: 10px;
          z-index: -1;
      }
      @keyframes rotate {
          to{
              transform: rotate(1turn);
          }
  
      }
  </style>