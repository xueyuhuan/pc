import Vue from "vue";
import axios from 'axios';
import qs from 'querystring'
import router from "./router";
//创建实例 axios.create([config])
const instance=axios.create({
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  baseURL: process.env.NODE_ENV==='production'?process.env.VUE_APP_ServerApi:'/api',
  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  timeout:500000,
  // `headers` 是即将被发送的自定义请求头
  headers:{
    'Content-Type':'application/x-www-form-urlencoded'
  }
});
let loading;
//请求拦截器
instance.interceptors.request.use(
    config => {
      //在发送请求之前做些什么
      //保存布局时不加载loading
      if(config.url!=='/page_portal/save_layout'&&config.url!=='/calendar_portal/get_events_date'){
        loading=Vue.prototype.$loading({text:"",background: 'rgba(0, 0, 0, 0.3)'});
      }
      if(config.method==="post"){
        // post传参序列化
        config.data = qs.stringify(config.data);
        // 注：若是提交能直接接受json 格式,即可以不用 qs 序列化
      }
      // 判断是否存在token，如果存在将每个页面header都添加token
      // if(sessionStorage.token){
      //   config.headers.Authorization= "Bearer "+sessionStorage.token;
      // }
      sessionStorage.token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIyMDA0MDEyOSIsImV4cCI6MTU0NDY3ODIxOX0.Y55ADrXnOoYBojr6yG5rk1KX4_-r9nmdZeFmFxoelkM'
      config.headers.Authorization="Bearer "+'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIyMDA0MDEyOSIsImV4cCI6MTU0NDY3ODIxOX0.Y55ADrXnOoYBojr6yG5rk1KX4_-r9nmdZeFmFxoelkM'
      return config;
      },
    error => {
      //对错误请求做些什么
      loading=Vue.prototype.$loading({text:"",background: 'rgba(0, 0, 0, 0.3)'});
      Vue.prototype.$notify.info('加载超时');
      return Promise.reject(error);
    });
//响应拦截器（返回状态判断）
instance.interceptors.response.use(
    res => {
      loading.close();
      if(res.data.errcode === '500') Vue.prototype.$notify.error(res.data.errmsg);
      return res;
    },
    err => {
      loading.close();
      if (err.response) {
        switch (err.response.status) {
          case 403:
            router.replace({
              path: '/loading',
              query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
            });
        }
      }
      return Promise.reject(err)
    });
export default instance;

