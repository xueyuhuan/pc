<template>
    <div>
        <subhead>
            <div><i class="fa fa-th-large icon"></i>消息中心 <span>Message Center</span></div>
        </subhead>
        <div class="contain">
            <div class="read_btn" @click="ReadAll">全部标为已读</div>
            <el-tabs v-model="activeName" @tab-click="">
                <el-tab-pane label="未读" name="unread" class="tabs_head">
                    <div class="list_contain">
                        <div class="list" v-for="item in unreadMsg" :class="{font_700:item.status === '0'}" @click="getMsgDetail(item.id)">
                            <div class="list_left">
                                <i class="fa fa-circle"></i>
                                <img :src="item.fromImg" />
                                <span>{{item.fromName}}</span>
                            </div>
                            <div class="list_mid">{{item.title}}</div>
                            <div class="list_eye_div"><i class="fa fa-eye list_eye" @click.stop="readThisMsg(item.id)"></i></div>
                            <div class="list_right">
                                <span>{{timestampFormat(item.createTime)}}</span>
                            </div>
                        </div>
                        <div class="img" v-if="unreadMsg.length === 0">
                            <img src="/img/no_data.png"/>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="全部消息" name="all" class="tabs_head">
                    <div class="list_contain">
                        <div class="list" v-for="item in allMsg" :class="{font_700:item.status === '0'}" @click="getMsgDetail(item.id,item.status)">
                            <div class="list_left">
                                <i class="fa fa-circle" :class="{opacity0:item.status === '1'}"></i>
                                <img :src="item.fromImg" />
                                <span>{{item.fromName}}</span>
                            </div>
                            <div class="list_mid">{{item.title}}</div>
                            <div class="list_eye_div"><i class="fa fa-eye list_eye" v-if="item.status === '0'" @click.stop="readThisMsg(item.id)"></i></div>
                            <div class="list_right">
                                <span>{{timestampFormat(item.createTime)}}</span>
                            </div>
                        </div>
                        <div class="img" v-if="allMsg.length === 0">
                            <img src="/img/no_data.png"/>
                        </div>
                    </div>
                    <!--分页-->
                    <el-pagination class="hidden-sm-and-up" v-show="totalMsgNum>10"
                                   background
                                   small
                                   @current-change="handleCurrentChange"
                                   :current-page.sync="page"
                                   :page-size="pageSize"
                                   layout="prev, pager, next"
                                   :total="totalMsgNum">
                    </el-pagination>
                    <el-pagination class="hidden-xs-only" v-show="totalMsgNum>10"
                                   background
                                   @current-change="handleCurrentChange"
                                   :current-page.sync="page"
                                   :page-size="pageSize"
                                   layout="prev, pager, next"
                                   :total="totalMsgNum">
                    </el-pagination>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!--消息详情模态框-->
        <el-dialog class="enterApp" :visible.sync="dialogVisible">
            <header slot="title">
                <div class="left">
                    <img :src="msgDetail.fromImg" />
                    <div class="text">
                        <h4>{{msgDetail.title}}</h4>
                        <p>消息来源：<span>{{msgDetail.fromName}}</span></p>
                        <p>消息时间：<span>{{timestampFormat(msgDetail.createTime)}}</span></p>
                    </div>
                </div>
            </header>
            <div class="content">
                <p>{{msgDetail.content}}</p>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import date from '../../utils/date';
  export default {
    name: "message",
    data(){
      return{
        unreadMsg:[],//未读消息
        page:1,//当前页码
        pageSize:10,//一页有多少条消息
        totalMsgNum:0,//总共多少条消息
        allMsg:[],//所有消息
        msgDetail:{},//消息详情
        activeName:'unread',
        dialogVisible:false
      }
    },
    created(){
      this.getUnread();
      this.getAll();
    },
    methods:{
      //获取未读消息
      getUnread(){
        this.$ajax.post(this.$url.query_unread)
            .then(res => {
              this.unreadMsg = res.data.unreadMessages;
            })
      },
      //获取所有消息
      getAll(){
        this.$ajax.post(this.$url.query,{page:this.page || 1,limit:this.pageSize || 10})
            .then(res => {
              this.page = res.data.page.page;
              this.pageSize = res.data.page.pageSize;
              this.totalMsgNum = res.data.page.records;
              this.allMsg = res.data.page.rows;
            })
      },
      //时间戳转换
      timestampFormat(timestamp){
        return date.dateFormat("yyyy-MM-dd hh:mm:ss",new Date(timestamp));
      },
      //打开消息详情
      getMsgDetail(id,status){
        this.$ajax.post(this.$url.msgDetail,{id:id})
            .then(res => {
              if(res.data.errcode === '0'){
                this.dialogVisible = true;
                this.msgDetail = res.data.message;
                if(status === '0'){
                  this.readThisMsg(id);
                }
              }
            })
      },
      //将未读消息标记为已读
      readThisMsg(id){
        this.$ajax.post(this.$url.set_read,{id:id})
            .then(res => {
              if(res.data.errcode === '0'){

                this.getUnread();
                this.getAll();
              }
            })
      },
      //翻页
      handleCurrentChange(page){
        this.page = page;
        this.getAll();
      },
      ReadAll(){
        this.$ajax.post(this.$url.set_read_all)
            .then(res => {
              if(res.data.errcode === '0'){
                this.getUnread();
                this.getAll();
              }
            })
      }
    }
  }
</script>

<style scoped lang="scss">
    .contain{
        @extend %width;
        background: white;
        padding: 0 20px;
        position: relative;
    }
    .read_btn{
        position: absolute;
        right: 20px;
        top: 10px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        z-index: 99;
    }
    .tabs_head{
        color: #333;
        font-size:16px;
    }
    .font_700{
        font-weight: 700;
    }
    .list_contain{
        font-size: 12px;
        padding: 20px;
        .list{
            position: relative;
            padding: 10px 15px;
            margin-bottom: -1px;
            background: #fff;
            border: 1px solid #edf1f2;
            border-left: 0;
            border-right: 0;
            cursor: pointer;
            @include flex(space-between,center);
            flex-flow: wrap;
            .list_left{
                @include flex(flex-start,center);
                width: 290px;
                .opacity0{
                    opacity: 0;
                }
                i{
                    color: orangered;
                    vertical-align: middle;
                    margin-right: 20px;
                }
                img{
                    width: 20px;
                    height: 20px;
                    margin-right: 20px;
                }
            }
            .list_mid{
                width: 579px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            .list_eye_div{
                width: 20px;
            }
            .list_eye{
                display: none;
            }
            &:hover .list_eye{
                display: block;
            }
            .list_right{
            }
        }
        .img{
            text-align: center;
            img{
                @media only screen and (max-width:767px) {
                    width: 100%;
                }
            }
        }
    }
</style>