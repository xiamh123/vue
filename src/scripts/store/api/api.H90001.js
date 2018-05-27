/**
 * 作者：唐泽勇
 * 理财精选页面
 */
import SYS_CONFIG from '../../../common/constant.js';

import axios from 'axios';

/**
 * 2.1. 登录/注册
 * options:{
 *   mblNo: mblNo,
 *   chkNo: chkNo,
 *   clientUserId: clientUserId,
 *   bindFlag: bindFlag  // 0:不需要绑定  1:需要绑定
 * }
 */

function H90001(options, callback) {
  var vm = this;
  axios.post(SYS_CONFIG.baseUrl + "/H90001.json",options)
    .then(function (response) {
      console.log("请求H90001成功");
      if (typeof callback === 'function') {
        callback(response);
      }
    // return response;
  }).catch(function (error) {
      console.log("--------------1111-----------"+error);
      console.log(error);
    });
}

export default {
  H90001: H90001
};
