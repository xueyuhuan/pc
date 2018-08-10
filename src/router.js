import Vue from "vue";
import Router from "vue-router";
const index = () => import('./views/index/Index');
const home = () => import('./views/home/Home');
const service = () => import('./views/service/Service');
const serviceSearch = () => import('./views/service/Search');
const serviceSearchIcon = () => import('./views/service/SearchIcon');
const serviceSearchList = () => import('./views/service/SearchList');
const serviceDetail = () => import('./views/service/Detail');
const application = () => import('./views/app/Application');
const ecard = () => import('./views/app/Ecard');
const news = () => import('./views/news/News');
const newsDetail = () => import('./views/news/NewsDetail');
const newsSub = () => import('./views/news/NewsSub');
const schedule = () => import('./views/schedule/Schedule');
const scheduleSub = () => import('./views/schedule/MySub');
const feedback = () => import('./views/icon/feedback');
const todo = () => import('./views/todo/Todo');
const todo_hit = () => import('./views/todo/Todo_hit');
const collections = () => import('./views/collections/Collections');
const user = () => import("./views/user/Info");
const userHead = () => import("./views/user/Head");
const message = () => import('./views/message/message');
const log = () => import('./views/version/log');
const login = () => import('./views/Login');
const loading = () =>import('./views/Loading');
const noFound = () => import('./views/NoFound');
Vue.use(Router);

const router = new Router({
    routes: [
      {path: "/index", component: index},
      {path: "/home", component: home},
      {path: "/service", component: service},
      {path: "/service/search", component: serviceSearch,
        children:[
          {path:'icon', component:serviceSearchIcon},
          {path:'list', component:serviceSearchList},
        ]
      },
      {path: "/service/detail/:id", component: serviceDetail},
      {path: "/app", component: application},
      {path: "/app/ecard", component: ecard}, //一卡通
      {path: "/news", component: news,},
      {path: '/news/detail', name:"news_detail", component: newsDetail},
      {path: '/news/sub', name:"news_sub", component: newsSub},
      {path: '/schedule', name:"schedule", component: schedule},
      {path: '/schedule/MySub', name: "schedule_mySub", component: scheduleSub},
      {path: '/feedback',component:feedback},
      {path: '/todo', name: "todo", component: process.env.VUE_APP_SCHOOL==='hit'? todo_hit : todo},
      {path: '/collections', name: 'collections', component: collections},
      {path: "/user", component: user},
      {path: "/user/head", component: userHead},
      {path:'/message',name:'message',component: message},
      {path:'/log',name:'log',component: log},
      {path:'/login',name:'login',component: login},
      {path:'/loading',name:'loading',component: loading},
      {path:'/404',name:'404',component: noFound},
      // {path:'*',redirect:'/404'},
    ]
});

// 全局路由守卫
// router.beforeEach((to,from,next) => {
//   // to: Route: 即将要进入的目标 路由对象
//   // from: Route: 当前导航正要离开的路由
//   // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
//   if(to.path!=='/login'||to.path!=='/loading'){
//     if(sessionStorage.token){
//       next();
//     }
//     else {
//       next({
//         path:'/loading',
//         // query:{redirect:to.fullPath}
//       })
//     }
//   }
//   else {next();}
// });

export default router;
