/**
 * 作者：唐泽勇
 * 理财精选页面
 */
import toolUtil from '../../../utils/toolUtil.js';

import SYS_CONFIG from '../../../common/constant.js';

import CONSTANT from '../../../common/constant.js';

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

function H10001(options, callback) {
  console.log("url : "+SYS_CONFIG.baseUrl);
  var vm = this;
  console.log(options);
  axios.post(SYS_CONFIG.baseUrl + "/H10001",options)
    .then(function (response) {
    // vm.tokenId = response.data.tokenId;
      console.log("请求H10001成功");
      if (typeof callback === 'function') {
        callback(response);
      }
    // return response;
  }).catch(function (error) {
      console.log("--------------1111-----------"+error);
      console.log(error);

      _this.$router.replace('/login');
    });
}

export default {
  H10001: H10001
};
