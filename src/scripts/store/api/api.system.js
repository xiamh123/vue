
import httpUtil from '../../../utils/httpUtil.js';

/**
 * 获取菜单列表，根据权限过滤
 *
 */
async function H00001(options, callback) {
   await httpUtil
    .httpObj
    .connect('true', 'loading.............')
    .post('H00001', {
    })
    .then(function(data){
      console.log("--------data");
      if(typeof callback === 'function'){
        callback(data);
      }
    })
    .catch(function(err){
      console.table(err);
    });
}

export default {
  H00001: H00001
};
