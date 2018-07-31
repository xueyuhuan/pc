import Vue from "vue";
import Router from "vue-router";
const index = () => import('./views/index/Index');
const home = () => import('./views/home/Home');
const service = () => import('./views/service/Service');
const serviceSearch = () => import('./views/service/Search');
const serviceSearchIcon = () => import('./views/service/SearchIcon');
const serviceSearchList = () => import('./views/service/SearchList');
const serviceDetail = () => import('./views/service/Detail');
const login = () => import('./views/Login');
const application = () => import('./views/app/Application');
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
Vue.use(Router);

export default new Router({
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
      {path: "/login", component: login},
      {path: "/app", component: application},
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
      {path:'/log',name:'log',component: log}
    ]
});
