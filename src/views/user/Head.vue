<template>
    <div id="head">
        <subhead>
            <div><i class="fa fa-user-o"></i>&nbsp;&nbsp;&nbsp;个人中心&nbsp;<span>Personal Center</span></div>
        </subhead>
        <div class="main">
            <header>头像设置</header>
            <label><i class="fa fa-image"></i>&nbsp;&nbsp;选择头像<input id="file" type="file" accept="image/png, image/jpeg, image/gif, image/jpg" @change="change()"/></label>
            <div class="img">
                <div class="border"><div class="preview">
                    <img :src="previews.url" :style="previews.img"/>
                </div></div>
                <div class="border"><div class="cropper"><vueCropper
                        ref="cropper"
                        :img="img"
                        :autoCrop="option.autoCrop"
                        :autoCropWidth="option.autoCropWidth"
                        :autoCropHeight="option.autoCropHeight"
                        :fixedBox="option.fixedBox"
                        @realTime="realTime"
                ></vueCropper></div></div>
            </div>
            <div class="btn">
                <button @click="routerBack">取消</button><button @click="upload">提交</button>
            </div>
        </div>
    </div>
</template>

<script>
  import VueCropper from 'vue-cropper'
  export default {
    name: "Head",
    components:{
      VueCropper
    },
    data(){
      return{
        img:'',
        previews:{},
        option:{
          outputType:'png',
          autoCrop: true,
          autoCropWidth: 120,
          autoCropHeight: 120,
          fixedBox: true
        },
      }
    },
    methods: {
      change(){
        let vm=this;
        let read=new FileReader();
        read.readAsDataURL(document.getElementById('file').files[0]);
        read.onload=function () {
          vm.img=this.result;
        }
      },
      realTime (data) {// 实时预览函数
        this.previews = data;
      },
      routerBack(){//取消返回上一页
        this.$router.go(-1);
      },
      upload(){//提交
        this.$refs.cropper.getCropData((data) => {
          this.$ajax.post(this.$url.setUserImg,{img:data})
              .then(res=>{
                if(res.data.errcode==='0'){
                  this.$notify({
                    message: '头像设置成功',
                    type: 'success',
                  });
                  this.$ajax.post(this.$url.getUser)
                      .then(res=>{
                        this.user=res.data.user;
                        this.$store.commit('set_user',this.user);
                      });
                  this.$router.push('/user');
                }
              });
        });
      },
    }
  }
</script>

<style scoped lang="scss">
    #head{
        .main{
            @extend %width;
            background: #fff;
            padding: 0 20px;
            header{
                color: $skin-card;
                padding: 10px 0;
                border-bottom: 1px dashed #bfbfbf;
            }
            label{
                display: inline-block;
                position: relative;
                background: #eee;
                line-height: 30px;
                height: 30px;
                width: 120px;
                font-size: 12px;
                color: #666;
                text-align: center;
                margin: 10px 0;
                cursor: pointer;
                input{
                    position: absolute;
                    opacity: 0;
                }
            }
            .img{
                @include flex(flex-start,flex-start);
                padding: 0 0 50px 0;
                border-bottom: 1px dashed #bfbfbf;
                .border:first-child{
                    margin-right: 50px;
                }
                .border{
                    display: inline-block;
                    font-size: 0;
                    padding: 5px;
                    border: 1px solid #dee5e7;
                    .preview{
                        display: inline-block;
                        background: #747474;
                        width: 120px;
                        height: 120px;
                        overflow: hidden;
                    }
                    .cropper{
                        display: inline-block;
                        width: 250px;
                        height: 250px;
                    }
                }
            }
            .btn{
                text-align: center;
                padding: 10px 0;
                button{
                    font-size: 14px;
                    padding: 6px 12px;
                    border: none;
                    border-radius: 2px;
                }
                :first-child{
                    background: #fff;
                    color: #58666e;
                    box-shadow: 0 1px 1px rgba(90,90,90,.1);
                    margin-right: 15px;
                }
                :last-child{
                    background: #ab95cd;
                    color: #fff;
                }
            }
        }

    }
</style>