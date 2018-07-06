import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: resolve => require(['./views/home/Home'], resolve)
        },
        {
            path: "/login",
            name: "login",
            component: resolve => require(['./views/Login'], resolve)
        },
        {
            path: "/app",
            name: "application",
            component: resolve => require(['./views/app/Application'], resolve)
        },
        {
            path: "/news",
            name: "news",
            component: resolve => require(['./views/news/News'], resolve)
        },
        {
            path: '/news/detail',
            component: resolve => require(['./views/news/NewsDetail'], resolve)
        }

    ]
});
