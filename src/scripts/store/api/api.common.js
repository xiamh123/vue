/**
 * 作者：唐泽勇
 */
import httpUtil from '../../../utils/httpUtil.js';

import toolUtil from '../../../utils/toolUtil.js';

// 测试用拦截请求，返回假数据。
// require('./mockdata.js');

/**
 * 判断是否做了风险评测
 * options.cooporgNo 合作机构代码
 * options.callback 回调函数
 * 
 */
function checkTest() {
  httpUtil
    .httpObj
    .connect('true', 'loading...')
    .post('busi/H40030.action',{
      cooporgNo: options.cooporgNo
    });
  return httpUtil;
}

/**
 * 3.17.已签约快捷银行信息查询
 * entrance/busi/H40024.action
 * 参数: queryType '1'(查询已绑定的快捷信息) | '2'(查询绑定安全卡信息)
 * @return {[type]} [description]
 */
function checkBindCard(queryType=2, callback){
  httpUtil
    .httpObj
    .connect('true', 'loading...')
    .post('busi/H40024.action', {
      queryType: queryType
    })
    .then(function(data){
      if(typeof callback === 'function'){
        callback(data);
      }
    })
    .catch(function(err){
      console.table(err);
    });
}

// 检查是否绑卡 是否做了风险测评
function checkTestAndBindCard(cooporgNo,callback){
  return httpUtil.httpObj.getPostTasksPromise([
    {
      url: 'busi/H40030.action',
      params: {
        cooporgNo: cooporgNo
      }
    },
    {
      url: 'busi/H40024.action',
      params: {
        queryType: 2
      }
    },
  ],
  callback);
}

export default {
  checkTest: checkTest,
  checkTestAndBindCard: checkTestAndBindCard,
  checkBindCard: checkBindCard
};
