import Vue from "vue";
import Router from "vue-router";
const index = () => import('./views/index/Index');
const home = () => import('./views/home/Home');
// 服务
const service = () => import('./views/service/Service');
const serviceSearch = () => import('./views/service/Search');
const serviceSearchIcon = () => import('./views/service/SearchIcon');
const serviceSearchList = () => import('./views/service/SearchList');
const serviceDetail = () => import('./views/service/Detail');
const serviceIframe = () => import('./views/service/serviceIframe');
//应用和一卡通
const application = () => import('./views/app/Application');
const ecard = () => import('./views/app/Ecard');
//资讯
const news = () => import('./views/news/News');
const newsDetail = () => import('./views/news/NewsDetail');
const newsSub = () => import('./views/news/NewsSub');
//日程
const schedule = () => import('./views/schedule/Schedule');
const scheduleSub = () => import('./views/schedule/MySub');
//icon图标
const feedback = () => import('./views/icon/feedback');
const todo = () => import('./views/icon/todo/Todo');
const todo_create = () => import('./views/icon/todo/Todo_create');
const todo_done = () => import('./views/icon/todo/Todo_done');
const collections = () => import('./views/icon/Collections');
const message = () => import('./views/icon/message');
const user = () => import("./views/icon/user/Info");
const userHead = () => import("./views/icon/user/Head");
//版本日志
const log = () => import('./views/version/log');
//其他
const login = () => import('./views/Login');
const loading = () =>import('./views/Loading');
const noFound = () => import('./views/NoFound');
Vue.use(Router);

const router = new Router({
    routes: [
      {path: "/index", component: index},
      {path: "/home", component: home},
      {path: "/service", component: service,meta:{keepAlive: true}},
      {path: "/service/search", component: serviceSearch,
        children:[
          {path:'icon', component:serviceSearchIcon,meta:{keepAlive: true}},
          {path:'list', component:serviceSearchList,meta:{keepAlive: true}},
        ]
      },
      {path: "/service/detail/:id", component: serviceDetail},
      {path: "/service/iframe/:id", component: serviceIframe},
      {path: "/app", component: application,meta:{keepAlive: true}},
      {path: "/app/ecard", component: ecard,meta:{keepAlive: true}}, //一卡通
      {path: "/news", component: news,},
      {path: '/news/detail', name:"news_detail", component: newsDetail},
      {path: '/news/sub', name:"news_sub", component: newsSub},
      {path: '/schedule', name:"schedule", component: schedule},
      {path: '/schedule/MySub', name: "schedule_mySub", component: scheduleSub},
      {path: '/feedback',component:feedback,meta:{keepAlive: true}},
      {path: '/todo', name: "todo", component: todo,},
      {path: '/todo_done', name: 'todo_done', component: todo_done},
      {path: '/todo_create', name: 'todo_create', component: todo_create},
      {path: '/collections', name: 'collections', component: collections,meta:{keepAlive: true}},
      {path: "/user", component: user,meta:{keepAlive: true}},
      {path: "/user/head", component: userHead,meta:{keepAlive: true}},
      {path:'/message',name:'message',component: message},
      {path:'/log',name:'log',component: log,meta:{keepAlive: true}},
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
