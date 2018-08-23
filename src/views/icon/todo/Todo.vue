<template>
    <div>
        <subhead>
            <div><i class="fa fa-tv"></i>&nbsp;&nbsp;&nbsp;办事中心 <span>Todo List</span></div>
        </subhead>
        <CardTemp class="head" v-if="todoType.length > 1">
            <router-link class="head_btn" :class="{btn_choosen:item.url === '/todo'}" v-for="item in todoType" :to="item.url" @click="chooseType(0)">{{item.name}}</router-link>
        </CardTemp>
        <div class="contain">
            <div class="leftDiv">
                <card>
                    <template slot="header">待办来源</template>
                    <div class="menuDiv" :class="{todoSourceActive:todoSourceId === ''}" @click="switchTodoSource('')">全部</div>
                    <div class="menuDiv" :class="{todoSourceActive:todoSourceId === item.id}" v-for="item in todomenu" @click="switchTodoSource(item.id)">
                        {{item.name}}
                        <span>（{{item.todoList.length}}）</span>
                    </div>
                </card>
            </div>
            <div class="rightDiv">
                <card>
                    <template slot="header">待办明细</template>
                    <div v-for="item in todomenu">
                        <div v-for="i in item.todoList" @click="openTodo(i.url)" class="block" v-if="todoSourceId === i.appId || todoSourceId ===''">
                            <div class="blockLeft">
                                <div class="title">[{{i.appName}}]{{i.title}}</div>
                                <div class="time">{{i.currentTime}}</div>
                            </div>
                            <div class="blockRight"><i class="fa fa-pencil-square-o"></i>&nbsp;&nbsp;办理</div>
                        </div>
                        <div style="text-align: center">
                            <img v-if="item.todoList.length === 0 && todoSourceId === item.id" src="/img/no_data.png" />
                        </div>
                    </div>
                    <div style="text-align: center">
                        <img v-if="allLength === 0 && todoSourceId === ''" src="/img/no_data.png" />
                    </div>
                </card>
            </div>
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
                todoType:this.$school.todoType,
                todomenu:[],//待办来源
                todoSourceId:"",//当前选中的待办ID
                allLength:0,//我的待办所有类的待办事项
                dialogVisible:false,//是否显示模态框
            }
        },
        methods:{
            //待办来源
            getTodoSource(){
                this.$ajax.post(this.$url.getTodoResource)
                    .then(res => {
                        this.todomenu = res.data.apps;
                        let allLength = 0;
                        for(let i=0;i<this.todomenu.length;i++){
                            allLength += this.todomenu[i].todoList.length;
                        }
                        this.allLength = allLength;
                    })
            },
            openTodo(url){
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
            //切换待办来源
            switchTodoSource(id){
                this.todoSourceId = id;
            }
        },
        created(){
            this.getTodoSource();
        }
    }
</script>

<style scoped lang="scss">
    .head{
        padding: 10px 28px;
        width: 1200px;
        margin: 0 auto 10px;
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
    .contain{
        width: 1200px;
        margin: 0 auto;

        @include flex(space-between,flex-start);
        .leftDiv{
            width: 389px;
            .todoSourceActive{
                background-color: #efefef;
            }
            .menuDiv{
                cursor: pointer;
                padding: 12px 23px;
                font-size: 14px;
                border-bottom: 1px dashed #eaeaea;
            }
        }
        .rightDiv{
            width: 784px;
            .block{
                padding: 12px 23px;
                font-size: 14px;
                border-bottom: 1px dashed #eaeaea;
                cursor: pointer;
                @include flex(space-between,center);
                .title{
                    width: 650px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .time{
                    font-size: 12px;
                    margin-top: 5px;
                    color: #a0a0a0;
                }
                &:hover{
                    background-color: #efefef;
                }
                .blockRight{
                    font-size: 14px;
                    color: #f7b47f;
                }
            }
        }
    }
    .dialog_content{
        @include flex(center,center);
        .content_title{
            font-size:18px;
        }
        .content_desc{
            font-size: 14px;
            padding-top: 5px;
            color: #959595;
        }
    }
</style>

