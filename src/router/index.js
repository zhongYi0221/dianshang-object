import Vue from 'vue'
import VueRouter from 'vue-router'
//1
import LoginRouter from './Login/login'
//方法2
//import LoginRouter from '../components/Login/login'
import home from './home/Home'
// import welcom from "./Welcom/welcom";


Vue.use(VueRouter);

const routes = [

    //为/时候默认访问/login,自动跳转
    {
        path: '/',
        redirect: '/login',
    },
    //1
    LoginRouter,
    //方法2
    // {
    //   path:'/login',component:LoginRouter
    // }
    home,
    // welcom
];

const router = new VueRouter({
    routes
});

//导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    例如next('/login')  强制跳转
  if (to.path==='/login') return next();
  //获取token值，tonken值为全局
  const tonkenKey = window.sessionStorage.getItem('token');
  //判断token值是否为空，不为空直接放行
  if (!tonkenKey) return next('/login');
  next();
  
});
//解决重复router问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

export default router
