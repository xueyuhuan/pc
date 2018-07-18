<template>
    <div id="info">
        <subhead>
            <div><i class="fa fa-user-o"></i>&nbsp;&nbsp;&nbsp;个人中心&nbsp;<span>Personal Center</span></div>
        </subhead>
        <div class="main">
            <header>我的信息
                <span><a href="http://selfservice.ccnu.edu.cn/account/modifypass.jsf" target="_blank">修改密码</a>
                <a href="http://selfservice.ccnu.edu.cn/account/userinfo.jsf" target="_blank">修改账户预留信息</a>
            </span>
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
        </div>
    </div>
</template>

<script>
  export default {
    name: "Info",
    computed:{
      user(){
        return this.$store.state.user;
      }
    }
  }
</script>

<style scoped lang="scss">
    #info{
        .main{
            background: #fff;
            width: 1200px;
            font-size: 14px;
            padding: 0 20px 50px;
            margin: 0 auto;
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
    }
</style>