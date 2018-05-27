//引入mockjs
const Mock = require('mockjs')
//使用mockjs模拟数据
Mock.mock('http://localhost:9998/fxdz/H10001', (req, res) => {
    return {
        'tokenId':'22222'
    }
})

Mock.mock('http://localhost:9998/fxdz/H90001', (req, res) => {
    return {
      users : [{'custName':'xiamh','phone':'17608455522'},{}],total : 2
    }
})