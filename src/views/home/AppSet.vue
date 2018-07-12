<template>
    <div class="popup" v-if="popupShow">
        <div class="content">
            <h3>{{name}}设置</h3>
            <div class="search" v-if="popupType!=='app'">
                <select v-model="typeID">
                    <option value ="">请选择</option>
                    <option :value ="i.id" v-for="i in listServiceType">{{i.name}}</option>
                </select>
                <input v-model="key" placeholder="服务名称"/>
                <button @click="getAll">查询</button>
            </div>
            <ul class="all">
                <li v-for="(i,index) in list">
                    <div class="select" v-show="i.selectFlag==='N'" @click="add(i,index)"><i class="fa fa-plus-circle"></i>&nbsp;&nbsp;点击选择</div>
                    <div class="flag" v-show="i.selectFlag==='Y'"><i>已选</i></div><img :src="imgPath+i.id"/>{{i.name}}</li>
            </ul>
            <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handlePageChange"
                    @prev-click="handlePageChange"
                    @next-click="handlePageChange"
                    :page-count="this.total">
            </el-pagination>
            <h4>已选择的{{name}}<span>（拖拽排序）</span></h4>
            <ul class="has">
                <draggable class="drag" v-model="listHas" :options="dragOptions">
                    <transition-group>
                        <li v-for="(i,index) in listHas" :key="index">
                            <div class="select" @click="cancel(i,index)"><i class="fa fa-plus-circle"></i>&nbsp;&nbsp;取消选择</div>
                            <img :src="imgPath+i.id"/>{{i.name}}
                        </li>
                    </transition-group>
                </draggable>
            </ul>
            <div class="btn">
                <button @click="save">确定</button><button @click="close">取消</button>
            </div>
        </div>
    </div>
</template>

<script>
  import draggable from 'vuedraggable'
  export default {
    name: "AppSet",
    components:{draggable},
    data(){
      return{
        page:1,
        limit:12,
        total:1,
        list:[],//所有
        listHas:[],//已选择
        listServiceType:[],//服务类型
        key:"",//搜索关键字
        typeID:"",//搜索类型id
        //不同类型加载不同值
        name:"",//标题名
        imgPath:"",//图片前缀路径
        url:{//请求的url
          save:'',//保存
          all:'',//全部
          has:''//已有
        }
      }
    },
    computed:{
      dragOptions(){
        return{
          animation: 0,
          disable:true,
          ghostClass: 'ghost'
        }
      },
      popupShow(){
        return this.$store.state.popupShow;
      },
      popupType(){
        return this.$store.state.popupType;
      }
    },
    watch:{
      popupShow(){
        this.page=1;
        this.key='';
        this.typeID='';
        if(this.popupType==='app'){
          this.name="应用";
          this.imgPath="/api/resource/app?id=";
          this.url.save=this.$url.homeAppSave;
          this.url.all=this.$url.homeAppAll;
          this.url.has=this.$url.homeAppHas;
        }
        else {
          this.name="服务";
          this.imgPath="/api/resource/service?id=";
          this.url.save=this.$url.homeServiceSave;
          this.url.all=this.$url.homeServiceAll;
          this.url.has=this.$url.homeService;
          this.getServiceType();
        }
        this.getAll();
        this.getHas();
      }
    },
    created(){

    },
    methods:{
      add(i,index){//点击选择
        if(this.listHas.length<10){
          this.list[index].selectFlag='Y';
          this.listHas.push(i);
        }
        else {
          this.$notify({
            message: '只能选择10个',
            type: 'warning',
            position: 'bottom-right'
          });
        }
      },
      cancel(i,index){//取消选择
        this.listHas.splice(index,1);
        this.list.forEach(function (v) {
          if(v.id===i.id){
            v.selectFlag='N';
          }
        })
      },
      save(){
        this.$ajax.post(this.url.save,{layout:JSON.stringify(this.listHas)})
            .then(res=>{
              if(res.data.errmsg==='ok'){
                this.$store.commit('set_data',{
                  data:this.listHas,
                  name:this.popupType
                });
                this.$notify({
                  message: '保存成功',
                  type: 'success',
                  position: 'bottom-right'
                });
                this.close();
              }
            })
      },
      close(){
        this.$store.commit('set_data',{
          data:false,
          name:'popupShow'
        });
      },
      handlePageChange(n){//监听页数改变
        this.page=n;
        this.getAll();
      },
      getAll(){
        this.$ajax.post(this.url.all,{page:this.page,limit:this.limit,name:this.key,managerDeptid:this.typeID})
            .then(res=>{
              this.list=res.data.page.rows;
              this.total=res.data.page.total;
            })
      },
      getHas(){
        this.$ajax.post(this.url.has)
            .then(res=>{
              this.listHas=res.data[this.popupType+'s'];
            })
      },
      getServiceType(){
        this.$ajax.post(this.$url.homeServiceType)
            .then(res=>{
              this.listServiceType=res.data.depts;
            })
      }
    }
  }
</script>
<style>
    .el-pagination{text-align: center}
</style>
<style scoped lang="scss">
    .drag{
        width: 100%;
    }
    .drag>span{
        display: flex;
        flex-flow: wrap;
        width: 100%;
    }
    .ghost{
        opacity: .5;
    }
    .popup{
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
            h3{
                font-size: 24px;
                font-weight: 500;
                color: #000;
                padding: 15px;
                border-bottom: 1px solid #e5e5e5;
                margin: 0;
            }
            .search{
                @include flex;
                padding: 15px;
                border-bottom: 1px solid #e5e5e5;
                select,input{
                    width: 260px;
                    height: 34px;
                    font-size: 14px;
                    color: #555;
                    border: 1px solid #ccc;
                    padding: 6px 12px;
                }
                input{
                    margin: 0 30px 0 15px;
                }
                button{
                    background: #067ebe;
                    font-size: 14px;
                    color: #fff;
                    border-radius: 2px;
                    border: none;
                    padding: 6px 12px;
                    cursor: pointer;
                }
            }
            ul{
                @include flex(space-between);
                flex-flow: wrap;
                padding: 15px;
                &.has li{
                    margin: 0 80px 10px;
                }
                li{
                    @include flex;
                    position: relative;
                    height: 55px;
                    width: 250px;
                    font-size: 14px;
                    color: #333;
                    padding-right: 30px;
                    border: 1px solid #e7e7e7;
                    margin: 0 0 10px 0;
                    .flag{
                        position: absolute;
                        top: 0;
                        right: 0;
                        z-index: 1;
                        width: 0;
                        height: 0;
                        border-left: 38px solid transparent;
                        border-top: 38px solid #e5e5e5;
                        i{
                            position: absolute;
                            top: -36px;
                            right: -12px;
                            font-size: 12px;
                            width: 38px;
                            color: #959595;
                        }
                    }
                    .select{
                        position: absolute;
                        left: 0;
                        top: 0;
                        z-index: 2;
                        width: 100%;
                        height: 100%;
                        line-height: 55px;
                        display: none;
                        background: #eee;
                        font-size: 14px;
                        font-weight: 700;
                        color: #1295d8;
                        text-align: center;
                        cursor: pointer;
                    }
                    &:hover .select{
                        display: block;
                    }
                    img{
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        margin: 0 10px;
                    }
                }
            }
            h4{
                font-size: 14px;
                font-weight: 500;
                color: #000;
                padding: 10px;
                border-bottom: 1px solid #ddd;
                margin: 20px 0;
                span{
                    color: grey;
                }
            }
            .btn{
                padding: 15px;
                text-align: center;
                border-top: 1px solid #e5e5e5;
                button{
                    display: inline-block;
                    padding: 6px 12px;
                    font-size: 14px;
                    font-weight: normal;
                    text-align: center;
                    cursor: pointer;
                    border: none;
                    border-radius: 2px;
                }
                :first-child{
                    background: #067ebe;
                    color: #fff;
                    border: 1px solid #067ebe;
                    margin: 0 10px 0 0;
                }
                :last-child{
                    background: #fff;
                    color: #58666e;
                    border: 1px solid #dee5e7;
                }
            }
        }
    }
</style>