// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router'
import routes from './router/routers.js'

import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import 'font-awesome/css/font-awesome.min.css'

// import Mock from './mock'

// import "./scripts/store/api/mockdata.js";

import API_COMMON from './scripts/store/api/api.system.js';


// Mock.bootstrap();

// 引入mockjs
require('./mock/mock.js')

Vue.use(ElementUI)

// Router
Vue.use(VueRouter)


Vue.config.productionTip = false

/* 初始化axios配置方法，ajax请求通用方法，返回axios对象 */
Vue.prototype.$AxiosAjax = ({url = '', params = {}, method = 'post', loading = false, headers = {'Content-Type': 'application/json'}, responseType = 'json'} = {}) => {
  if (!url) {
    console.info('请输入url')
    return
  }

  let baseURL
  switch (process.env.NODE_ENV) {
    case 'sit':
      baseURL = 'http://10.7.2.8:18080/kpms'
      break
    case 'uat':
      baseURL = 'http://10.7.2.8:28080/kpms'
      break
    case 'production':
      baseURL = 'http://10.7.2.8:48080/kpms'
      break
    case 'development': // 本地开发环境
      // baseURL = 'http://localhost:9998/fxdz'
      baseURL = 'http://localhost:9999'
      break
    case 'onlinedev': // 测试服务器dev，非本地开发环境
      baseURL = 'http://10.7.2.8:8080/kpms'
      break
  }

  let axiosConfig = {
    baseURL: baseURL,
    method: method,
    headers: headers,
    paramsSerializer: function (params) {
      return Qs.stringify(params)
    },
    responseType: responseType
  }
  // thisPlugin.CancelToken = axios.CancelToken
  // thisPlugin.source = thisPlugin.CancelToken.source()
  // axiosConfig.cancelToken = thisPlugin.source.token
  axiosConfig.url = url
  switch (method.toUpperCase()) {
    case 'POST':
      // console.log('post params is :', params)
      axiosConfig.data = params
      break
    case 'GET':
      axiosConfig.params = params
      break
  }
  if (loading) {
    if (typeof window.loadingInstance === 'undefined') {
      window.loadingInstance = ElementUI.Loading.service({})
    } else {
      window.loadingInstance.$loading()
      window.loadingInstance.visible = true
    }
  }
  return axios(axiosConfig)
}



/* eslint-disable no-new */
window.RootVue = new Vue({
  el: '#app',
  router: routes.createRouter(VueRouter),
  template: '<App/>',
  components: { App }
}).$mount('#app');





