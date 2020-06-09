import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import icon from './assets/font/iconfont.css'
import axios from 'axios'

//当在当前不需要时候只提供全局使用时候只引入文件夹就好
import './assets/css/global.css'

import './plugins/element.js'

Vue.config.productionTip = false;
//配置根目录
axios.defaults.baseURL=`http://timemeetyou.com:8889/api/private/v1/`;
Vue.prototype.$http=axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');