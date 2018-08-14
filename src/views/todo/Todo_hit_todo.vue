<template>
    <div class="content">
        <div class="content_left">
            <ul>
                <li class="title">待办来源</li>
                <li :class="{todoSourceActive:todoSourceId === ''}"
                    @click="switchTodoSource('')"><i class="fa fa-bell-o"></i>全部
                </li>
                <li :class="{todoSourceActive:todoSourceId === item.id}"
                    v-for="item in todomenu" @click="switchTodoSource(item.id)"><i class="fa fa-bell-o"></i>{{item.name}}
                    <span>（{{item.todoList.length}}）</span>
                </li>
            </ul>
            <!--<card>-->
            <!--<template slot="header">通知公告</template>-->
            <!--<div class="menuDiv" :class="{todoSourceActive:todoSourceId === ''}"-->
            <!--@click="switchTodoSource('')">全部-->
            <!--</div>-->
            <!--<div class="menuDiv" :class="{todoSourceActive:todoSourceId === item.id}"-->
            <!--v-for="item in todomenu" @click="switchTodoSource(item.id)">-->
            <!--{{item.name}}-->
            <!--<span>（{{item.todoList.length}}）</span>-->
            <!--</div>-->
            <!--</card>-->
        </div>
        <div class="content_right">
            <ul></ul>
            <card>
                <template slot="header">待办明细</template>
                <div v-for="item in todomenu">
                    <div v-for="i in item.todoList" @click="openTodo(i.url,i.appName)" class="block"
                         v-if="i.appId=== todoSourceId|| todoSourceId ===''">
                        <div class="blockLeft">
                            <div class="title">[{{i.appName}}]{{i.title}}</div>
                            <div class="time">{{i.currentTime}}</div>
                        </div>
                        <div class="blockRight"><i class="fa fa-pencil-square-o"></i>&nbsp;&nbsp;办理</div>
                    </div>
                    <div style="text-align: center">
                        <img v-if="item.todoList.length === 0 && todoSourceId === item.id"
                             src="/img/no_data.png"/>
                    </div>
                </div>
                <div style="text-align: center">
                    <img v-if="allLength === 0 && todoSourceId === ''"
                         src="/img/no_data.png"/>
                </div>
            </card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Todo_hit_todo",
        data(){
            return{
                todomenu: [],
                allLength:0,//我的待办所有类的待办事项
                todoSourceId: "",//我的待办来源，每个分类的ID
            }
        },
        methods:{
            //待办来源
            getTodoSource() {
                this.$ajax.post(this.$url.getTodoResource)
                    .then(res => {
                        console.log(res.data);
                        this.todomenu = res.data.apps;
                        let allLength = 0;
                        for(let i=0;i<this.todomenu.length;i++){
                            allLength += this.todomenu[i].todoList.length;
                        }
                        this.allLength = allLength;
                    })
            },
            //切换待办来源
            switchTodoSource(id) {
                console.log(id);
                this.todoSourceId = id;
            },
            //打开跳转弹窗
            openTodo(url,appName) {
                this.$store.commit('set_data',{
                    data:true,
                    name:'jumpShow'
                });
                this.$store.commit('set_data',{
                    data:appName,
                    name:'jumpName'
                });
                // this.dialogVisible = true;
                // this.appName = appName;
                window.open(url);
            },
        },
        mounted(){
            this.getTodoSource();
        }
    }
</script>

<style scoped lang="scss">
    .contain {
        width: 1200px;
        margin: 0 auto;
    .head{
        padding: 10px 28px;
        margin-bottom: 10px;
    .head_btn{
        display: inline-block;
        background: #BFBFBF;
        height: 30px;
        line-height: 30px;
        width: 90px;
        font-size: 16px;
        color: white;
        text-align: center;
        border-radius: 15px;
        margin-right: 10px;
        cursor: pointer;
    }
    .btn_choosen {
        background: #F08625;
    }
    }
    .content {
    .card {
        border-top: none;
    }
    @include flex(space-between, flex-start);
    .content_left {
        width: 386px;
        background: white;
    ul{
    li{
    &.title{
         font-size: 18px;
         font-weight: 700;
         color: #0683c3;
         cursor: auto;
     }
    cursor: pointer;
    padding: 12px 23px;
    font-size: 14px;
    color: #363f44;
    border-bottom: 1px dashed #eaeaea;
    &:last-child{
         border: none;
     }
    i{
        margin-right: 8px;
    }
    }
    }
    .todoSourceActive {
        background: #efefef;
    }
    .menuDiv_input {
        padding: 20px;
    .dateInput {
        width: 266px;
    }
    }
    }
    .content_right {
        width: 784px;
        background-color: white;
    .block {
        padding: 12px 23px;
        font-size: 14px;
        border-bottom: 1px dashed #eaeaea;
        cursor: pointer;
    &:hover {
         background-color: #efefef;
     }
    @include flex(space-between, center);
    .title {
        width: 650px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    span{
        color: #0683c3;
    }
    }
    .time {
        font-size: 12px;
        margin-top: 5px;
        color: #a0a0a0;
    span{
        padding-left: 20px;
    }
    }
    .blockRight {
        font-size: 14px;
        color: #f7b47f;
    }
    }
    }
    }
    }
    .dialog_content {
        @include flex(center, center);
        .content_title {
            font-size: 18px;
        }
        .content_desc {
            font-size: 14px;
            padding-top: 5px;
            color: #959595;
        }
    }

    .pad15 {
        padding: 0 15px;
    }
</style>