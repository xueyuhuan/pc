<template>
    <div id="info">
        <subhead>
            <div><i class="fa fa-user-o"></i>&nbsp;&nbsp;&nbsp;个人中心&nbsp;<span>Personal Center</span></div>
        </subhead>
        <section>
            <header>我的信息
                <span v-if="$school.school==='ccnu'"><a href="http://selfservice.ccnu.edu.cn/account/modifypass.jsf" target="_blank">修改密码</a>
                <a href="http://selfservice.ccnu.edu.cn/account/userinfo.jsf" target="_blank">修改账户预留信息</a></span>
            </header>
            <div class="content">
                <div class="text">
                    <p><span class="width2">编号：</span><span class="width4">{{user.usernumber}}</span><span class="width2">姓名：</span><span class="width4">{{user.name}}</span></p>
                    <p><span class="width2">性别：</span><span class="width4">{{user.xb}}</span><span class="width2">部门：</span><span class="width4">{{user.deptName}}</span></p>
                    <p><span class="width2">手机：</span><span class="width4">{{user.mobile}}</span><span class="width2">邮箱：</span><span class="width4">{{user.schoolEmail}}</span></p>
                    <p><span class="width2">用户类别：</span><span class="width4">{{user.usertypeName}}</span></p>
                </div>
                <div class="img">
                    <router-link to="/user/head" class="border"><img :src="user.userFace"/></router-link>
                </div>
            </div>
        </section>
        <section class="other">
            <header>绑定邮箱<i>用于收取个人邮件<em>( 仅支持工大邮箱（@*.hit.edu.cn）的绑定 )</em></i></header>
            <label><span>已绑邮箱：</span><input :value="user.email" disabled/><button @click="delEmail">解除绑定</button></label>
            <label><span>邮箱地址：</span><input placeholder="邮箱名称"/></label>
        </section>
        <section class="other">
            <header>绑定一卡通<i>友情提示:您的工号/学号{{user.usernumber}}对应的一卡通(饭卡)账号为{{user.cardNo}}</i></header>
            <label><span>已绑一卡通：</span><input :value="user.cardNo" disabled/><button @click="delCard">解除绑定</button></label>
        </section>
    </div>
</template>

<script>
  export default {
    name: "Info",
    computed:{
      user(){
        return this.$store.state.user;
      }
    },
    methods:{
      delEmail(){
        this.$ajax.post('/email_portal/unbindEmail')
            .then(res=>{
              if(res.data.err.code==='0'){
                this.$notify({
                  message: '解绑成功',
                  type: 'success',
                  position: 'bottom-right'
                });
              }
            })
      }
    }
  }
</script>

<style scoped lang="scss">
    #info{
        section{
            background: #fff;
            width: 1200px;
            font-size: 14px;
            padding: 0 20px 50px;
            border: 1px solid #eaeaea;
            margin: 0 auto 20px;
            header{
                @include flex(space-between);
                color: $skin-card;
                padding: 10px 0;
                border-bottom: 1px dashed #bfbfbf;
                span{
                    a:first-child{
                        padding-right: 10px;
                        margin-right: 10px;
                        border-right: solid 1px $skin-card;
                    }
                }
            }
            .content{
                padding: 10px 0 0 0;
                .text{
                    display: inline-block;
                    width: 75%;
                    p{
                        margin: 12px 0 0 0;
                        span{
                            display: inline-block;
                            padding: 0 10px;
                        }
                        .width2{
                            text-align: right;
                            width: 16.6%;
                        }
                        .width4{
                            width: 33.3%;
                        }
                    }
                }
                .img{
                    display: inline-block;
                    width: 25%;
                    font-size: 0;
                    .border{
                        display: inline-block;
                        padding: 5px;
                        border: 1px solid #dee5e7;
                        img{
                            width: 120px;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
        section.other{
            header{
                justify-content: flex-start;
                margin: 0 0 20px 0;
                i{
                    font-size: 12px;
                    color: #999;
                    padding-left: 20px;
                    em{
                        color: red;
                    }
                }
            }
            label{
                span{
                    display: inline-block;
                    width: 197px;
                    text-align: right;
                    padding: 0 15px 0 0;
                }
                input{
                    background: #eee;
                    height: 34px;
                    padding: 6px 12px;
                    font-size: 14px;
                    color: #555;
                    border: 1px #cfdadd solid;
                    border-radius: 2px;
                    cursor: not-allowed;
                }
                button{
                    background: #067ebe;
                    font-size: 14px;
                    color: #fff;
                    padding: 6px 12px;
                    border: 1px #067ebe solid;
                    border-radius: 2px;
                    margin: 0 15px;
                }
            }
        }
    }
</style>