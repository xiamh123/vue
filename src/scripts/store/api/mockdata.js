import Mock from 'mock';

// const Random = Mock.Random;

const baseUrl = 'http://localhost:9998/fxdz';


/**
 * 2.1.登录/注册
 * entrance/login/H10001.action
 */
Mock.mock(
  baseUrl + '/H10001.action',
  'post', {
    'rspCd': '0000',
    'rspInf': '响应信息',
    'responseTm':'响应时间',
    'tokenId' : '@id()', //  令牌ID
    'custNo'  : '@id()', //  和聚宝客户号
    'custName': '@cword("零一二三四五六七八九十", 3, 5)', //  用户姓名
    'idNo'    : '@string("number", 18)', //  身份证号
    'mblNo'   : '@string("number", 11)', //  手机号
    'cardNo'  : '@string("number", 32)' //  卡号
  }
);

