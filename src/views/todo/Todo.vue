<template>
    <div class="contain">
        <div class="leftDiv">
            <card>
                <header slot="header">待办来源</header>
                <div class="menuDiv" v-for="(item,id) in todomenu">{{item.name}} <span v-if="item.todoList.length > 0">（{{item.todoList.length}}）</span></div>
            </card>
        </div>
        <div class="rightDiv">
            <card>
                <header slot="header">待办明细</header>
                <div class="" v-for="item in todomenu">
                    <div v-for="i in item.todoList" @click="openTodo(i.url)" class="block">
                        <div class="blockLeft">
                            <div class="title">[{{i.appName}}]{{i.title}}</div>
                            <div class="time">{{i.currentTime}}</div>
                        </div>
                        <div class="blockRight"><i class="fa fa-pencil-square-o"></i>&nbsp;&nbsp;办理</div>
                    </div>
                </div>
            </card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Todo",
        data(){
            return{
                todomenu:[]
            }
        },
        methods:{
            getTodoSource(){
                this.$ajax.post(this.$url.getTodoResource)
                    .then(res => {
                        console.log(res.data);
                        this.todomenu = res.data.apps;
                    })
            },
            openTodo(url){
                window.open(url);
            }
        },
        created(){
            this.getTodoSource();
        }
    }
</script>

<style scoped lang="scss">
    .contain{
        padding: 15px 0;
        width: 1200px;
        margin: 0 auto;
        @include flex(space-between,flex-start);
        .leftDiv{
            width: 389px;
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
</style>