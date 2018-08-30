<template>
    <el-dialog :visible="popupShow" width="900px" custom-class="popup" :show-close="false">
        <h3 class="dialog_h3" slot="title">{{name}}设置</h3>
        <!--服务的搜索框-->
        <div class="search" v-if="popupType==='service'">
            <select v-model="typeID">
                <option value ="">请选择</option>
                <option :value ="i.id" v-for="i in listServiceType">{{i.name}}</option>
            </select>
            <input v-model="key" placeholder="服务名称"/>
            <button @click="getAll">查询</button>
        </div>
        <!--所有项列表-->
        <ul class="all">
            <li v-for="(i,index) in list">
                <div class="select" v-show="i.selectFlag==='N'" @click="add(i,index)"><i class="fa fa-plus-circle"></i>&nbsp;&nbsp;点击选择</div>
                <div class="flag" v-show="i.selectFlag==='Y'"><i>已选</i></div>
                <img :src="popupType!=='home'?$proxy+imgPath+i.id:'/img/'+$school.school+'/logo_blue_mini.png'"/><p>{{i.name}}</p>
            </li>
        </ul>
        <!--分页-->
        <el-pagination
                background
                layout="prev, pager, next"
                @current-change="handlePageChange"
                @prev-click="handlePageChange"
                @next-click="handlePageChange"
                :page-size=this.limit
                :page-count="this.total">
        </el-pagination>
        <!--排序列表-->
        <!--应用和服务-->
        <h4>已选择的{{name}}<span>（拖拽排序）</span></h4>
        <ul class="has" v-show="popupType!=='home'">
            <draggable class="drag" v-model="listHas" :options="dragOptions">
                <transition-group>
                    <li v-for="(i,index) in listHas" :key="index">
                        <div class="select" @click="cancel(i,index)"><i class="fa fa-plus-circle"></i>&nbsp;&nbsp;取消选择</div>
                        <img :src="$proxy+imgPath+i.id"/><p>{{i.name}}</p>
                    </li>
                </transition-group>
            </draggable>
        </ul>
        <!--工作台有两列-->
        <ul class="has" v-show="popupType==='home'">
            <draggable class="drag drag-list" v-model="listHasA" :options="dragHome">
                <transition-group>
                    <li v-for="(i,index) in listHasA" :key="index">
                        <div class="select" @click="cancel(i,index,'A')"><i class="fa fa-plus-circle"></i>&nbsp;&nbsp;取消选择</div>
                        <img :src="'/img/'+$school.school+'/logo_blue_mini.png'"/>{{i.NAME}}{{i.name}}
                    </li>
                </transition-group>
            </draggable>
            <draggable class="drag drag-list" v-model="listHasB" :options="dragHome">
                <transition-group>
                    <li v-for="(i,index) in listHasB" :key="index">
                        <div class="select" @click="cancel(i,index,'B')"><i class="fa fa-plus-circle"></i>&nbsp;&nbsp;取消选择</div>
                        <img :src="'/img/'+$school.school+'/logo_blue_mini.png'"/>{{i.NAME}}{{i.name}}
                    </li>
                </transition-group>
            </draggable>
        </ul>
        <div slot="footer" class="dialog_footer">
            <button class="_theme _theme_border" @click="save">确定</button><button @click="close">取消</button>
        </div>
    </el-dialog>
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
        total:1,//总页数
        list:[],//所有
        listHas:[],//已选择
        listHasA:[],
        listHasB:[],
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
        },
        pageId:''
      }
    },
    computed:{
      // 拖拽参数
      dragOptions(){
        return{
          animation: 0,
          disable:true,
          ghostClass: 'ghost'
        }
      },
      dragHome(){
        return{
          animation: 0,
          group: 'home',
          disable:true,
          ghostClass: 'ghost'
        }
      },
      popupShow(){// 设置组件是否显示
        return this.$store.state.popupShow;
      },
      popupType(){//显示类型
        return this.$store.state.popupType;
      },
    },
    watch:{
      popupShow(){
        if (this.popupShow){
          this.page=1;
          this.key='';
          this.typeID='';
          if(this.popupType==='app'){
            this.name="应用";
            this.imgPath="/resource/app?id=";
            this.url.save=this.$url.homeAppSave;
            this.url.all=this.$url.homeAppAll;
            this.url.has=this.$url.homeAppHas;
            this.getAll();
            this.getHas();
          }
          else if(this.popupType==='service') {
            this.name="服务";
            this.imgPath="/resource/service?id=";
            this.url.save=this.$url.homeServiceSave;
            this.url.all=this.$url.homeServiceAll;
            this.url.has=this.$url.homeService;
            this.getServiceType();
            this.getAll();
            this.getHas();
          }
          else{
            this.url.save=this.$url.homePageSave;
            this.url.all=this.$url.homePageAll;
            this.url.has=this.$url.homePage;
            this.getAllPage();
            this.getHasPage();
          }
        }
      }
    },
    methods:{
      //点击选择
      add(i,index){
        if(this.popupType==='home'){
          this.list[index].selectFlag='Y';
          this.listHasA.push(i);
        }
        else{
          if(this.listHas.length<10){
            this.list[index].selectFlag='Y';
            this.listHas.push(i);
          }
          else {
            this.$notify.warning('只能选择10个');
          }
        }
      },
      //取消选择
      cancel(i,index,listType){
        if(listType==='A'){
          this.listHasA.splice(index,1);
          this.list.forEach(function (v) {//在所有列表中查找其修改为未选中
            if(v.name===i.name||v.name===i.NAME){
              v.selectFlag='N';
            }
          })
        }
        else if(listType==='B'){
          this.listHasB.splice(index,1);
          this.list.forEach(function (v) {//在所有列表中查找其修改为未选中
            if(v.name===i.name||v.name===i.NAME){
              v.selectFlag='N';
            }
          })
        }
        else{
          this.listHas.splice(index,1);//从已有列表删除该项
          this.list.forEach(function (v) {//在所有列表中查找其修改为未选中
            if(v.id===i.id){
              v.selectFlag='N';
            }
          })
        }
      },
      //保存
      save(){
        if(this.popupType==='home'){
          this.listHasA.forEach(function (v) {
            if(v.name){
              v.NAME=v.name;
            }
          });
          this.listHasB.forEach(function (v) {
            if(v.name){
              v.NAME=v.name;
            }
          });
          let layout={A:this.listHasA,B:this.listHasB};
          this.$ajax.post(this.$url.homePageSave,{layout:JSON.stringify(layout),pageId:this.pageId})
              .then(res=>{
                if(res.data.errmsg==='ok'){
                  this.$store.commit('set_data',{
                    data:this.listHasA,
                    name:'homeA'
                  });
                  this.$store.commit('set_data',{
                    data:this.listHasB,
                    name:'homeB'
                  });
                  this.$notify.success('布局已保存');
                }
              })
        }
        else{
          this.$ajax.post(this.url.save,{layout:JSON.stringify(this.listHas)})
              .then(res=>{
                if(res.data.errmsg==='ok'){
                  this.$store.commit('set_data',{
                    data:this.listHas,
                    name:this.popupType
                  });
                  this.$notify.success('保存成功');
                }
              })
        }
        this.close();
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
      },
      getAllPage(){
        this.$ajax.post(this.url.all)
            .then(res=>{
              this.list=res.data.widgets;
            })
      },
      getHasPage(){
        this.$ajax.post(this.url.has)
            .then(res=>{
              this.pageId=res.data.page.id;
              this.listHasA=res.data.page.columnWidgets.A;
              this.listHasB=res.data.page.columnWidgets.B;
            })
      },
    }
  }
</script>
<style scoped lang="scss">
    .drag{
        width: 100%;
    }
    .drag-list{
        flex: 1;
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
            @include flex(space-between,flex-start);
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
                    margin: 0 10px;
                }
                p{
                    @include ellipsis(2);
                    margin: 0;
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
    }
    .xx{
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
        }
    }
</style>