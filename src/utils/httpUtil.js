/**
 * Created by zuohx on 2017年03月01日11:51:48.
 * 请求处理类
 */
import _ from 'lodash'
import SYS_CONFIG from '../common/constant'
import axios from 'axios'
import Util from '../utils/toolUtil.js'
//import {dateFilter} from '../common/filters'

const httpPlugin = {
  vm: null,
  install (Vue, options) {  // 初始化
    this.vm = Vue;
    let that = this;
    Object.defineProperty(Vue.prototype, '$http', {
      get: function get() {
        return that.httpObj
      }
    })
  },
  httpObj: {  // 请求方法
    baseURL: SYS_CONFIG.baseUrl,  // 接口请求前缀

    /**
     * isLoading:(boolean)是否加载处理中页面
     * loadingContent:(string)弹框显示的注释
     * */
    connect: function (isLoading = true, loadingContent = '') {
      let axiosInstance;

      // 创建接口连接实例
      axiosInstance = axios.create({
        baseURL: this.baseURL,
        timeout: SYS_CONFIG.HTTP_TIMEOUT,
        headers: {
          'Accept': SYS_CONFIG.HTTP_HEADERS_ACCEPT,
          'Content-Type': SYS_CONFIG.HTTP_HEADERS_CONTENT_TYPE
        }
      });

      // 添加请求拦截器
      axiosInstance.interceptors.request
        .use(function (config) {

          console.log("---------------添加请求拦截器");
          console.log(config)

          if (isLoading) {
            // Indicator.open(loadingContent)
          }
          console.log("-----------11111");
          // TODO:合并公共字段
          if (!_.isObject(config.data)) {
            config.data = {}
          }
          console.log("-----------22222");

          config.data = _.assign({
            appVersion: "1.0.0",  // 版本号
            osVersion: Util.getBrowser().version,  // 操作系统版本号
            //requestTm: dateFilter(new Date(), 'YmdHis'),  // 请求时间
            tokenId: Util.getUserInfo().tokenId()  // Token
          }, config.data);

          console.log('---------------------------------------------------');
          console.log("resquest:");
          console.log(config.data);
          console.log('---------------------------------------------------');

          return config
        }, function (error) {
          console.log("-----> 请求失败1");
          return Promise.reject(error)
        });
      // 添加响应拦截器
      axiosInstance.interceptors.response
        .use(function (response) {

          console.log("---------------添加响应拦截器");

          console.log('---------------------------------------------------');
          console.log("response:");
          console.log(response);
          console.log('---------------------------------------------------');

          return response.data
        }, function (error) {

          console.log("-----> 请求失败2");
          return Promise.reject(error)
        });
      return axiosInstance
    },
  }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(httpPlugin);
}

/**
 * zuohx 2017年05月10日11:45:38.
 * 在window对象中创建$http请求方法
 * 调用实例
 * $http.post({
 *       isToast: true,
 *       toastMsg: '',
 *      path: 'public/H20001.action',
 *       params: {}
 * }).then(function (data) {
 *  console.debug(data)
 * })
 * 传入一个options对象
 * isToast [Boolean]  loading是否显示
 * toastMsg [String]  loading的文字
 * path [String]      请求地址
 * params [Object]    请求参数
 * @type {{post: ((options?))}}
 */
window.$http = {
  post(options){
    if (!_.isObject(options)) {
      console.error('参数不是对象');
    }
    // toast, msg, path, options
    let isToast = _.isBoolean(options.isToast) ? (options.isToast ? options.isToast : false) : '参数值错误，必须为Boolean类型';
    let toastMsg = _.isString(options.toastMsg) ? (options.toastMsg ? options.toastMsg : '') : '参数值错误，必须为String类型';
    let path = _.isString(options.path) ? (options.path ? options.path : '') : '参数值错误，必须为String类型';
    let params = _.isObject(options.params) ? (options.params ? options.params : {}) : '参数值错误，必须为Object类型';

    return httpPlugin.httpObj.connect(isToast, toastMsg).post(path, params)
  }
};

export default httpPlugin;
