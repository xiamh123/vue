/**
 * 路由类
 * requiresAuth 默认值true  需要登录检查
 * @type {[*]}
 */
import Util from "../utils/toolUtil.js"
import About from '../components/Page.About.vue'
import Home from '../components/Page.Home.vue'

import Event from '../components/Event.vue'
import Hello from '../components/Hello.vue'
import Query from '../components/Page.Query.vue'
import Test from '../components/Page.Test.vue'

import API_COMMON from '../scripts/store/api/api.system.js';


let routesGet = [];

export default {
  routes: [
    {
      name: 'login',
      path: '/login',   // 注册 登录
      hidden: true,
      meta: {
        requiresAuth: false
      },
      component: require('../components/Page.Login.vue')
    },
    {
      path: '/',
      component: Home,
      meta: {
        requiresAuth: true
      },
      name: '测试',
      iconCls: 'el-icon-message',//图标样式class
      children: [
        { path: '/main', component: About, name: '主页', hidden: true },
        { path: '/about', component: About, name: 'Table' },
        { path: '/event', component: Event, name: 'Event' },
        { path: '/hello', component: Hello, name: 'Hello' },
        { path: '/query', component: Query, name: '增删改查' },
        { path: '/test', component: Test, name: '学习' },
        { path: '/demo', component: require('../components/Page.Demo.vue'), name: '演示' },
        { path: '/ui_demo', component: require('../components/Page.UiDemo.vue'), name: 'ElementUI测试' }
      ]
    }
  ],
  //使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition;
  //   } else {
  //     return {x: 0, y: 0};
  //   }
    // if (to.hash) {
    //   return {selector: to.hash};
    // }
  // },
  //创建路由
  createRouter(VueRouter){
    console.log("createRoute ");
    var _this = this;

    //return _this.getMMMMMM(VueRouter);


    var router = new VueRouter({
      // mode: 'history',
      //路由列表
      routes: _this.routes,
      //使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。
      // scrollBehavior: _this.scrollBehavior,
      //hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器。
      //history: 依赖 HTML5 History API 和服务器配置。查看 HTML5 History 模式.
      //abstract: 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式。
      //mode: 'history',
      //应用的基路径。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"。
      // base: "/",
      //全局配置 <router-link> 的默认『激活 class 类名』。参考 router-link.
      // linkActiveClass: "router-link-active"
    });
    router.beforeEach((to, from, next) => _this.beforeEach(to, from, next));
    // router.afterEach((router)=> _this.afterEach(router, store));
    return router;

  },

  //访问之前的函数
  beforeEach(to, from, next){
    window.scrollTo(0, 0);

    // TODO: 路由加载前校验登录信息
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // console.log("------beforeEach-------22");
      console.log(this.routes);
      // console.log("------beforeEach-------2222");
      // next()
      // console.log("login check : "+Util.isLogin());
      if (!Util.isLogin()) {
        // console.log("11111112-----")
        next({
          name: 'login',
          query: {redirect: to.name},
          params: to.params
        })
      } else {
        next()
      }
    } else {
      // console.log("------beforeEach-------33");
      next() // 确保一定要调用 next()
    }
  },

  //可以记录访问路径
  afterEach(router, store){
  }

  


};



