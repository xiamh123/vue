/**
*管理系统头部
*/
<template>
  <el-col :span="24" class="header">
    <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
      {{collapsed?'':sysName}}
    </el-col>
    <el-col :span="10">
      <div class="tools" @click.prevent="collapse">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0zIDE4aDE4di0ySDN2MnptMC01aDE4di0ySDN2MnptMC03djJoMThWNkgzeiIvPgogICAgPC9nPgo8L3N2Zz4K" alt="" title="收起菜单">
        <!-- <i class="fa fa-align-justify"></i> -->
      </div>
    </el-col>
  </el-col>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['collapsed','sysName'],
    data () {
      return {
        // collapsed: false,
        // sysName: '后台管理系统'
      }
    },
    computed: {},
    methods: {
      
      collapse : function(){
        
        // this.collapsed = !this.collapsed;
        // console.log("变更collapsed：" + this.collapsed);

        console.log("---------");
        this.$emit('changeCollapse');
        console.log("+++++++++");

      }


    }
  }
</script>


<style scoped lang="scss">

  .header {
    height: 60px;
    line-height: 60px;
    background: #20a0ff;
    color:#fff;
  }
  .logo {
  /*width:230px;*/
    height:60px;
    font-size: 22px;
    padding-left:20px;
    padding-right:20px;
    border-color: rgba(238,241,146,0.3);
    border-right-width: 1px;
    border-right-style: solid;
  }
  .logo-width{
    width:230px;
  }
  .logo-collapse-width{
    width:64px
  }
  .tools{
    padding: 0px 23px;
    width:14px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
  }
</style>




