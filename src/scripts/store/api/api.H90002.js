/**
 * 作者：xiamh
 * 新增报名用户信息
 */
import SYS_CONFIG from '../../../common/constant.js';

import axios from 'axios';

/**
 *
 */

function H90002(options, succCallback, failCallback) {
  var vm = this;
  axios.post(SYS_CONFIG.baseUrl + "/H90002",options)
    .then(function (response) {
      console.log("请求H90001成功");
      if (typeof succCallback === 'function') {
        succCallback(response);
      }
    // return response;
  }).catch(function (error) {
      console.log("--------------1111-----------"+error);
      console.log(error);
      failCallback(error);
    });
}

export default {
  H90002: H90002
};
