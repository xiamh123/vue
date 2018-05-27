/**
 * zuohx 2017年04月10日15:16:36.
 * 工具类
 */
import _ from 'lodash'
import SYS_CONFIG from '../common/constant.js'
import resourceUtil from './resourceUtil'

const toolUtil = {
  validFloat (num) {
    if (_.isUndefined(num) || !/^(0|[1-9]\d*)(\.\d{1,2})?$/.test(num)) {
      return false
    }
    return true
  },
  validString (str) {
    if (_.isUndefined(str) || !_.isString(str) || str === '') {
      return false
    }
    return true
  },
  validInt (num) {
    if (_.isUndefined(num) || !/^(0|[1-9]\d*)$/.test(num)) {
      return false
    }
    return true
  },
  validChinese (str) {
    if (_.isUndefined(str) || !_.isString(str) || !/^[\u4E00-\u9FA5\uf900-\ufa2d]*$/.test(str)) {
      return false
    }
    return true
  },
  // validUrl (str) {
  //   if (_.isUndefined(str) || !_.isString(str) || !/http(s)?:\/\/([\w\-]+\.)+[\w\-]+(\/[\w\-.\/?%&=]*)?/.test(str)) {
  //     return false
  //   }
  //   return true
  // },
  validMobile (mobile) {
    if (!_.isString(mobile)) {
      return false
    }
    return /^1(3\d|4[57]|5[012356789]|7[3678]|8\d)\d{8}$/.test(mobile);
  },
  // validPhone (phone) {
  //   if (!_.isString(phone) || !/^0\d{2,3}\-?\d{7,8}$/.test(phone)) {
  //     return false
  //   }
  //   return true
  // },
  hidePhoneNumber: function (phone) {
    let str = '';
    if (_.isString(phone)) {
      str = phone.substr(0, 3) + '****' + phone.substr(7, 11)
    }
    return str
  },
  saveUserInfo (phone, tokenId) {
    resourceUtil.setLocal('phone', phone);
    resourceUtil.setLocal('token_id', tokenId)
  },

  // 获取时间字符串
  getDataTimeStr (DT, format) {
    var date = {
      "M+": DT.getMonth() + 1,
      "d+": DT.getDate(),
      "h+": DT.getHours(),
      "m+": DT.getMinutes(),
      "s+": DT.getSeconds(),
      "q+": Math.floor((DT.getMonth() + 3) / 3),
      "S+": DT.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (DT.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1
          ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
      }
    }
    return format;
  },


  // 生成定长随机数  接收一个数字
  // 第一个参数是生成的随机值长度
  // 第二个参数是Boolean值 当为true时只输出数字
  getRandomNum (n, num) {
    if (!_.isNumber(n)) {
      return "不是一个数字，请传入一个[Number]类型数值"
    }
    let chars;
    let random;
    if (num == true) {
      chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      random = 9;
    } else {
      chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      random = 35;
    }
    let res = "";
    for (let i = 0; i < n; i++) {
      let id = Math.ceil(Math.random() * random);
      res += chars[id];
    }
    return res;
  },

  // 获取浏览器信息
  getBrowser () {
    let nav = window.navigator,
      ua = nav.userAgent.toLowerCase();

    ua = /(iphone|ipad|ipod)(?:.*version)?[ \/]([\w.]+)/.exec(ua) || // Mobile IOS
      /(android)(?:.*version)?[ \/]([\w.]+)/.exec(ua) || []; // Mobile Webkit

    let browser = ua[1],
      version = ua[2],
      termTyp = '';

    switch (browser) {
      case "ipod":
        browser = "ipod";
        termTyp = "0";
        break;
      case "ipad":
        browser = "ipad";
        termTyp = "0";
        break;
      case "iphone":
        browser = "iphone";
        termTyp = "0";
        break;
    }
    return {
      termTyp: termTyp ? termTyp : '1',
      browser: browser ? browser.toUpperCase() : browser,
      version: version,
      isWeixin: /MicroMessenger/gi.test(nav.userAgent)
    }
  },

  // 获取用户信息，供报文头取值使用
  getUserInfo () {
    var u;
    if (!resourceUtil.getLocal("userInfo")) {
      u = "";
    } else {
      u = JSON.parse(resourceUtil.getLocal("userInfo"));
    }

    // 获取用户token
    function tokenId(id) {
      if (id) {
        if (_.isObject(u)) {
          u.tokenId = id;
          resourceUtil.setLocal('userInfo', u);
        } else {
          u = {tokenId: id};
          resourceUtil.setLocal('userInfo', u);
        }
      } else {
        if (u && u.tokenId) {
          return u.tokenId;
        } else {
          return ""
        }
      }
    }

    // 获取客户号
    function custNo() {
      if (u && u.custNo) {
        return u.custNo;
      } else {
        return ""
      }
    }

    // 获取用户手机号
    function mblNo() {
      if (u && u.mblNo) {
        return u.mblNo;
      } else {
        return ""
      }
    }

    // 获取渠道id
    function clientId(n) {
      if (n) {
        if (_.isObject(u)) {
          u.clientId = n;
          resourceUtil.setLocal('userInfo', u);
        } else {
          u = {clientId: n};
          resourceUtil.setLocal('userInfo', u);
        }
      } else {
        if (u && u.clientId) {
          return u.clientId;
        } else {
          return ""
        }
      }
    }

    // 记录用户支付密码状态
    function pwdStatus(n) {
      if (n) {
        if (_.isObject(u)) {
          u.pwdStatus = n;
          resourceUtil.setLocal('userInfo', u);
        } else {
          u = {pwdStatus: n};
          resourceUtil.setLocal('userInfo', u);
        }
      } else {
        if (u && u.pwdStatus) {
          return u.pwdStatus;
        } else {
          return ""
        }
      }
    }

    // 获取用户银行卡号
    function cardNo(n) {
      if (n) {
        if (_.isObject(u)) {
          u.cardNo = n;
          resourceUtil.setLocal('userInfo', u);
        } else {
          u = {cardNo: n};
          resourceUtil.setLocal('userInfo', u);
        }
      } else {
        if (u && u.cardNo) {
          return u.cardNo;
        } else {
          return ""
        }
      }
    }

    // 清空用户信息对象
    function clearUserInfo() {
      resourceUtil.removeLocal('userInfo');
    }

    return {
      tokenId: tokenId,
      mblNo: mblNo,
      custNo: custNo,
      clientId: clientId,
      pwdStatus: pwdStatus,
      cardNo: cardNo,
      clearUserInfo: clearUserInfo
    }
  },


  // 存储本地用户数据
  userLogined (data) {
    resourceUtil.setLocal("userInfo", data);
  },
  // 清除本地用户数据
  userLogout () {
    resourceUtil.setLocal('userInfo', '');
  },
  // 判断是否登录并跳转登录页面
  isLogin () {
    if (!SYS_CONFIG.DEBUGLOGIN) {
      let tokenId = resourceUtil.getLocal('userInfo') ? JSON.parse(resourceUtil.getLocal('userInfo')).tokenId : '';
      console.log("tokenId : "+tokenId);
      if (!tokenId) {
        return false
      } else {
        return true
      }
    } else {
      return true
    }
  },
  // 0:未登录 1:已登录 2:登录未绑卡
  getLoginState () {
    console.log(resourceUtil.getLocal('userToken', ''));
    if (resourceUtil.getLocal('userToken', '')) {
      if (resourceUtil.getLocal('userFlag', '') === '0') {
        return '2'
      } else {
        return '1'
      }
    } else {
      return '0'
    }
  },

  /**
   * zuohx 2017年04月10日15:19:27.
   * 以下方法处理缓存信息
   * 操作的缓存对象 [localStorage]
   * 方法 get、set、remove、clean
   */
  setLocal (key, value) {
    return resourceUtil.setLocal(key, value);
  },
  getLocal (key) {
    return resourceUtil.getLocal(key);
  },
  removeLocal (key) {
    return resourceUtil.removeLocal(key);
  },
  clearLocal () {
    return resourceUtil.clearLocal();
  },

  /**
   * zuohx 2017年04月10日15:19:38.
   * 以下方法处理缓存信息
   * 操作的缓存对象 [sessionStorage]
   * 方法 get、set、remove、clean
   */
  setSession (key, value) {
    return resourceUtil.setSession(key, value);
  },
  getSession (key) {
    return resourceUtil.getSession(key);
  },
  removeSession (key) {
    return resourceUtil.removeSession(key);
  },
  clearSession () {
    return resourceUtil.clearSession();
  },

  /**
   * zuohx 2017年04月18日16:21:40.
   * 类型检查，返回初始值
   * @param item
   */
  // typeCache (item) {
  //   if (_.isString(item)) {
  //     return '';
  //   }
  //   if (_.isNumber(item)) {
  //     return 0;
  //   }
  //   if (_.isBoolean(item)) {
  //     return '';
  //   }
  //   if (_.isArray(item)) {
  //     return [];
  //   }
  //   if (_.isObject()) {
  //     return {};
  //   }
  //   if (_.isFunction(item)) {
  //     return function () {};
  //   }
  //   if (_.isUndefined(item)) {
  //     return '';
  //   }
  // },


  /**
   *
   * 处理银行卡 4位 空格
   * zuohx  2017年07月04日14:35:01.
   * 接受一个字符串  返回分割后的字符串
   */
  bankCardDivision (value){
    // var value = value;
    value = value.replace(/\s*/g, "");
    var result = [];
    for (var i = 0; i < value.length; i++) {
      if (i % 4 == 0 && i != 0) {
        result.push(" " + value.charAt(i));
      }
      else {
        result.push(value.charAt(i));
      }
    }
    return result.join("");
  },
};

export default toolUtil

// 注册window对象
if (window) {
  window.TU = toolUtil;
}
