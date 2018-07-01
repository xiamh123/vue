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
      users : [{'custName':'xiamh','phone':'17608455522'}],total : 1
    }
})

Mock.mock('http://localhost:9998/fxdz/H10002', (req, res) => {
    return {
        menus:[{
            path: '/',
            component: require('../components/Page.Home.vue'),
            meta: {
              requiresAuth: true
            },
            name: '动态菜单',
            iconCls: 'el-icon-message', //图标样式class
            children: [
              { path: '/test', component: require('../components/Page.Test.vue'), name: '学习' }
            ]
          }]
    }
})





