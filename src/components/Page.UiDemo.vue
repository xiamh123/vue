<template>

  <div>
    <!-- 图标 -->
    <div>
      <i class="el-icon-edit"></i>
      <i class="el-icon-share"></i>
      <i class="el-icon-delete"></i>
      <i class="el-icon-plus"></i>
      <el-button type="primary" icon="el-icon-edit">搜索</el-button>
      <el-button type="primary" icon="el-icon-date"><i class="el-icon-plus"></i>增加</el-button>
    </div>

    <!-- 按钮 -->
    <div>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </div>

    <!-- form表单元素 -->
    <div>
      <!-- 单选按钮 -->
      <el-radio v-model="radio" label="1">备选项</el-radio>
      <el-radio v-model="radio" label="2">备选项</el-radio>
      <el-radio disabled v-model="radio" label="1">备选项</el-radio>
      <el-radio v-model="radio" label="3">备选项</el-radio>

      <!-- 单选组 -->
      <div>
        <el-radio-group v-model="radio2">
          <el-radio :label="3">备选项</el-radio>
          <el-radio :label="6">备选项</el-radio>
          <el-radio :label="9">备选项</el-radio>
        </el-radio-group>

        <!-- 按钮样式单选 -->
        <el-radio-group v-model="radio3">
          <el-radio-button label="上海"></el-radio-button>
          <el-radio-button label="北京"></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
      </div>

      <!-- select选择器 -->
      <div>
        <el-select clearable filterable v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.value+'-'+item.label"
            :value="item.value"
            :disabled="item.disabled">
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
          </el-option>
        </el-select>
      </div>
    </div>
  </div>

</template>

<script>


  import api from '../utils/api.js'


  export default {
    name: 'index',
    data() {
      return {
        value1: '',
        newsListShow: [],
        radio: '1',
        radio2: '',
        radio3:'',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶',
          disabled: true
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    },
    components: {},
    methods: {

      tkMessage: function () {
        //弹框
        this.$message({
          message: '提交成功',
          type: 'success'
        });
      },

      setNewsApi: function () {
        api.JH_news('/news/index', 'type=top&key=123456')
          .then(res => {
            console.log(res);
            this.newsListShow = res.articles;
          });
      }
    }
  }

</script>

<style>

</style>
