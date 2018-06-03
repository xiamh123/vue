/*
*管理系统导航菜单
*/
<template>
  <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
    <!--导航菜单-->
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" 
            @open="handleopen" 
            @close="handleclose"
            @select="handleselect"
            collapse-transition="false"
            unique-opened router :collapse="collapsed">
      <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
        <el-submenu :index="index+''" v-if="!item.leaf">
          <template slot="title">
            <i :class="item.iconCls"></i>
            <span slot="title">{{item.name}}</span>
          </template>
          <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">
            {{child.name}}
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i
          :class="item.iconCls"></i>{{item.children[0].name}}
        </el-menu-item>
      </template>
    </el-menu>
    
  </aside>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['collapsed'],
    data () {
      return {
        sysUserName: '',
        sysUserAvatar: '',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    computed: {},
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleopen() {
        console.log('handleopen');
      },
      handleclose() {
        console.log('handleclose');
      },
      handleselect: function (a, b) {
      }

    },
    mounted() {
      var user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        this.sysUserName = user.name || '';
        this.sysUserAvatar = user.avatar || '';
      }

    }
  }
</script>


<style scoped lang="scss">
  /*@import '~scss_vars';*/

  aside {
    flex: 0 0 230px;
    width: 230px;
  /*position: absolute;*/
  /*top: 0 px;*/
  /*bottom: 0 px;*/
  }

 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 230px;
    min-height: 400px;
  }

  .el-menu{
    height: 100%;
  }
  .collapsed {
    width: 6px;
  }
  .item{
    position: relative;
  }
  .submenu{
    position:absolute;
    top:0px;
    left:60px;
    z-index:99999;
    height:auto;
    display:none;
  }

  .menu-collapsed{
    flex:0 0 60px;
    width: 60px;
  }
  .menu-expanded{
    flex:0 0 230px;
    width: 230px;
  }
  .content-container {
  /*background: #f1f2f7;*/
    flex: 1;
  /*position: absolute;*/
  /*right: 0 px;*/
  /*top: 0 px;*/
  /*bottom: 0 px;*/
  /*left: 230 px;*/
    overflow-y: scroll;
    padding: 20px;
  }
  .breadcrumb-container {
  /*margin-bottom: 15 px;*/
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

