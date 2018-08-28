import "babel-polyfill";
import Vue from "vue";
import ElementUI from 'element-ui';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from './axios';
import url from './url';
import ccnu from './school/ccnu';
import hit from './school/hit';
import hzau from './school/hzau';
import nit from './school/nit';

import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css';
import "./assets/css/iconfont.css";
import "./assets/css/simple-line-icons.css"

const requireComponent = require.context(
    // 其组件目录的相对路径
    './components',
    // 是否查询其子目录
    false,
    // 匹配以.vue或js的正则表达式
    /\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  // 剥去文件名开头的 `'./` 和结尾的扩展名
  const componentName=fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
  // 全局注册组件
  Vue.component(
      componentName,
      // 如果这个组件选项是通过 `export default` 导出的，
      // 那么就会优先使用 `.default`，
      // 否则回退到使用模块的根。
      componentConfig.default || componentConfig
  )
})

Vue.prototype.$ajax=axios;
Vue.prototype.$url=url;
switch (process.env.VUE_APP_SCHOOL) {
  case 'ccnu':Vue.prototype.$school=ccnu;break;
  case 'hit':Vue.prototype.$school=hit;break;
  case 'hzau':Vue.prototype.$school=hzau;break;
  case 'nit':Vue.prototype.$school=nit;break;
}
Vue.prototype.$proxy=process.env.VUE_APP_PROXY;
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
