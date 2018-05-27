/**
 * 作者：xiamh
 * 删除报名用户信息
 */
import SYS_CONFIG from '../../../common/constant.js';

import axios from 'axios';

/**
 *
 */

function H90003(options, callback) {
  var vm = this;
  axios.post(SYS_CONFIG.baseUrl + "/H90003",options)
    .then(function (response) {
      console.log("请求H90003成功");
      if (typeof callback === 'function') {
        callback(response);
      }
    // return response;
  }).catch(function (error) {
      console.log("--------------1111-----------"+error);
      console.log(error);
    });
};


function H90004(options, callback) {
  var vm = this;
  axios.post(SYS_CONFIG.baseUrl + "/H90004",options)
    .then(function (response) {
      console.log("请求H90004成功");
      if (typeof callback === 'function') {
        callback(response);
      }
      // return response;
    }).catch(function (error) {
    console.log("--------------2222-----------"+error);
    console.log(error);
  });
};

export default {
  H90003: H90003,
  H90004: H90004
};
