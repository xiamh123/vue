<template>
  <el-row class="container">

    <!-- 头部 -->
    <layout-header 
      v-bind:collapsed="collapsed"
      v-bind:sysName="sysName"
      @changeCollapse='changeCollapse'></layout-header>

    <!-- 主区域 -->
    <el-col :span="24" class="main">

      <!-- 左侧菜单 -->
      <layout-left 
        v-bind:collapsed="collapsed"></layout-left>

      <!-- 主显示区 -->
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">{{$route.name}}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">

              <!-- <layout-tab 
                v-bind:collapsed="collapsed"></layout-tab> -->

              <!-- 跳转页面显示 -->
              <router-view></router-view>
              
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>

  import LayoutHeader from './Components.Header.vue';
  import LayoutLeft from './Components.Left.vue';
  import LayoutTab from './Components.Tab.vue';

  export default {
    data() {
      return {
        collapsed: false,
        sysName : '管理系统',
        sysUserName: 'xiamh',
        sysUserAvatar: '222'
        }
    },
    components: {
      LayoutHeader, LayoutLeft,LayoutTab
    },
    methods: {
      //退出登录
      logout: function () {
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('user');
          _this.$router.push('/login');
        }).catch(() => {

        });
      },

      changeCollapse : function(){
        
        this.collapsed = !this.collapsed;
        console.log("变更collapsed：" + this.collapsed);

      }

    }
  }

</script>

<style scoped lang="scss">
  /*@import '~scss_vars';*/

  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }

  .main {
    display: flex;
    background: #324057;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
  }

  .content-container {
    background: #f1f2f7;
    flex: 1;
    overflow-y: scroll;
    padding: 20px;
  }

  .breadcrumb-container {
    margin-bottom: 15px;
  }

  .title {
    width: 200px;
    float: left;
    color: #475669;
  }

  .breadcrumb-inner {
    float: right;
  }

  .content-wrapper {
    background-color: #fff;
    box-sizing: border-box;
  }

</style>
