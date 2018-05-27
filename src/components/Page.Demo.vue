<template>



  <div class="index">
    <button v-on:click="tkMessage">按钮</button>

    <button v-on:click="setNewsApi">按钮2</button>

    <div v-for="(item, key) in newsListShow">
      <img :src="item.thumbnail_pic_s" style="border-radius: 0.2rem;">
      <!-- <news-cell
        :newsDate="item"
        :key="key"
      ></news-cell> -->
    </div>
  </div>

</template>

<script>


  import api from '../utils/api.js'

  import NewsCell from './Components.Cell.vue'


	export default {
    name: 'index',
		data() {
			return {
        value1: '',
        newsListShow: []
				}
		},
    components: {
      NewsCell
    },
		methods: {

      tkMessage : function () {
          //弹框
        this.$message({
          message: '提交成功',
          type: 'success'
        });
      },

      setNewsApi: function() {
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
