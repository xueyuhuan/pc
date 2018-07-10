import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token:'',
    user:{},//用户信息
    /*home的模块数据*/
    app:[],
    file:[],
    notice:[],
    notice2:[],
    pay:{},
    ranking:[],
    type:1,//排行的日期
    schedule:[],
    date:0,//日程的日期
    service:[],
    todo:[],
    userModule:[],
    /*home的模块数据end*/
    /*设置弹框*/
    popupShow:false,//是否显示
    popupType:''//应用或服务
  },
  mutations: {
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
