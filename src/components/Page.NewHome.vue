<template>
  <div class="home" @click="clear">
    <!-- 顶部 logo 登录信息 -->
    <header>
      <a href="javascript:;" class="logo" @click="jumpTo(itemMenuls)">
        <div class="logoIcon"><img src="../assets/img/logo.svg" alt="开科唯识绩效管理平台" title="开科唯识绩效管理平台"></div>
        <transition name="logoBox">
          <div class="logoTitle" v-if="logoShow">
            <div class="titleBox"><p>开科唯识</p><p>绩效管理平台</p></div>
          </div>
        </transition>
      </a>
      <el-radio-group v-model="isCollapse">
        <div class="menubutton left" @click='asidebarToggle'><img src="../assets/img/asidebarShrink.svg" alt="" :title="isCollapse ? '展开菜单' : '收起菜单'"></div>
      </el-radio-group>
      <div class="right">
        <div class="userInfo">
          <!-- <p @click="openDescription" class="name">{{userInfo.roleName}}（{{userInfo.name}}）</p> -->
          <!-- <p class="area">{{userInfo.department}}</p> -->
        </div>
        <!-- 待办任务提醒 -->
        <!-- <taskNotify v-if="taskNotifyShow" @jumpTo="jumpTo"></taskNotify> -->
        <!-- 修改密码 -->
        <!-- <div class="icon changePass" title="修改密码" @click="changePwd"></div> -->
        <!-- <a class="logout" @click="logout" title="退出"><i class="icon shape"></i></a> -->
      </div>
    </header>
    <!--左侧菜单导航-->
    <aside class="t-aside">
      <!-- 2.0 导航 -->
      <el-menu unique-opened class="aside-nav el-menu-vertical-demo" :default-active="activeMenuIndex" :collapse="isCollapse">
        <el-submenu v-for="(group, outerIndex) in $router.options.routes" :index="group.path" :key="group.path" v-if="group.children != undefined">
          <template slot="title">
            <i :class="`navicon navicon${outerIndex+1}`"></i>
            <span slot="title">
              {{group.meta.name}}
            </span>
          </template>
          <el-menu-item v-for="(item, innerIndex) in group.children" :index="item.path" :key="item.path" :route="item" @click="jumpTo(item)">
            {{item.meta.name}}
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :key="outerIndex?outerIndex+'': ''" :index="''+outerIndex?outerIndex+'':''" @click="jumpTo(group)">
          <i :class="`navicon navicon${outerIndex+1}`"></i>
          <span slot="title">
            {{group.meta.name}}
          </span>
        </el-menu-item>
      </el-menu>
      <!-- 1.0 导航 -->
      <!-- <el-menu unique-opened class="aside-nav el-menu-vertical-demo" :default-active="activeMenuIndex" @open="menuOpen" @select="itemSelected"  @close="menuClose" :collapse="isCollapse">
        <el-submenu v-for="(group, outerIndex) in routerMap" :key="outerIndex" v-if="group.children != undefined" :index="''+outerIndex"
          :class="{selected: ''+outerIndex === selectedIndex}">
          <template slot="title">
            <i :class="`navicon navicon${outerIndex+1}`"></i>
            <span slot="title">
              {{group.meta.name}}
            </span>
          </template>
          <el-menu-item v-for="(item, innerIndex) in group.children" :index="''+innerIndex" :key="innerIndex" @click="jumpTo(item)"
          :class="{'selected': outerIndex + '' + innerIndex === selectedIndex}">
            {{item.meta.name}}
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :key="outerIndex?outerIndex+'': ''" :index="''+outerIndex?outerIndex+'':''" @click="jumpTo(group)"
          :class="{selected: '' + outerIndex === selectedIndex}">
          <i :class="`navicon navicon${outerIndex+1}`"></i>
          <span slot="title">
            {{group.meta.name}}
          </span>
        </el-menu-item>
      </el-menu> -->
    </aside>
    <!-- 右侧区域 -->
    <article :class="isActive?'articleClose':'articleOpen'">
      <!-- 标签栏 -->
      <div class="topTabs">
        <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit" @tab-click="tabJumpTo" class="t-tabs">
          <el-tab-pane :key="item.name" v-for="item in editableTabs" :label="item.title" :name="item.name"/>
        </el-tabs>
      </div>
      <!-- 主要内容区 -->
      <keep-alive>
        <router-view class="tab-panel"></router-view>
      </keep-alive>
    </article>
    <div class="more" v-show="tabMenus.length !== 0" @click.stop="closePageShow = true">更多 <span class="total">{{tabMenus.length}}</span></div>
    <div class="closePage" v-show="closePageShow">
      <ul>
        <li @click.stop="tabMenus = []">关闭全部</li>
        <li v-for="(item, index) in tabMenus" :key="index">{{item.title}} <span @click.stop="removeTab(item.name)">x</span></li>
      </ul>
    </div>
    <!-- <div class="closeOthers" @click="closeOthers">关闭其他</div> -->
    <el-button :style="contextStyle" class="contextMenuButton" @click.stop="closeOtherTabs">关闭其他</el-button>
    <!-- <description
      v-if="showDescription"
      @closeDialog="closeDescription">
    </description> -->
    <!-- <changePwdDialog v-if="changePwdShow" @cancel="changePwdCancel"></changePwdDialog> -->
  </div>
</template>

<script>
// import changePwdDialog from '@/components/page_dashboard/comp_dashboard/comp.changePwdDialog.vue'
// import description from '@/components/page_dashboard/comp_dashboard/comp.description.vue'
// import taskNotify from '@/components/page_dashboard/comp_dashboard/comp.taskNotify.vue'
export default {
  name: 'app',
  data () {
    return {
      showDescription: false,
      taskNotifyShow: true,
      userInfo: {},
      selectedIndex: '0',
      routerMap: [],
      editableTabsValue: '',
      currentTabName: '',
      currentTabParentName: '',
      currentTabShowName: '',
      editableTabs: [],
      // tabIndex: 0,
      currentTab: '1',
      isConcatShow: true,
      isCollapse: false,
      logoShow: true,
      isActive: true,
      tabMenus: [],
      // menus: menus,
      currentText: '',
      changePwdShow: false,
      closePageShow: false,
      contextStyle: {
        position: 'absolute',
        left: 0,
        top: 0,
        display: 'none',
        zIndex: 61,
        padding: '10px',
        color: '#232323 !important'
      },
      itemMenuls: {
        name: 'home',
        path: '/home',
        meta: {
          name: '首页'
        }
      },
      item: {
        name: 'todoTask',
        path: '/taskDivision/todoTask',
        meta: {
          name: '待办任务'
        }
      },
      contextTarget: ''
    }
  },
  components: {
    // description, changePwdDialog, taskNotify
  },
  methods: {
    changePwd () {
      this.changePwdShow = true
    },
    // 关闭岗位职责
    closeDescription () {
      this.showDescription = false
    },
    // 展示岗位职责
    openDescription () {
      this.showDescription = true
    },
    // 关闭其他标签
    closeOtherTabs () {
      this.editableTabsValue = this.contextTarget
      let tabs = this.editableTabs.filter((item) => {
        if (item.name === this.editableTabsValue || item.name === 'home') {
          return item
        }
      })
      this.$router.push({
        name: this.editableTabsValue
      })
      this.editableTabs = tabs
      this.contextStyle.display = 'none'
      // 将当前标签页信息保存到localStorage
      var obj = {}
      obj.editableTabs = this.editableTabs
      obj.editableTabsValue = this.editableTabsValue
      this.setStorage(obj)
    },
    tabJumpTo (tab, event) {
      this.$router.push({
        name: tab.name
      })
      var obj = {}
      obj.editableTabs = this.editableTabs
      obj.editableTabsValue = this.editableTabsValue
      this.setStorage(obj)
    },
    // 标签跳转
    jumpTo (itemMenuls) {
      var obj = {}
      let isInTabs = false
      // 标签栏去重
      this.editableTabs.forEach((item) => {
        if (item.name === itemMenuls.name) {
          this.editableTabsValue = itemMenuls.name
          isInTabs = true
        }
      })
      if (isInTabs) {
        // alert('已经打开')
        this.$router.push({
          name: this.editableTabsValue
        })
        // 标签页存入localStorage
        obj.editableTabs = this.editableTabs
        obj.editableTabsValue = this.editableTabsValue
        this.setStorage(obj)
        return
      }
      // this.tabIndex ++
      this.editableTabs.push({
        name: itemMenuls.name,
        title: itemMenuls.meta.name,
        content: ''
      })
      this.editableTabsValue = itemMenuls.name
      this.$router.push({
        name: itemMenuls.name
      })
      // 标签页存入localStorage
      obj.editableTabs = this.editableTabs
      obj.editableTabsValue = this.editableTabsValue
      // console.log(obj.editableTabsValue)
      this.setStorage(obj)
    },
    handleTabsEdit (tabname, action) {
      // console.log(tabname, action)
      let targetName = tabname
      let activeName = this.editableTabsValue
      let tabs = this.editableTabs
      // console.log(targetName, activeName)
      // console.log(targetName === activeName)
      if (targetName === activeName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
              this.$router.push({
                name: activeName
              })
              this.editableTabs = tabs.filter(tab => tab.name !== targetName)
              this.editableTabsValue = activeName
            } else {
              this.$router.push({
                name: 'dashboard'
              })
              this.editableTabs = []
              // console.log('没有tab页了')
            }
          }
        })
      } else {
        this.editableTabs = tabs.filter(tab => tab.name !== targetName)
      }
      // 将当前标签页信息保存到localStorage
      var obj = {}
      obj.editableTabs = this.editableTabs
      obj.editableTabsValue = this.editableTabsValue
      this.setStorage(obj)
    },
    menuClose (index, path) {
      // console.log('menuClose', index, path)
      this.selectedIndex = ''
    },
    menuOpen (index, path) {
      // console.log('menuOpen', index, path.join(''))
      this.selectedIndex = path.join('')
    },
    itemSelected (index, path) {
      // console.log('itemSelected', index, path.join())
      this.selectedIndex = path.join('')
    },
    routeLink (item) {
      let newTab = {
        title: item.name,
        name: this.tabMenus.length + 1 + '',
        path: item.path
      }
      let isTab = this.tabMenus.filter(el => {
        return el.path === newTab.path
      })
      if (isTab.length === 0) {
        this.tabMenus.push(newTab)
        this.$router.push(item.path)
        this.currentTab = this.tabMenus.length + ''
      } else {
        this.currentTab = isTab[0].name
        this.$router.push(isTab[0].path)
      }
    },
    tabClick (item) {
      this.$router.push(this.tabMenus[item.index].path)
    },
    headerClick () {
      this.isConcatShow = true
    },
    clear () {
      this.$store.state.rowfuncShow = ''
      this.$store.state.isShowDimensionality = false
      this.$store.state.colSelectorShow = false
      this.$store.state.pageSizeShow = false
      this.closePageShow = false
      // let obj = this.$el.querySelector('.closeOthers')
      // console.log(typeof obj.style)
      // if (obj.style) {
      //   obj.style.visibility = 'hidden'
      // }
    },
    changePwdCancel () {
      this.changePwdShow = false
    },
    asidebarToggle () {
      this.isCollapse = !this.isCollapse
      this.logoShow = !this.logoShow
      this.isActive = !this.isActive
      let more = this.$el.querySelector('.more')
      let target
      // aside导航菜单的样式设定，缩回让aside屏蔽滚动条，展开让aside垂直滚动条为auto
      this.$nextTick(function () {
        let aside = this.$el.querySelector('aside')
        let isClass = aside.children[0].classList.contains('el-menu--collapse')
        if (!isClass) {
          aside.style.overflow = 'visible'
          target = this.getAbsPosition(more).x - 176
          this.running(more, target)
        } else {
          aside.style.overflowY = 'auto'
          target = this.getAbsPosition(more).x + 176
          this.running(more, target)
        }
      })
    },
    collect (e) {
      let target = e.target
      if (target.classList.contains('current')) {
        target.classList.remove('current')
      } else {
        target.classList.add('current')
      }
      // console.log(target)
    },
    removeTab (targetName) {
      this.tabMenus = this.tabMenus.filter(el => {
        return el.name !== targetName
      })
      if (this.tabMenus.length === 0) {
        this.closePageShow = false
      } else {
        for (let i = 0; i < this.tabMenus.length; i++) {
          this.tabMenus[i].name = i + 1 + ''
        }
        this.currentTab = '1'
        this.$router.push(this.tabMenus[0].path)
      }
    },
    closeOthers (e) {
      // console.log('closeOthers', e)
      // let btn = this.$el.querySelector('.closeOthers')
      // btn.style.visibility = 'hidden'
      // this.tabMenus = this.tabMenus.filter(el => {
      //   return el.title === this.currentText
      // })
      // this.tabMenus[0].name = '1'
      // this.currentTab = '1'
      // this.$router.push(this.tabMenus[0].path)
    },
    getAbsPosition (element) {
      let abs = {x: 0, y: 0}
      while (element && element !== document.body) {
        abs.x += element.offsetLeft
        abs.y += element.offsetTop
        element = element.offsetParent
      }
      //  计算相对位置
      abs.x += window.screenLeft + document.body.clientLeft - document.body.scrollLeft
      abs.y += window.screenTop + document.body.clientTop - document.body.scrollTop
      return abs
    },
    morePosition () {
      let tabs = this.$el.querySelectorAll('.el-tabs__item')
      let more = this.$el.querySelector('.more')
      let closePage = this.$el.querySelector('.closePage')
      if (tabs.length !== 0) {
        let lastTab = tabs[tabs.length - 1]
        // console.log(this.getAbsPosition(lastTab))
        if (this.ie || this.safari) more.style.top = '61px'
        else more.style.top = this.getAbsPosition(lastTab).y + 'px'
        more.style.left = this.getAbsPosition(lastTab).x + lastTab.offsetWidth - 10 + 'px'
        // lastTab.offsetWidth - 10 +
        if (this.safari) closePage.style.top = '96px'
        else closePage.style.top = this.getAbsPosition(lastTab).y + 35 + 'px'
        closePage.style.left = this.getAbsPosition(lastTab).x + lastTab.offsetWidth - 20 + 'px'
      }
    },
    // 动画效果函数
    running (ele, target) {
      clearInterval(ele.timer)
      let that = this
      ele.timer = setInterval(function () {
        let leader = that.getAbsPosition(ele).x
        let step = 10.8
        step = leader < target ? step : -step
        if (Math.abs(leader - target) > Math.abs(step)) {
          leader = leader + step
          ele.style.left = leader + 'px'
        } else {
          ele.style.left = target + 'px'
          clearInterval(ele.timer)
        }
      }, 15)
    },
    logout: function () {
      this.$confirm('确定退出系统?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        // 清除路由权限控制
        this.$emit('logout')
      }).catch(() => {})
    },
    redierectLogin () {
      this.$router.push({
        name: 'home'
      })
    },
    setStorage (data) {
      data = JSON.stringify(data)
      localStorage.setItem('jixiao_menu', data)
    },
    getStorage () {
      var menu = localStorage.getItem('jixiao_menu')
      if (menu) {
        menu = JSON.parse(menu)
        // console.log(menu)
        this.editableTabs = menu.editableTabs
        this.editableTabsValue = menu.editableTabsValue
        this.$router.push({
          name: menu.editableTabsValue
        })
      }
    }
  },
  mounted: function () {
    // console.log('this.$parent.menuData---', this.$parent.menuData)
    // console.log('this.$parent.userData.userInfo---', this.$parent.userData.userInfo)
    // let user = this.$parent.userData.userInfo
    if (this.user) {
      // user 是vuex 全局 共享数据
      this.userInfo = this.user.userInfo
      this.routerMap = this.$parent.menuData
    } else {
      this.$router.push({ path: '/login' })
      return
    }
    let domTabWrapper = document.querySelector('.el-tabs__nav')
    // 右键菜单重写
    domTabWrapper.oncontextmenu = (e) => {
      var reg = /el-tabs__item/ // 标签页验证
      var reg2 = /el-icon-close/ // 关闭按钮验证
      var target
      if (reg.test(e.target.classList.value)) {
        target = e.target
        this.contextStyle.display = 'block'
        this.contextStyle.top = e.pageY + 'px'
        this.contextStyle.left = e.pageX + 'px'
        let tabName = target.innerText
        this.editableTabs.forEach((item) => {
          if (item.title === tabName) {
            this.contextTarget = item.name
          }
        })
        return false
      } else if (reg2.test(e.target.classList.value)) {
        target = e.target.parentNode
        this.contextStyle.display = 'block'
        this.contextStyle.top = e.pageY + 'px'
        this.contextStyle.left = e.pageX + 'px'
        let tabName = target.innerText
        this.editableTabs.forEach((item) => {
          if (item.title === tabName) {
            this.contextTarget = item.name
          }
        })
        return false
      } else {
        console.log('点击了.el-tabs__nav,未点击到标签页')
      }
    }
    // 鼠标中键关闭标签
    domTabWrapper.onmousedown = (e) => {
      if (e.button === 1) {
        var reg = /el-tabs__item/ // 标签页验证
        var reg2 = /el-icon-close/ // 关闭按钮验证
        var target
        if (reg.test(e.target.classList.value)) {
          target = e.target
          let tabName = target.innerText
          this.editableTabs.forEach((item) => {
            if (item.title === tabName) {
              this.contextTarget = item.name
              this.handleTabsEdit(item.name)
            }
          })
          return false
        } else if (reg2.test(e.target.classList.value)) {
          target = e.target.parentNode
          let tabName = target.innerText
          this.editableTabs.forEach((item) => {
            if (item.title === tabName) {
              this.contextTarget = item.name
              this.handleTabsEdit(item.name)
            }
          })
          return false
        } else {
          console.log('点击了.el-tabs__nav,未点击到标签页')
        }
      }
    }
    // 点击其他位置的时候隐藏'关闭其他'
    document.onclick = function () {
      this.contextStyle.display = 'none'
    }.bind(this)
    // 页面刷新时从localStorage获取数据
    if (!localStorage.getItem('jixiao_menu')) {
      this.setStorage()
    } else {
      this.getStorage()
    }
    // 是否显示任务代办提示
    this.$parent.menuData.forEach(element => {
      if (element.name === 'taskDivision') {
        this.taskNotifyShow = true
        return
      }
      this.taskNotifyShow = false
    })
  },
  updated: function () {
    // let tabs = this.$el.querySelectorAll('.el-tabs__item')
    // let btn = this.$el.querySelector('.closeOthers')
    // let _this = this
    // for (let i = 0; i < tabs.length; i++) {
    //   tabs[i].oncontextmenu = function (e) {
    //     _this.currentText = e.target.innerText
    //     btn.style.visibility = 'visible'
    //     btn.style.top = '95px'
    //     btn.style.left = e.clientX + 'px'
    //     return false
    //   }
    // }
    // this.morePosition()
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      // 如果是退出后再登录,则展示首页
      if (vm.editableTabs.length === 0) {
        vm.editableTabs.push({
          name: vm.itemMenuls.name,
          title: vm.itemMenuls.meta.name,
          content: ''
        })
      }
      // let title = ''
      // for (let i = 0; i < vm.routerMap.length; i++) {
      //   // console.log('to---', to)
      //   // console.log('vm.routerMap[i].name === to.name---', vm.routerMap[i].name === to.name)
      //   if (vm.routerMap[i].name === to.name) {
      //     title = vm.routerMap[i].meta.name
      //     break
      //   } else {
      //     if (vm.routerMap[i].children && vm.routerMap[i].children.length > 0) {
      //       for (let j = 0; j < vm.routerMap[i].children.length; j++) {
      //         if (vm.routerMap[i].children[j].name === to.name) {
      //           title = vm.routerMap[i].children[j].meta.name
      //           break
      //         }
      //       }
      //     }
      //   }
      // }
      vm.editableTabsValue = to.name
      // 将当前标签页信息保存到localStorage
      var obj = {}
      obj.editableTabs = vm.editableTabs
      obj.editableTabsValue = vm.editableTabsValue
      vm.setStorage(obj)
      // if (to.name !== 'dashboard') {
      //   vm.editableTabs.push({
      //     name: to.name,
      //     title: title,
      //     content: ''
      //   })
      // }
    })
  },
  computed: {
    user () {
      return this.$store.state.userInfo
    },
    activeMenuIndex () {
      return this.$route.path.split('/')[2]
    }
  },
  beforeDestroy () {
    let domTabWrapper = document.querySelector('.el-tabs__nav')
    if (domTabWrapper) {
      domTabWrapper.oncontextmenu = null
      domTabWrapper.onmousedown = null
    }
    document.onclick = null
  }
}
</script>

<style lang="scss">
// @import '../assets/css/common.css';
.home {
  font-family: Lucida Grande,Lucida Sans Unicode,Helvetica Neue,Hiragino Sans GB,Microsoft Yahei,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*height: calc(100vh - 91px);*/
  text-align: center;
  color: #2c3e50;
  background: #30373f;
  .topTabs {
    position: relative;
    // tabs 公共样式
    .el-tabs__header {
      border-bottom: none;
      background-color: #30373f;
      height: 30px;
      margin: 0;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item {
      transition: none;
      border-top: 0;
      border-bottom: 0;
    }
    .el-tabs__nav {
      padding-left: 17px;
    }
    .el-tabs__nav-prev, .el-tabs__nav-next {
      font-size: 14px;
      top: -6px;
    }
    .el-tabs__new-tab {
      display: none;
    }
    .el-tabs__content {
      position: static;
    }
    .el-tabs__nav .el-tabs__item {
      position: relative;
      display: inline-block;
      font-family: PingFang-SC;
      font-size: 12px;
      letter-spacing: 0.1px;
      padding-left: 16px;
      padding-right: 20px;
      // color: #404e68;
      color: #abb4bd;
      height: 30px;
      line-height: 30px;
      background-color: transparent;
      // border: solid 1px #eeeeee;
      margin-left: -18px;
      z-index: 2;
    }
    .el-tabs__nav .el-tabs__item:focus {
      border: none;
    }
    // 首页不可关闭
    .el-tabs__nav .el-tabs__item:nth-child(1) span{
      display: none;
    }
    .el-tabs__nav .el-tabs__item::before {
      content: ' ';
      position: absolute;
      padding-left: 16px;
      padding-right: 20px;
      /*top: -13px;*/
      top: -12px;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      background: #454c55;
      border-right: 1px solid #30373f;
      border-left: 1px solid #30373f;
      border-bottom: none;
      border-radius: .3em .3em 0 0;
      transform: perspective(.5em) rotateX(3.5deg);
      transform-origin: bottom;
      height: 42px;
      line-height: 42px;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
      border: none;
    }
    .el-tabs__item.is-active::before {
      z-index: -1;
      background-color: #e5e9f2;
    }
    .el-tabs__new-tab {
      margin: 5px 0 9px 10px;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active.is-closable {
      color: #2196f3;
      padding-left: 16px;
      padding-right: 20px;
      z-index: 3;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item .el-icon-close {
      width: 14px;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-closable:hover {
      padding-left: 16px;
      padding-right: 20px;
    }
    .el-tabs__new-tab {
      visibility: hidden;
    }
    .el-message__group p {
      color: #2196f3;
    }
  }
}
// 滑动样式
.logoTitle {
  display: inline-block;
  width: 176px;
  height: 56px;
}
.logoBox-enter-active, .logoBox-leave-active {
  transition: width .3s;
}
.logoBox-enter, .logoBox-leave-to {
  width: 0px;
}
// 公共样式
header {
  width: 100%;
  height: 56px;
  font-family: 'PingFangSC';
  text-align: left;
  overflow: hidden;
  background: -moz-linear-gradient(left, #1976d1 0%, #60adeb 100%);
  background: -webkit-linear-gradient(left, #1976d1 0%,#60adeb 100%);
  background: -o-linear-gradient(left, #1976d1 0%,#60adeb 100%);
  background: -ms-linear-gradient(left, #1976d1 0%,#60adeb 100%);
  background: linear-gradient(to right, #1976d1 0%,#60adeb 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1976d1', endColorstr='#60adeb',GradientType=1 );
  background-image: linear-gradient(to right, #1976d1, #60adeb);
  .logo {
    height: 56px;
    float: left;
    .logoIcon {
      width: 64px;
      float: left;
      text-align: center;
      img {
        width: 45px;
        height: 45px;
        margin-top: 6px;
      }
    }
    .logoTitle {
      display: inline-block;
      height: 56px;
      color: #fff;
      // padding: 7px 0 0 11px;
      box-sizing: border-box;
      overflow: hidden;
      .titleBox {
        margin-left: 11px;
        margin-top: 7px;
        width: 150px;
        p {
          line-height: 23px;
        }
        p:nth-child(1) {
          font-size: 20px;
          font-weight: 600;
          letter-spacing: 2.8px;
        }
      }
    }
  }
  .menubutton{
    margin: 15px 0 0 0;
    width: 24px;
    height: 24px;
    cursor: pointer;
    opacity: .85;
    transition: all .6s;
    &:hover{
      opacity: 1
    }
  }
  .right {
    // width: calc(100vw - 296px);
    // background: -moz-linear-gradient(left, #1976d1 0%, #60adeb 100%);
    // // background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#000000), color-stop(100%,#ffffff));
    // background: -webkit-linear-gradient(left, #1976d1 0%,#60adeb 100%);
    // background: -o-linear-gradient(left, #1976d1 0%,#60adeb 100%);
    // background: -ms-linear-gradient(left, #1976d1 0%,#60adeb 100%);
    // background: linear-gradient(to right, #1976d1 0%,#60adeb 100%);
    // filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1976d1', endColorstr='#60adeb',GradientType=1 );
    float: right;
    :root .gradient{filter:none;}
    .userInfo {
      // width: 195px;
      height: 56px;
      float: right;
      float: left;
      color: #fff;
      .name {
        // width: 185px;
        height: 20px;
        margin-top: 10px;
        font-size: 14px;
        line-height: 20px;
        &:hover {
          cursor: pointer;
        }
      }
      .area {
        width: 100%;
        height: 17px;
        font-size: 12px;
        line-height: 17px;
      }
    }
  }
  .taskInfo {
    float: left;
    height: 56px;
    line-height: 56px;
    margin: 3px 15px;
    .el-badge__content.is-fixed {
      top: 7px;
      right: 14px;
    }
    .el-icon-message {
      font-size: 20px;
      color: #fff;
      cursor: pointer;
    }
  }
  .changePass {
    width: 28px;
    height: 28px;
    float: left;
    display: block;
    margin: 14px 15px 0 0;
    cursor: pointer;
  }
  .logout {
    width: 56px;
    height: 56px;
    float: left;
    font-size: 18px;
    text-align: center;
    line-height: 56px;
    color: #fff;
    cursor: pointer;
    background-color: #1976d1;
    i {
      width: 28px;
      height: 28px;
      display: block;
      margin: 15px;
    }
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
    // width: 250px;
    min-height: 400px;
    border-top: 4px solid #30373f;
    border-left: 4px solid #30373f;
    border-right: 4px solid #30373f;
    border-radius: 0;
    box-sizing: border-box;
    background: #30373f;
}
.t-aside::-webkit-scrollbar{width:9px;}
.t-aside::-webkit-scrollbar-track{background-color:#30373f;width:0px;}
.t-aside::-webkit-scrollbar-track-piece{background-color:#30373f;width:0px;}
.t-aside::-webkit-scrollbar-thumb{background-color:#3f4851;border-radius: 20px;border:0px solid #3f4851;width:0px;}
.t-aside::-webkit-scrollbar-thumb:hover {background-color: #3f4851}
.t-aside::-webkit-scrollbar-thumb:active {background-color:#3f4851}
.t-aside {
  overflow-y: auto;
  // width: 240px;
  position: absolute;
  top: 56px;
  left: 0;
  height: calc(100vh - 56px);
  background-color: #30373f;
  // box-shadow: 4px 0 8px 0 rgba(0, 0, 0, 0.15);
  .aside-nav {
    // background-color: rgba(255, 255, 255, .4);
    .navicon{
      margin-right: 15px;
      width: 20px;
      display: inline-block;
      height: 20px;
      vertical-align: middle;
      top: 0;
    }
    .navicon1{
      background: url(../assets/img/asidebar1.svg) no-repeat;
    }
    .navicon2{
      background: url(../assets/img/asidebar2.svg) no-repeat;
    }
    .navicon3{
      background: url(../assets/img/asidebar3.svg) no-repeat;
    }
    .navicon4{
      background: url(../assets/img/asidebar4.svg) no-repeat;
    }
    .navicon5{
      background: url(../assets/img/asidebar5.svg) no-repeat;
    }
    .navicon6{
      background: url(../assets/img/asidebar6.svg) no-repeat;
    }
    .navicon7{
      background: url(../assets/img/asidebar7.svg) no-repeat;
    }
    .navicon8{
      background: url(../assets/img/asidebar8.svg) no-repeat;
    }
    .navicon9{
      background: url(../assets/img/asidebar9.svg) no-repeat;
    }
    .navicon10{
      background: url(../assets/img/asidebar10.svg) no-repeat;
    }
    .navicon11{
      background: url(../assets/img/asidebar11.svg) no-repeat;
    }
    .navicon12{
      background: url(../assets/img/asidebar12.svg) no-repeat;
    }
    .navicon13{
      background: url(../assets/img/asidebar13.svg) no-repeat;
    }
    .navicon14{
      background: url(../assets/img/asidebar14.svg) no-repeat;
    }
    .navicon15{
      background: url(../assets/img/asidebar1.svg) no-repeat;
    }
    .navicon16{
      background: url(../assets/img/asidebar2.svg) no-repeat;
    }
    .navicon17{
      background: url(../assets/img/asidebar3.svg) no-repeat;
    }
    .navicon18{
      background: url(../assets/img/asidebar4.svg) no-repeat;
    }
    .el-submenu__title,.el-menu-item {
      // width: 236px;
      height: 45px;
      color: white;
      line-height: 45px;
      text-align: left;
      font-size: 14px;
      letter-spacing: 0.2px;
      /*border-radius: 5px;*/
    }
    .el-submenu .el-menu {
      background: #3f4851;
    }
    .el-submenu__title:hover {
      color: #2196f3;
      background: #30373f;
    }
    .el-menu-item:hover {
      color: #2196f3;
      /*background: #30373f;*/
      background: inherit;
    }
    // 1.0 导航样式 2.0 写在全局common.css
    .selected:hover {
      color: #FFFFFF;
      background-image: linear-gradient(to left, #63cefd, #4ba7fd);
    }
  }
  .collection {
    position: absolute;
    width: 20px;
    height: 20px;
    right: 15px;
    top: 7px;
    background: url(../assets/img/collect-white.svg);
    background-size: cover;
    &.current {
      background: url(../assets/img/collect-red.svg);
      background-size: cover;
    }
  }
}
.el-menu {
  .selected{
    background-image: linear-gradient(to left, #63cefd, #4ba7fd);
    border-radius: 5px;
  }
}
.articleClose {
  // height: calc(100vh - 61px);
  width: calc(100vw - 245px);
  padding-top: 5px;
  margin-left: 240px;
  background: #30373f;
  transition: all .4s ease;
  overflow: hidden;
  .fixedBottom {
    position: fixed;
    left: 266px;
    bottom: 0px;
    border: 1px solid #d3dce6;
    border-radius: 4px;
    background: #FFFFFF;
    width: calc(100vw - 287px);
    z-index: 50;
    transition: all .4s ease;
  }
  .tabClose {
    width: calc(100vw - 267px);
    height: calc(100vh - 63px);
    margin-left: 25px;
    background-color: rgb(255, 255, 255);
    border: solid 1px rgb(238, 238, 238);
    transition: all .4s ease;
  }
  .tab-panel{
    position: relative;
    box-sizing: border-box;
    padding: 8px;
    background-color: #e5e9f2!important;
    width: calc(100vw - 245px);
    height: calc(100vh - 91px);
    overflow: hidden; // 防止滑块划出时出现x轴滚动条
    // overflow-y: auto;
  }
  // .tab-panel::-webkit-scrollbar{width:11px;}
  // .tab-panel::-webkit-scrollbar-track{background-color:#fff;}
  // .tab-panel::-webkit-scrollbar-thumb{background-color:#d8d8d8;border-radius: 20px;border:2px solid #fff;}
  // .tab-panel::-webkit-scrollbar-thumb:hover {background-color:#a0a0a0}
  // .tab-panel::-webkit-scrollbar-thumb:active {background-color:#a0a0a0}
}
.articleOpen {
  // height: calc(100vh - 61px);
  width: calc(100vw - 88px);
  padding-top: 5px;
  padding-left: 10px;
  margin-left: 72px;
  transition: all .4s ease;
  background: #30373f;
  overflow: hidden;
  .fixedBottom {
    position: fixed;
    left: 91px;
    bottom: 0px;
    border: 1px solid #d3dce6;
    border-radius: 4px;
    background: #FFFFFF;
    width: calc(100vw - 112px);
    z-index: 50;
    transition: all .4s ease;
  }
  .tabOpen {
    // width: 100%;
    width: calc(100vw - 91px);
    height: calc(100vh - 63px);
    margin-left: 25px;
    background-color: rgb(255, 255, 255);
    border: solid 1px rgb(238, 238, 238);
    transition: all .4s ease;
  }
  .tab-panel{
    position: relative;
    box-sizing: border-box;
    padding: 8px;
    background-color: #e5e9f2!important;
    width: calc(100vw - 16px - 72px);
    height: calc(100vh - 91px);
    overflow: hidden; // 防止滑块划出时出现x轴滚动条
    // overflow-y: auto;
  }
  // .tab-panel::-webkit-scrollbar{width:11px;}
  // .tab-panel::-webkit-scrollbar-track{background-color:#fff;}
  // .tab-panel::-webkit-scrollbar-thumb{background-color:#d8d8d8;border-radius: 20px;border:2px solid #fff;}
  // .tab-panel::-webkit-scrollbar-thumb:hover {background-color:#a0a0a0}
  // .tab-panel::-webkit-scrollbar-thumb:active {background-color:#a0a0a0}
}
ul.el-menu.aside-nav.el-menu-vertical-demo.el-menu--collapse {
  background: #30373f;
  margin: 4px;
}
.el-menu--collapse .el-submenu .el-menu{
  background-color: #30373f;
  z-index: 61;
}
.closeOthers {
  width: 140px;
  height: 24px;
  font-size: 12px;
  line-height: 24px;
  padding-left: 13px;
  text-align: left;
  border: solid 1px #e0e6ed;
  cursor: pointer;
  box-sizing: border-box;
  background-color: #f5f7fa;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  visibility: hidden;
}
.more {
  width: 55px;
  height: 30px;
  text-align: left;
  padding-left: 15px;
  line-height: 30px;
  font-size: 12px;
  position: absolute;
  cursor: pointer;
  z-index: 1;
  &:after {
    width: 70px;
    height: 44px;
    content: '';
    position: absolute;
    top: -14px;
    left: 0;
    transform: perspective(.5em) rotateX(3.5deg);
    transform-origin: bottom;
    border: 1px solid #d3dce6;
    border-bottom: none;
  }
  .total {
    width: 16px;
    height: 16px;
    line-height: 18px;
    text-align: center;
    border-radius: 8px;
    background-color: #999;
    color: #fff;
    position: absolute;
    top: 5px;
    right: 12px;
  }
}
.closePage {
  width: 140px;
  text-align: left;
  border: solid 1px #e0e6ed;
  box-sizing: border-box;
  background-color: #f5f7fa;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  ul {
    width: 140px;
    li {
      height: 24px;
      line-height: 24px;
      font-size: 12px;
      padding-left: 13px;
      border-bottom: solid 1px #e0e6ed;
      &:nth-child(1) {
        cursor: pointer;
      }
      span {
        float: right;
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
}

.contextMenuButton{
  &:hover{
    color: #232323 !important;
    box-shadow: 0 0 5px 0px #232323;
  }
}
</style>
