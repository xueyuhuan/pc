<template>
    <div class="jump hidden-xs-only" v-show="jumpShow">
        <transition name="slide-fade">
            <div class="content" v-show="jumpShow">
                <header>跳转至{{jumpName}}<i class="fa fa-close" @click="close"></i></header>
                <div class="body">
                    <div class="main">
                        <img src="/img/todo_jump.png"/>
                        <p>即将进入<em>{{jumpName}}</em>的待办,请在新打开的窗口内继续完成<em>{{jumpName}}</em>的发起工作。<br/>
                            <span>若办理页面不能自动弹出，请修改浏览器配置</span></p>
                    </div>
                    <div class="btn">
                        <button @click="close">确定</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
  export default {
    name: "Jump",
    computed:{
      jumpShow(){
        return this.$store.state.jumpShow;
      },
      jumpName(){
        return this.$store.state.jumpName;
      },
    },
    methods:{
      close(){
        this.$store.commit('set_data',{
          data:false,
          name:'jumpShow'
        });
      }
    }
  }
</script>

<style scoped lang="scss">
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: translateY(50px);
        opacity: 0;
    }
    .jump{
        position: fixed;
        top:0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 999;
        background: rgba(58, 63, 81,0.8);
        .content{
            background: #fff;
            outline: 0;
            width: 900px;
            border: 1px solid rgba(0, 0, 0, .2);
            border-radius: 6px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
            margin: 150px auto;
            header{
                @include flex(space-between);
                line-height: 1;
                font-size: 18px;
                color: #333;
                padding: 10px 15px;
                border-bottom: 1px solid #e5e5e5;
            }
            .body{
                background: #F7F7F7;
                padding: 30px;
                .main{
                    @include flex(center,flex-start);
                    img{
                        width: 100px;
                        height: 100px;
                        margin-right: 30px;
                    }
                    p{
                        width: 404px;
                        font-size: 18px;
                        padding-top: 5px;
                        margin: 0;
                        em{
                            color: rgb(139, 0, 0);
                        }
                        span{
                            font-size: 14px;
                            color: #959595;
                            padding-top: 5px;
                        }
                    }
                }
                .btn{
                    text-align: center;
                    padding: 50px 0 30px 0;
                    button{
                        background: #FF9800;
                        font-size: 14px;
                        color: #fff;
                        padding: 6px 30px;
                        border: none;
                        border-radius: 2px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>