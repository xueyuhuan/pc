<template>
    <div class="todo">
        <subhead>
            <div><i class="fa fa-tv icon"></i>办事中心 <span>Todo List</span></div>
        </subhead>
        <cardTemp class="nav" v-if="$school.todoType">
            <router-link :class="{choose:item.url === '/todo'}" v-for="item in $school.todoType" :to="item.url" @click="chooseType(0)">{{item.name}}</router-link>
        </cardTemp>
        <div class="container" :class="{noborder:$school.todoType}">
            <cardTemp class="left">
                <header slot="header">待办来源</header>
                <ul>
                    <li :class="{todoSourceActive:todoSourceId === ''}" @click="switchTodoSource('')">
                        <i class="fa fa-bell-o"></i>全部（{{allLength}}）
                    </li>
                    <li :class="{todoSourceActive:todoSourceId === item.id}" v-for="item in todoSource" @click="switchTodoSource(item.id)">
                        <i class="fa fa-bell-o"></i>{{item.name}}（{{item.todoList.length}}）
                    </li>
                </ul>
            </cardTemp>
            <cardTemp class="right">
                <header slot="header">待办明细</header>
                <ul class="todoList">
                    <li v-for="item in todoSource">
                        <a v-for="i in item.todoList" @click="openJump(i.url,i.appName)" v-if="todoSourceId === i.appId || todoSourceId ===''">
                            <div class="left">
                                <p><em>【{{i.appName}}】</em>{{i.title}}</p>
                                <span v-if="i.currentNode!==''">当前环节：{{i.currentNode}}</span>
                                <span v-if="i.startUser!==''">发起人：{{i.startUser}}</span>
                                <span v-if="i.createTime!==''">发起时间：{{i.currentTime}}</span>
                            </div>
                            <div class="right"><i class="fa fa-pencil-square-o"></i> 办理</div>
                        </a>
                        <a v-if="item.todoList.length===0&& todoSourceId === item.id"><img src="/img/no_data.png"/></a>
                    </li>
                    <li v-if="allLength===0&& todoSourceId === ''"><img src="/img/no_data.png"/></li>
                </ul>
            </cardTemp>
        </div>
        <Jump></Jump>
    </div>
</template>

<script>
    import Jump from "./Jump";
    export default {
        name: "Todo",
        components: {Jump},
        data(){
            return{
                todoSource:[],//待办来源
                todoSourceId:"",//当前选中的待办ID
                allLength:0,//我的待办所有类的待办事项
                dialogVisible:false,//是否显示模态框
            }
        },
      created(){
        this.getTodoSource();
      },
        methods:{
            //待办来源
            getTodoSource(){
                this.$ajax.post(this.$url.getTodoResource)
                    .then(res => {
                        this.todoSource = res.data.apps;
                        for(let i=0;i<this.todoSource.length;i++){
                          this.allLength += this.todoSource[i].todoList.length;
                        }
                    })
            },
          //打开跳转弹窗
            openJump(url,appName){
                this.$store.commit('set_data',{
                    data:true,
                    name:'jumpShow'
                });
                this.$store.commit('set_data',{
                    data:appName,
                    name:'jumpName'
                });
                window.open(url);
            },
            //切换待办来源
            switchTodoSource(id){
                this.todoSourceId = id;
            }
        }
    }
</script>

<!--待办为公用样式，统一在common-->

