<template>
    <div>
        <subhead>
            <div><i class="fa fa-calendar"></i>&nbsp;&nbsp;&nbsp;日程 <span>Schedule</span></div>
        </subhead>
        <div class="content">
            <card>
                <header slot="header">
                    <div><i class="fa fa-chevron-left"></i>&nbsp;2018年8月<i class="fa fa-chevron-right"></i></div>
                    <div>
                        <div class="eventType" v-for="item in eventType">
                            <span :style="'background-color:' + item.color + ';'"></span>{{item.name}}
                        </div>
                    </div>
                </header>

            </card>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Schedule",
        data(){
            return{
                eventType:[]
            }

        },
        methods:{
            //获取事件类型
            getEventType(){
                this.$ajax.post(this.$url.getCalendarObjs)
                    .then(res => {
                        this.eventType = res.data.cals;
                    })
            }
        },
        created(){
            this.getEventType();
        }
    }
</script>

<style scoped lang="scss">
    .content{
        padding: 0 0 15px 0;
        margin: auto;
        width: 1200px;
    }
    .eventType{

    }
</style>