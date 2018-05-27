/**
 * Created by zuohx on 2017年03月01日11:51:48.
 * 字典类(处理枚举值)
 */
const SYS_DIC = {
  /*资金卡种类*/
  capAcctType: {
    "01": "借记卡",
    "02": "信用卡"
  },
  /*交易状态*/
  transStatus: {
    "00": "处理中",    // 已受理
    "01": "成功",     // 交易成功
    "02": "失败"      // 交易失败
  },
  /*交易类型*/
  busiCode: {
    "00": "购买",
    "01": "普通赎回",
    "02": "快速赎回",
    // "03": "基金转换转入",
    // "04": "基金转换转出",
    "05": "活期转定期",
    "07": "兑付购买",
    "08": "人工提现",
    "42": "代发工资",
    "43": "代发工资",
  },
  /*2.5.第三方绑定账户信息查询 0:未绑定 1:已绑定*/
  bindStatus: {
    'Y': '0',
    'N': '1'
  },
  /*2.7.免登渠道信息查询 0不免登 1免登*/
  clientIsLogin: {
    'Y': '1',
    'N': '0'
  },
  /*和包和聚宝免登 01-老客户 02-新客户*/
  newCustIden: {
    'Y': '02',
    'N': '01'
  },
  /* banner图字段，对应后端数据库 */
  banner: {
    '00': '00',   // 闪屏
    '01': '01',   // 首页顶部广告
    '02': '02',   // 发现频道
    '03': '03',   // 理财轮播图
    '04': '04',   // 基金广告
    '05': '05'    // 保险广告
  },
  /* 代发工资参数字典 */
  payrollSubTyp: {
    "01": false,   //代发到银行卡
    "02": true     //代发到银行卡再扣款到和聚宝
  },
  /* 产品销售状态 */
  prodSale: {
    "00": "待售中",
    "01": "认购中",
    "02": "已售完"

  }
};

export default SYS_DIC
