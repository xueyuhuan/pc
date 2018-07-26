<template>
    <CardTemp>
        <header class="drag" slot="header">个人中心
            <router-link to="/user"><i class="fa fa-ellipsis-h"></i></router-link>
        </header>
        <ul>
            <li class="border_bottom1">
                <a>
                    <img src="/api/img/email.png"/>
                    <div class="right">
                        <div class="name">邮件<br/><span class="pointer">{{email.email}}</span><span class="pointer">解绑</span></div>
                        <div class="info">未读：{{email.unread}}，今日：{{email.todayCount}}</div>
                    </div>
                </a>
            </li>
            <li class="border_bottom1">
                <a>
                    <img src="/api/img/school_card.png"/>
                    <div class="right">
                        <div class="name">校园卡<br/><span class="pointer">在用</span></div>
                        <div class="info">
                            <i v-show="showEcard">余额：{{ecard.balance}}</i>&nbsp;&nbsp;
                            <i class="fa pointer" :class="{'fa-eye':showEcard,'fa-eye-slash':!showEcard}" @click.stop="showEcard = !showEcard"></i>
                        </div>
                    </div>
                </a>
            </li>
            <li class="border_bottom1">
                <a>
                    <img src="/api/img/book.png"/>
                    <div class="right">
                        <div class="name">图书馆<br/><span class="pointer">{{ tsg.bookCount === 0 ? '暂无借阅图书' : `在借${tsg.bookCount}本`}}</span></div>
                        <div class="info">
                            <i>{{tsg.qfje === 0 ? '无欠费' : `欠费${tsg.qfje}元`}}</i>
                        </div>
                    </div>
                </a>
            </li>
            <li>
                <a>
                    <img src="/api/img/school_card.png"/>
                    <div class="right">
                        <div class="name">网络流量<br/><span class="pointer">{{ network.status}}</span></div>
                        <div class="info">
                            <i>本月使用流量&nbsp;{{network.bqljll}}</i>
                        </div>
                    </div>
                </a>
            </li>
        </ul>
    </CardTemp>
</template>

<script>
    export default {
        name: "User",
        data(){
            return{
                showEcard:false
            }
        },
        computed: {
            email() {
                return this.$store.state.email;
            },
            ecard() {
                return this.$store.state.ecard;
            },
            tsg() {
                return this.$store.state.tsg;
            },
            network() {
                return this.$store.state.network;
            }
        }
    }
</script>

<style scoped lang="scss">
    header{
        cursor: move;
    }
    .pointer{
        cursor: pointer;
    }
    .border_bottom1{
        border-bottom: 1px dashed #e4e4e4;
    }
    ul {
        @include flex;
        flex-flow: wrap;
        li {
            width: 100%;
            padding: 8px 23px;
            a {
                @include flex;
                width: 100%;
                font-size: 14px;
                color: #000;
                img {
                    width: 30px;
                    height: 30px;
                    margin-right: 20px;
                }
                .right {
                    flex: 1;
                    @include flex(space-between);
                    span {
                        font-size: 12px;
                        margin-right: 10px;
                    }
                }
            }
        }

    }

</style>