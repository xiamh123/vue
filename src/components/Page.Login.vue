<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.loginName" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.loginPassword" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">{{logining ? '登录中' : '登录'}}</el-button>
      <br>
      <el-button type="info" style="width:100%;" @click.native.prevent="handleReset2" >重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import NProgress from 'nprogress'

  import H10001 from '../scripts/store/api/api.H10001.js'
  import toolUtil from '../utils/toolUtil.js'
  import Util from '../utils/util.js'
  import routes from '../router/routers.js'

  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: 'admin',
          checkPass: '123456'
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            // _this.$router.replace('/');
            this.logining = true;
            // NProgress.start();
            var loginParams = { loginName: this.ruleForm2.loginName, loginPassword: this.ruleForm2.loginPassword };
            console.log("-----------true-----------");

            this.$AxiosAjax({
              url: '/user/H10001',
              params: loginParams
            }).then(res => { // 获取token

                var data = res.data;                    //返回信息

                if(data.code != 'SYS0000'){             //登录失败
                  this.$notify.error({
                    message: '登录失败：' + data.msg
                  });
                  this.logining = false;                //初始化
                  return;
                }else if(data.data.tokenId == null || data.data.tokenId == '' || data.data.tokenId == 'null'){
                  this.$notify.error({
                    message: 'tokenId返回为空'
                  });
                  this.logining = false;                //初始化
                  return;
                }

                toolUtil.userLogined(data.data);            //登录信息保存到本地

                // 登录成功以后获取登录用户拥有的菜单
                this.$AxiosAjax({
                url: '/test/getAllMenus',
                params: loginParams
                }).then(res => { // 获取token
                  console.log("获取菜单成功：");
                  // console.log(res);
                  // Util.userLogined(res.data);

                  // console.log(this.$router.options.routes);
                  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                  console.log(res.data.data);
                  console.log(res.data.data.length);
                  if(res.data.data != undefined && res.data.data.length > 0){
                    var addMenu = [];
                    console.log("*************打印菜单 start");
                    for(var i = 0; i<res.data.data.length; i++){
                      var sysMenu = res.data.data[i];
                      console.log(sysMenu);

                      var menu = new Object();
                      menu.name = sysMenu.menuName;
                      menu.path = sysMenu.path;
                      // menu.hidden = Util.decode(sysMenu.isDisplay,'00',true,false);
                      menu.hidden = false;
                      console.log(sysMenu.component);
                      if(sysMenu.component!='' && sysMenu.component!=null){
                        menu.component = require('../components/' + sysMenu.component);
                      }
                      // menu.requiresAuth = Util.decode(sysMenu.requiresAuth,'00',true,false);
                      menu.requiresAuth = true;
                      menu.children = [];

                      //有子菜单
                      if(sysMenu.childrens != undefined && sysMenu.childrens.length > 0){
                        for(var j=0;j<sysMenu.childrens.length;j++){
                          var sysMenuChild = sysMenu.childrens[j];
                          var menuChild = new Object();
                          menuChild.name = sysMenuChild.menuName;
                          menuChild.path = sysMenuChild.path;
                          // menuChild.hidden = Util.decode(sysMenuChild.isDisplay,'00',true,false);
                          menuChild.hidden = false;
                          menuChild.component = require('../components/' + sysMenuChild.component);
                          // menuChild.requiresAuth = Util.decode(sysMenuChild.requiresAuth,'00',true,false);
                          menuChild.requiresAuth = true;
                          menu.children = menu.children.concat(menuChild);
                        }
                      }
                      addMenu = addMenu.concat(menu);
                    }

                    console.log(" ##### 菜单信息");
                    console.log(addMenu);

                    this.$router.options.routes = this.$router.options.routes.concat(addMenu);
                    console.log("*************打印菜单 end");
                    console.log(this.$router.options.routes);
                  }
                  
                  // this.$router.options.routes = this.$router.options.routes.concat(res.data.menus);

                  // console.log(this.$router.options.routes);

                  console.log("--------------");

                  this.$router.push({ path: '/' });
                  this.logining = false;
                  
                })
            })
          } else {
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
