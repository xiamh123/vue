<template>
    <div id="app">
      <p>{{ message2 }}</p>
      <br>
      <p v-text='message2'></p>
      <br>
      <p v-html='message2'></p>
      <br>
      <input type="text" v-model="message2"/>

      <br>

      <span>
        鼠标悬停几秒钟查看此处动态绑定的提示信息！
      </span>

    </div>
</template>

<script type="text/ecmascript-6">

    import Vue from 'vue'

    var app = new Vue({
      el: '#app',
      data() {
        message2: 'Hello Vue!'
      }
    })

</script>

<style>


</style>
