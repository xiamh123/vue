/**
 * Created by zuohx on 2017年03月01日11:51:48.
 * 过滤器类
 */
import _ from 'lodash'
import SYS_DIC from './dictionary.js'
/**
 * 时间格式化
 */
export const dateFilter = (timeStr, format) => {
  // console.log(timeStr)
  let time = {};
  if (_.isString(timeStr)) {
    time.year = timeStr.substr(0, 4);
    time.month = timeStr.substr(4, 2);
    time.day = timeStr.substr(6, 2);
    if (timeStr.length <= 8) {
      time.hour = '00';
      time.minute = '00';
      time.second = '00';
    } else {
      time.hour = timeStr.substr(8, 2) || '00';
      time.minute = timeStr.substr(10, 2) || '00';
      time.second = timeStr.substr(12, 2) || '00';
    }
    return format.replace('Y', time.year)
      .replace('m', time.month)
      .replace('d', time.day)
      .replace('H', time.hour)
      .replace('i', time.minute)
      .replace('s', time.second)
  } else if (_.isDate(timeStr)) {
    time.year = timeStr.getFullYear();
    time.month = timeStr.getMonth() + 1;
    time.day = timeStr.getDate();
    time.hour = timeStr.getHours();
    time.minute = timeStr.getMinutes();
    time.second = timeStr.getSeconds();
    _.forEach(['month', 'day', 'hour', 'minute', 'second'], function (key) {
      if (time[key].toString().length === 1) {
        time[key] = '0' + time[key]
      }
    });
    return format.replace('Y', time.year)
      .replace('m', time.month)
      .replace('d', time.day)
      .replace('H', time.hour)
      .replace('i', time.minute)
      .replace('s', time.second)
  } else {
    return timeStr
  }
};

/**
 * 获取星期
 * @param timeStr
 * @returns {*}
 */
export const weekFilter = (timeStr) => {
  let weekArray = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
  return weekArray[new Date(timeStr).getDay()];
};

/** 
 * Credit By zuohx 2015年12月01日22:28:54. 
 * 将 Date 转化为指定格式的String 
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
 * Test: 
 * (Utils.DateFormat(new Date(), "yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
 * (Utils.DateFormat(new Date(), "yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04 
 * (Utils.DateFormat(new Date(), "yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04 
 * (Utils.DateFormat(new Date(), "yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04 
 * (Utils.DateFormat(new Date(), "yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18 
 */
export const DateFormat = (timeStr, fmt) => {
  let date = '';
  if (_.isString(timeStr)) {
    time.year = timeStr.substr(0, 4);
    time.month = timeStr.substr(4, 2);
    time.day = timeStr.substr(6, 2);
    if (timeStr.length <= 8) {
      time.hour = '00';
      time.minute = '00';
      time.second = '00';
    } else {
      time.hour = timeStr.substr(-6, 2);
      time.minute = timeStr.substr(-4, 2);
      time.second = timeStr.substr(-2, 2);
    }
    date = fmt.replace('Y', time.year)
      .replace('m', time.month)
      .replace('d', time.day)
      .replace('H', time.hour)
      .replace('i', time.minute)
      .replace('s', time.second)
  }
  var o = {
    "M+": date.getMonth() + 1, //月份 
    "d+": date.getDate(), //日 
    "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //12小时制 
    "H+": date.getHours(), //24小时制 
    "m+": date.getMinutes(), //分 
    "s+": date.getSeconds(), //秒 
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
    "S": date.getMilliseconds() //毫秒 
  };
  var week = {
    "0": "/u65e5",  //星期日 
    "1": "/u4e00",  //星期一 
    "2": "/u4e8c",  //星期二 
    "3": "/u4e09",  //星期三 
    "4": "/u56db",  //星期四 
    "5": "/u4e94",  //星期五 
    "6": "/u516d"   //星期六 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[date.getDay() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};

/**
 * 姓名隐藏
 * @param name
 * @returns {*|Array}
 */
export const nameFilter = (name) => {
  if (!name) {
    return
  }
  if (!_.isString(name)) {
    console.error("name不是一个字符串");
    return
  }
  return '*' + name.substring(1, name.length)
};

/**
 * 手机号隐藏中间四位
 * @param phone
 * @returns {*|Array}
 */
export const phoneFilter = (phone) => {
  if (!_.isString(phone)) {
    console.warn("[phoneFilter]phone不是字符串");
    return
  }
  return phone.substring(0, 3) + '****' + phone.substring(7, 11)
};

/**
 * 身份证隐藏
 * @param card
 * @returns {*|Array}
 */
export const cardFilter = (card) => {
  if (!_.isString(card)) {
    return false;
  }
  let asterisk = '';
  for (let i = 0; i < card.length - 5; i++) {
    asterisk += '*'
  }
  return card.substring(0, 3) + asterisk + card.substring(card.length - 4, card.length)
};

/**
 * 获取银行卡后四位
 * @param card
 * @returns {*|Array}
 */
export const bankCardFilter = (card) => {
  if (!_.isString(card)) {
    return false;
  }
  return card.substring(card.length - 4, card.length)
};

/**
 * 去除字符串中间的空格
 * @param s
 * @returns {*|String}
 */
export const removeSpaceFilter = (s) => {
  if (!_.isString(s)) {
    console.error("接受参数不为字符串");
    return
  }
  if (!s) {
    console.error("传入字符串不能为空");
    return
  }
  return s.replace(/\s/g, "");
};

/**
 * 金额过滤器   金额超过万元以万为单位展示
 * @param s
 * @returns {*|String}
 * zuohx 2017年6月22日11:53:16   修改过滤器不使用万元
 */
export const amountFilter = (s) => {
  // if (!_.isString(s)) {
  //   console.error("接受参数不为字符串");
  //   return
  // }
  // if (!s) {
  //   console.error("传入字符串不能为空");
  //   return
  // }
  //
  // // 转换字符串为数字
  // s = parseFloat(s, 10).toFixed(2);
  // if (s > 10000) {
  //   return s / 10000 + "万元"
  // }
  return s + "元"
};

/**
 * 字典筛选器
 * @param str
 * @param key
 * @returns {*}
 */
export const dictionaryFilter = (str, key) => {
  let result = SYS_DIC[key][str];
  return result
};

export const $filter = {
  parseTime: function (timeStr, format) {
    let time = {};
    if (_.isString(timeStr) && /^\d{4}$/.test(timeStr)) {
      time.hour = timeStr.substr(0, 2);
      time.minute = timeStr.substr(-2, 2);
      return format.replace('H', time.hour).replace('i', time.minute)
    } else {
      return timeStr
    }
  },
  dataTime: function (timeStr, format) {
    let time = {};
    if (_.isString(timeStr)) {
      time.year = timeStr.substr(0, 4);
      time.month = timeStr.substr(4, 2);
      time.day = timeStr.substr(6, 2);
      if (timeStr.length <= 8) {
        time.hour = '00';
        time.minute = '00';
        time.second = '00';
      } else {
        time.hour = timeStr.substr(-6, 2);
        time.minute = timeStr.substr(-4, 2);
        time.second = timeStr.substr(-2, 2);
      }
      return format.replace('Y', time.year)
        .replace('m', time.month)
        .replace('d', time.day)
        .replace('H', time.hour)
        .replace('i', time.minute)
        .replace('s', time.second)
    } else if (_.isDate(timeStr)) {
      time.year = timeStr.getFullYear();
      time.month = timeStr.getMonth() + 1;
      time.day = timeStr.getDate();
      time.hour = timeStr.getHours();
      time.minute = timeStr.getMinutes();
      time.second = timeStr.getSeconds();

      _.forEach(['month', 'day', 'hour', 'minute', 'second'], function (key) {
        if (time[key].toString().length === 1) {
          time[key] = '0' + time[key]
        }
      });
      return format.replace('Y', time.year)
        .replace('m', time.month)
        .replace('d', time.day)
        .replace('H', time.hour)
        .replace('i', time.minute)
        .replace('s', time.second)
    } else {
      return timeStr
    }
  }
};

