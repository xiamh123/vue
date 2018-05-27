/*
*管理系统导航菜单
*/
<template>
  <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
    <!--导航菜单-->
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose"
             @select="handleselect"
             unique-opened router v-show="!collapsed">
      <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
        <el-submenu :index="index+''" v-if="!item.leaf">
          <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
          <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">
            {{child.name}}
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i
          :class="item.iconCls"></i>{{item.children[0].name}}
        </el-menu-item>
      </template>
    </el-menu>
    <!--导航菜单-折叠后-->
    <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
      <li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
        <template v-if="!item.leaf">
          <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)"
               @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
          <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)"
              @mouseout="showMenu(index,false)">
            <li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item"
                style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''"
                @click="$router.push(child.path)">{{child.name}}
            </li>
          </ul>
        </template>
        <template v-else>
          <li class="el-submenu">
            <div class="el-submenu__title el-menu-item"
                 style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;"
                 :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)">
              <i :class="item.iconCls"></i></div>
          </li>
        </template>
      </li>
    </ul>
  </aside>
</template>

<script type="text/ecmascript-6">

  export default {
    props: {},
    data () {
      return {
        sysName:'',
        collapsed:false,
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
        //console.log('handleopen');
      },
      handleclose() {
        //console.log('handleclose');
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
  .el-menu{
    height: 100%;
  }
  .collapsed {
    width: 60px;
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

