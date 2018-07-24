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
      email:{},
      ecard:{},
      tsg:{},
      network:{},
    /*home的模块数据end*/
    /*设置弹框*/
    popupShow:false,//是否显示
    popupType:'',//应用或服务
    /*设置弹框end*/
    /*服务*/
    search:'',
    /*颜色*/
    skin:'1390d3',
    skinLight:'2aa8e9',
    skinDarker:'067ebe',
    skinCard:'00697e',
    skinCardFont:'',
  },
  mutations: {
    //更换主题颜色
    setThemeColor(state,color){
      if(color==='blue'){
          this.state.skin='skin-'+'1390d3';
          this.state.skinLight='skin-light-'+'2aa8e9';
          this.state.skinDarker='skin-darker-'+'067ebe';
          this.state.skinCard='skin-card-'+'1295d8';
          this.state.skinCardFont='skin-card-font-'+'1295d8';
      }
      if(color==='green'){
        this.state.skin='skin-'+'00697e';
        this.state.skinLight='skin-light-'+'008099';
        this.state.skinDarker='skin-darker-'+'005768';
        this.state.skinCard='skin-card-'+'00697e';
        this.state.skinCardFont='skin-card-font-'+'00697e';
      }
      if(color==='orange'){
        this.state.skin='skin-'+'f18b2e';
        this.state.skinLight='skin-light-'+'fc9e48';
        this.state.skinDarker='skin-darker-'+'ed760a';
        this.state.skinCard='skin-card-'+'f18b2e';
        this.state.skinCardFont='skin-card-font-'+'f18b2e';
      }
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
