import Vue from "vue";
import Router from "vue-router";
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
Vue.use(Router);

export default new Router({
    routes: [
      {
        path: "/",
        component: home
      },
      {
        path: "/service",
        component: service
      },
      {
        path: "/service/search", component: serviceSearch,
        children:[
          {path:'icon', component:serviceSearchIcon},
          {path:'list', component:serviceSearchList},
        ]
      },
      {
        path: "/service/detail/:id",
        component: serviceDetail
      },
      {
        path: "/login",
        component: login
      },
      {
        path: "/app",
        component: application
      },
      {
        path: "/news",
        component: news,
      },
      {
        path: '/news/detail',
        name:"news_detail",
        component: newsDetail
      },
      {
        path: '/news/sub',
        name:"news_sub",
        component: newsSub
      },
      {
        path: '/schedule',
        name:"schedule",
        component: schedule
      },
      {
        path: '/schedule/MySub',
        name: "schedule_mySub",
        component: scheduleSub
      }
    ]
});
