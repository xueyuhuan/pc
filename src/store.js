import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token:'',
    user:{},//用户信息
    /*home的模块数据*/
    home:{},//home布局
    homeChange:0,
    homeA:[],
    homeB:[],
    componentData:{},//组件数据
    // app:[],//应用布局
    // file:[],
    // notice:[],
    // notice2:[],
    pay:{},
    // ranking:[],
    type:1,//排行的日期
    // schedule:[],
    date:0,//日程的日期
    // service:[],//服务布局
    todo:[],//待办列表，长度为待办数
    unreadCount:0,//未读消息数
    // 个人中心
    userModule:{},
    email:{},//邮件
    ecard:{},//校园卡
    tsg:{},//图书馆
    network:{},//网络流量
    /*home的模块数据end*/
    /*设置弹框*/
    popupShow:false,//是否显示
    popupType:'',//应用或服务或home
    /*设置弹框end*/
    /*服务*/
    search:'',
    searchKey:'',
    /*i哈工大*/
    jumpShow:false,//跳转是否显示
    jumpName:''//跳转的名字
  },
  mutations: {
    //设置工作台组件数据
    setComponentData(state,data){
      Vue.set(state.componentData,data.id,data);
      // state.componentData[data.id]=data;
    },
    set_token(state,token){
      state.token=token;
      sessionStorage.token=token;
    },
    del_token(state){
      state.token="";
      sessionStorage.removeItem("token");
    },
    set_user(state,user){
      state.user=user;
    },
    set_data(state,data){
      state[data.name]=data.data;
    },
  },
  actions: {}
});
