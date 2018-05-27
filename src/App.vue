<template>
  <div id="app">

    <!--<router-link to="home">Home</router-link>-->
    <!--<router-link to="about">about</router-link>-->

    <router-view></router-view>

    <!--<el-button>默认按钮</el-button>-->
    <!--<el-button type="primary">主要按钮</el-button>-->
    <!--<el-button type="text">文字按钮</el-button>-->
    <!--<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>-->
    <!--<br />-->
    <!--<el-input placeholder="elinput输入框">a</el-input>-->
    <!--<input placeholder="input输入框">b</input>-->
    <!--<hr/>-->
    <!--<event></event>-->
    <!--<invok @newNodeEvent="parentLisen"></invok>-->
    <!--<img src="./assets/logo.png">-->
    <!--<IfTest></IfTest>-->
    <!--<test></test>-->
    <!--<hello></hello>-->
  </div>
</template>

<script>
import Hello from './components/Hello'
import Test from './components/Test'
import IfTest from './components/IfTest'
import invok from './components/invok'
import Event from './components/Event'


export default {
  name: 'app',
  data(){
    return {
      num1 : 1
    }
  },
  components: {
    Hello,Test,IfTest,invok,Event
  },
  methods : {
    parentLisen : function(value){
        console.log(value);
    },
    handleChange : function (value) {
      console.log(value);
    }
  }

}
</script>

<style lang="scss">
  body {
    margin: 0px;
    padding: 0px;
    /*background: url(assets/bg1.jpg) center !important;
          background-size: cover;*/
  // background: #1F2D3D;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }

  #app {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }

  .el-submenu [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  .el-menu-item [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  .toolbar {
    background: #f2f2f2;
    padding: 10px;
  //border:1px solid #dfe6ec;
    margin: 10px 0px;
  .el-form-item {
    margin-bottom: 10px;
  }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>
