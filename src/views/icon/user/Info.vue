<template>
    <div id="info">
        <subhead>
            <div><i class="fa fa-user-o"></i>&nbsp;&nbsp;&nbsp;个人中心&nbsp;<span>Personal Center</span></div>
        </subhead>
        <section>
            <header class="_theme_font">我的信息
                <span v-if="$school.school==='ccnu'"><a href="http://selfservice.ccnu.edu.cn/account/modifypass.jsf" target="_blank">修改密码</a>
                <a class="_theme_border" href="http://selfservice.ccnu.edu.cn/account/userinfo.jsf" target="_blank">修改账户预留信息</a></span>
            </header>
            <div class="content">
                <div class="text">
                    <p><span class="width2">编号：</span><span class="width4">{{user.usernumber}}</span><span class="width2">姓名：</span><span class="width4">{{user.name}}</span></p>
                    <p><span class="width2">性别：</span><span class="width4">{{user.xb}}</span><span class="width2">部门：</span><span class="width4">{{user.deptName}}</span></p>
                    <p><span class="width2">手机：</span><span class="width4">{{user.mobile}}</span><span class="width2">邮箱：</span><span class="width4">{{user.schoolEmail}}</span></p>
                    <p><span class="width2">用户类别：</span><span class="width4">{{user.usertypeName}}</span></p>
                </div>
                <div class="img hidden-xs-only">
                    <router-link to="/user/head" class="border"><img :src="user.userFace?user.userFace:'/img/a0.jpg'"/></router-link>
                </div>
            </div>
        </section>
        <template v-if="$school.school==='hit'">
            <section class="other">
                <header class="_theme_font">绑定邮箱<i>用于收取个人邮件<em>( 仅支持工大邮箱（@*.hit.edu.cn）的绑定 )</em></i></header>
                <label v-if="user.schoolEmail!==''">
                    <span>已绑邮箱：</span>
                    <input class="disabled" :value="user.schoolEmail" disabled/><button class="_theme_darker" @click="delEmail">解除绑定</button>
                </label>
                <label v-else>
                    <span>邮箱地址：</span><input v-model="email" placeholder="邮箱名称"/>
                    <select v-model="type">
                        <option value="">请选择</option>
                        <option value="@hit.edu.cn">@hit.edu.cn</option>
                        <option value="@stu.hit.edu.cn">@stu.hit.edu.cn</option>
                    </select>
                    <input v-model="password" type="password" placeholder="邮箱密码"/>
                    <button class="_theme_darker" @click="addEmail">确认绑定</button>
                </label>
            </section>
            <section class="other">
                <header class="_theme_font">绑定一卡通
                    <i v-if="user.cardNo===''">友情提示:您的工号/学号{{user.usernumber}}对应的一卡通(饭卡)账号为{{user.cardNo}}</i>
                    <i v-else>友情提示:一卡通(饭卡)账号并非您的学号/职工号,您可以通过分布在校园内的一卡通自助查询设备或网费自助缴费机进行查询,一般为5位数字。</i>
                </header>
                <label v-if="user.cardNo!==''">
                    <span>已绑一卡通：</span>
                    <input class="disabled" :value="user.cardNo" disabled/><button class="_theme_darker" @click="delCard">解除绑定</button>
                </label>
                <label v-else>
                    <span>一卡通账号：</span><input v-model="cardNo" placeholder="一卡通账号/（学）工号"/>
                    <input style="padding-left: 15px" v-model="cardPassword" type="password" placeholder="一卡通密码"/>
                    <button class="_theme_darker" @click="addEcard">确认绑定</button>
                </label>
            </section>
        </template>
    </div>
</template>

<script>
  export default {
    name: "Info",
    data(){
      return{
        email:'',
        type:'',
        password:'',
        cardNo:'',
        cardPassword:''
      }
    },
    computed:{
      user(){
        return this.$store.state.user;
      }
    },
    methods:{
      delEmail(){
        this.$confirm('确认解绑吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.post('/email_portal/unbindEmail')
              .then(res=>{
                if(res.data.errcode==='0'){
                  this.$notify.success('解绑成功');
                  this.email='';
                  this.type='';
                  this.password='';
                  this.$ajax.post(this.$url.getUser)
                      .then(res => {
                        this.$store.commit('set_user', res.data.user);
                      });
                }
              })
        }).catch(()=>{})
      },
      addEmail(){
        if(this.email===''){
          this.$notify.error('邮箱名称不能为空');
        }
        else if(this.type===''){
          this.$notify.error('请选择邮箱类型');
        }
        else if(this.password===''){
          this.$notify.error('邮箱密码不能为空');
        }
        else{
          this.$ajax.post('/email_portal/bindEmail',{email:this.email+this.type,password:this.password})
              .then(res=>{
                if(res.data.errcode==='0'){
                  this.$notify.success('绑定成功');
                  this.$ajax.post(this.$url.getUser)
                      .then(res => {
                        this.$store.commit('set_user', res.data.user);
                      });
                }
                else{
                  this.$notify.error('绑定失败，请仔细核对邮箱信息');
                }
              })
        }
      },
      delCard(){
        this.$confirm('确认解绑吗？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.$ajax.post('/ecard_portal/unbindCard')
              .then(res=>{
                if(res.data.errcode==='0'){
                  this.$notify.success('解绑成功');
                  this.cardNo='';
                  this.cardPassword='';
                  this.$ajax.post(this.$url.getUser)
                      .then(res => {
                        this.$store.commit('set_user', res.data.user);
                      });
                }
              })
        }).catch(()=>{})
      },
      addEcard(){
        if(this.cardNo===''){
          this.$notify.error('一卡通号不能为空');
        }
        else if(this.cardPassword===''){
          this.$notify.error('一卡通密码不能为空');
        }
        else{
          this.$ajax.post('/ecard_portal/bindCard',{cardNo:this.cardNo,password:this.cardPassword})
              .then(res=>{
                if(res.data.errcode==='0'){
                  this.$notify.success('绑定成功');
                  this.$ajax.post(this.$url.getUser)
                      .then(res => {
                        this.$store.commit('set_user', res.data.user);
                      });
                }
                else{
                  this.$notify.error('绑定失败，请仔细核对一卡通信息');
                }
              })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    #info{
        section{
            background: #fff;
            @extend %width;
            font-size: 14px;
            padding: 0 20px 50px;
            border: 1px solid #eaeaea;
            margin-bottom: 20px;
            header{
                @include flex(space-between);

                padding: 10px 0;
                border-bottom: 1px dashed #bfbfbf;
                span{
                    a:last-child{
                        padding-left: 10px;
                        margin-left: 10px;
                        border-left: 1px solid;
                    }
                }
            }
            .content{
                @include flex;
                padding: 10px 0 0 0;
                .text{
                    display: inline-block;
                    width: 75%;
                    @media only screen and (max-width:767px) {
                        width: 100%;
                    }
                    p{
                        @include flex;
                        flex-flow: wrap;
                        margin: 12px 0 0 0;
                        span{
                            display: inline-block;
                            padding: 0 10px;
                        }
                        .width2{
                            text-align: right;
                            width: 16.6%;
                            @media only screen and (max-width:767px) {
                                width: 50%;
                            }
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
                @include flex;
                flex-flow: wrap;
                @media only screen and (max-width:767px) {
                    span,input,select,button{
                        margin-bottom: 10px;
                    }
                }
                span{
                    display: inline-block;
                    width: 197px;
                    text-align: right;
                    @media only screen and (max-width:767px){
                        text-align: left;
                    }
                    padding: 0 15px 0 0;
                }
                input{
                    background: #fff;
                    height: 34px;
                    padding: 6px 12px;
                    font-size: 14px;
                    color: #555;
                    border: 1px #cfdadd solid;
                    border-radius: 2px;
                    margin-right: 15px;
                }
                input.disabled{
                    background: #eee;
                    cursor: not-allowed;
                }
                select{
                    background: #fff;
                    height: 34px;
                    font-size: 14px;
                    color: #555;
                    padding: 6px 12px;
                    border: 1px solid #cfdadd;
                    border-radius: 2px;
                    margin-right: 30px;
                }
                button{
                    font-size: 14px;
                    color: #fff;
                    padding: 6px 12px;
                    border: none;
                    border-radius: 2px;
                }
            }
        }
    }
</style>